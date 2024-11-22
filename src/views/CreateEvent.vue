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
        <v-file-input
          prepend-icon="mdi-camera"
          label="Añade imágenes"
          accept="image/*"
          multiple
          outlined
          dense
        ></v-file-input>

        <!-- Resumen del evento -->
        <v-text-field
          label="Título *"
          placeholder="Escribe un título claro para el evento"
          outlined
          dense
          required
        ></v-text-field>
        <v-textarea
          label="Resumen *"
          placeholder="Llama la atención con una breve descripción (máx 140 caracteres)"
          maxlength="140"
          outlined
          dense
          required
        ></v-textarea>

        <!-- Fecha y lugar del evento -->
        <v-row class="date-location">
          <v-col cols="12" md="6">
            <v-date-picker
              label="Fecha *"
              v-model="eventDate"
              outlined
              dense
            ></v-date-picker>
          </v-col>
          <v-col cols="6" md="3">
            <v-time-picker
              label="Desde"
              v-model="startTime"
              format="24hr"
              outlined
              dense
            ></v-time-picker>
          </v-col>
          <v-col cols="6" md="3">
            <v-time-picker
              label="Hasta"
              v-model="endTime"
              format="24hr"
              outlined
              dense
            ></v-time-picker>
          </v-col>
        </v-row>

        <!-- Ubicación del evento -->
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              label="Ciudad *"
              placeholder="Introduce la ciudad"
              outlined
              dense
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              label="Calle *"
              placeholder="Introduce la calle"
              outlined
              dense
              required
            ></v-text-field>
          </v-col>
        </v-row>

        <!-- Sobre el evento -->
        <v-text-field
          label="Organizado por"
          placeholder="Nombre del organizador"
          outlined
          dense
        ></v-text-field>
        <v-checkbox
          v-model="isRecurring"
          label="¿Es un evento recurrente?"
        ></v-checkbox>
        <v-textarea
          label="Detalles adicionales"
          placeholder="Añade detalles adicionales que los asistentes deben conocer"
          outlined
          dense
        ></v-textarea>
      </v-card-text>

      <!-- Botón de guardar y publicar -->
      <v-card-actions class="justify-center">
        <v-btn color="primary" @click="saveEvent"> Guardar y Publicar </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'

const eventDate = ref(null)
const startTime = ref(null)
const endTime = ref(null)
const isRecurring = ref(false)

function saveEvent() {
  // Logic to save and publish the event
  console.log('Event saved')
}
</script>

<style scoped>
.create-event-container {
  padding: 20px;
  display: flex;
  justify-content: center;
}

.create-event-card {
  max-width: 800px;
  padding: 20px;
  background-color: #f9f9f9;
}

.title {
  font-size: 1.8rem;
  margin-bottom: 10px;
}

.subtitle {
  text-align: center;
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 20px;
}

.date-location {
  margin-top: 20px;
}
</style>
