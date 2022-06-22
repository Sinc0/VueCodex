<template>
    <div id="ComponentText">
        <!-- top info -->
        <div id="categoryTopInfo" v-if="getSelectedCategoryData">
            <!-- category title -->
            <p id="selectedCategoryTitle">
                <span>{{getSelectedCategoryData.title}}</span>
                <span class="categorySubcategoriesCount" v-on:click="subcategoriesCollapseAll()"> · {{sortedSubcategories().length}}</span>
            </p>

            <!-- category about -->
            <div id="categoryAbout">{{getSelectedCategoryData.about}}</div>

            <!-- subcategory search bar -->
            <div id="searchBar">
                <input id="searchBarInput" placeholder="filter subcategory..." v-on:keyup="searchSubcategoryData()" />
            </div>
        </div>
        
        <!-- category data -->
        <div id="subcategoryData" v-if="getSelectedCategoryData">
            <!-- subcategories -->
            <div v-bind:id="'subcategoryDataSection#' + item.subcategory" class="subcategoryDataSection" v-for="item in sortedSubcategories()" v-bind:key="item.nr">
                <!-- subcategory title -->
                <div v-bind:id="'subcategoryTitle#' + item.subcategory" class="subcategoryTitle" v-on:click="subcategoryCollapse(item.subcategory)">
                    <b>{{item.subcategory}}</b>
                </div>
                
                <!-- subcategory data -->
                <div v-bind:id="'subcategoryData#' + item.subcategory" class="subcategoryData" style="display: block;">
                    <div class="subcategoryDataItem" v-for="data in item.items.filter((data) => {return data.hidden == 'false'})" v-bind:key="data.nr" v-bind:title="data.comment">
                        <div v-if="data.value != ''">
                            <!-- data type link -->
                            <span class="link" v-if="data.type == 'link'">
                                <span v-if="data.name"> · <a v-bind:href="data.value" target="blank">{{data.name}}</a></span>
                                <span v-else> · <a v-bind:href="data.value" target="blank">{{data.value}}</a></span>
                            </span>

                            <!-- data type text -->
                            <span v-else-if="data.type == 'text'">{{data.value}}</span>

                            <!-- data type bullet -->
                            <span v-else-if="data.type == 'bullet'">
                                <span> · </span>
                                <span>{{data.value}}</span>
                            </span>

                            <!-- data comment -->
                            <!-- <span v-if="data.comment != ''"> · {{data.comment}}</span> -->

                            <!-- data images -->
                            <div class="subcategoryImgGallery" v-if="data.images">
                                <span v-for="img in data.images.slice().sort((a, b) => {return a.order > b.order})" v-bind:key="img.nr">
                                    <a v-bind:href="img.url" target="blank">
                                        <img v-bind:id="'subcategoryImg#' + img.order" class="subcategoryDataImg" v-bind:src="img.url" v-bind:title="img.description"/>
                                    </a>
                                    <div class="subcategoryImgNumber">#{{img.order}}</div>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {ref, reactive, computed, onUpdated, onMounted} from 'vue'
import {useStore} from 'vuex'
import router from '../router'
import { useRouter, useRoute } from 'vue-router' //instead of this.$route

