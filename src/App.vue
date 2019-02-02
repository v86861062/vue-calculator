<template>
  <div id="app">
    <input
      v-model="input"
      @paste.prevent
      @keypress.enter="uploadResults"
      @keypress.exact="handleinput"
      placeholder="Enter an expression to calculate"
    >

    <h2 v-show="ans">= {{ ans }}</h2>

    <h3
      v-for="result in results"
      :key="result.ID"
    >{{result.input}} = {{result.output}}</h3>

    <Mybutton
      v-for="key in keys"
      :key="key.display"
      :display="key.display"
      :onClick="handleClick"
    />
  </div>
</template>

<script>
import * as math from "mathjs";
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
    updateAns: function() {
      try {
        this.ans = math.eval(this.input);
      } catch (error) {
        this.ans = "error";
      }
    },
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
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
