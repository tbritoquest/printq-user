<template>

    <!--ORDER DATE field-->
     <div class="field is-horizontal">
        <div class="field-label is-normal">
            <label class="label">Order Date</label>
        </div>
        <div class="field-body">
            <div class="field is-narrow">
            <div class="control">
                <input type="date" class="date-input" name="orderDate" v-model="orderDateValue" disabled>
            </div>
            </div>
        </div>
    </div>

    <!--SAMPLE DATE field-->
    <div class="field is-horizontal">
        <div class="field-label is-normal">
            <label class="label">Sample Date</label>
        </div>
        <div class="field-body">
            <div class="field is-narrow">
            <div class="control">
                <input type="date" class="date-input" name="sampleDate"
                                    v-model="sampleDateValue"
                                    :min="sampleDateMin"
                                    :disabled="isSampleDatePending"><br>
                <input type="checkbox" id="dateCheckbox" name="sampleDate" value="pending" v-model="isSampleDatePending">
                <label for="date"> Date pending</label><br>              
                <p class="help is-danger" v-if="isInvalid('sampleDate')">Please select a date</p>
            </div>
            </div>
        </div>
    </div>

    <!--JOB NAME field-->
    <div class="field is-horizontal">
        <div class="field-label is-normal">
            <label class="label">Job Name</label>
        </div>
        <div class="field-body">
            <div class="field">
            <div class="control">
                <input class="input" v-bind:class="{ 'is-danger': isInvalid('jobName') }" type="text" v-model="jobName">
            </div>
            <p class="help is-danger" v-if="isInvalid('jobName')">
                This field is required
            </p>
            </div>
        </div>
    </div>

    <!-- NOTES field-->
    <div class="field is-horizontal">
        <div class="field-label is-normal">
            <label class="label">Notes</label>
        </div>
        <div class="field-body">
            <div class="field">
            <div class="control">
                <textarea class="textarea" placeholder="Notes" v-model="notes"></textarea>
            </div>
            </div>
        </div>
    </div>

    <br><br>

    <button @click="previous" class=" previous" type="button">PREVIOUS STEP</button>
    <button @click="handleSubmit" class="button next" type="button" >NEXT<i class="fas fa-arrow-right" style="margin-left:12px;"></i></button>

</template>

<script>

import format from 'date-fns/format'

export default {
    emits: ["logDateInfo","previous"],
    data(){
        
        return{
            errors:null,
            orderDateValue:format(new Date(),'yyyy-MM-dd'),
            sampleDateMin:format(new Date(),'yyyy-MM-dd'),
            sampleDateValue:"",
            notes: "",
            isSampleDatePending: false,
            jobName: ""
        }

    },
   
    methods: {
        handleSubmit(){
           this.checkForm()

            let dateSample = this.isSampleDatePending? "pending":this.sampleDateValue
            
           if(this.errors.size===0){
                this.$emit("logDateInfo", {orderDateValue:this.orderDateValue,sampleDateValue:dateSample,notes:this.notes,name:this.jobName})
           }
        },
        checkForm(){
            this.errors = new Set()
            if(!this.isSampleDatePending && !this.sampleDateValue){
                this.errors.add("sampleDate")
            }

            if(this.jobName.length<1){
                this.errors.add("jobName")
            }
        },
        isInvalid(key){
            return this.errors && this.errors.has(key)
        },
        previous(){
            this.$emit("previous")
        },
    },
    watch: {
        sampleDateValue: function(val){
            this.isSampleDatePending = false
        }
    }
 
}
</script>

<style>
    button.round.primary{
        background: var(--purple-color);
        color: #fff;
    }
    
</style>