<template>
  <div>
    <ul class="grid">
      <li class="cell" v-for="cell of cells" :key="cell.c.value">
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
  grid-column-gap: 0;
}

.cell {
  width: 4rem;
  height: 4rem;
  border: solid 1px black;
  background: lightblue;
}
</style>
