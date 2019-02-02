<template>
  <div class="fuck">
    <button class="mybutton" @click="handleClick">{{display}}</button>
  </div>
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
  width: 50px;
  color: yellow;
}
</style>
