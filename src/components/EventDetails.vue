<template>
  <v-container>
    <v-card class="event-card">
      <v-img :src="event.image" alt="Event Image" class="event-image"></v-img>
      <v-card-title class="event-header">
        <span class="event-title">{{ event.title }}</span>
      </v-card-title>
      <v-card-text>
        <div class="event-section">
          <h3>Resumen</h3>
          <p>{{ event.description }}</p>
        </div>
        <div class="event-section">
          <h3>Fecha y hora</h3>
          <p>{{ event.date }}</p>
          <v-btn text @click="addToGoogleCalendar(event)"
            >Add to calendar</v-btn
          >
        </div>
        <div class="event-section">
          <h3>Ubicación</h3>
          <p>{{ event.location }}</p>
          <v-btn text @click="toggleMap">Show map</v-btn>

          <div v-if="showMapSection" class="map-section">
            <iframe
              :src="`https://www.google.com/maps?q=${encodeURIComponent(event.location)}&output=embed`"
              width="100%"
              height="400"
              frameborder="0"
              style="border: 0"
              allowfullscreen
              aria-hidden="false"
              tabindex="0"
            ></iframe>
          </div>
        </div>
        <div class="event-section">
          <h3>Organizador</h3>
          <p>{{ event.organizer }}</p>
        </div>
        <div class="event-section">
          <h3>Sobre el evento</h3>
          <p>{{ event.eventDetails }}</p>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn text @click="$router.push('/')"
          >Volver a la lista de Eventos</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useEventsStore } from '@/store/index'

const route = useRoute()
const eventsStore = useEventsStore()
const showMapSection = ref(false)

// Obtener el evento por ID usando el store
const event = eventsStore.getEventById(Number(route.params.id))

function addToGoogleCalendar(event) {
  const baseUrl = 'https://calendar.google.com/calendar/render'
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.title,
    dates: `${event.date.replace(/-/g, '')}T120000Z/${event.date.replace(
      /-/g,
      ''
    )}T130000Z`,
    details: event.description,
    location: event.location,
  }).toString()

  const url = `${baseUrl}?${params}`
  window.open(url, '_blank')
}
function toggleMap() {
  showMapSection.value = !showMapSection.value
}
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
