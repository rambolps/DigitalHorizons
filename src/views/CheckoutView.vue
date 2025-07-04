<script setup>
import { useProductStore } from '@/stores/products'
import { useUIStore } from '@/stores/ui'
import { useRouter } from 'vue-router'

const productStore = useProductStore()
const uiStore = useUIStore()
const router = useRouter()

function placeOrder() {
  productStore.clearCart()
  router.push('/survey')
  uiStore.showNotification('Order confirmed! Please take a moment for our survey.')
}
</script>

<template>
  <div class="page-section">
    <div class="checkout-container">
      <h1 class="page-heading">Checkout</h1>
      <form @submit.prevent="placeOrder">
        <h3>Contact Information</h3>
        <div class="form-group">
          <label for="email">Email Address</label>
          <input type="email" id="email" required />
        </div>

        <h3>Shipping Address</h3>
        <div class="form-grid">
          <div class="form-group">
            <label for="first-name">First Name</label><input type="text" id="first-name" required />
          </div>
          <div class="form-group">
            <label for="last-name">Last Name</label><input type="text" id="last-name" required />
          </div>
        </div>
        <div class="form-group">
          <label for="address">Address</label><input type="text" id="address" required />
        </div>
        <div class="form-grid">
          <div class="form-group">
            <label for="city">City</label><input type="text" id="city" required />
          </div>
          <div class="form-group">
            <label for="country">Country</label
            ><input type="text" id="country" value="Canada" required />
          </div>
          <div class="form-group">
            <label for="postal-code">Postal Code</label
            ><input type="text" id="postal-code" required />
          </div>
        </div>

        <h3>Payment Details</h3>
        <div class="form-group">
          <label for="card-number">Card Number</label
          ><input type="text" id="card-number" placeholder="XXXX XXXX XXXX XXXX" required />
        </div>
        <div class="form-grid">
          <div class="form-group">
            <label for="expiry-date">Expiry Date</label
            ><input type="text" id="expiry-date" placeholder="MM / YY" required />
          </div>
          <div class="form-group">
            <label for="cvv">CVV</label><input type="text" id="cvv" placeholder="123" required />
          </div>
        </div>

        <button type="submit" class="btn" style="width: 100%; margin-top: 1rem">Place Order</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.checkout-container {
  max-width: 800px;
  margin: 0 auto;
  background: var(--bg-secondary);
  padding: 3rem;
  border-radius: 12px;
  border: 1px solid var(--border-color);
}
.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}
.form-group {
  margin-bottom: 1.5rem;
}
.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--text-secondary);
}
.form-group input {
  width: 100%;
  padding: 0.75rem;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  color: var(--text-primary);
  font-size: 1rem;
}
.form-group input:focus {
  outline: none;
  border-color: var(--accent-primary);
  box-shadow: 0 0 0 2px rgba(47, 129, 247, 0.4);
}
</style>
