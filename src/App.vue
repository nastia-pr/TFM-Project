<template>
  <v-app>
    <v-app-bar app color="indigo" dark>
      <v-toolbar-title @click="goToHome" class="toolbar-title-link"
        >thriftHunter</v-toolbar-title
      >

      <v-spacer></v-spacer>
      <nav>
        <RouterLink to="/" class="nav-link">Encuentra Eventos</RouterLink>
        <template v-if="loggedIn">
          <RouterLink to="/account-create-event" class="nav-link"
            >Crea un evento nuevo</RouterLink
          >
          <RouterLink to="/my-events" class="nav-link"
            >Ver todos mis eventos</RouterLink
          >
          <a href="#" @click.prevent="loggedIn = false" class="nav-link"
            >Log Out</a
          >
        </template>
        <template v-else>
          <RouterLink to="/create-event" class="nav-link"
            >Crea tu Evento</RouterLink
          >
          <RouterLink to="/login" class="nav-link">Log In</RouterLink>
        </template>
      </nav>
    </v-app-bar>

    <v-main>
      <RouterView @login-success="handleLoginSuccess" />
    </v-main>

    <v-footer color="indigo darken-3">
      <v-container>
        <v-row align="center" justify="space-between">
          <v-col class="text-left">
            <p>thriftHunter</p>
            <p>
              Contact:
              <a href="mailto:info@thriftHunter.com" class="footer-link"
                >info@thriftHunter.com</a
              >
            </p>
          </v-col>

          <v-col class="text-center">
            <div class="footer-links">
              <RouterLink to="/" class="nav-link">Encuentra Eventos</RouterLink>
              <template v-if="loggedIn">
                <RouterLink to="/account-create-event" class="nav-link"
                  >Crea un evento nuevo</RouterLink
                >
                <RouterLink to="/my-events" class="nav-link"
                  >Ver todos mis eventos</RouterLink
                >
                <a href="#" @click.prevent="loggedIn = false" class="nav-link"
                  >Log Out</a
                >
              </template>
              <template v-else>
                <RouterLink to="/create-event" class="nav-link"
                  >Crea tu Evento</RouterLink
                >
                <RouterLink to="/login" class="nav-link">Log In</RouterLink>
              </template>
            </div>
          </v-col>

          <v-col class="text-right">
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

        <v-row justify="center">
          <v-col class="text-center">
            <p>
              &copy; {{ new Date().getFullYear() }} thriftHunter. All rights
              reserved.
            </p>
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

.nav-link:hover {
  color: #ffcc00;
  transform: scale(1.1);
}

.nav-link:hover::after {
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
</style>

<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { ref } from 'vue'

const router = useRouter() // Access the router instance
const loggedIn = ref(false)

const goToHome = () => {
  router.push({ name: 'home' }) // Navigate to the Home page route by name
}

const handleLoginSuccess = () => {
  loggedIn.value = true // Set logged in status to true
}

const currentYear = ref(new Date().getFullYear())
</script>
