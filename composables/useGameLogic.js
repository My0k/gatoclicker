// src/composables/useGameLogic.js
import { ref, onMounted, watch } from "vue";
import gato1 from "@/assets/gato1.png";
import gato2 from "@/assets/gato2.png";

// Aquí centralizamos TODA la lógica y estado del juego
export function useGameLogic() {
  // Estado principal
  const puntaje = ref(parseFloat(localStorage.getItem("puntaje")) || 0);
  const totalClicks = ref(parseInt(localStorage.getItem("totalClicks")) || 0);
  const totalRatasHistoricas = ref(parseFloat(localStorage.getItem("totalRatasHistoricas")) || 0);
  const gatos = ref(parseInt(localStorage.getItem("gatos")) || 0);
  const gatosGuatones = ref(parseInt(localStorage.getItem("gatosGuatones")) || 0);
  const gatosComprados = ref(JSON.parse(localStorage.getItem("gatosComprados")) || []);

  // Efectos de clic
  const clickEffects = ref([]);
  const rataClicking = ref(false);

  // Guardar estado
  const guardarEstado = () => {
    localStorage.setItem("puntaje", puntaje.value);
    localStorage.setItem("totalClicks", totalClicks.value);
    localStorage.setItem("totalRatasHistoricas", totalRatasHistoricas.value);
    localStorage.setItem("gatos", gatos.value);
    localStorage.setItem("gatosGuatones", gatosGuatones.value);
    localStorage.setItem("gatosComprados", JSON.stringify(gatosComprados.value));
  };

  // Vigilar cambios y guardar
  watch(
    [puntaje, totalClicks, totalRatasHistoricas, gatos, gatosGuatones, gatosComprados],
    guardarEstado
  );

  // Clic en la rata
  const clickear = () => {
    const incremento = 1 + gatos.value * 0.1;
    puntaje.value += incremento;
    totalRatasHistoricas.value += incremento;
    totalClicks.value += 1;

    // Efecto de agrandamiento
    rataClicking.value = true;
    setTimeout(() => (rataClicking.value = false), 200);
  };

  // Partículas de clic
  const showClickEffect = (event) => {
    const x = event.clientX;
    const y = event.clientY;
    clickEffects.value.push({ style: { top: `${y}px`, left: `${x}px` } });
    setTimeout(() => {
      clickEffects.value.shift();
    }, 600);
  };

  // Comprar Gato Pequeño
  const comprarGato = () => {
    if (puntaje.value >= 10) {
      puntaje.value -= 10;
      gatos.value += 1;
      gatosComprados.value.push({
        id: gatosComprados.value.length + 1,
        src: gato1,
      });
    }
  };

  // Comprar Gato Guatón
  const comprarGatoGuaton = () => {
    if (puntaje.value >= 50) {
      puntaje.value -= 50;
      gatosGuatones.value += 1;
      gatosComprados.value.push({
        id: gatosComprados.value.length + 1,
        src: gato2,
      });
    }
  };

  // Producción automática (Gatos Guatones)
  onMounted(() => {
    setInterval(() => {
      puntaje.value += gatosGuatones.value * 0.2;
      totalRatasHistoricas.value += gatosGuatones.value * 0.2;
    }, 1000);
  });

  // Reiniciar partida
  const reiniciarPartida = () => {
    if (confirm("¿Estás seguro de que deseas reiniciar la partida?")) {
      puntaje.value = 0;
      totalClicks.value = 0;
      totalRatasHistoricas.value = 0;
      gatos.value = 0;
      gatosGuatones.value = 0;
      gatosComprados.value = [];
      guardarEstado();
    }
  };

  // Retornamos todo lo que usará el componente
  return {
    puntaje,
    totalClicks,
    totalRatasHistoricas,
    gatos,
    gatosGuatones,
    gatosComprados,
    clickEffects,
    rataClicking,

    // Métodos
    clickear,
    showClickEffect,
    comprarGato,
    comprarGatoGuaton,
    reiniciarPartida,
  };
}
