<template>
   <h5 class="title is-5">Brown Kraft Cards</h5>
   
    <div id="load-script"></div>
   <hr>

   <form onsubmit="return mySubmitFunction(event)">
    
       <PersonalInfo @logPersonalInfo="logPersonalInfo" v-if="currentStep===1"/>

        <Project @logProjectInfo="logProjectInfo" v-if="currentStep===2" @previous="previous" />

        <DateInfo @logDateInfo="logDateInfo" v-if="currentStep===3" @previous="previous" />

   </form>

   

</template>

<script>
import {ref} from 'vue'
import PersonalInfo from '../PersonalInfo.vue'
import DateInfo from '../DateInfo.vue'
import Project from '../products/projects/brown-kraft-project.vue'



export default {
    components: {
        PersonalInfo,
        DateInfo,
        Project,
    },
    data(){
        return {
            personalInfoObj: null,
            projectInfoObj: null,
            showPersonalInfo: true,
            showDateInfo: false,
            formStep: [1]
        }
    },
    methods:{
        logPersonalInfo(event){
            console.log("hello- logPErsonal Info")
            this.personalInfoObj = event
            this.formStep.push(2)
        },
        logProjectInfo(event){
            this.projectInfoObj = event
            this.formStep.push(3)
        },
        logDateInfo(event){
            console.log("log date info")
            /**
             * submit form
             */
        },
        previous(event){
            console.log("previous")
            this.formStep.pop()
        }

    },
    computed:{
        currentStep(){
            // console.log(this.formStep)
            return this.formStep[this.formStep.length-1]
        }
    },
    mounted() {
        console.log("mounted")
        /*
    let externalScript = document.createElement('script')
    externalScript.setAttribute('src', '../../scripts/test.js')
    document.head.appendChild(externalScript)
    */
//    let divScripts = document.getElementById('load-script')
//     let newScript = document.createElement('script')
//     newScript.src = 'https://cse.google.com/cse.js?cx=007968012720720263530:10z7awj2l37'
//     divScripts.appendChild(newScript)
  },
}
</script>

<style>

</style>