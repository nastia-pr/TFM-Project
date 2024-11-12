<template>
  <v-app>
    <v-app-bar app color="indigo" dark>
      <v-toolbar-title>thriftHunter</v-toolbar-title>

      <v-spacer></v-spacer>
      <nav>
        <RouterLink to="/" class="nav-link">Encuentra Eventos</RouterLink>
        <RouterLink to="/create-event" class="nav-link"
          >Crea tu Evento</RouterLink
        >
      </nav>
    </v-app-bar>

    <v-main>
      <RouterView />
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
            <RouterLink to="/" class="nav-link">Encuentra Eventos</RouterLink>
            <RouterLink to="/create-event" class="nav-link"
              >Crea tu Evento</RouterLink
            >
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

.footer-link {
  color: white;
}

.footer-link:hover {
  color: #ffcc00;
}
</style>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { ref } from 'vue'

const currentYear = ref(new Date().getFullYear())
</script>
