<template>
  <div id="app">
    <h1>¡Aniquila a las Ratas!</h1>
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
          <img
            :src="rataImg"
            alt="Rata"
            class="rata"
            :class="{ 'rata-click': rataClicking }"
            @click="handleRataClick"
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
import { ref, watch } from "vue";
import rataImg from "@/assets/rata.png";
import gato1 from "@/assets/gato1.png";
import gato2 from "@/assets/gato2.png";
import gato3 from "@/assets/gato3.png";
import oofSound from "@/assets/oof.mp3";
import "@/assets/style.css";

export default {
  setup() {
    const puntaje = ref(parseFloat(localStorage.getItem("puntaje")) || 0);
    const totalClicks = ref(parseInt(localStorage.getItem("totalClicks")) || 0);
    const totalRatasHistoricas = ref(
      parseFloat(localStorage.getItem("totalRatasHistoricas")) || 0
    );

    const gatos = ref(parseInt(localStorage.getItem("gatos")) || 0);
    const gatosGuatones = ref(parseInt(localStorage.getItem("gatosGuatones")) || 0);
    const gatosHuevo = ref(parseInt(localStorage.getItem("gatosHuevo")) || 0);
    const gatosComprados = ref(JSON.parse(localStorage.getItem("gatosComprados")) || []);
    const bonificacionHuevo = ref(parseFloat(localStorage.getItem("bonificacionHuevo")) || 1);

    const rataClicking = ref(false);

    const audio = new Audio(oofSound);

    const guardarEstado = () => {
      localStorage.setItem("puntaje", puntaje.value);
      localStorage.setItem("totalClicks", totalClicks.value);
      localStorage.setItem("totalRatasHistoricas", totalRatasHistoricas.value);
      localStorage.setItem("gatos", gatos.value);
      localStorage.setItem("gatosGuatones", gatosGuatones.value);
      localStorage.setItem("gatosHuevo", gatosHuevo.value);
      localStorage.setItem("gatosComprados", JSON.stringify(gatosComprados.value));
      localStorage.setItem("bonificacionHuevo", bonificacionHuevo.value);
    };

    watch(
      [
        puntaje,
        totalClicks,
        totalRatasHistoricas,
        gatos,
        gatosGuatones,
        gatosHuevo,
        gatosComprados,
        bonificacionHuevo,
      ],
      guardarEstado
    );

    const handleRataClick = () => {
      rataClicking.value = true;
      puntaje.value += 1 + gatos.value * 0.1;
      totalRatasHistoricas.value += 1 + gatos.value * 0.1;
      totalClicks.value += 1;

      audio.currentTime = 0;
      audio.play();

      setTimeout(() => {
        rataClicking.value = false;
      }, 200);
    };

    const comprarGato = () => {
      if (puntaje.value >= 10) {
        puntaje.value -= 10;
        gatos.value += 1;
        gatosComprados.value.push({ id: gatosComprados.value.length + 1, src: gato1 });
      }
    };

    const comprarGatoGuaton = () => {
      if (puntaje.value >= 50) {
        puntaje.value -= 50;
        gatosGuatones.value += 1;
        gatosComprados.value.push({ id: gatosComprados.value.length + 1, src: gato2 });
      }
    };

    const comprarGatoHuevo = () => {
      if (puntaje.value >= 100) {
        puntaje.value -= 100;
        gatosHuevo.value += 1;
        bonificacionHuevo.value += 0.05;
        gatosComprados.value.push({ id: gatosComprados.value.length + 1, src: gato3 });
      }
    };

    setInterval(() => {
      const incrementoGuatones = gatosGuatones.value * 0.2 * bonificacionHuevo.value;
      puntaje.value += incrementoGuatones;
      totalRatasHistoricas.value += incrementoGuatones;
    }, 1000);

    const reiniciarPartida = () => {
      if (confirm("¿Estás seguro de que deseas reiniciar la partida?")) {
        puntaje.value = 0;
        totalClicks.value = 0;
        totalRatasHistoricas.value = 0;
        gatos.value = 0;
        gatosGuatones.value = 0;
        gatosHuevo.value = 0;
        bonificacionHuevo.value = 1;
        gatosComprados.value = [];
        guardarEstado();
      }
    };

    return {
      puntaje,
      totalClicks,
      totalRatasHistoricas,
      gatos,
      gatosGuatones,
      gatosHuevo,
      gatosComprados,
      bonificacionHuevo,
      rataClicking,
      handleRataClick,
      comprarGato,
      comprarGatoGuaton,
      comprarGatoHuevo,
      reiniciarPartida,
      rataImg,
    };
  },
};
</script>

