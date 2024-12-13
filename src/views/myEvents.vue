<template>
  <v-container class="see-my-events-container" fluid>
    <!-- Header Section -->
    <v-card class="header-card" outlined>
      <v-card-title class="text-center header-title">
        Mis Eventos Publicados
      </v-card-title>
      <p class="subtitle">
        Aquí puedes ver todos los eventos que has creado y publicado.
      </p>
    </v-card>

    <!-- Event Cards -->
    <v-row class="event-list">
      <v-col v-for="event in events" :key="event.id" cols="12" sm="6" md="4">
        <v-card class="event-card" outlined>
          <!-- Event Image -->
          <v-img :src="event.image" class="event-image" height="200px"></v-img>

          <!-- Event Details -->
          <v-card-title class="event-title">{{ event.title }}</v-card-title>
          <v-card-subtitle class="event-subtitle">
            {{ event.date }} | {{ event.location }}
          </v-card-subtitle>
          <v-card-text class="event-summary">{{ event.summary }}</v-card-text>

          <!-- Action Buttons -->
          <v-card-actions class="card-actions">
            <v-btn color="primary" @click="viewEvent(event.id)">
              Ver Detalles
            </v-btn>
            <v-btn color="error" @click="deleteEvent(event.id)">
              Eliminar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'

// Example event data
const events = ref([
  {
    id: 1,
    title: 'Mercado de Ropa Vintage',
    date: '08/04/2024',
    location: 'Madrid, España',
    summary:
      'Un evento para los amantes de la moda vintage. Ven y encuentra piezas únicas.',
    image: 'https://via.placeholder.com/400x200',
  },
  {
    id: 2,
    title: 'Festival de Segunda Mano',
    date: '15/05/2024',
    location: 'Barcelona, España',
    summary:
      'Encuentra increíbles artículos de segunda mano en nuestro festival anual.',
    image: 'https://via.placeholder.com/400x200',
  },
  // Add more events as needed
])

// Methods
function viewEvent(eventId) {
  // Logic to navigate to or display event details
  console.log('View event details:', eventId)
  // Example: router.push(`/event/${eventId}`);
}

function deleteEvent(eventId) {
  // Logic to delete the event
  console.log('Delete event:', eventId)
  events.value = events.value.filter((event) => event.id !== eventId)
}
</script>

<style scoped>
.see-my-events-container {
  padding: 20px;
  background-color: #ebeaea;
}

.header-card {
  margin-bottom: 20px;
  background-color: #3f51b5;
  color: white;
  text-align: center;
  padding: 20px;
  border-radius: 8px;
}

.header-title {
  font-size: 24px;
  font-weight: bold;
}

.subtitle {
  font-size: 16px;
  color: #ffffffb3;
}

.event-list {
  margin-top: 20px;
}

.event-card {
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.2s,
    box-shadow 0.2s;
}

.event-card:hover {
  transform: scale(1.02);
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.2);
}

.event-title {
  font-size: 18px;
  font-weight: bold;
  margin: 10px 0;
}

.event-subtitle {
  color: #757575;
  font-size: 14px;
}

.event-summary {
  font-size: 14px;
  color: #616161;
  margin: 10px 0;
}

.card-actions {
  justify-content: space-between;
}

.v-btn {
  font-size: 14px;
  text-transform: uppercase;
}

.v-btn:hover {
  opacity: 0.9;
}
</style>
