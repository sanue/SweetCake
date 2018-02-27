<template>
    <div>
      <form method="post" enctype="multipart/form-data" action="/fileUpload">
        <input type="text" name="username">
        <input type="password" name="password">
        <input type="file" name="thumbnail">
        <input type="submit"/>
      </form>
    </div>
</template>

<script>
    export default {
        name: "home"
    }
</script>

<style scoped>

</style>
