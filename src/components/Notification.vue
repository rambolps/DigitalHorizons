<script setup>
import { useUIStore } from '@/stores/ui'
const uiStore = useUIStore()
</script>

<template>
  <transition name="fade">
    <div v-if="uiStore.notification.show" class="notification-popup">
      <p>{{ uiStore.notification.message }}</p>
    </div>
  </transition>
</template>

<style scoped>
.notification-popup {
  position: fixed;
  top: 90px;
  right: 20px;
  background-color: var(--sale-bg);
  border: 1px solid var(--sale-color);
  color: var(--sale-text);
  padding: 1rem 1.5rem;
  border-radius: 8px;
  z-index: 9999;
  font-weight: 500;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.5s ease,
    transform 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
