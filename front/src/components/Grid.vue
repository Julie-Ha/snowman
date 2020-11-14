<template>
  <div>
    <ul class="grid">
      <li v-for="cell of getCells" :key="cell.cell.value">
        <div class="cell" :class="cell.css.value">
          <div v-if="cell.css.value.includes('north')">
            <button @click="move('north')">north</button>
          </div>
          <div v-if="cell.css.value.includes('south')">
            <button @click="move('south')">south</button>
          </div>
          <div v-if="cell.css.value.includes('east')">
            <button @click="move('east')">east</button>
          </div>
          <div v-if="cell.css.value.includes('west')">
            <button @click="move('west')">west</button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Grid",
  data: function() {
    return {
      cells: [],
    };
  },
  methods: {
    loadCells() {
      axios
        .get("http://localhost:3000/")
        .then((response) => {
          this.cells = response.data;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    move(direction) {
      axios
        .get("http://localhost:3000/move/" + direction)
        .then(() => {
          this.loadCells();
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
  },
  computed: {
    getCells() {
      return this.cells;
    },
  },
  created() {
    this.loadCells();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(10, 4rem);
  grid-template-rows: repeat(10, 4rem);
  list-style: none;
}

.cell {
  width: 4rem;
  height: 4rem;
  border: solid 1px black;
}

.north, .south, .east, .west {
  background: lightgreen;
}

.free {
  background: lightblue;
}

.player {
  background: lightcoral;
}
</style>
