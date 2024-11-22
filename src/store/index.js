import { defineStore } from 'pinia'

export const useEventsStore = defineStore('events', {
  state: () => ({
    events: [
      {
        id: 1,
        title: 'Mercadillo de ropa usada',
        date: '2024-11-01',
        location: 'Madrid',
        category: 'Ropa',
        image: '/images/event1.avif',
        description: 'Explora prendas únicas a precios increíbles.',
        organizer: 'Organizador 1', // Información del organizador
        eventDetails:
          'Este es un evento de ropa usada donde podrás encontrar una variedad de prendas a precios accesibles.', // Detalles del evento
      },
      {
        id: 2,
        title: 'Mercadillo de cámaras analógicas',
        date: '2024-11-10',
        category: 'Tecnología',
        location: 'Barcelona',
        image: '/images/event2.avif',
        description: 'Ofertas en dispositivos analógicos de segunda mano.',
        organizer: 'Organizador 2',
        eventDetails:
          'En este evento podrás adquirir cámaras analógicas, una oportunidad única para los amantes de la fotografía vintage.',
      },
      {
        id: 3,
        title: 'Mercado de muebles vintage',
        date: '2024-12-15',
        category: 'Muebles',
        location: 'Valencia',
        image: '/images/event3.avif',
        description: 'Encuentra muebles clásicos perfectos para tu hogar.',
        organizer: 'Organizador 3',
        eventDetails:
          'En este evento podrás adquirir cámaras analógicas, una oportunidad única para los amantes de la fotografía vintage.',
      },
      {
        id: 4,
        title: 'Feria de intercambio',
        date: '2024-12-20',
        category: 'Varios',
        location: 'Sevilla',
        image: '/images/event4.avif',
        description: 'Cambia lo que ya no necesitas por algo nuevo.',
        organizer: 'Organizador 4',
        eventDetails:
          'En este evento podrás adquirir cámaras analógicas, una oportunidad única para los amantes de la fotografía vintage.',
      },
    ],
  }),
  getters: {
    // Obtener todos los eventos
    allEvents: (state) => state.events,
    // Obtener un evento por ID
    getEventById: (state) => (id) => {
      return state.events.find((event) => event.id === id)
    },
  },
  actions: {
    // Puedes añadir acciones si necesitas modificar el estado, como agregar un evento o actualizarlo
    addEvent(event) {
      this.events.push(event)
    },
  },
})
