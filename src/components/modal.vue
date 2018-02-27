<template>
  <div>
  <div v-bind:class="{'md-show':mdShow}" class="modelBox">

    <div class="title">
      <slot name="title"></slot>
    </div>
    <div class="infomation">
      <slot name="infomation"></slot>
    </div>
    <div class="btnBox">
      <slot name="MyBtn"></slot>

    </div>
  </div>
  </div>
</template>

<script>
    export default {
        props:["mdShow"]
    }
</script>

<style scoped>

</style>
