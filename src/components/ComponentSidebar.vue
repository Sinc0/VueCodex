<template>
  <div id="ComponentSidebar">
    <!-- <h1>Total Categories: {{codexJSON.length}}</h1> -->
    <div v-for="category in codexJSON.slice().sort((a, b) => {return a.order - b.order})" v-bind:key="category.nr">
      <div id="categoryTitle">{{category.title}} ({{category.data.length}})</div>
      <!-- <div id="categoryData" v-for="data in category.data" v-bind:key="data.nr">• {{data.subcategory}}</div> -->
    </div>
  </div>
</template>

<script>
import codexJSON from "../assets/codex.json";

export default {
  setup() {

    return {
      codexJSON
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#categoryTitle { margin: 0px 0px 3px 10px; padding: 0px; text-align: left; font-weight: bold; user-select: none;}
#ComponentSidebar { display: inline-block; height: 90vh; width: 10%; margin: 0px; padding: 8px 0px 0px 0px; overflow: auto; border: 1px solid black;}
</style>
