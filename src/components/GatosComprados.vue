<template>
  <div>
    <!-- Sección para comprar gatos 
         (cada gato con su costo, nombre, imagen, etc.)
         SOLO editas aquí para agregar nuevos. -->

    <div class="upgrades">
      <div v-for="cat in cats" :key="cat.name" style="margin-bottom: 10px;">
        <button :disabled="puntaje < cat.cost" @click="comprarGato(cat)">
          Comprar {{ cat.name }} ({{ cat.cost }} puntos)
        </button>
      </div>
    </div>

    <!-- Gatos comprados -->
    <div class="gatos">
      <div
        v-for="gato in gatosComprados"
        :key="gato.id"
        class="gato-container"
      >
        <img :src="gato.src" alt="Gato" class="gato" />
      </div>
    </div>
  </div>
</template>

<script>
/* 
   Aquí defines la lista de gatos disponibles (name, cost, isGuaton, src...),
   así, para añadir uno nuevo basta con agregarlo en `cats`.
*/
import gato1 from "@/assets/gato1.png";
import gato2 from "@/assets/gato2.png";

export default {
  name: "GatosComprados",
  props: {
    puntaje: {
      type: Number,
      required: true,
    },
    gatosComprados: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      cats: [
        {
          name: "Gato Pequeño",
          cost: 10,
          isGuaton: false,
          src: gato1,
        },
        {
          name: "Gato Guatón",
          cost: 50,
          isGuaton: true,
          src: gato2,
        },
        // Ejemplo de añadir un "Gato Ninja":
        // {
        //   name: "Gato Ninja",
        //   cost: 200,
        //   isGuaton: false,
        //   src: require("@/assets/gato3.png"),
        // }
      ],
    };
  },
  methods: {
    comprarGato(cat) {
      // Emitimos al padre la data necesaria:
      // cost, isGuaton, src, etc.
      this.$emit("comprar", cat);
    },
  },
};
</script>

<style scoped>
/* No repetimos el CSS general, para no alterar el diseño original */
.upgrades {
  margin: 10px;
}

.upgrades button {
  margin: 5px;
  padding: 8px 16px;
  font-size: 14px;
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
</style>
