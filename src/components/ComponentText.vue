<template>
    <div id="ComponentText">
        <!-- <p>test</p> -->
        <div id="subcategoryTopInfo" v-if="getSelectedCategoryData">
            <p id="selectedCategoryTitle">
                <span>{{getSelectedCategoryData.title}}</span>
                <span class="categorySubcategoriesCount"> · {{getSelectedCategoryData.data.length}}</span>
                 </p>
            <div id="subcategoryAbout">{{getSelectedCategoryData.about}}</div>
                <!-- <span><br />+</span> -->
                <div id="searchBar"><br /><input id="searchBarInput" placeholder="search..." /></div>

            <!-- <div id="subcategoryInfoMenu"> -->
                <!-- <span>{{getSelectedCategoryData.data.length}} Subcategories</span> -->
                <!-- <span> | </span> -->
                <!-- <span id="collapseButton" v-on:click="subcategoriesCollapseAll()">Collapse</span> -->
                <!-- <span> | </span> -->
                <!-- <br /> -->
                <!-- <br /> -->
                <!-- <br /> -->
                <!-- {{sortedSubcategories()}} -->  
                <!-- <div v-for="item in sortedSubcategories()" v-bind:key="item.nr">
                    {{item.subcategory}} ({{item.items.length}})
                    <div v-for="data in item.items" v-bind:key="data.nr">{{data.value}}</div>
                    <br />
                    </div> -->
            <!-- </div> -->
        </div>
        
        <div id="subcategoryData" v-if="getSelectedCategoryData">
        <div id="" class="subcategoryDataSection" v-for="item in sortedSubcategories()" v-bind:key="item.nr" v-on:click="subcategoryCollapse()">
                <div v-bind:id="'subcategoryTitle#' + item.subcategory" class="subcategoryTitle">
                    <!-- <b v-if="item.subcategory == 'about' || item.subcategory == 'About'"></b> -->
                    <b>{{item.subcategory}}</b>
                </div>
                
                <div v-bind:id="'subcategoryData#' + item.subcategory" v-for="data in item.items" v-bind:key="data.nr" v-bind:title="data.value.replace('https://', '') + ' = ' + data.comment">
                    <span class="link" v-if="data.type == 'link'">
                        <span> · </span>
                        <!-- <span> • </span>  -->
                        <a v-bind:href="data.value" target="blank">{{data.value.replace("https://", "")}}</a>
                    </span>
                    <span v-else-if="data.type == 'text'">{{data.value}}</span>
                    <span v-if="data.comment != ''"> · {{data.comment}}</span>
                </div>
            

            
        </div>
        </div>
        <!-- {{getSelectedCategoryData.data}} -->
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
        
        function subcategoryCollapse()
        {
            console.log("subcategoryCollapse")
        }

        function subcategoriesCollapseAll()
        {
            console.log("subcategoryCollapseAll")
        }

        function sortedSubcategories()
        {
            let subcategories = getSelectedCategoryData.value.data
            let sortedSubcategories = []
            let categoryExist = false

            for(let sc in subcategories)
            {
                for(let c in sortedSubcategories)
                {
                    if(sortedSubcategories[c].subcategory == subcategories[sc].subcategory)
                    {
                        categoryExist = true
                    }
                }

                if(categoryExist == false) { sortedSubcategories.push({"subcategory": subcategories[sc].subcategory, "items": []})}
            }

            for(let c in sortedSubcategories)
            {
                for(let sc in subcategories)
                {
                    if(subcategories[sc].subcategory == sortedSubcategories[c].subcategory)
                    {
                        // sortedSubcategories[c].items += (JSON.stringify(subcategories[sc]) + ",")
                        sortedSubcategories[c].items.push(subcategories[sc])

                    }

                }
            }

            return sortedSubcategories
        }

        return {
            //vuex
            getSelectedCategoryData,

            //functions
            subcategoryCollapse,
            subcategoriesCollapseAll,
            sortedSubcategories
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
#selectedCategoryTitle { margin: auto; padding: 0px; text-align: center; font-weight: bold; font-size: 24px;}
#subcategoryInfoMenu { margin: 0px 0px 0px 0px; padding: 0px;}
#subcategoryData { margin: 220px 0px 0px 0px; padding: 0px;}
#subcategoryTopInfo 
{ 
    position: absolute; 
    display: block; 
    width: 100%; 
    max-width: 49vw; 
    margin: auto; 
    padding: 20px 0px 40px 0px; 
    color: white;
    /* border-bottom: 1px solid black;  */
    background-color: black;
}
#subcategoryAbout { width: 100%; max-width: 440px; margin: auto; margin-top: 10px;}
#searchBarInput { width: 400px; font-size: 22px;}

/*** classes ***/
.subcategoryTitle { width: 90%; font-size: 20px; user-select: none; text-align: left; border-top: 0px solid black;}
.subcategoryData { width: 90%; margin: auto; text-align: left;}
.subcategoryDataSection { width: 90%; margin: auto; margin-bottom: 40px; text-align: left; font-size: 20px;}
.link a { text-decoration: none;}
.categorySubcategoriesCount { opacity: 0.4; user-select: none;}
</style>