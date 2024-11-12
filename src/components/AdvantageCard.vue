<template>
  <div
    class="advantage-card"
    :style="{ backgroundColor: color, animationDelay: delay + 's' }"
  >
    <p>{{ text }}</p>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true,
    },
    delay: {
      type: Number,
      default: 0,
    },
    color: {
      type: String,
      required: true,
    },
  },
}
</script>

<style scoped>
.advantage-card {
  width: 250px;
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 10px;
  color: #000;
  font-weight: bold;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  opacity: 0;
  animation: fadeInUp 1s ease forwards;
}

/* Animación de aparición */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Efecto hover */
.advantage-card:hover {
  transform: translateY(-10px) scale(1.05);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
}
</style>
