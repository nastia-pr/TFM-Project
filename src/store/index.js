import { defineStore } from 'pinia'
import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL

export const useEventsStore = defineStore('events', {
  state: () => ({
    events: [],
    categories: [
      'Ropa y Accesorios',
      'Muebles y Decoración',
      'Tecnología',
      'Electrodomésticos',
      'Libros y Papelería',
      'Arte y Antigüedades',
      'Varios',
    ],
  }),
  getters: {
    // Obtener todos los eventos
    allEvents: (state) => state.events,
    // Obtener un evento por ID
    getEventById: (state) => (id) => {
      return state.events.find((event) => event.id === id)
    },
    // Obtener ubicaciones únicas (ciudades)
    uniqueLocations: (state) => {
      const cities = state.events.map((event) => {
        const parts = event.location.split(',')
        return parts[parts.length - 1].trim() // Get the last part and trim any whitespace
      })
      return [...new Set(cities)] // Return unique cities
    },
  },
  actions: {
    async fetchEvents() {
      try {
        const data = await axios.get(`${API_BASE_URL}/events/`)
        this.events = data.data
      } catch (error) {
        alert(error)
        console.log(error)
      }
    },
    // Puedes añadir acciones si necesitas modificar el estado, como agregar un evento o actualizarlo
    addEvent(event) {
      this.events.push(event)
    },
  },
})

export const useAccessTokenStore = defineStore('accessToken', {
  state: () => ({
    accessToken: localStorage.getItem('accessToken') || null,
    loggedIn: !!localStorage.getItem('accessToken'),
  }),
  getters: {
    AccessToken: (state) => state.accessToken,
    isLoggedIn: (state) => state.loggedIn,
  },
  actions: {
    async pingLogin() {
      try {
        const response = await axios.get(`${API_BASE_URL}/logged_in_as/`, {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
        })
      } catch (error) {
        localStorage.removeItem('accessToken')
        this.accessToken = null
        this.isLoggedIn = false

        alert('Session expired. Please log in again.')
        console.log(error)
      }
    },

    setAccessToken(token) {
      if (token && typeof token === 'string') {
        this.accessToken = token
        this.loggedIn = true
        localStorage.setItem('accessToken', token)
      } else {
        console.error('Invalid token')
      }
    },
    logout() {
      this.accessToken = null
      this.loggedIn = false
      localStorage.removeItem('accessToken')
    },
  },
})
