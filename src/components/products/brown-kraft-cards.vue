<template>
   <h5 class="title is-5">Brown Kraft Cards</h5>
   
    <div id="load-script"></div>
   <hr>

   <form onsubmit="return mySubmitFunction(event)">

       <div v-show="currentStep===1" class="box">
            <Project @logProjectInfo="logProjectInfo"  />
       </div>

        <div v-show="currentStep===2">
            <DateInfo @logDateInfo="logDateInfo"  @previous="previous" />
        </div>

   </form>

    <Review @handleSubmit="handleSubmit" :personalInfoObj="personalInfoObj" :projectInfoObj="projectInfoObj" :dateInfoObj="dateInfoObj" v-if="currentStep===3" @previous="previous" />
    
</template>

<script>
import {ref} from 'vue'
import DateInfo from '../DateInfo.vue'
import Project from '../products/projects/brown-kraft-project.vue'
import Review from '../Review.vue'
import axios from '../../http-common'
import Swal from 'sweetalert2'
import router from '../../router'

export default {
    components: {
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
        
        logProjectInfo(event){
            this.projectInfoObj = event
            this.formStep.push(2)
        },
        logDateInfo(event){
            this.dateInfoObj = event
            this.formStep.push(3)
        },
        previous(event){
            this.formStep.pop()
        },
        
        handleSubmit(event){

            const job = {
                customerId: this.personalInfoObj.customerId,
                printSpecs: JSON.stringify(this.projectInfoObj),
                notes: {notes: [this.dateInfoObj.notes]},
                sampleDate: this.dateInfoObj.sampleDateValue,
                name: this.dateInfoObj.name
            }

            this.$store.dispatch('addToCart', job)
            router.push({ path: 'cart' })
           

        }

    },
    computed:{
        currentStep(){
            return this.formStep[this.formStep.length-1]
        }
    },
    mounted() {
        this.personalInfoObj = this.$store.state.customer
  },
}
</script>

<style>

</style>