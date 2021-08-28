<template>
  <div class="grid-2">
      <div class="sidebar">

          <ul class="flex">
               <li
                    v-for="tab in tabs"
                    v-bind:key="tab"
                    v-bind:class="['tab-button', { active: currentTab === tab }]"
                    v-on:click="currentTab = tab"
                >
                    {{ tab }}
                </li>
          </ul>
      </div>
      <div class="content">
          <component v-bind:is="currentTabComponent" ></component>
      </div>
  </div>
</template>

<script>
import BrownKraftCards from '../components/products/brown-kraft-cards.vue'
import AkuafoilCards from '../components/products/akuafoil.vue'

export default {
    components:{
             BrownKraftCards,
             AkuafoilCards
         },
     data() {

        return {
        currentTab: 'Home',
        tabs: ['Brown Kraft Cards','Akuafoil Cards']
        }
    },
    computed: {
        currentTabComponent() {
            return this.currentTab.replace(/\s/g,"")
        }
    }

}
</script>

<style>
    ul.flex li{
        padding:0.5em;
    }
    .tab-button{
        cursor:pointer;
    }
    .content{
        position: relative;
        background: #3e40950d;
        padding:2em;
    }
    .sidebar{
        border-right: 1px solid #e3dede;
    }

</style>