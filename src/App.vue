<template>
  <div id="app">
    <h1>¡Aniquila a las Ratas Malvadas!</h1>
    <div class="container">
      <!-- Sección principal del juego -->
      <div class="main">
        <div class="stats">
          <p>Puntaje: {{ puntaje.toFixed(5) }}</p>
          <p>Gatos pequeños: {{ gatos }}</p>
          <p>Gatos guatones: {{ gatosGuatones }}</p>
          <p>Gatos Huevo: {{ gatosHuevo }}</p>
        </div>

        <div class="game">
          <!-- Imagen de la Rata, con evento de clic -->
          <img
            :src="rataImg"
            alt="Rata"
            class="rata"
            @click="clickear"
          />
        </div>

        <div class="upgrades">
          <button :disabled="puntaje < 10" @click="comprarGato">
            Comprar Gato Pequeño (10 puntos)
          </button>
          <button :disabled="puntaje < 50" @click="comprarGatoGuaton">
            Comprar Gato Guatón (50 puntos)
          </button>
          <button :disabled="puntaje < 100" @click="comprarGatoHuevo">
            Comprar Gato Huevo (100 puntos)
          </button>
        </div>

        <div class="gatos">
          <!-- Muestra todos los gatos comprados -->
          <div
            v-for="gato in gatosComprados"
            :key="gato.id"
            class="gato-container"
          >
            <img :src="gato.src" alt="Gato" class="gato" />
          </div>
        </div>

        <button class="reset-button" @click="reiniciarPartida">
          Reiniciar partida
        </button>
      </div>

      <!-- Apartado de estadísticas -->
      <div class="stats-sidebar">
        <h2>Estadísticas</h2>
        <p>Total de clics: {{ totalClicks }}</p>
        <p>Total histórico de ratas aniquiladas: {{ totalRatasHistoricas.toFixed(5) }}</p>
        <p>Incremento por clic: +{{ (1 + gatos * 0.1).toFixed(5) }}</p>
        <p>
          Ratas por segundo:
          +{{ (gatosGuatones * 0.2 * bonificacionHuevo).toFixed(5) }}
        </p>
        <p>
          Bonificación por Gato Huevo:
          +{{ ((bonificacionHuevo - 1) * 100).toFixed(5) }}%
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { useGameLogic } from "./composables/useGameLogic.js";
import rataImg from "./assets/rata.png";

export default {
  setup() {
    const {
      // Estados principales
      puntaje,
      totalClicks,
      totalRatasHistoricas,
      gatos,
      gatosGuatones,
      gatosHuevo,
      gatosComprados,
      bonificacionHuevo,

      // Métodos
      clickear,
      comprarGato,
      comprarGatoGuaton,
      comprarGatoHuevo,
      reiniciarPartida,
    } = useGameLogic();

    return {
      puntaje,
      totalClicks,
      totalRatasHistoricas,
      gatos,
      gatosGuatones,
      gatosHuevo,
      gatosComprados,
      bonificacionHuevo,

      clickear,
      comprarGato,
      comprarGatoGuaton,
      comprarGatoHuevo,
      reiniciarPartida,

      rataImg,
    };
  },
};
</script>

<style>
/* Mantén el diseño original */

/* Estilo general */
#app {
  text-align: center;
  font-family: Arial, sans-serif;
  margin-top: 20px;
  color: #333;
}

.container {
  display: flex;
  justify-content: space-between;
}

.main {
  flex: 3;
}

.stats {
  margin: 20px;
  font-size: 20px;
}

.game {
  margin: 30px;
  position: relative;
}

.rata {
  width: 150px;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.upgrades button {
  margin: 10px;
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #6c5ce7;
  color: white;
  transition: background-color 0.3s;
}

.upgrades button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.upgrades button:hover:enabled {
  background-color: #4b4be7;
}

.gatos {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.gato-container {
  animation: fadeIn 0.5s ease-in-out;
}

.gato {
  width: 100px;
  margin: 10px;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: scale(0.5);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.reset-button {
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  background-color: red;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.reset-button:hover {
  background-color: darkred;
}

.stats-sidebar {
  flex: 1;
  background-color: #f4f4f4;
  padding: 20px;
  border-radius: 10px;
}
</style>
