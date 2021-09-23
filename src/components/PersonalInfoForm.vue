<template>
<div style="max-width:1024px;width:100%;">
    <!-- <h3 class="title is-3">Personal Info</h3> -->

    <div class="notification is-light" v-bind:class="{ 'is-danger': this.error, 'is-success': this.success }" v-if="this.error || this.success">
        <button class="delete"></button>
        <p>{{error || success}} </p>
    </div>

    <div class="columns">
        <!--first name-->
        <div class="column">
                <div class="field">
                    <label class="label">First name</label>
                    <div class="control">
                        <input v-model="firstName" class="input" type="text"   placeholder="First name"  v-bind:class="{ 'is-danger': isInvalid('fName') }" >
                    </div>
                    
                </div>
        </div>
        <!--last name-->
        <div class="column">
            <div class="field">
                    <label class="label">Last name</label>
                    <div class="control">
                        <input v-model="lastName" class="input" type="text" placeholder="Last name"  v-bind:class="{ 'is-danger': isInvalid('lName') }">
                    </div>
                </div>
        </div>
    
    </div>

    <div class="columns">
        <div class="column">
                <div class="field">
                <label class="label">Address</label>
                <div class="control">
                    <input v-model="address" class="input" type="text" placeholder="Address"  v-bind:class="{ 'is-danger': isInvalid('address') }">
                </div>
        </div>
            </div>
        </div>

        <div class="columns">
        <div class="column">
                <div class="field">
                <label class="label">Email</label>
                <div class="control">
                    <input v-model="email" class="input" type="email" placeholder="Email"  v-bind:class="{ 'is-danger': isInvalid('email')}">
                    <p class="help is-danger" v-if="isInvalid('email')">
                        This email is invalid
                    </p>
                </div>
            </div>
            </div>

            <div class="column">
                <div class="field">
                <label class="label">Phone number</label>
                <div class="control">
                    <input v-model="phone" class="input" type="tel" placeholder="Phone number"  v-bind:class="{ 'is-danger': isInvalid('phone') }">
                    <p class="help is-danger" v-if="isInvalid('phone')">
                        This phone number is invalid
                    </p>
                </div>
                
            </div>
            </div>
        </div><br><br>

        <!-- <button @click="handleSubmit" class="button round next" type="button"><i class="fas fa-arrow-right"></i></button> -->
        <button @click="handleSubmit" class="button next" type="button">NEXT<i class="fas fa-arrow-right" style="margin-left:12px;"></i></button>
</div>
</template>

<script>
import {ref} from 'vue'
import axios from 'axios'

export default {
    emits: ["logPersonalInfo"],
    data(){
        return{
            errors: null,
            firstName: null,
            lastName: null,
            address: null,
            email: null,
            phone: null,
            error: null,
        }

    },
    methods: {
        handleSubmit(){
            this.checkForm()
            this.error = null
            if(this.errors.size === 0){
                axios.post('/api/customers', {
                    firstName: this.firstName,
                    lastName: this.lastName,
                    address: this.address,
                    email: this.email,
                    phone: this.phone
                })
                .then(response => {
                    console.log(response);
                })
                .catch(error => {
                    this.error = error
                    console.log({error});
                })
            }
            

            // if(this.errors.size===0){
            //     this.$emit("logPersonalInfo", {firstName: this.firstName,lastName: this.lastName,address: this.address,email: this.email,phone: this.phone})
            // }

        },
        checkForm(){
           this.errors = new Set()

            if(!this.firstName){
                this.errors.add("fName")
            }
            if(!this.lastName){
                this.errors.add("lName")
            }
             if(!this.address){
                this.errors.add("address")
            }
            if(!this.email){
                this.errors.add("email")
            }else if(!this.validEmail(this.email)){
                this.errors.add("email")
            }

            if(!this.phone){
                this.errors.add("phone")
            }

        },
        validEmail(email){
            let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        },
        isInvalid(key){
            return this.errors && this.errors.has(key)
        },
    },
 
 
}
</script>

<style>
   
</style>