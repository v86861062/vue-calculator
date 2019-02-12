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

    <div class="logo"/>
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
@import "./constant";

* {
  box-sizing: border-box;
}

//* {border: 1px dashed gray;}\
html {
  font-size: calc(16px + 1vw);
}

#app {
  display: grid;
  grid-template-columns: 40% 60%;
  grid-template-rows: 1fr 1fr;

  height: 95vh;

  font-family: "Courier New", Courier, monospace;
  font-size: 1.5rem;
}

.result-container {
  grid-column: 2 / span 1;
  grid-row: 1 / span 2;
}

.button-container {
  grid-column: 1 / span 1;
  grid-row: 2 / span 1;

  width: 100%;
}

.logo {
  grid-column: 1 / span 1;
  grid-row: 1 / span 1;

  max-width: 100%;
  max-height: 100%;

  background-image: url("./assets/logo.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  background-color: $logo-background;
}

.expression {
  height: 20%;
  width: 100%;
  color: $expression-text-color;
  background-color: $expression-color;
}
::placeholder {
  /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: $expression-text-color;
  opacity: 1; /* Firefox */
}

.ans {
  height: 10%;
  color: $ans-text-color;
  background-color: $ans-color;
}

.results {
  height: 70%;

  color: $results-text-color;
  background-color: $results-color;
  overflow: hidden;
}

@media screen and (orientation: portrait) {
  .logo {
    display: none;
  }

  .result-container {
    grid-column: 1 / span 2;
    grid-row: 1 / span 1;
  }

  .button-container {
    grid-column: 1 / span 2;
    grid-row: 2 / span 1;
  }
}
</style>
