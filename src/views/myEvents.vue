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
            {{ formatDate(event.date) }} | {{ event.location }}
          </v-card-subtitle>
          <v-card-text class="event-summary">{{
            event.description
          }}</v-card-text>

          <v-dialog v-model="dialogVisible" max-width="400px">
            <v-card>
              <v-card-title class="headline"
                >¿Estás seguro de eliminar este evento?</v-card-title
              >
              <v-card-actions>
                <v-btn color="primary" @click="deleteEvent(eventIdToDelete)"
                  >Eliminar</v-btn
                >
                <v-btn color="secondary" @click="dialogVisible = false"
                  >Cancelar</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>

          <!-- Action Buttons -->
          <v-card-actions class="card-actions">
            <v-btn color="primary" @click="editEvent(event)"> Editar </v-btn>
            <v-btn color="error" @click="confirmDelete(event.id)">
              Eliminar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

  <!-- Edit Event Dialog -->
  <v-dialog v-model="editDialog" max-width="600px">
    <v-card>
      <v-card-title>Editar Evento</v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field
            v-model="editEventData.image"
            prepend-icon="mdi-camera"
          ></v-text-field>
          <v-text-field
            v-model="editEventData.title"
            label="Título"
          ></v-text-field>
          <v-textarea
            v-model="editEventData.description"
            label="Resumen"
          ></v-textarea>
          <v-text-field
            v-model="editEventData.date"
            label="Fecha"
          ></v-text-field>
          <v-text-field
            v-model="editEventData.location"
            label="Ubicación"
          ></v-text-field>
          <v-select
            v-model="editEventData.category"
            :items="categories"
            label="Categoría"
          ></v-select>
          <v-textarea
            v-model="editEventData.eventDetails"
            label="Detalles adicionales"
          ></v-textarea>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn color="green" @click="saveEditedEvent()">Guardar</v-btn>
        <v-btn color="red" @click="editDialog = false">Cancelar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import { useAccessTokenStore } from '@/store'
import { useRouter } from 'vue-router'
import { useEventsStore } from '@/store/index'

const accessTokenStore = useAccessTokenStore()
const eventsStore = useEventsStore()
const events = ref([])
const editDialog = ref(false)
const editEventData = ref({
  image: '',
  title: '',
  description: '',
  date: '',
  location: '',
  category: '',
  eventDetails: '',
})
const errorMessage = ref('')
const router = useRouter()
const categories = computed(() => eventsStore.categories)
const dialogVisible = ref(false)
const eventIdToDelete = ref(null)

const activeEventId = ref(null)

// Base URL del backend
const API_BASE_URL = import.meta.env.VITE_API_URL

onMounted(async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/my_events/`, {
      headers: {
        Authorization: `Bearer ${accessTokenStore.accessToken}`,
      },
    })
    events.value = response.data
  } catch (error) {
    errorMessage.value = 'Failed to fetch events. Please try again later.'
    console.error(error)
  }
})
// Edit Event
const editEvent = (event) => {
  activeEventId.value = event.id
  editEventData.value = { ...event }
  editDialog.value = true
}

// Save the edited event
const saveEditedEvent = async () => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/events/${activeEventId.value}`,
      editEventData.value,
      {
        headers: {
          Authorization: `Bearer ${accessTokenStore.accessToken}`,
        },
      }
    )
    // Refresh the events list after editing
    events.value = events.value.map((e) =>
      e.id === editEventData.value.id ? response.data : e
    )
    editDialog.value = false
  } catch (error) {
    console.error('Failed to edit event:', error)
  }
}

// Confirm delete event
const confirmDelete = (eventId) => {
  eventIdToDelete.value = eventId
  dialogVisible.value = true
}

// Delete Event
const deleteEvent = async (eventId) => {
  try {
    await axios.delete(`${API_BASE_URL}/events/${eventId}`, {
      headers: {
        Authorization: `Bearer ${accessTokenStore.accessToken}`,
      },
    })
    // Remove the deleted event from the list
    events.value = events.value.filter((event) => event.id !== eventId)
    // Mostrar mensaje de éxito
    dialogVisible.value = false
    alert('Evento eliminado exitosamente')
  } catch (error) {
    console.error('No se pudo eliminar el evento:', error)
  }
}

function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('es-ES', options).format(date)
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
  height: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
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
