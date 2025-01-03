<template>
  <v-container class="create-event-container" fluid>
    <v-card class="create-event-card" outlined>
      <v-card-title class="text-center title"
        >Crea un Evento Nuevo</v-card-title
      >
      <v-card-text>
        <p class="subtitle">
          Añade todos los detalles de tu evento para que los asistentes sepan lo
          que les espera.
        </p>

        <!-- Sección para añadir imágenes -->
        <v-text-field
          v-model="imageUrl"
          prepend-icon="mdi-camera"
          label="Pega el enlace de la imagen"
          outlined
          dense
        ></v-text-field>
        <!-- Display the image if the URL is valid -->
        <v-img
          v-if="imageUrl"
          :src="imageUrl"
          alt="Image preview"
          height="200"
          contain
        ></v-img>

        <!-- Título y breve resumen del evento -->
        <v-text-field
          v-model="eventTitle"
          label="Título *"
          placeholder="Escribe un título claro para el evento"
          outlined
          dense
          required
        ></v-text-field>
        <v-textarea
          v-model="eventSummary"
          label="Resumen *"
          placeholder="Llama la atención con una breve descripción (máx 140 caracteres)"
          maxlength="150"
          outlined
          dense
          required
        ></v-textarea>

        <!-- Fecha y lugar del evento -->
        <v-row class="date-location">
          <v-col cols="12" md="6">
            <div class="mb-2 fechaLabel">Fecha *</div>
            <!-- Label -->
            <v-menu
              v-model="menu"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ props }">
                <div v-bind="props" class="date-activator" @click="menu = true">
                  {{ eventDateFormatted || 'Seleccionar fecha' }}
                </div>
              </template>
              <v-date-picker
                v-model="eventDate"
                @update:model-value="updateEventDate"
              ></v-date-picker>
            </v-menu>
          </v-col>
        </v-row>

        <!-- Ubicación del evento -->
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="eventCity"
              label="Ciudad *"
              placeholder="Introduce la ciudad"
              outlined
              dense
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="eventStreet"
              label="Calle *"
              placeholder="Introduce la calle"
              outlined
              dense
              required
            ></v-text-field>
          </v-col>
        </v-row>

        <!-- Categoría del evento -->
        <v-select
          v-model="eventCategory"
          :items="categories"
          label="Categoría *"
          placeholder="Selecciona una categoría"
          outlined
          dense
          required
        ></v-select>

        <!-- Sobre el evento -->
        <v-textarea
          v-model="eventDetails"
          label="Detalles adicionales"
          placeholder="Añade detalles adicionales que los asistentes deben conocer"
          outlined
          dense
        ></v-textarea>
      </v-card-text>

      <v-dialog v-model="dialogVisible" max-width="400px">
        <v-card>
          <v-card-title class="headline"
            >¡Evento creado exitosamente!</v-card-title
          >
          <v-card-actions>
            <v-btn @click="redirectToMyEvents">Ver mis eventos</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- Botón de guardar y publicar -->
      <v-card-actions class="justify-center">
        <v-btn @click="saveEvent"> Guardar y Publicar </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { useAccessTokenStore } from '@/store/index'
import { useEventsStore } from '@/store/index'

const eventDate = ref(null)
const eventTitle = ref('')
const eventSummary = ref('')
const eventCity = ref('')
const eventStreet = ref('')
const eventDetails = ref('')
const imageUrl = ref('')
const eventCategory = ref('')
const dialogVisible = ref(false)
const router = useRouter()

const menu = ref(false)
const eventDateFormatted = computed(() => {
  return eventDate.value
    ? new Date(eventDate.value).toLocaleDateString('es-ES')
    : ''
})

// Base URL del backend
const API_BASE_URL = import.meta.env.VITE_API_URL

const accessTokenStore = useAccessTokenStore()
const eventsStore = useEventsStore()

const categories = computed(() => eventsStore.categories)

async function saveEvent() {
  try {
    if (!accessTokenStore.accessToken) {
      alert('No estás autenticado. Por favor, inicia sesión.')
      return
    }

    const payload = {
      title: eventTitle.value,
      date: eventDate.value,
      location: `${eventStreet.value}, ${eventCity.value}`,
      description: eventSummary.value,
      eventDetails: eventDetails.value,
      image: imageUrl.value,
      category: eventCategory.value,
    }

    const response = await axios.post(`${API_BASE_URL}/events/`, payload, {
      headers: {
        Authorization: `Bearer ${accessTokenStore.accessToken}`,
      },
    })
    if (response.status === 201) {
      dialogVisible.value = true
    }
  } catch (error) {
    console.error('Error creating event:', error.response.data)
    alert('No se pudo crear el evento. Verifica los detalles.')
  }
  eventsStore.fetchEvents()
}

const redirectToMyEvents = () => {
  router.push({ name: 'my-events' })
}

function updateEventDate(date) {
  eventDate.value = date
  menu.value = false // Cierra el menú al seleccionar la fecha
}
</script>

<style scoped>
.create-event-container {
  padding: 20px;
  display: flex;
  justify-content: center;
  background-color: #ebeaea;
}

.create-event-card {
  max-width: 800px;
  padding: 20px;
  background-color: #f9f9f9;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.title {
  font-size: 1.8rem;
  margin-bottom: 10px;
  color: #3f51b5;
}

.subtitle {
  text-align: center;
  font-size: 1.2rem;
  color: #555;
  margin-bottom: 20px;
}

.date-location .v-col {
  margin-bottom: 16px;
}

.v-file-input,
.v-text-field,
.v-textarea,
.v-date-picker,
.v-time-picker {
  margin-bottom: 16px;
}

.v-checkbox {
  margin: 16px 0;
}

.map-section {
  margin-top: 20px;
}

.v-btn {
  font-size: 16px;
  text-transform: uppercase;
  font-weight: bold;
  background-color: #3f51b5;
  color: white;
}

.v-btn:hover {
  background-color: rgb(28, 133, 224);
}

.justify-center {
  margin-top: 20px;
}

.fechaLabel {
  font-size: 16px;
}

.date-activator {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  display: inline-block;
  text-align: center;
  background-color: #f9f9f9;
  transition: background-color 0.3s ease;
  font-size: 16px;
}
.date-activator:hover {
  background-color: #ececec;
}
</style>
