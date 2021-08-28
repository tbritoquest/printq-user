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
            <textarea class="textarea" placeholder="Notes"></textarea>
        </div>
        </div>
    </div>
    </div>

    <br><br>

        <button @click="previous" class="button round previous" type="button"><i class="fas fa-arrow-left"></i></button>
        <button @click="handleSubmit" class="button round next primary" type="button"><i class="fas fa-arrow-right"></i></button>

       
</template>

<script>

import format from 'date-fns/format'

export default {
    emits: ["previous","logDateInfo"],
    data(){
        return{
            orderDateValue:format(new Date(),'yyyy-MM-dd'),
            sampleDateMin:format(new Date(),'yyyy-MM-dd'),
            sampleDateValue:""
        }

    },
   
    methods: {
        handleSubmit(){
           
            // this.$emit("logPersonalInfo", {firstName: this.firstName,lastName: this.lastName,address: this.address,email: this.email,phone: this.phone})
        },
        previous(){
            this.$emit("previous")
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