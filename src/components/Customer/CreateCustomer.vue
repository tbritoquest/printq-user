<template>
<div class="modal" id="createCustomerForm" >
  <div class="modal-background"></div>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">New Customer</p>
      <button class="delete" aria-label="close" @click="closeForm"></button>
    </header>
    <section class="modal-card-body">

<div style="max-width:1024px;width:100%;">
    <!-- <h3 class="title is-3">Personal Info</h3> -->

    <div class="notification is-light" v-bind:class="{ 'is-danger': this.error}" v-if="this.error">
      
        <p>{{error}} </p>
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
</div>


 </section>
    <footer class="modal-card-foot">
      <button class="button is-success" @click="handleSubmit">Add customer</button>
      <button class="button" @click="closeForm">Cancel</button>
    </footer>
  </div>
</div>
</template>

<script>
import axios from "../../http-common"
import Swal from 'sweetalert2'

export default {
    // emits: ["logPersonalInfo"],
    data(){
        return{
            isActive: true,
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
        closeForm(){
            document.getElementById('createCustomerForm').classList.remove('is-active')
        },
        handleForm(){
            this.isActive = false
        },
        handleSubmit(){
            this.checkForm()
            this.error = null
            if(this.errors.size === 0){
                axios.post('/customers', {
                    firstName: this.firstName,
                    lastName: this.lastName,
                    address: this.address,
                    email: this.email,
                    phone: this.phone
                })
                .then(response => {
                    
                    this.resetForm()
                    // display success notification
                    const Toast = Swal.mixin({
                            toast: true,
                            position: 'top-end',
                            showConfirmButton: false,
                            timer: 3000,
                            timerProgressBar: true,
                            didOpen: (toast) => {
                                toast.addEventListener('mouseenter', Swal.stopTimer)
                                toast.addEventListener('mouseleave', Swal.resumeTimer)
                            }
                            })

                    Toast.fire({
                    icon: 'success',
                    title: 'Saved successfully'
                    })

                    this.closeForm()

                })
                .catch(error => {
                    //display error notification
                    // let {message} = error.response.data[0]
                    // this.error = message
                    this.error = error.response.data[0].message
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
        resetForm(){
            this.errors= null
            this.firstName= null
            this.lastName= null
            this.address= null
            this.email= null
            this.phone= null
            this.error= null
        }
    },
 
 
}
</script>

<style>
   
</style>