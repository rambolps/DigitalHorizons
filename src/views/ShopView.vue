<script setup>
import { ref, computed, watch } from 'vue'
import { useProductStore } from '@/stores/products'
import { useRoute, useRouter } from 'vue-router'

const productStore = useProductStore()
const route = useRoute()
const router = useRouter()

const activeFilters = ref({
  categories: [],
  brands: [],
  maxPrice: 5000,
  searchTerm: '',
  onSaleOnly: false,
  specs: {},
})

const specDefinitions = {
  Laptops: { ram: 'RAM', cpu: 'Processor', storage: 'Storage', screenSize: 'Screen Size' },
  Desktops: { ram: 'RAM', cpu: 'Processor', storage: 'Storage' },
  Smartphones: { storage: 'Storage' },
  Tablets: { storage: 'Storage' },
  Monitors: { screenSize: 'Screen Size', resolution: 'Resolution' },
  Audio: { type: 'Type', connectivity: 'Connectivity' },
  CPUs: { clockSpeed: 'Clock Speed', coreCount: 'Cores', cache: 'Cache' },
  GPUs: { power: 'Power (W)', pcie: 'PCIe' },
  PSUs: { wattage: 'Wattage', modularity: 'Modularity', formFactor: 'Form Factor' },
  Keyboards: { size: 'Size', switchType: 'Switch Type' },
  Mice: { connectivity: 'Connectivity' },
  RAM: { capacity: 'Capacity', ddrVersion: 'DDR Version' },
}

const brands = computed(() => [...new Set(productStore.products.map((p) => p.brand))].sort())
const categories = computed(() => [...new Set(productStore.products.map((p) => p.category))].sort())

const categorySpecificFilters = computed(() => {
  if (activeFilters.value.categories.length !== 1) return null
  const category = activeFilters.value.categories[0]
  if (!specDefinitions[category]) return null

  const relevantProducts = productStore.products.filter((p) => p.category === category)
  const filters = {}

  for (const specKey in specDefinitions[category]) {
    const label = specDefinitions[category][specKey]
    const values = [
      ...new Set(relevantProducts.map((p) => p.specs[specKey]).filter(Boolean)),
    ].sort()
    if (values.length > 1) {
      filters[specKey] = { label, values }
      if (!activeFilters.value.specs[specKey]) {
        activeFilters.value.specs[specKey] = []
      }
    }
  }
  return filters
})

const filteredProducts = computed(() => {
  return productStore.products.filter((product) => {
    const categoryMatch =
      activeFilters.value.categories.length === 0 ||
      activeFilters.value.categories.includes(product.category)
    const brandMatch =
      activeFilters.value.brands.length === 0 || activeFilters.value.brands.includes(product.brand)
    const priceMatch = product.price <= activeFilters.value.maxPrice
    const searchMatch =
      activeFilters.value.searchTerm === '' ||
      product.name.toLowerCase().includes(activeFilters.value.searchTerm.toLowerCase())
    const saleMatch = !activeFilters.value.onSaleOnly || !!product.salePrice

    const specsMatch = Object.keys(activeFilters.value.specs).every((specKey) => {
      const filterValues = activeFilters.value.specs[specKey]
      if (!filterValues || filterValues.length === 0) return true
      return product.specs && filterValues.includes(product.specs[specKey])
    })

    return categoryMatch && brandMatch && priceMatch && searchMatch && saleMatch && specsMatch
  })
})

function handleCategoryChange() {
  activeFilters.value.specs = {}
}

function clearSearch() {
  const query = { ...route.query }
  delete query.search
  router.push({ query })
}

watch(
  () => route.query.search,
  (newSearchTerm) => {
    activeFilters.value.searchTerm = newSearchTerm || ''
  },
  { immediate: true },
)

watch(
  () => route.query.category,
  (newCategory) => {
    if (newCategory && !activeFilters.value.categories.includes(newCategory)) {
      activeFilters.value.categories = [newCategory]
      handleCategoryChange()
    }
  },
  { immediate: true },
)
</script>

