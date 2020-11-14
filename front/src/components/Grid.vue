<template>
  <div>
    <ul class="grid">
      <li v-for="cell of getCells" :key="cell.cell.value">
        <div class="cell" :class="cell.css.value">
          <div v-if="cell.css.value.includes('north')">
            <i @click="move('north')" class="fas fa-long-arrow-alt-up"></i>
          </div>
          <div v-if="cell.css.value.includes('south')">
            <i @click="move('south')" class="fas fa-long-arrow-alt-down"></i>
          </div>
          <div v-if="cell.css.value.includes('east')">
            <i @click="move('east')" class="fas fa-long-arrow-alt-right"></i>
          </div>
          <div v-if="cell.css.value.includes('west')">
            <i @click="move('west')" class="fas fa-long-arrow-alt-left"></i>
          </div>
        </div>
      </li>
    </ul>
    <button @click="reset">Reset</button>
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
    reset() {
      axios
        .get("http://localhost:3000/reset/")
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
  grid-template-columns: repeat(10, 64px);
  grid-template-rows: repeat(10, 64px);
  list-style: none;
}

.cell {
  width: 64px;
  height: 64px;
  border: solid 1px #494182;
}

.north, .south, .east, .west {
  background: url("/images/free.png") center no-repeat;
  display: flex;
  justify-content: center;
}

.north i, .south i, .east i, .west i {
  cursor: pointer;
  font-size: 32px;
  color: #494182;
}

.north i {
  transform: translate(0, 30px);
}

.east i {
  transform: translate(-15px, 15px);
}

.west i {
  transform: translate(15px, 15px);
}

.free {
  background: url("/images/free.png") center no-repeat;
}

.player {
  background: url("/images/player.png") center no-repeat;
}

.smallBall {
  background: url("/images/small.png") center no-repeat;
}

.mediumBall {
  background: url("/images/medium.png") center no-repeat;
}

.bigBall {
  background: url("/images/big.png") center no-repeat;
}

.half {
  background: url("/images/half.png") center no-repeat;
}

.snowman {
  background: url("/images/snowman.png") center no-repeat;
}

</style>
