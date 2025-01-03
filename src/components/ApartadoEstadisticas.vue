<template>
  <div class="stats-sidebar">
    <h2>Estadísticas (leaderboard)</h2>
    <p>Puntaje: {{ puntaje.toFixed(5) }}</p>
    <p>Total de clics: {{ totalClicks }}</p>
    <p>Total histórico de ratas aniquiladas: {{ totalRatasHistoricas.toFixed(5) }}</p>
  </div>
</template>

<script>
export default {
  name: "ApartadoEstadisticas",
  props: {
    puntaje: {
      type: Number,
      required: true,
    },
    totalClicks: {
      type: Number,
      required: true,
    },
    totalRatasHistoricas: {
      type: Number,
      required: true,
    },
  },
};
</script>
