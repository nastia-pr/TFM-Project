<template>
  <v-main>
    <!-- Top Image Banner -->
    <v-container fluid class="banner-container">
      <v-img
        src="/images/secondhand.avif"
        alt="Landing Page Banner"
        height="300px"
        cover
      ></v-img>
    </v-container>

    <!-- Filter Options -->
    <v-container class="filter-container">
      <v-row align="center" justify="space-between">
        <v-text-field
          v-model="searchQuery"
          label="Search Events"
          outlined
          hide-details
          class="filter-input"
        />
        <v-select
          v-model="selectedCategory"
          :items="categories"
          label="Category"
          outlined
          hide-details
          class="filter-input"
        />
        <v-select
          v-model="selectedLocation"
          :items="locations"
          label="Location"
          outlined
          hide-details
          class="filter-input"
        />
        <v-text-field
          v-model="selectedDate"
          label="Event Date"
          outlined
          hide-details
          type="date"
          class="filter-input"
        />
        <v-btn color="primary" @click="applyFilters">Apply Filters</v-btn>
      </v-row>
    </v-container>

    <!-- Event Cards -->
    <v-container>
      <v-row>
        <v-col v-for="event in filteredEvents" :key="event.id" cols="12" md="4">
          <v-card>
            <v-img :src="event.image" height="200px"></v-img>
            <v-card-title>{{ event.title }}</v-card-title>
            <v-card-subtitle>{{ event.date }}</v-card-subtitle>
            <v-card-text>{{ event.description }}</v-card-text>
            <v-card-actions>
              <v-btn :to="{ name: 'event-details', params: { id: event.id } }"
                >View Details</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script setup>
import { ref, computed } from 'vue'

const searchQuery = ref('')
const selectedCategory = ref(null)
const selectedLocation = ref(null)
const selectedDate = ref(null)
const categories = ['Music', 'Sports', 'Art', 'Tech'] // Sample categories
const locations = ['New York', 'Los Angeles', 'Chicago', 'San Francisco']
const events = ref([
  {
    id: 1,
    title: 'Music Festival',
    date: '2024-11-01',
    location: 'New York',
    category: 'Music',
    image: '/images/image1.avif',
    description: 'Join us for an unforgettable music experience.',
  },
  {
    id: 2,
    title: 'Tech Conference',
    date: '2024-11-15',
    category: 'Tech',
    location: 'San Francisco',
    image: 'image2.jpg',
    description: 'Latest trends in technology.',
  },
  {
    id: 3,
    title: 'Music Event',
    date: '2024-11-15',
    category: 'Music',
    location: 'Los Angeles',
    image: 'image2.jpg',
    description: 'Latest trends in technology.',
  },
  {
    id: 4,
    title: 'Art Conference',
    date: '2024-11-15',
    category: 'Art',
    location: 'San Francisco',
    image: 'image2.jpg',
    description: 'Latest trends in technology.',
  },
  // Add more event objects here
])

const filteredEvents = computed(() => {
  return events.value.filter((event) => {
    const matchesQuery = event.title
      .toLowerCase()
      .includes(searchQuery.value.toLowerCase())
    const matchesCategory =
      !selectedCategory.value || event.category === selectedCategory.value
    const matchesLocation =
      !selectedLocation.value || event.location === selectedLocation.value
    const matchesDate = !selectedDate.value || event.date === selectedDate.value
    return matchesQuery && matchesCategory && matchesLocation && matchesDate
  })
})

function applyFilters() {
  // Optional: Add additional filter logic here if needed
}
</script>

<style scoped>
.banner-container {
  margin-bottom: 20px;
}

.filter-container {
  padding: 20px 0;
}

.filter-input {
  max-width: 200px;
}
</style>
