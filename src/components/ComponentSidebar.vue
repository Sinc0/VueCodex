<template>
  <div id="ComponentSidebar">
    <div v-for="category in codexJSON.slice().sort((a, b) => {return a.order - b.order})" v-bind:key="category.nr">
      <!-- categories -->
      <div id="categoryTitle" v-on:click="selectCategory(category)">
        <span class="categoryTitle">{{category.title}}</span>
        <span class="categorySubcategoriesCount"> · {{category.data.length}}</span>
      </div>
      
      <!-- subcategories -->
      <!-- <div class="" v-for="item in category.data" v-bind:key="item.nr"> · {{item.subcategory}}</div> -->
      <!-- <div id="categoryData" v-for="data in category.data" v-bind:key="data.nr">• {{data.subcategory}}</div> -->
    </div>
  </div>
</template>

<script>
import codexJSON from "../assets/codex.json";
import {useStore} from 'vuex'
import {ref, reactive, computed, onUpdated, onMounted} from 'vue'
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

      //vuex
      store.dispatch('actionSetSelectedCategoryData', category)  

      subcategoriesExpandAll()
    }

    function subcategoriesExpandAll()
    {
        console.log("subcategoriesExpandAll")
        
        //elements
        let subcategoryDataSections = document.getElementsByClassName("subcategoryDataSection")
        let subcategoryData = document.getElementsByClassName("subcategoryData")

        //subcategory sections
        for(let subcategory in subcategoryDataSections)
        {
            if(subcategoryDataSections[subcategory].style != null) { subcategoryDataSections[subcategory].style.marginBottom = "40px"}
        }

        //subcategory data
        for(let subcategory in subcategoryData)
        {
            if(subcategoryData[subcategory].style != null) { subcategoryData[subcategory].style.display = "block" }
        }
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

<style scoped>
/*** elements ***/

/*** ids ***/
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

/*** classes ***/
.categorySubcategoriesCount { opacity: 0.4; user-select: none;}
</style>
