<template>
    <h3 class="title is-3">Personal Info</h3>

    <p>{{firstName}}</p>
    <div class="columns">
        <!--first name-->
        <div class="column">
                <div class="field">
                    <label class="label">First name</label>
                    <div class="control">
                        <input v-model="firstName" class="input" type="text" placeholder="First name">
                    </div>
                </div>
        </div>
        <!--last name-->
        <div class="column">
            <div class="field">
                    <label class="label">Last name</label>
                    <div class="control">
                        <input v-model="lastName" class="input" type="text" placeholder="Last name">
                    </div>
                </div>
        </div>
    
    </div>

    <div class="columns">
        <div class="column">
                <div class="field">
                <label class="label">Address</label>
                <div class="control">
                    <input v-model="address" class="input" type="text" placeholder="Address">
                </div>
        </div>
            </div>
        </div>

        <div class="columns">
        <div class="column">
                <div class="field">
                <label class="label">Email</label>
                <div class="control">
                    <input v-model="email" class="input" type="email" placeholder="Email">
                </div>
            </div>
            </div>

            <div class="column">
                <div class="field">
                <label class="label">Phone number</label>
                <div class="control">
                    <input v-model="phone" class="input" type="tel" placeholder="Phone number">
                </div>
            </div>
            </div>
        </div><br><br>

        <button @click="handleSubmit" class="button round next" type="button"><i class="fas fa-arrow-right"></i></button>
</template>

<script>
import {ref} from 'vue'
export default {
    emits: ["logPersonalInfo"],
    data(){
        return{
            firstName: "",
            lastName: "",
            address: "",
            email: "",
            phone: ""
        }

    },
    methods: {
        handleSubmit(){
            this.$emit("logPersonalInfo", {firstName: this.firstName,lastName: this.lastName,address: this.address,email: this.email,phone: this.phone})
        }
    }
 
}
</script>

<style>
   
</style>