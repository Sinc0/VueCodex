<template>
  <div id="Home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <ComponentSidebar />
    <ComponentText />
  </div>
</template>

<script>
// @ is an alias to /src
import ComponentText from '@/components/ComponentText.vue'
import ComponentSidebar from '@/components/ComponentSidebar.vue'

export default {
  name: 'Home',
  components: {
    ComponentText,
    ComponentSidebar
  }
}
</script>

<style scoped>
#Home { margin: 0px; padding: 0px;}
</style>
