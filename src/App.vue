<template>
  <div id="app">
    <div class="result-container">
      <input
        class="expression"
        v-model="input"
        @paste.prevent
        @keypress.enter="uploadResults"
        @keypress.exact="handleinput"
        placeholder="Enter an expression to calculate"
      >
      <div class="ans">
        <label v-show="ans">= {{ ans }}</label>
      </div>

      <div class="results">
        <h3
          v-for="result in results"
          :key="result.ID"
        >{{result.input}} = {{result.output}}</h3>
      </div>
    </div>

    <img class="logo" alt="Vue logo" src="./assets/logo.png">
    <div class="button-container">
      <Mybutton
        v-for="key in keys"
        :key="key.display"
        :display="key.display"
        :onClick="handleClick"
      />
    </div>
  </div>
</template>

<script>
import "normalize.css";
import * as math from "mathjs";
import debounce from "lodash.debounce";
import Mybutton from "./components/Mybutton";
import { keys as _keys } from "./constant.js";

export default {
  name: "app",
  components: {
    Mybutton
  },

  data: function() {
    return {
      input: "",
      ans: "",
      results: [],
      resultsCount: 0,
      keys: _keys
    };
  },

  methods: {
    updateAns: debounce(function() {
      try {
        this.ans = math.eval(this.input);
      } catch (error) {
        this.ans = "error";
      }
    }, 300),
    uploadResults: function() {
      if (this.ans != "error")
        this.results.unshift({
          input: this.input,
          output: this.ans,
          ID: this.resultsCount
        });

      this.resultsCount++;
      this.input = "";
    },
    handleClick: function(str) {
      if (str != "=") this.input += str;
      else this.uploadResults();
    },
    handleinput: function(e) {
      for (const k of this.keys) {
        if (e.key == k.key) return true;
      }
      /* 這是為了防止輸入文字 */
      e.preventDefault();
    }
  },

  watch: {
    input: function() {
      this.updateAns();
    }
  }
};
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}

//* {border: 1px dashed gray;}\
html {
  font-size: 16px;
}

#app {
  display: grid;
  grid-template-columns: 40% 60%;
  grid-template-rows: 1fr 1fr;

  height: 95vh;

  font-family: "Courier New", Courier, monospace;
  font-size: 1.5rem;
  background-color: gray;
}

.result-container {
  grid-column: 2 / span 1;
  grid-row: 1 / span 2;

  background-color: rgb(255, 166, 166);
}

.button-container {
  grid-column: 1 / span 1;
  grid-row: 2 / span 1;

  width: 100%;
  background-color: green;
}

.logo {
  display: block; // -- 讓圖片置中
  margin: auto; // --^

  grid-column: 1 / span 1;
  grid-row: 1 / span 1;

  width: 95%;
  background-color: rgb(112, 91, 91);
}

.expression {
  height: 20%;
  width: 100%;
}

.ans {
  height: 10%;
}

.results {
  height: 70%;

  background-color: rgb(109, 253, 90);
  overflow: hidden;
}
</style>
