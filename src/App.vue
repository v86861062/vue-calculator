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
        <label v-show="isNeedShowAnswer">= {{ ans }}</label>
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
        v-for="button in buttons"
        :key="button.display"
        :display="button.display"
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
import { buttons as _buttons } from "./constant.js";

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
      buttons: _buttons
    };
  },

  methods: {
    updateAns: debounce(function() {
      this.ans = this.evalResult(this.input);
    }, 300),

    uploadResults: function() {
      this.ans = this.evalResult(this.input);

      if (this.ans == "error" || this.input == "") return;

      this.results.unshift({
        input: this.input,
        output: this.ans,
        ID: this.resultsCount
      });

      this.resultsCount++;
      this.input = "";
    },

    evalResult: function(input) {
      try {
        const formatedInput = this.formatInput(input);
        return math.format(math.eval(formatedInput), 3);
      } catch (error) {
        return "error";
      }
    },

    reset: function() {
      this.results = [];
      this.input = "";
    },

    handleClick: function(str) {
      if (str == "=") this.uploadResults();
      else if (str == "AC") this.reset();
      else this.input += str;
    },

    handleinput: function(e) {
      for (const button of this.buttons) {
        if (e.key == button.key) return true;
      }
      /* 這是為了防止輸入文字 */
      e.preventDefault();
    },

    formatInput: function(str) {
      return str.replace(/÷|×/g, function(match) {
        if (match === "÷") return "/";
        else if (match === "×") return "*";
      });
    }
  },

  computed: {
    isNeedShowAnswer: function() {
      if (this.input == "") {
        return false;
      } else if (this.ans === "undefined") {
        /* math.format 輸入"" 會回傳 undefined 字串 :(*/
        return false;
      }
      return true;
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

html,
body {
  height: 100%;
}

html {
  font-size: calc(16px + 1vw);
}

#app {
  display: grid;
  grid-template-columns: 40% 60%;
  grid-template-rows: 1fr 1fr;
  height: 100%;
  font-family: "Courier New", Courier, monospace;
  font-size: 1.5rem;
}

.result-container {
  grid-column: 2 / span 1;
  grid-row: 1 / span 2;
  overflow: hidden;
}

.button-container {
  grid-column: 1 / span 1;
  grid-row: 2 / span 1;
  width: 100%;
}

.logo {
  padding: 5%;
  grid-column: 1 / span 1;
  grid-row: 1 / span 1;
  max-width: 100%;
  max-height: 100%;
  background-image: url("./assets/logo.svg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  background-color: $logo-background;
  background-origin: content-box;
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
  /* vertical align center */
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;

  height: 10%;
  color: $ans-text-color;
  background-color: $ans-color;
  font-weight: bold;
}

.results {
  padding: 0 2%;
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
