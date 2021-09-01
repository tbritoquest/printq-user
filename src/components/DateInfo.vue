<template>
    <!-- <h3 class="title is-3">Dates</h3> -->

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

    <div class="field is-horizontal">
    <div class="field-label is-normal">
        <label class="label">Sample Date</label>
    </div>
    <div class="field-body">
        <div class="field is-narrow">
        <div class="control">
            <input type="date" class="date-input" name="sampleDate"
                                v-model="sampleDateValue"
                                :min="sampleDateMin">
            <p class="help is-danger" v-if="isInvalid('sampleDate')">
                        Please select a date
            </p>
        </div>
        </div>
    </div>
    </div>


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

        <!-- <button @click="previous" class="button round previous" type="button"><i class="fas fa-arrow-left"></i></button>
        <button @click="handleSubmit" class="button round next primary" type="button"><i class="fas fa-arrow-right"></i></button> -->

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
            notes: ""
        }

    },
   
    methods: {
        handleSubmit(){
           this.checkForm()

           if(this.errors.size===0){
                this.$emit("logDateInfo", {orderDateValue:this.orderDateValue,sampleDateValue:this.sampleDateValue,Notes:this.notes})
           }
        },
        checkForm(){
            this.errors = new Set()
            if(!this.sampleDateValue){
                this.errors.add("sampleDate")
            }
        },
        isInvalid(key){
            return this.errors && this.errors.has(key)
        },
        previous(){
            this.$emit("previous")
        },
       
    }
 
}
</script>

<style>
    button.round.primary{
        background: var(--purple-color);
        color: #fff;
    }
</style>