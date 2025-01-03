<template>
  <div class="stats-sidebar">
    <h2>Estadísticas</h2>
    <p>Total de clics: {{ totalClicks }}</p>
    <p>Total histórico de ratas aniquiladas: {{ totalRatasHistoricas.toFixed(1) }}</p>
    <p>Incremento por clic: +{{ incrementoPorClic.toFixed(1) }}</p>
    <p>Ratas por segundo: +{{ ratasPorSegundo.toFixed(1) }}</p>
    <p>Gatos pequeños comprados: {{ gatos }}</p>
    <p>Gatos guatones comprados: {{ gatosGuatones }}</p>
  </div>
</template>

<script>
export default {
  props: {
    puntaje: Number,
    gatos: Number,
    gatosGuatones: Number,
    totalClicks: Number,
    totalRatasHistoricas: Number,
    incrementoPorClic: Number,
    ratasPorSegundo: Number,
  },
};
</script>

<style>
/* Mantén el diseño del sidebar de estadísticas */
.stats-sidebar {
  flex: 1;
  background-color: #f4f4f4;
  padding: 20px;
  border-radius: 10px;
}
</style>
