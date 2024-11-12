<template>
  <v-container>
    <v-card>
      <v-card-title>{{ event.title }}</v-card-title>
      <v-card-subtitle>{{ event.date }} | {{ event.location }}</v-card-subtitle>
      <v-card-text>
        <img :src="event.image" alt="Event Image" class="event-image" />
        <p>{{ event.description }}</p>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="$router.push('/')">Back to Events</v-btn>
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
  // Assuming events are stored globally or fetched from an API
  const eventId = route.params.id
  // Replace with your event fetching logic
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
    // Add more events as needed
  ]

  // Find the event by ID
  event.value = events.find((e) => e.id === Number(eventId))
})
</script>

<style scoped>
.event-image {
  max-width: 100%;
  height: auto;
}
</style>
