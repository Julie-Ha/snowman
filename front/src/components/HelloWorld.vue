<template>
  <div class="hello">
    <ul>
      <li v-for="cell of cells" :key="cell.c.value">
        {{ cell.c.value }}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "HelloWorld",
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
<style scoped></style>
