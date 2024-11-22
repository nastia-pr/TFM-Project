<template>
  <v-main>
    <!-- Top Image Banner -->
    <v-container fluid class="banner-container">
      <v-img
        src="/images/banner-img.avif"
        alt="Landing Page Banner"
        height="400px"
        cover
      ></v-img>
    </v-container>

    <!-- Title Below the Image -->
    <v-container class="text-center mt-4">
      <h2 class="title">Próximos eventos</h2>
    </v-container>

    <!-- Filter Options -->
    <v-container class="filter-container">
      <v-row align="center" justify="space-between">
        <v-col cols="12">
          <v-text-field
            v-model="searchQuery"
            label="Buscar eventos"
            outlined
            hide-details
            class="filter-input"
          />
        </v-col>

        <v-col cols="12" md="6">
          <v-select
            v-model="selectedCategory"
            :items="categories"
            label="Categoría"
            outlined
            hide-details
            class="filter-input"
          />
        </v-col>

        <v-col cols="12" md="6">
          <v-select
            v-model="selectedLocation"
            :items="locations"
            label="Ubicación"
            outlined
            hide-details
            class="filter-input"
          />
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field
            v-model="startDate"
            label="Fecha de inicio"
            outlined
            hide-details
            type="date"
            class="filter-input"
          />
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field
            v-model="endDate"
            label="Fecha de fin"
            outlined
            hide-details
            type="date"
            class="filter-input"
          />
        </v-col>
      </v-row>
    </v-container>

    <!-- Reset Filter Button -->
    <v-container class="button-container text-center">
      <v-btn color="secondary" class="mx-2" @click="resetFilters">
        Restablecer filtros
      </v-btn>
    </v-container>

    <!-- Event Cards -->
    <v-container>
      <v-row>
        <v-col
          v-for="event in filteredEvents"
          :key="event.id"
          cols="12"
          md="4"
          class="d-flex"
        >
          <v-card class="event-card d-flex flex-column">
            <v-img :src="event.image" height="300px" class="card-image"></v-img>
            <v-card-title class="text-center">{{ event.title }}</v-card-title>
            <v-card-subtitle class="text-center">
              <div class="d-flex justify-center">
                <v-icon>mdi-calendar</v-icon>
                <span>{{ event.date }}</span>
              </div></v-card-subtitle
            >

            <!-- Event Information -->
            <v-card-text class="text-center">
              <div class="d-flex justify-center">
                <v-icon>mdi-map-marker</v-icon>
                <span>{{ event.location }}</span>
              </div>
              <div class="d-flex justify-center mt-2">
                <v-icon>mdi-tag</v-icon>
                <span>{{ event.category }}</span>
              </div>
              <div class="d-flex justify-center mt-2">
                <v-icon>mdi-information-outline</v-icon>
                <span>{{ event.description }}</span>
              </div>
            </v-card-text>

            <!-- Event Actions -->
            <v-card-actions class="d-flex justify-center mt-auto">
              <v-btn
                :to="{ name: 'event-details', params: { id: event.id } }"
                class="btn-details"
                elevation="2"
                rounded
                text-uppercase
              >
                Ver detalles
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useEventsStore } from '@/store/index'

// Datos para los filtros
const searchQuery = ref('')
const selectedCategory = ref(null)
const selectedLocation = ref(null)
const startDate = ref('')
const endDate = ref('')

// Categorías relacionadas con eventos de segunda mano
const categories = ['Ropa', 'Muebles', 'Tecnología', 'Varios']
const locations = ['Madrid', 'Barcelona', 'Sevilla', 'Valencia']

// Accedemos al store de eventos
const eventsStore = useEventsStore()

// Filtramos los eventos desde el store
const filteredEvents = computed(() => {
  return eventsStore.allEvents.filter((event) => {
    // Filtrar por título
    const matchesQuery = event.title
      .toLowerCase()
      .includes(searchQuery.value.toLowerCase())

    // Filtrar por categoría
    const matchesCategory =
      !selectedCategory.value || event.category === selectedCategory.value

    // Filtrar por ubicación
    const matchesLocation =
      !selectedLocation.value || event.location === selectedLocation.value

    // Filtrar por rango de fechas (inicio y fin)
    const eventDate = new Date(event.date)
    const start = startDate.value ? new Date(startDate.value) : null
    const end = endDate.value ? new Date(endDate.value) : null

    const matchesDate =
      (!start || eventDate >= start) && (!end || eventDate <= end)

    return matchesQuery && matchesCategory && matchesLocation && matchesDate
  })
})

// Restablece los filtros
function resetFilters() {
  searchQuery.value = ''
  selectedCategory.value = null
  selectedLocation.value = null
  startDate.value = ''
  endDate.value = ''
}
</script>

<style scoped>
.v-main {
  padding-top: 10px;
  padding-bottom: 50px;
}

.title {
  font-size: 3rem;
  font-weight: bold;
  color: #333;
}

.event-card {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
}

.card-image {
  border-bottom: 2px solid #f5f5f5;
}

.btn-details {
  font-weight: bold;
  padding: 10px 20px;
  background: linear-gradient(135deg, #ff8a65, #ff5252);
  color: #fff;
  transition: transform 0.2s;
}

.btn-details:hover {
  transform: scale(1.05);
}
</style>
