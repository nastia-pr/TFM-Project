<template>
  <v-container class="login-container" fluid>
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-card class="elevation-10 login-card">
          <v-card-title class="text-center">
            <span class="headline font-weight-bold">Iniciar sesión</span>
          </v-card-title>

          <v-card-subtitle class="text-center">
            <p class="subheading">
              Bienvenido, por favor ingresa tus datos para continuar.
            </p>
          </v-card-subtitle>

          <v-form v-model="valid" @submit.prevent="submitLogin">
            <v-text-field
              v-model="username"
              label="Nombre de usuario"
              prepend-icon="mdi-account"
              :rules="[(v) => !!v || 'El nombre de usuario es requerido']"
              required
              class="custom-input"
            ></v-text-field>

            <v-text-field
              v-model="password"
              label="Contraseña"
              type="password"
              prepend-icon="mdi-lock"
              :rules="[(v) => !!v || 'La contraseña es requerida']"
              required
              class="custom-input"
            ></v-text-field>

            <!-- Enlace para Olvidaste tu contraseña -->
            <a
              href="#"
              @click.prevent="goToForgotPassword"
              class="forgot-password-link"
            >
              ¿Olvidaste tu contraseña?
            </a>

            <v-btn
              :disabled="!valid"
              color="primary"
              block
              @click="submitLogin"
              class="custom-btn"
            >
              Iniciar sesión
            </v-btn>

            <a
              href="#"
              @click.prevent="goToCreateAccount"
              class="custom-btn-link"
            >
              ¿No tienes cuenta? Regístrate
            </a>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Reactive state variables
const username = ref('')
const password = ref('')
const valid = ref(false)

// Methods
function submitLogin() {
  const hardcodedUsername = 'user'
  const hardcodedPassword = 'password123'

  if (
    username.value === hardcodedUsername &&
    password.value === hardcodedPassword
  ) {
    // Emit the login-success event
    const emit = defineEmits(['login-success'])
    emit('login-success')

    // Navigate to the account page if credentials match
    router.push({ name: 'account-welcome' })
  } else {
    alert('Invalid credentials. Please try again.')
  }
}

function goToCreateAccount() {
  router.push({ name: 'create-account' })
}
</script>

<style scoped>
.login-container {
  padding: 50px;
  background-color: #f7f9fc; /* Fondo claro */
}

.v-card {
  padding: 40px;
  border-radius: 16px;
}

.v-card-title {
  font-weight: bold;
  margin-bottom: 16px;
}

.v-card-subtitle {
  color: #666;
  margin-bottom: 30px;
}

.custom-input {
  margin-bottom: 20px; /* Espaciado entre los campos */
}

.custom-btn {
  margin-top: 20px;
  background-color: #42a5f5; /* Azul claro */
  color: white;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.custom-btn:hover {
  background-color: #1e88e5; /* Azul más oscuro en hover */
}

.custom-btn-link {
  display: block;
  text-align: center;
  margin-top: 15px;
  color: #1976d2; /* Azul oscuro */
  font-weight: 500;
  transition: color 0.3s ease;
  text-decoration: none;
}

.forgot-password-link {
  color: #1976d2; /* Azul oscuro */
  font-weight: 500;
  transition: color 0.3s ease;
  text-decoration: none;
}

.forgot-password-link:hover {
  color: #0d47a1; /* Azul aún más oscuro en hover */
}

.custom-btn-link:hover {
  color: #0d47a1; /* Azul aún más oscuro en hover */
}

.login-card {
  background-color: #ffffff;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.v-row {
  margin-top: 30px;
}
</style>
