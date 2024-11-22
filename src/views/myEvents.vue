<template>
  <v-container class="see-my-events-container" fluid>
    <v-card class="header-card" outlined>
      <v-card-title class="text-center">Mis Eventos Publicados</v-card-title>
      <p class="subtitle">
        Aquí puedes ver todos los eventos que has creado y publicado.
      </p>
    </v-card>

    <!-- Lista de Eventos Publicados -->
    <v-row>
      <v-col v-for="event in events" :key="event.id" cols="12" sm="6" md="4">
        <v-card class="event-card" outlined>
          <!-- Imagen del evento -->
          <v-img :src="event.image" height="200px"></v-img>

          <!-- Detalles del evento -->
          <v-card-title>{{ event.title }}</v-card-title>
          <v-card-subtitle
            >{{ event.date }} | {{ event.location }}</v-card-subtitle
          >
          <v-card-text>{{ event.summary }}</v-card-text>

          <!-- Botones de acción -->
          <v-card-actions>
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
}

.header-card {
  padding: 20px;
  background-color: #f5f5f5;
  margin-bottom: 20px;
}

.subtitle {
  text-align: center;
  color: #666;
  margin-top: -10px;
}

.event-card {
  margin-bottom: 20px;
}
</style>
