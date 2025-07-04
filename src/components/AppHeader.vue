<script setup>
import { RouterLink } from 'vue-router'
import { useProductStore } from '@/stores/products'

const productStore = useProductStore()
</script>

<template>
  <header class="main-header">
    <div class="container">
      <RouterLink to="/" class="logo">Digital<span>Horizons</span></RouterLink>
      <form class="search-bar">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
        <input type="search" placeholder="Search for products..." />
      </form>
      <nav class="main-nav">
        <ul>
          <li><RouterLink to="/" class="nav-link">Home</RouterLink></li>
          <li><RouterLink to="/shop" class="nav-link">Shop</RouterLink></li>
          <li><RouterLink to="/survey" class="nav-link">Survey</RouterLink></li>
        </ul>
      </nav>
      <div class="header-icons">
        <RouterLink to="/cart" class="cart-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c.51 0 .962-.344 1.087-.835l1.838-5.514a1.875 1.875 0 00-1.087-2.313H6.142M6 18h12.75a3 3 0 000-6H6.142"
            />
          </svg>
          <span v-if="productStore.cartItemCount > 0" class="cart-badge">{{
            productStore.cartItemCount
          }}</span>
        </RouterLink>
      </div>
    </div>
  </header>
</template>

<style scoped>
.main-header {
  background-color: rgba(13, 17, 23, 0.8);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border-color);
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 1000;
}

.main-header .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;
}

.logo {
  font-family: var(--font-heading);
  font-size: 1.75rem;
  font-weight: 800;
  letter-spacing: -1px;
  color: var(--text-primary);
  text-decoration: none;
  flex-shrink: 0;
}

.logo span {
  color: var(--accent-primary);
}

.search-bar {
  flex-grow: 1;
  position: relative;
}

.search-bar input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  color: var(--text-primary);
}
.search-bar input:focus {
  outline: none;
  border-color: var(--accent-primary);
  box-shadow: 0 0 0 2px rgba(47, 129, 247, 0.4);
}

.search-bar svg {
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-secondary);
}

.main-nav ul {
  display: flex;
  list-style: none;
  gap: 2rem;
}

.main-nav a {
  color: var(--text-secondary);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
  position: relative;
  padding-bottom: 4px;
}

.main-nav a:hover,
.main-nav a.router-link-exact-active {
  color: var(--text-primary);
}

.main-nav a.router-link-exact-active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: var(--accent-primary);
  transition: width 0.3s ease;
}

.header-icons {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex-shrink: 0;
}

.header-icons svg {
  width: 24px;
  height: 24px;
  color: var(--text-secondary);
  cursor: pointer;
  transition: color 0.3s ease;
}

.header-icons svg:hover {
  color: var(--text-primary);
}

.cart-icon {
  position: relative;
}

.cart-badge {
  position: absolute;
  top: -5px;
  right: -8px;
  background-color: var(--accent-primary);
  color: white;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  font-size: 10px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
}

@media (max-width: 992px) {
  .main-nav {
    display: none;
  }
}
@media (max-width: 768px) {
  .search-bar {
    display: none;
  }
}
</style>