<template>
  <div class="page-section">
    <div class="shop-container">
      <aside class="filters">
        <div class="filter-group">
          <h3>Search</h3>
          <p v-if="activeFilters.searchTerm" id="search-term-display">
            "{{ activeFilters.searchTerm }}"
          </p>
          <p
            v-else
            id="search-term-display"
            style="color: var(--text-secondary); font-style: italic"
          >
            No search term
          </p>
          <button
            v-if="activeFilters.searchTerm"
            @click="clearSearch"
            class="btn"
            style="width: 100%; margin-top: 1rem"
          >
            Clear Search
          </button>
        </div>
        <div class="filter-group">
          <h3>Deals</h3>
          <label>
            <input type="checkbox" v-model="activeFilters.onSaleOnly" />
            On Sale Only
          </label>
        </div>
        <div class="filter-group">
          <h3>Category</h3>
          <div v-for="cat in categories" :key="cat">
            <label>
              <input
                type="checkbox"
                :value="cat"
                v-model="activeFilters.categories"
                @change="handleCategoryChange"
              />
              {{ cat }}
            </label>
          </div>
        </div>

        <div id="category-specific-filters" v-if="categorySpecificFilters">
          <div class="filter-group" v-for="(filter, key) in categorySpecificFilters" :key="key">
            <h3>{{ filter.label }}</h3>
            <div v-for="value in filter.values" :key="value">
              <label>
                <input type="checkbox" :value="value" v-model="activeFilters.specs[key]" />
                {{ value }}
              </label>
            </div>
          </div>
        </div>

        <div class="filter-group">
          <h3>Brand</h3>
          <div v-for="brand in brands" :key="brand">
            <label>
              <input type="checkbox" :value="brand" v-model="activeFilters.brands" />
              {{ brand }}
            </label>
          </div>
        </div>
        <div class="filter-group">
          <h3>Price Range</h3>
          <label for="price-range">Max Price: ${{ activeFilters.maxPrice }}</label>
          <input
            type="range"
            id="price-range"
            min="100"
            max="5000"
            step="50"
            v-model="activeFilters.maxPrice"
          />
        </div>
      </aside>
      <div class="product-grid">
        <div v-for="product in filteredProducts" :key="product.id" class="product-card">
          <div class="product-image">
            <img :src="product.imageUrl" :alt="product.name" />
            <span v-if="product.salePrice" class="sale-badge">SALE</span>
          </div>
          <div class="product-info">
            <h2 class="product-name">{{ product.name }}</h2>
            <p class="product-category">{{ product.category }} - {{ product.brand }}</p>
            <div class="product-price-container">
              <p v-if="product.salePrice" class="sale-price">${{ product.salePrice.toFixed(2) }}</p>
              <p
                :class="{
                  'original-price': product.salePrice,
                  'product-price': !product.salePrice,
                }"
              >
                ${{ product.price.toFixed(2) }}
              </p>
            </div>
            <button class="btn" @click="productStore.addToCart(product.id)">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.shop-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 2rem;
}

.filters {
  background: var(--bg-secondary);
  padding: 2rem;
  border-radius: 12px;
  border: 1px solid var(--border-color);
  align-self: start;
}

.filter-group {
  margin-bottom: 2rem;
}

.filter-group h3 {
  font-family: var(--font-heading);
  font-size: 1.2rem;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--border-color);
}

.filter-group label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
  cursor: pointer;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  align-content: start;
}

.product-card {
  background-color: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  overflow: hidden;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
}

.product-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.product-image {
  width: 100%;
  height: 200px;
  background-color: #fff;
  overflow: hidden;
  position: relative;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.product-card .sale-badge {
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: var(--sale-color);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: bold;
}

.product-info {
  padding: 1.5rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.product-name {
  font-family: var(--font-heading);
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.product-category {
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.product-price-container {
  margin-top: auto;
  margin-bottom: 1rem;
  display: flex;
  align-items: flex-end;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.product-price {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--accent-primary);
}

.product-price-container .sale-price {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--sale-text);
}

.product-price-container .original-price {
  font-size: 1rem;
  text-decoration: line-through;
  color: var(--text-secondary);
}

@media (max-width: 768px) {
  .shop-container {
    grid-template-columns: 1fr;
  }
  .filters {
    margin-bottom: 2rem;
  }
}
</style>