export default {
    setup() {
        //vuex
        const store = useStore() //same as this.$store
        const getSelectedCategoryData = computed(() => { return store.getters['selectedCategoryData']})
        // store.dispatch('actionSetRecentlySearched', localStorageRecentlySearched)
        
        function subcategoryCollapse(id)
        {
            console.log("subcategoryCollapse: " + id)

            //elements
            let subcategoryData = document.getElementById("subcategoryData#" + id)
            let subcategoryDataSection = document.getElementById("subcategoryDataSection#" + id)
            
            //display or undisplay subcategory
            if(subcategoryData.style.display == "" || subcategoryData.style.display == "none") 
            { 
                subcategoryData.style.display = "block"
                subcategoryDataSection.style.marginBottom = "40px"
            }
            else if(subcategoryData.style.display == "block") 
            { 
                subcategoryData.style.display = "none"
                subcategoryDataSection.style.marginBottom = "0px"
            }
        }

        function subcategoriesCollapseAll()
        {
            console.log("subcategoryCollapseAll")

            //elements
            let subcategoryDataSections = document.getElementsByClassName("subcategoryDataSection")
            let subcategoryData = document.getElementsByClassName("subcategoryData")

            //reset subcategory sections
            for(let subcategory in subcategoryDataSections)
            {
                if(subcategoryDataSections[subcategory].style != null)
                {
                    subcategoryDataSections[subcategory].style.marginBottom = "0px"
                }
            }

            //undisplay subcategory data
            for(let subcategory in subcategoryData)
            {
                if(subcategoryData[subcategory].style) { subcategoryData[subcategory].style.display  = "none"}
            }
        }

        function sortedSubcategories()
        {
            //variables
            let subcategories = getSelectedCategoryData.value.data
            let sortedSubcategories = []
            let categoryExist

            //sort subcategory names
            for(let sc in subcategories)
            {
                categoryExist = false

                for(let c in sortedSubcategories)
                {
                    if(sortedSubcategories[c].subcategory == subcategories[sc].subcategory) { categoryExist = true }
                }

                if(categoryExist == false) { sortedSubcategories.push({"subcategory": subcategories[sc].subcategory, "items": []})}
            }

            //sort subcategory items
            for(let c in sortedSubcategories)
            {
                for(let sc in subcategories)
                {
                    if(subcategories[sc].subcategory == sortedSubcategories[c].subcategory) { sortedSubcategories[c].items.push(subcategories[sc]) }
                }
            }

            return sortedSubcategories
        }

        function searchSubcategoryData()
        {
            //elements
            let searchBarInput = document.getElementById("searchBarInput")
            let subcategoryDataSections = document.getElementsByClassName("subcategoryDataSection")

            //variables
            let searchString = searchBarInput.value

            //undisplay subcategory sections
            for(let item in subcategoryDataSections)
            {
                if(subcategoryDataSections[item].style) { subcategoryDataSections[item].style.display = "none"}
            }
            
            //display subcategory section search hits
            for(let c = 0; c < subcategoryDataSections.length; c++)
            {
                //variables
                let subcategoryName = subcategoryDataSections[c].id.split("#")[1]
                let subcategorySectionElement = document.getElementById(subcategoryDataSections[c].id)
                
                if(subcategoryName.toLowerCase().includes(searchString.toLowerCase())) { subcategorySectionElement.style.display = "block" }
            }
        }

        return {
            //vuex
            getSelectedCategoryData,

            //functions
            subcategoryCollapse,
            subcategoriesCollapseAll,
            sortedSubcategories,
            searchSubcategoryData,
        }
    }
}
</script>

<style>
/*** elements ***/
/*** ids ***/
#ComponentText 
{ 
    display: inline-block; 
    height: 96vh; 
    width: 49vw; 
    margin: 0px; 
    padding: 0px; 
    text-align: center; 
    vertical-align: top; 
    overflow-y: scroll;
    scrollbar-width: thin;
    scrollbar-color: transparent transparent;
    color: white;
    /* border: 0px solid black; */
    /* border-bottom: 2px solid black; */
    background-color: black;
}
#selectedCategoryTitle { margin: auto; padding: 0px 0px 16px 0px; text-align: center; font-weight: bold; font-size: 24px;}
#subcategoryInfoMenu { margin: 0px 0px 0px 0px; padding: 0px;}
#subcategoryData { position: relative; max-height: 89vh; margin: 160px 0px 0px 0px; padding: 0px; overflow-y: scroll; z-index: 0; border-bottom: 0px solid white;}
#categoryTopInfo 
{ 
    position: absolute; 
    display: block; 
    width: 100%; 
    max-width: 49vw; 
    margin: auto; 
    padding: 20px 0px 0px 0px; 
    color: white;
    z-index: 1;
    /* border-bottom: 1px solid black;  */
    background-color: black;
}
#categoryAbout { height: auto; width: 100%; max-width: 440px; margin: auto; word-break: none; white-space: nowrap; overflow-x: scroll;}
#searchBarInput { width: 100%; font-size: 22px; color: lightgray; outline: none; border: 0px solid white; background-color: black;}
#searchBar { width: 90%; margin: auto; margin-bottom: 24px; text-align: left; border-bottom: 2px solid white;}

/*** classes ***/
.subcategoryTitle { width: 100%; font-size: 20px; user-select: none; text-align: left; border-top: 0px solid black;}
.subcategoryData { width: 100%; margin: auto; text-align: left;}
.subcategoryDataSection { width: 90%; margin: auto; margin-bottom: 40px; text-align: left; font-size: 20px; border: 0px solid white;}
.link a { text-decoration: none;}
.link a:hover { color: white;}
.categorySubcategoriesCount { opacity: 0.4; user-select: none;}
.subcategoryDataItem { opacity: 0.7;}
.subcategoryDataImg { display: inline-block; max-height: 200px; min-height: 200px; margin: 0px 20px 10px 0px; user-select: none; border: 1px solid rgba(255, 255, 255, 0.3);}
.subcategoryImgGallery 
{ 
    display: flex; 
    width: 100%; 
    margin: 10px 0px 0px 0px; 
    overflow-x: scroll; 
    text-align: center; 
    scrollbar-color: white transparent; 
    scrollbar-width: thin;
    border-bottom: 1px solid white;
}
.subcategoryImgNumber { margin: 0px 0px 10px 0px;}
</style>