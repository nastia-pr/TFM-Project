<template>
  <v-container class="account-container" fluid>
    <h1 class="account-title">Bienvenido a Tu Cuenta</h1>
    <p class="account-info">
      Aquí puedes gestionar tus eventos y crear nuevos.
    </p>

    <!-- Botón para crear un evento -->
    <v-btn
      color="primary"
      class="create-event-btn"
      @click="$router.push('/create-event')"
    >
      Crear un evento nuevo
    </v-btn>

    <!-- Instrucciones de cómo crear un evento -->
    <v-card class="instructions-card" outlined>
      <v-card-title class="instructions-title"
        >Cómo crear un evento</v-card-title
      >
      <v-card-text>
        <ul class="instructions-list">
          <li>
            <strong>Añade imágenes:</strong> Selecciona fotos que representen tu
            evento.
          </li>
          <li>
            <strong>Resumen del evento:</strong> Proporciona un título claro y
            un breve resumen.
          </li>
          <li>
            <strong>Fecha y lugar:</strong> Especifica la fecha, hora y
            ubicación del evento.
          </li>
          <li>
            <strong>Detalles adicionales:</strong> Agrega información sobre el
            organizador y si es un evento recurrente.
          </li>
          <li>
            <strong>Guarda y publica:</strong> Al final, guarda tu evento y
            publícalo.
          </li>
        </ul>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
defineOptions({
  name: 'AccountPage',
})
</script>

<style scoped>
.account-container {
  padding: 50px;
  text-align: center;
  background-color: #ebeaea;
}

.account-title {
  font-size: 2rem;
  margin-bottom: 16px;
  font-weight: bold;
  color: #3f51b5;
}

.account-info {
  font-size: 1.2rem;
  color: #757575;
  margin-bottom: 30px;
}

.create-event-btn {
  margin-top: 20px;
  margin-bottom: 40px;
  border-radius: 10px;
  padding: 12px 30px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

.instructions-card {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  text-align: left;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

.instructions-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #3f51b5;
  margin-bottom: 15px;
  text-align: center;
}

.instructions-list {
  list-style-type: none;
  padding: 0;
}

.instructions-list li {
  margin-bottom: 10px;
  font-size: 1.1rem;
  line-height: 1.6;
}
.instructions-list strong {
  color: #3f51b5;
}
</style>
