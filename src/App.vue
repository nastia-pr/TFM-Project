<template>
  <v-app>
    <v-app-bar app color="indigo" dark>
      <v-toolbar-title @click="goToHome" class="toolbar-title-link">
        thriftHunter
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <!-- Menú para pantallas grandes -->
      <nav class="d-none d-sm-flex">
        <RouterLink to="/" class="nav-link" active-class="nav-link-active">
          Encuentra Eventos
        </RouterLink>
        <template v-if="loggedIn">
          <RouterLink
            to="/create-event"
            class="nav-link"
            active-class="nav-link-active"
            >Crear Evento</RouterLink
          >
          <RouterLink
            to="/my-events"
            class="nav-link"
            active-class="nav-link-active"
            >Ver mis eventos</RouterLink
          >
          <a href="#" @click.prevent="logout" class="nav-link">Log Out</a>
        </template>
        <template v-else>
          <RouterLink
            to="/advantage-sign-in"
            class="nav-link"
            active-class="nav-link-active"
            >Crea tu Evento</RouterLink
          >
          <RouterLink
            to="/login"
            class="nav-link"
            active-class="nav-link-active"
            >Log In</RouterLink
          >
        </template>
      </nav>

      <!-- Menú para pantallas pequeñas -->
      <v-menu v-if="!isDesktop" offset-y>
        <template #activator="{ props }">
          <v-btn v-bind="props" icon>
            <v-icon>mdi-menu</v-icon>
          </v-btn>
        </template>

        <v-list class="mobile-menu-list">
          <v-list-item>
            <RouterLink to="/" class="nav-link mobile"
              >Encuentra Eventos</RouterLink
            >
          </v-list-item>

          <template v-if="loggedIn">
            <v-list-item>
              <RouterLink to="/create-event" class="nav-link mobile"
                >Crear Evento</RouterLink
              >
            </v-list-item>
            <v-list-item>
              <RouterLink to="/my-events" class="nav-link mobile"
                >Ver mis eventos</RouterLink
              >
            </v-list-item>
            <v-list-item>
              <a href="#" @click.prevent="logout" class="nav-link mobile"
                >Log Out</a
              >
            </v-list-item>
          </template>

          <template v-else>
            <v-list-item>
              <RouterLink to="/advantage-sign-in" class="nav-link mobile"
                >Crea tu Evento</RouterLink
              >
            </v-list-item>
            <v-list-item>
              <RouterLink to="/login" class="nav-link mobile"
                >Log In</RouterLink
              >
            </v-list-item>
          </template>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-main>
      <RouterView @login-success="handleLoginSuccess" />
    </v-main>

    <v-footer color="indigo darken-3">
      <v-container>
        <v-row align="center" justify="space-between">
          <!-- Left Section -->
          <v-col class="text-center" cols="12" sm="4" md="3">
            <p>thriftHunter</p>
            <p>
              Contact:
              <a href="mailto:info@thriftHunter.com" class="email-link"
                >info@thriftHunter.com</a
              >
            </p>
          </v-col>

          <!-- Center Section with links -->
          <v-col class="text-center" cols="12" sm="4" md="5">
            <div class="footer-links">
              <RouterLink to="/" class="nav-link">Encuentra Eventos</RouterLink>
              <template v-if="loggedIn">
                <RouterLink to="/create-event" class="nav-link"
                  >Crea un evento nuevo</RouterLink
                >
                <RouterLink to="/my-events" class="nav-link"
                  >Ver todos mis eventos</RouterLink
                >
                <a href="#" @click.prevent="logout" class="nav-link">Log Out</a>
              </template>
              <template v-else>
                <RouterLink to="/advantage-sign-in" class="nav-link"
                  >Crea tu Evento</RouterLink
                >
                <RouterLink to="/login" class="nav-link">Log In</RouterLink>
              </template>
            </div>
          </v-col>

          <!-- Right Section with social icons -->
          <v-col class="text-right" cols="12" sm="4" md="3">
            <a
              href="https://www.facebook.com"
              target="_blank"
              class="social-icon"
            >
              <v-icon small>mdi-facebook</v-icon>
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              class="social-icon"
            >
              <v-icon small>mdi-instagram</v-icon>
            </a>
            <a href="https://twitter.com" target="_blank" class="social-icon">
              <v-icon small>mdi-twitter</v-icon>
            </a>
          </v-col>
        </v-row>

        <!-- Footer bottom section -->
        <v-row justify="center">
          <v-col class="text-center" cols="12">
            <p>&copy; {{ currentYear }} thriftHunter. All rights reserved.</p>
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
  </v-app>
</template>

<style scoped>
.toolbar-title-link {
  cursor: pointer;
  color: inherit;
  transition: color 0.3s ease;
  text-decoration: none;
}

.toolbar-title-link:hover {
  color: #f1f3e2;
}
.nav-link {
  color: white;
  margin: 0 15px;
  text-decoration: none;
  position: relative;
  transition:
    color 0.3s ease,
    transform 0.3s ease;
}

.nav-link.mobile {
  color: #303f9f;
  font-size: 1.2rem; /* Larger font size */
  padding: 15px 20px;
}

.nav-link::after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: -5px;
  width: 0;
  height: 2px;
  background: white;
  transition:
    width 0.3s ease,
    left 0.3s ease;
}

.nav-link:hover,
.nav-link-active {
  color: #ffcc00;
  transform: scale(1.1);
}

.nav-link:hover::after,
.nav-link-active::after {
  width: 100%;
  left: 0;
}

.social-icon {
  color: white;
  font-size: 18px;
  margin: 0 10px;
}

.social-icon:hover {
  color: #ffcc00;
}

.footer-links {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px; /* Optional: center the links horizontally */
}

.email-link {
  color: white;
}
</style>

<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { ref, computed, onMounted } from 'vue'

const router = useRouter()
const loggedIn = ref(false)
const isDesktop = ref(true)

// Detectar el tamaño de la ventana
const updateWindowSize = () => {
  isDesktop.value = window.innerWidth >= 600 // Tamaño de pantalla para considerar escritorio
}

onMounted(() => {
  updateWindowSize()
  window.addEventListener('resize', updateWindowSize) // Actualiza cuando se cambia el tamaño
})

const goToHome = () => {
  router.push({ name: 'home' })
}

const handleLoginSuccess = () => {
  loggedIn.value = true
}

const logout = () => {
  loggedIn.value = false
  router.push({ name: 'home' })
}

const currentYear = ref(new Date().getFullYear())
</script>
