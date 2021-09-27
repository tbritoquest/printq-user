<template>
   <h5 class="title is-5">Brown Kraft Cards</h5>
   
    <div id="load-script"></div>
   <hr>

   <form onsubmit="return mySubmitFunction(event)">
    
       <div v-show="currentStep===1">
            <PersonalInfo @logPersonalInfo="logPersonalInfo" />
       </div>

       <div v-show="currentStep===2" class="box">
            <Project @logProjectInfo="logProjectInfo" @previous="previous" />
       </div>

        <div v-show="currentStep===3">
            <DateInfo @logDateInfo="logDateInfo"  @previous="previous" />
        </div>

   </form>

    <Review @handleSubmit="handleSubmit" :personalInfoObj="personalInfoObj" :projectInfoObj="projectInfoObj" :dateInfoObj="dateInfoObj" v-if="currentStep===4" @previous="previous" />
    
</template>

<script>
import {ref} from 'vue'
import PersonalInfo from '../PersonalInfo.vue'
import DateInfo from '../DateInfo.vue'
import Project from '../products/projects/brown-kraft-project.vue'
import Review from '../Review.vue'
import axios from '../../http-common'
import Swal from 'sweetalert2'

export default {
    components: {
        PersonalInfo,
        DateInfo,
        Project,
        Review
    },
    data(){
        return {
            personalInfoObj: null,
            projectInfoObj: null,
            dateInfoObj:null,
            showPersonalInfo: true,
            showDateInfo: false,
            formStep: [1]
        }
    },
    methods:{
        logPersonalInfo(event){
            this.personalInfoObj = event
            this.formStep.push(2)
        },
        logProjectInfo(event){
            this.projectInfoObj = event
            this.formStep.push(3)
        },
        logDateInfo(event){
            this.dateInfoObj = event
            this.formStep.push(4)
            /**
             * submit form
             */
        },
        previous(event){
            this.formStep.pop()
        },
        
        handleSubmit(event){
           
            axios.post("/orders", {
                customerId: this.personalInfoObj.customerId,
                specifications: JSON.stringify(this.projectInfoObj),
                notes: this.dateInfoObj.notes,
                sampleDate: this.dateInfoObj.sampleDateValue
            })
                .then(response => {
                    Swal.fire(
                        'Order submitted',
                        '',
                        'success'
                    )
                    
                })
                .catch(error => {
                    console.log(error)
                })
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