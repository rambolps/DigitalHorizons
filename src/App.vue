<script setup>
import { RouterView } from 'vue-router'
import AppHeader from './components/AppHeader.vue'
import Notification from './components/Notification.vue'
</script>

<template>
  <AppHeader />
  <Notification />
  <main>
    <RouterView />
  </main>
</template>

<style>
@import '@/assets/main.css';
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Manrope:wght@700;800&display=swap');
</style>
