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
.mybutton {
  background-color: red;
  width: 25%;
  height: 20%;
  
  color: yellow;
}
</style>
