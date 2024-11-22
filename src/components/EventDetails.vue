<template>
  <v-container>
    <v-card class="event-card">
      <!-- Event Image -->
      <v-img :src="event.image" alt="Event Image" class="event-image"></v-img>

      <!-- Event Title and Attend Button -->
      <v-card-title class="event-header">
        <span class="event-title">{{ event.title }}</span>
        <v-btn color="grey" class="attend-button">Quiero asistir</v-btn>
      </v-card-title>

      <!-- Event Details -->
      <v-card-text>
        <div class="event-section">
          <h3>Resumen</h3>
          <p>{{ event.description }}</p>
        </div>
        <div class="event-section">
          <h3>Data y hora</h3>
          <p>{{ event.date }}</p>
          <v-btn text>Add to calendar</v-btn>
        </div>
        <div class="event-section">
          <h3>Ubicación</h3>
          <p>{{ event.location }}</p>
          <v-btn text>Show map</v-btn>
        </div>
        <div class="event-section">
          <h3>Organizador</h3>
          <p>Información sobre el organizador</p>
        </div>
        <div class="event-section">
          <h3>Sobre el evento</h3>
          <p>Más detalles sobre el evento</p>
        </div>
      </v-card-text>

      <!-- Back Button -->
      <v-card-actions>
        <v-btn text @click="$router.push('/')"
          >Volver a la lista de Eventos</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const event = ref({})

onMounted(() => {
  const eventId = route.params.id
  const events = [
    {
      id: 1,
      title: 'Music Festival',
      location: 'New York',
      date: '2024-11-01',
      image: '/images/image1.avif',
      description: 'Join us for an unforgettable music experience.',
    },
    {
      id: 2,
      title: 'Tech Conference',
      location: 'San Francisco',
      date: '2024-11-15',
      image: 'image2.jpg',
      description: 'Latest trends in technology.',
    },
  ]

  event.value = events.find((e) => e.id === Number(eventId))
})
</script>

<style scoped>
.event-card {
  max-width: 800px;
  margin: auto;
}
.event-image {
  width: 100%;
  height: 300px;
  object-fit: cover;
  margin-bottom: 20px;
}
.event-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.event-title {
  font-size: 1.8em;
  font-weight: bold;
}
.attend-button {
  background-color: lightgrey;
  color: black;
}
.event-section {
  margin-bottom: 15px;
}
.event-section h3 {
  font-weight: bold;
  margin-bottom: 5px;
}
</style>
