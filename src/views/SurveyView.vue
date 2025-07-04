<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function submitSurvey() {
  alert('Thank you for your feedback!')
  router.push('/')
}
</script>

<template>
  <div class="page-section">
    <div class="survey-container">
      <h1 class="page-heading">Share Your Feedback</h1>
      <p style="text-align: center; color: var(--text-secondary); margin-bottom: 2rem">
        Help us improve the Digital Horizons experience.
      </p>
      <form @submit.prevent="submitSurvey">
        <div class="form-group">
          <label for="experience-rating">How would you rate your overall experience?</label>
          <select id="experience-rating" required>
            <option value="">Select a rating</option>
            <option value="5">Excellent</option>
            <option value="4">Good</option>
            <option value="3">Average</option>
            <option value="2">Poor</option>
            <option value="1">Very Poor</option>
          </select>
        </div>
        <div class="form-group">
          <label for="comments">Any comments or suggestions?</label>
          <textarea id="comments" rows="5" placeholder="Tell us what you think..."></textarea>
        </div>
        <button type="submit" class="btn" style="width: 100%; margin-top: 1rem">
          Submit Feedback
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.survey-container {
  max-width: 800px;
  margin: 0 auto;
  background: var(--bg-secondary);
  padding: 3rem;
  border-radius: 12px;
  border: 1px solid var(--border-color);
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
.form-group textarea,
.form-group select {
  width: 100%;
  padding: 0.75rem;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  color: var(--text-primary);
  font-size: 1rem;
  font-family: inherit;
}
.form-group textarea:focus,
.form-group select:focus {
  outline: none;
  border-color: var(--accent-primary);
  box-shadow: 0 0 0 2px rgba(47, 129, 247, 0.4);
}
</style>
