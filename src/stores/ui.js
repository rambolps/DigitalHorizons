import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUIStore = defineStore('ui', () => {
  const notification = ref({
    show: false,
    message: '',
  })

  let timeoutId = null

  function showNotification(message) {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    notification.value.message = message
    notification.value.show = true

    timeoutId = setTimeout(() => {
      notification.value.show = false
    }, 3000)
  }

  return { notification, showNotification }
})
