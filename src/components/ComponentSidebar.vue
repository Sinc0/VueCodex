<template>
  <div id="ComponentSidebar">
    <!-- route handling -->
    <span style="display: none;" v-if="getSelectedCategoryData">selected: {{getSelectedCategoryData.title.toLowerCase()}}</span>


    <!-- categories -->
    <div v-for="category in codexJSON.slice().sort((a, b) => {return a.order - b.order})" v-bind:key="category.nr">
      <div id="categoryTitle" v-on:click="selectCategory(category.title)">
        <span v-bind:id="'categoryTitle#' + category.title.toLowerCase()" class="categoryTitle">{{category.title}}</span>
        <span class="categorySubcategoriesCount"></span>
      </div>
      
      <!-- subcategories -->
      <!-- <div class="" v-for="item in category.data" v-bind:key="item.nr"> · {{item.subcategory}}</div> -->
      <!-- <div id="categoryData" v-for="data in category.data" v-bind:key="data.nr">• {{data.subcategory}}</div> -->
    </div>
  </div>
</template>

<script>
import {useStore} from 'vuex'
import {ref, reactive, computed, onUpdated, onMounted} from 'vue'
import router from '../router'
import { useRouter, useRoute } from 'vue-router' //instead of this.$route
// import codexJSON from "@/codex.json";

export default {
  setup() {
    //vuex
    const store = useStore() //same as this.$store
    const getSelectedCategoryData = computed(() => { return store.getters['selectedCategoryData']})
    
    var codexJSON = require('/public/codex.json');

    onMounted(() => {
      console.log("componentSidebar Mounted")

      let currentRoute = router.currentRoute.value.fullPath.replace("/", "")

      if(currentRoute == "") { currentRoute = "apis"}
      
      selectCategory(currentRoute)
    })

    onUpdated(() => {
      console.log("componentSidebar Updated")
    })

    function selectCategory(category)
    {
      // console.log("selectCategory")
      router.push({ path: '/' + category.toLowerCase() })

      let subcategoryData = document.getElementById("subcategoryData")
      let categoryTitle = document.getElementById("categoryTitle#" + category.toLowerCase())
      let categoryTitles = document.getElementsByClassName("categoryTitle")

      for(let c in categoryTitles)
      {
        if(categoryTitles[c].style) {categoryTitles[c].style.opacity = "0.3"}
      }
      
      if(subcategoryData) { subcategoryData.scroll(0, 0) }
      if(categoryTitle) 
      { 
        categoryTitle.style.opacity = "1"
        categoryTitle.scrollIntoView()
      }

      for(let c in codexJSON)
      {
        if(category.toLowerCase() == codexJSON[c].title.toLowerCase())
        {
          let selectedCategory = codexJSON[c]
          
          //vuex
          store.dispatch('actionSetSelectedCategoryData', selectedCategory) 
        }
      }

      subcategoriesExpandAll()
    }

    function subcategoriesExpandAll()
    {
        // console.log("subcategoriesExpandAll")
        
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
      //vuex
      getSelectedCategoryData,

      //variables
      codexJSON,

      //functions
      selectCategory
    }
  }
}
</script>

<style scoped>
/*** scrollbar ***/
#ComponentSidebar::-webkit-scrollbar { height: 0px; width: 0px;}

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
.categoryTitle:active   { color: lightgray;}

/*** mobile ***/
@media screen and (max-width: 1000px) {
  #ComponentSidebar {
    display: flex;
    flex-direction: row;
    height: auto;
    width: 100%;
    overflow-y: scroll;
    border-top: 0px solid white;
    border-bottom: 2px solid white;
    border-right: 0px solid white;
    border-left: 0px solid white;
    background-color: black;
  }

  #categoryTitle { text-align: left;}
}
</style>
