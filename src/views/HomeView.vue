<script setup>
import { computed } from 'vue'
import { useProductStore } from '@/stores/products'
import { useRouter } from 'vue-router'

const productStore = useProductStore()
const router = useRouter()

const featuredSaleItem = computed(() => {
  return (
    productStore.products.find((p) => p.featured && p.salePrice) ||
    productStore.products.find((p) => p.salePrice)
  )
})

const featuredProducts = computed(() => {
  return productStore.products.filter((p) => p.featured && p.salePrice)
})

const categories = computed(() => {
  return [...new Set(productStore.products.map((p) => p.category))].sort()
})

function addToCart(productId) {
  productStore.addToCart(productId)
}

function goToShopCategory(category) {
  router.push({ name: 'shop', query: { category: category } })
}
</script>

<template>
  <div class="page-section">
    <section class="hero-section">
      <div class="container">
        <h1>Explore the Next Frontier</h1>
        <p>
          Discover a curated selection of high-performance technology designed to elevate your
          digital experience.
        </p>
        <router-link to="/shop" class="btn">Shop All Products</router-link>
      </div>
    </section>

    <div class="container" style="padding-top: 4rem">
      <h2 class="section-heading">Deal of the Day</h2>
      <div id="featured-sale-item" v-if="featuredSaleItem">
        <div class="featured-sale-section">
          <div class="featured-sale-img">
            <img :src="featuredSaleItem.imageUrl" :alt="featuredSaleItem.name" />
          </div>
          <div class="featured-sale-info">
            <h2>{{ featuredSaleItem.name }}</h2>
            <p class="product-category">
              {{ featuredSaleItem.category }} - {{ featuredSaleItem.brand }}
            </p>
            <div class="featured-sale-pricing">
              <span class="original-price">${{ featuredSaleItem.price.toFixed(2) }}</span>
              <span class="sale-price">${{ featuredSaleItem.salePrice.toFixed(2) }}</span>
              <span class="sale-badge">LIMITED TIME</span>
            </div>
            <p style="color: var(--text-secondary)">
              An incredible deal on one of our top-rated products. Get it before it's gone!
            </p>
            <button class="btn" @click="addToCart(featuredSaleItem.id)" style="margin-top: 2rem">
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      <h2 class="section-heading">Shop by Category</h2>
      <div class="category-grid">
        <div
          v-for="category in categories"
          :key="category"
          class="category-card"
          @click="goToShopCategory(category)"
        >
          <h4>{{ category }}</h4>
        </div>
      </div>

      <h2 class="section-heading">Featured On Sale</h2>
      <div class="product-grid">
        <div v-for="product in featuredProducts" :key="product.id" class="product-card">
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
            <button class="btn" @click="addToCart(product.id)">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hero-section {
  background:
    linear-gradient(rgba(13, 17, 23, 0.7), rgba(13, 17, 23, 1)),
    url('https://images.unsplash.com/photo-1550745165-9bc0b252726a?q=80&w=2070&auto=format&fit=crop')
      center/cover no-repeat;
  padding: 8rem 0;
  text-align: center;
}
.hero-section h1 {
  font-family: var(--font-heading);
  font-size: 3.5rem;
  margin-bottom: 1rem;
}
.hero-section p {
  font-size: 1.25rem;
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto 2rem;
}

.section-heading {
  font-family: var(--font-heading);
  font-size: 2.5rem;
  margin-bottom: 2.5rem;
  text-align: center;
}

.featured-sale-section {
  background: var(--sale-bg);
  border: 1px solid var(--sale-color);
  border-radius: 16px;
  padding: 3rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
  margin-bottom: 4rem;
}
.featured-sale-img img {
  width: 100%;
  border-radius: 12px;
}
.featured-sale-info h2 {
  font-family: var(--font-heading);
  font-size: 2.5rem;
}
.featured-sale-info .product-category {
  font-size: 1.1rem;
  color: var(--text-secondary);
  margin: 0.5rem 0 1.5rem;
}
.featured-sale-pricing {
  margin: 1.5rem 0;
  font-size: 1.2rem;
}
.original-price {
  text-decoration: line-through;
  color: var(--text-secondary);
  margin-right: 1rem;
}
.sale-price {
  color: var(--sale-text);
  font-weight: bold;
  font-size: 2.5rem;
}
.sale-badge {
  display: inline-block;
  background: var(--sale-color);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: bold;
  margin-left: 1rem;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1.5rem;
  margin-bottom: 4rem;
}
.category-card {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  padding: 1.5rem;
  border-radius: 12px;
  text-align: center;
  cursor: pointer;
  transition:
    transform 0.3s ease,
    background-color 0.3s ease;
}
.category-card:hover {
  transform: translateY(-5px);
  background-color: #1c222b;
}
.category-card svg {
  margin-bottom: 1rem;
  color: var(--accent-primary);
}
.category-card h4 {
  font-weight: 600;
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
  background-color: #21262d;
  overflow: hidden;
  position: relative;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-card .sale-badge {
  position: absolute;
  top: 1rem;
  left: 1rem;
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
}

@media (max-width: 992px) {
  .featured-sale-section {
    grid-template-columns: 1fr;
    text-align: center;
  }
}
@media (max-width: 768px) {
  .hero-section h1 {
    font-size: 2.5rem;
  }
}
</style>
