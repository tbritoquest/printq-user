<template>
    <!-- <h1>Review</h1> -->

    <div class="columns">
        <div class="column">
            <label class="label">First Name</label>
            <div class="control">
                {{personalInfo.firstName}}
            </div>
        </div>
        <div class="column">
            <label class="label">Last Name</label>
            <div class="control">
                {{personalInfo.lastName}}
            </div>
        </div>
    </div>


    <div class="columns">
        <div class="column">
            <label class="label">Address</label>
            <div class="control">
                {{personalInfo.address}}
            </div>
        </div>
    </div>

    <div class="columns">
        <div class="column">
            <label class="label">Email</label>
            <div class="control">
                {{personalInfo.email}}
            </div>
        </div>
        <div class="column">
            <label class="label">Phone</label>
            <div class="control">
                {{personalInfo.phone}}
            </div>
        </div>
    </div>
  
    <h6>Project Specs</h6>
    <ul>
        <li v-for="(value,propertyName) in projectInfo">{{propertyName}} : {{value}}</li>
    </ul>

    <hr>

    <div class="columns">
        <div class="column">
            <label class="label">Order Date</label>
            <div class="control">
                {{dateInfo.orderDateValue}}
            </div>
        </div>
        <div class="column">
            <label class="label">Sample Date</label>
            <div class="control">
                {{dateInfo.sampleDateValue}}
            </div>
        </div>
    </div>

        <div class="columns">
        <div class="column">
            <label class="label">Notes</label>
            <div class="control">
                {{dateInfo.notes}}
            </div>
        </div>
       
    </div>

    <button @click="previous" class=" previous" type="button">PREVIOUS STEP</button>
    <button @click="handleSubmit" class="button next" type="button" >Add to cart<i class="fas fa-arrow-right" style="margin-left:12px;"></i></button>
</template>

<script>
export default {
    emits: ['previous','handleSubmit'],
    props: ['personalInfoObj','projectInfoObj','dateInfoObj'],
    data(){
        return {
            personalInfo:this.personalInfoObj,
            projectInfo: this.projectInfoObj,
            dateInfo: this.dateInfoObj
        }
    },
   methods: {
       previous(){
            this.$emit("previous")
        },
       handleSubmit(){
           this.$emit("handleSubmit")
       }
   }
}
</script>

<style>

</style>