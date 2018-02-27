<template>
  <div>
    <n-header></n-header>
    <div class="banner-top">
      <div class="container">
        <h1>404</h1>
        <em></em>
        <h2><a href="index.html">Home</a><label>/</label>404</h2>
      </div>
    </div>
    <div class="container">
      <div class="four">
        <h3>404</h3>
        <p>Sorry! Evidently the document you were looking for has either been moved or no longer exist.</p>
        <a href="index.html" class="hvr-skew-backward">Back To Home</a>
      </div>
    </div>
    <n-footer></n-footer>
  </div>

</template>

<script>
  import nHeader from '@/components/header'
  import nFooter from '@/components/footer'
  export default {
    components:{
      nHeader,
      nFooter
    },
    data:{

    }
  }
</script>

<style>

</style>
