<script setup>
import { useProductStore } from '@/stores/products'
import { useRouter } from 'vue-router'

const productStore = useProductStore()
const router = useRouter()

function updateQuantity(id, event) {
  const quantity = parseInt(event.target.value, 10)
  productStore.updateQuantity(id, quantity)
}

function proceedToCheckout() {
  router.push('/checkout')
}
</script>

<template>
  <div class="page-section">
    <div class="container">
      <h1 class="page-heading">Your Cart</h1>
      <div v-if="productStore.cart.length > 0">
        <div id="cart-items">
          <div v-for="item in productStore.cart" :key="item.id" class="cart-item">
            <div class="cart-item-img"><img :src="item.imageUrl" :alt="item.name" /></div>
            <div class="cart-item-details">
              <div class="cart-item-title">{{ item.name }}</div>
              <div class="cart-item-pricing">
                <span v-if="item.salePrice" class="cart-item-sale-price"
                  >${{ item.salePrice.toFixed(2) }}</span
                >
                <span
                  :class="{
                    'cart-item-original-price': item.salePrice,
                    'cart-item-price': !item.salePrice,
                  }"
                >
                  ${{ item.price.toFixed(2) }}
                </span>
              </div>
              <div v-if="item.salePrice" class="cart-item-savings">
                You save ${{ ((item.price - item.salePrice) * item.quantity).toFixed(2) }}
              </div>
            </div>
            <div class="cart-item-actions">
              <div class="cart-item-subtotal">
                ${{ ((item.salePrice || item.price) * item.quantity).toFixed(2) }}
              </div>
              <div class="cart-item-quantity">
                <label :for="`qty-${item.id}`">Qty:</label>
                <input
                  type="number"
                  :id="`qty-${item.id}`"
                  min="1"
                  :value="item.quantity"
                  @change="updateQuantity(item.id, $event)"
                />
              </div>
              <div class="cart-item-remove">
                <button @click="productStore.removeFromCart(item.id)">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    width="20"
                    height="20"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="cart-summary">
          <h2>Summary</h2>
          <div class="summary-line">
            <span>Subtotal</span>
            <span>${{ productStore.cartTotal.toFixed(2) }}</span>
          </div>
          <div v-if="productStore.cartSavings > 0" class="summary-line" id="summary-savings">
            <span>You Saved</span>
            <span>-${{ productStore.cartSavings.toFixed(2) }}</span>
          </div>
          <div class="summary-total summary-line">
            <span>Total</span>
            <span>${{ productStore.cartTotal.toFixed(2) }}</span>
          </div>
          <button class="btn" @click="proceedToCheckout" style="width: 100%; margin-top: 1.5rem">
            Proceed to Checkout
          </button>
        </div>
      </div>
      <div v-else id="empty-cart-message" style="text-align: center; color: var(--text-secondary)">
        Your cart is empty.
      </div>
    </div>
  </div>
</template>

<style scoped>
.cart-item {
  display: grid;
  grid-template-columns: 100px 1fr auto;
  gap: 1.5rem;
  align-items: center;
  background-color: var(--bg-secondary);
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid var(--border-color);
  margin-bottom: 1rem;
}
.cart-item-img img {
  width: 100%;
  border-radius: 4px;
}
.cart-item-details {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.cart-item-title {
  font-weight: bold;
  font-size: 1.1rem;
}
.cart-item-pricing {
  display: flex;
  align-items: baseline;
  gap: 0.75rem;
  flex-wrap: wrap;
}
.cart-item-sale-price {
  color: var(--sale-text);
  font-weight: bold;
}
.cart-item-original-price {
  color: var(--text-secondary);
  text-decoration: line-through;
  font-size: 0.9rem;
}
.cart-item-savings {
  font-size: 0.9rem;
  color: var(--sale-text);
  font-style: italic;
  width: 100%;
}
.cart-item-actions {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 1rem;
}
.cart-item-quantity {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.cart-item-quantity label {
  font-size: 0.9rem;
  color: var(--text-secondary);
}
.cart-item-quantity input {
  width: 50px;
  padding: 0.5rem;
  text-align: center;
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  color: var(--text-primary);
  border-radius: 4px;
}
.cart-item-remove button {
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  transition: color 0.3s ease;
}
.cart-item-remove button:hover {
  color: #f87171;
}
.cart-item-subtotal {
  text-align: right;
  font-weight: bold;
  font-size: 1.2rem;
}

.cart-summary {
  margin-top: 2rem;
  padding: 2rem;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 12px;
}
.cart-summary h2 {
  font-family: var(--font-heading);
  margin-bottom: 1.5rem;
}
.summary-line {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  font-size: 1.1rem;
}
#summary-savings {
  color: var(--sale-text);
}
.summary-total {
  border-top: 1px solid var(--border-color);
  padding-top: 1rem;
  margin-top: 1rem;
  font-size: 1.5rem;
  font-weight: bold;
}
@media (max-width: 768px) {
  .cart-item {
    grid-template-columns: 80px 1fr;
    grid-template-rows: auto auto;
    gap: 0.5rem 1rem;
  }
  .cart-item-img {
    grid-row: 1 / 3;
  }
  .cart-item-details {
    grid-column: 2;
    grid-row: 1;
  }
  .cart-item-actions {
    grid-column: 2;
    grid-row: 2;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
  }
}
</style>
