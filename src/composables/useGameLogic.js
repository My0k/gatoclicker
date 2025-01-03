import { ref, watch, onMounted } from "vue";
import gato1 from "@/assets/gato1.png";
import gato2 from "@/assets/gato2.png";
import gato3 from "@/assets/gato3.png";

export function useGameLogic() {
  // Estado principal
  const puntaje = ref(parseFloat(localStorage.getItem("puntaje")) || 0);
  const totalClicks = ref(parseInt(localStorage.getItem("totalClicks")) || 0);
  const totalRatasHistoricas = ref(parseFloat(localStorage.getItem("totalRatasHistoricas")) || 0);
  const gatos = ref(parseInt(localStorage.getItem("gatos")) || 0);
  const gatosGuatones = ref(parseInt(localStorage.getItem("gatosGuatones")) || 0);
  const gatosHuevo = ref(parseInt(localStorage.getItem("gatosHuevo")) || 0);
  const gatosComprados = ref(JSON.parse(localStorage.getItem("gatosComprados")) || []);
  const bonificacionHuevo = ref(parseFloat(localStorage.getItem("bonificacionHuevo")) || 1);

  // Guardar estado en localStorage
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
    [puntaje, totalClicks, totalRatasHistoricas, gatos, gatosGuatones, gatosHuevo, gatosComprados],
    guardarEstado
  );

  // Click en la rata
  const clickear = () => {
    const incremento = 1 + gatos.value * 0.1;
    puntaje.value += incremento;
    totalRatasHistoricas.value += incremento;
    totalClicks.value += 1;
  };

  // Comprar Gato Pequeño
  const comprarGato = () => {
    if (puntaje.value >= 10) {
      puntaje.value -= 10;
      gatos.value += 1;
      gatosComprados.value.push({ id: gatosComprados.value.length + 1, src: gato1 });
    }
  };

  // Comprar Gato Guatón
  const comprarGatoGuaton = () => {
    if (puntaje.value >= 50) {
      puntaje.value -= 50;
      gatosGuatones.value += 1;
      gatosComprados.value.push({ id: gatosComprados.value.length + 1, src: gato2 });
    }
  };

  // Comprar Gato Huevo
  const comprarGatoHuevo = () => {
    if (puntaje.value >= 100) {
      puntaje.value -= 100;
      gatosHuevo.value += 1;
      bonificacionHuevo.value += 0.05; // Incrementa el multiplicador de bonificación
      gatosComprados.value.push({ id: gatosComprados.value.length + 1, src: gato3 });
    }
  };

  // Producción automática
  onMounted(() => {
    setInterval(() => {
      const incrementoGuatones = gatosGuatones.value * 0.2 * bonificacionHuevo.value;
      puntaje.value += incrementoGuatones;
      totalRatasHistoricas.value += incrementoGuatones;
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
    clickear,
    comprarGato,
    comprarGatoGuaton,
    comprarGatoHuevo,
    reiniciarPartida,
  };
}
