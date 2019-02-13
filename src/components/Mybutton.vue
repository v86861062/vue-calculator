<template>
  <button class="mybutton" @click="handleClick">{{display}}</button>
</template>

<script>
export default {
  name: "Mybutton",
  props: {
    display: { type: String, required: true },
    onClick: { type: Function, required: true }
  },

  methods: {
    handleClick: function() {
      this.onClick(this.display);
    }
  }
};
</script>

<style lang="scss">
@import "../constant";

.mybutton {
  width: 25%;
  height: 20%;
  border: 5px $button-border-color outset;
  color: $button-text-color;
  background-color: $button-color;

  &:active {
    border: 5px $button-border-color solid;
    color: $button-text-active-color;
  }
}
</style>
