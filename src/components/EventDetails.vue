<template>
  <v-container class="event-details-container">
    <v-card class="event-card elevation-3">
      <!-- Event Image -->
      <v-img :src="event.image" alt="Event Image" class="event-image"></v-img>

      <!-- Event Title -->
      <v-card-title class="event-header text-center">
        <span class="event-title font-weight-bold text-truncate">{{
          event.title
        }}</span>
      </v-card-title>

      <!-- Event Details -->
      <v-card-text>
        <div class="event-section">
          <h3 class="section-title">Resumen</h3>
          <p class="section-text">{{ event.description }}</p>
        </div>

        <div class="event-section">
          <h3 class="section-title">Fecha</h3>
          <p class="section-text">{{ formatDate(event.date) }}</p>
          <v-btn
            color="primary"
            outlined
            class="mt-2"
            @click="addToGoogleCalendar(event)"
          >
            Añadir al calendario
          </v-btn>
        </div>

        <div class="event-section">
          <h3 class="section-title">Ubicación</h3>
          <p class="section-text">{{ event.location }}</p>
          <v-btn color="secondary" outlined class="mt-2" @click="toggleMap">
            Mostrar mapa
          </v-btn>

          <!-- Map Section -->
          <div v-if="showMapSection" class="map-section mt-4">
            <iframe
              :src="`https://www.google.com/maps?q=${encodeURIComponent(event.location)}&output=embed`"
              width="100%"
              height="300"
              frameborder="0"
              style="border: 0; border-radius: 8px"
              allowfullscreen
              aria-hidden="false"
              tabindex="0"
            ></iframe>
          </div>
        </div>

        <div class="event-section">
          <h3 class="section-title">Categoría</h3>
          <p class="section-text">{{ event.category }}</p>
        </div>

        <div class="event-section">
          <h3 class="section-title">Organizador</h3>
          <p class="section-text">{{ event.organizer }}</p>
        </div>

        <div class="event-section">
          <h3 class="section-title">Sobre el evento</h3>
          <p class="section-text">{{ event.eventDetails }}</p>
        </div>
      </v-card-text>

      <!-- Card Actions -->
      <v-card-actions class="d-flex justify-end">
        <v-btn class="button-back" text @click="$router.push('/')">
          Volver a la lista de eventos
        </v-btn>
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

function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('es-ES', options).format(date)
}
</script>

<style scoped>
.event-details-container {
  max-width: 900px;
  margin: auto;
  padding: 16px;
}

.event-card {
  max-width: 800px;
  margin: auto;
  border-radius: 12px;
  overflow: hidden;
  transition:
    box-shadow 0.3s,
    transform 0.3s;
}

.event-card:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  transform: translateY(-4px);
}

.event-image {
  width: 100%;
  height: auto;
  max-height: 500px;
  object-fit: contain;
  margin-bottom: 20px;
  border-bottom: 2px solid #ddd;
  background-color: #f4f4f4;
}
.event-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.5rem;
  background-color: #f4f4f4;
  padding: 16px;
  border-bottom: 1px solid #ddd;
}
.event-section {
  margin-bottom: 24px;
}
.section-title {
  font-size: 1.25rem;
  margin-bottom: 8px;
  color: #424242;
}
.section-text {
  font-size: 1rem;
  color: #616161;
}

.v-btn {
  text-transform: uppercase;
}
.map-section iframe {
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.button-back {
  font-weight: bold;
  padding: 10px 20px;
  background-color: #3f51b5;
  color: #fff;
}

.button-back:hover {
  background-color: rgb(28, 133, 224);
}
</style>
