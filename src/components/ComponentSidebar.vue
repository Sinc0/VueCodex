<template>
  <div id="ComponentSidebar">
    <!-- <h1>Total Categories: {{codexJSON.length}}</h1> -->
    <div v-for="category in codexJSON.slice().sort((a, b) => {return a.order - b.order})" v-bind:key="category.nr">
      <!-- <div id="categoryTitle" v-on:click="selectCategory(category)">{{category.title}} ({{category.data.length}})</div> -->
      <!-- <div id="categoryTitle" v-on:click="selectCategory(category)">{{category.title}} • {{category.data.length}}</div> -->
      <div id="categoryTitle" v-on:click="selectCategory(category)">
        <span class="categoryTitle">{{category.title}}</span>
        <span class="categorySubcategoriesCount"> · {{category.data.length}}</span>
      </div>
      <!-- <div id="categoryData" v-for="data in category.data" v-bind:key="data.nr">• {{data.subcategory}}</div> -->
    </div>
  </div>
</template>

<script>
import codexJSON from "../assets/codex.json";
import {ref, reactive, computed, onUpdated, onMounted} from 'vue'
import {useStore} from 'vuex'
import router from '../router'
import { useRouter, useRoute } from 'vue-router' //instead of this.$route

export default {
  setup() {
    //vuex
    const store = useStore() //same as this.$store
    // const getSelectedCategoryData = computed(() => { return store.getters['selectedCategoryData']})
    

    function selectCategory(category)
    {
      console.log("selectCategory")

      store.dispatch('actionSetSelectedCategoryData', category)  
    }
    
    return {
      //variables
      codexJSON,

      //functions
      selectCategory
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/*** elements ***/
/*** ids ***/
/*** classes ***/
#categoryTitle { margin: 0px 20px 6px 10px; padding: 0px; text-align: left; font-weight: bold; font-size: 24px; user-select: none;}
#ComponentSidebar 
{ 
  display: inline-block; 
  height: 98vh; 
  width: auto;
  margin: 0px; 
  padding: 16px 0px 11px 0px; 
  overflow: auto;
  scrollbar-width: thin;
  color: white;
  /* border: 2px solid black;  */
  border-top: 0px solid black;
  border-right: 2px solid white;
  background-color: black;
}

.categorySubcategoriesCount { opacity: 0.4; user-select: none;}
</style>
