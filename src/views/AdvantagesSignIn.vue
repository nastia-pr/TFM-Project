<template>
  <div class="advantages-section">
    <h1>Organizar eventos, más fácil que nunca</h1>
    <div class="advantages-container">
      <!-- Agregamos clases para ajustar la posición vertical de cada tarjeta -->
      <AdvantageCard
        text="Transforma tus ideas en experiencias memorables"
        color="#FFB6C1"
        :delay="0.2"
        class="card-left"
      />
      <AdvantageCard
        text="Crea y gestiona fácilmente eventos en una plataforma que los asistentes adoran y en la que confían"
        color="#87CEFA"
        :delay="0.4"
        class="card-right"
      />
      <AdvantageCard
        text="Transforma tus objetos olvidados en tesoros para otros"
        color="#98FB98"
        :delay="0.6"
        class="card-left"
      />
      <AdvantageCard
        text="Tu evento, tu estilo: regístrate ahora para comenzar a planificar"
        color="#FFD700"
        :delay="0.8"
        class="card-right"
      />
    </div>
    <button class="join-button" @click="goToCreateAccount">ÚNETE</button>
  </div>
</template>

<script>
import AdvantageCard from '@/components/AdvantageCard.vue'

export default {
  components: {
    AdvantageCard,
  },
  methods: {
    goToCreateAccount() {
      this.$router.push({ name: 'create-account' }) // Redirige a la ruta de login
    },
  },
}
</script>

<style scoped>
.advantages-section {
  text-align: center;
  padding: 20px;
}

.advantages-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 100px;
  max-width: 900px;
  margin: 0 auto;
  padding: 40px 0;
}

.join-button {
  margin-top: 20px;
  padding: 12px 24px;
  background: linear-gradient(135deg, #ff8a65, #ff5252);
  color: #fff;
  border: none;
  cursor: pointer;
  font-size: 18px;
  font-weight: bold;
  border-radius: 30px;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
}

.join-button:hover {
  transform: scale(1.05); /* Aumenta ligeramente el tamaño */
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.3);
}

.join-button:active {
  transform: scale(0.98); /* Hace un pequeño "rebote" */
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.2);
}

/* Ajustes de posición vertical para las tarjetas */
.card-left {
  margin-top: 30px; /* Izquierda más abajo */
}

.card-right {
  margin-top: 0px; /* Derecha más arriba */
}
</style>
