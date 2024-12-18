<template>
  <v-container class="register-container" fluid>
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-card class="elevation-10 register-card">
          <v-card-title class="text-center">
            <span class="headline font-weight-bold">Crear una cuenta</span>
          </v-card-title>

          <v-card-subtitle class="text-center">
            <p class="subheading">Completa los campos para crear tu cuenta</p>
          </v-card-subtitle>

          <v-form v-model="valid" @submit.prevent="submitRegister">
            <v-text-field
              v-model="username"
              label="Nombre de usuario"
              :prepend-icon="isMobile ? '' : 'mdi-account'"
              :rules="[(v) => !!v || 'El nombre de usuario es requerido']"
              required
              class="custom-input"
            ></v-text-field>

            <v-text-field
              v-model="email"
              label="Correo electrónico"
              :prepend-icon="isMobile ? '' : 'mdi-email'"
              :rules="[
                (v) => !!v || 'El correo electrónico es requerido',
                (v) => /.+@.+\..+/.test(v) || 'El correo no es válido',
              ]"
              required
              class="custom-input"
            ></v-text-field>

            <v-text-field
              v-model="password"
              label="Contraseña"
              :type="showPassword.password ? 'text' : 'password'"
              :prepend-icon="isMobile ? '' : 'mdi-lock'"
              :rules="[(v) => !!v || 'La contraseña es requerida']"
              required
              class="custom-input"
            >
              <template #append>
                <v-icon
                  @click="togglePasswordVisibility('password')"
                  class="show-password-icon"
                >
                  {{ showPassword.password ? 'mdi-eye-off' : 'mdi-eye' }}
                </v-icon>
              </template>
            </v-text-field>

            <v-text-field
              v-model="confirmPassword"
              label="Confirmar contraseña"
              :type="showPassword.confirm ? 'text' : 'password'"
              :prepend-icon="isMobile ? '' : 'mdi-lock'"
              :rules="[(v) => v === password || 'Las contraseñas no coinciden']"
              required
              class="custom-input"
            >
              <template #append>
                <v-icon
                  @click="togglePasswordVisibility('confirm')"
                  class="show-password-icon"
                >
                  {{ showPassword.confirm ? 'mdi-eye-off' : 'mdi-eye' }}
                </v-icon>
              </template>
            </v-text-field>

            <v-btn
              :disabled="!valid"
              color="primary"
              block
              @click="submitRegister"
              class="custom-btn"
            >
              Crear cuenta
            </v-btn>

            <a href="#" @click.prevent="goToLogin" class="custom-btn-link">
              ¿Ya tienes cuenta? Inicia sesión
            </a>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Reactive state variables
const username = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const valid = ref(false)
const isMobile = ref(false)
const showPassword = ref({
  password: false,
  confirm: false,
})

const checkMobile = () => {
  isMobile.value = window.innerWidth <= 600
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})

function submitRegister() {
  console.log(
    'Creating account with:',
    username.value,
    email.value,
    password.value
  )
}

function goToLogin() {
  router.push({ name: 'login' })
}

function togglePasswordVisibility(field) {
  showPassword.value[field] = !showPassword.value[field]
}
</script>

<style scoped>
.register-container {
  padding: 40px;
  background-color: #f7f9fc;
}

.v-card {
  padding: 40px;
  border-radius: 16px;
}

.v-card-title {
  font-weight: bold;
}

.v-card-subtitle {
  color: #666;
  margin-bottom: 20px;
}

.custom-input {
  margin-bottom: 20px;
}

.custom-btn {
  margin-top: 20px;
  background-color: #42a5f5;
  color: white;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.custom-btn:hover {
  background-color: #1e88e5;
}

.custom-btn-link {
  display: block;
  text-align: center;
  margin-top: 15px;
  color: #1976d2;
  font-weight: 500;
  transition: color 0.3s ease;
  text-decoration: none;
}

.custom-btn-link:hover {
  color: #0d47a1;
}

.register-card {
  background-color: #ffffff;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.v-card-title,
.v-card-subtitle {
  margin-bottom: 16px;
}

.v-row {
  margin-top: 30px;
}
</style>
