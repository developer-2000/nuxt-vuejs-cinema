<template>
  <div>
    <Navbar />

    <main>
      <div class="container body_document">
        <nuxt />
      </div>
    </main>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
export default {
  components: {
    Navbar
  }
}
</script>


<style scoped>
  .body_document{
    padding: 0px;
    margin-top: 25px;
  }
</style>
