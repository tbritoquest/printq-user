<template>
   <!-- <PersonalInfoForm  /> -->
   <div class="customers">

       <div class="flex">
            <h1 class="title">Customers</h1>
            <button class="button is-primary" @click="openNewCustomerForm">Add Customer</button>
       </div>

       <div class="action_bar">
           <div class="num-entries">
                <span>Show</span>
                <div class="select">
                    <select v-model="selected" >
                        <!-- <option value=10>10</option> -->
                        <!-- <option value=50>50</option>
                        <option value=100>100</option>
                        <option value=500>500</option>
                        <option value=1000>1000</option> -->
                        <option value=1>1</option>
                        <option value=2>2</option>
                        <option value=3>3</option>
                        <option value=5>5</option>
                        <option value=50>50</option>
                    </select>

                </div>
                 <span>entries</span>
           </div>
        
        <div class="control">
            <i class="fas fa-search"></i>
            <input class="input" type="text" placeholder="Search by name, email, phone" v-model="search" @keyup="searchit">
        </div>
       </div>
       <table class="table is-fullwidth">
           <thead>
                <tr>
                    <th>NAME</th>
                    <th>EMAIL</th>
                    <th>ADDRESS</th>
                    <th>PHONE</th>
                    <th class="center">ENABLED</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(customer, index) in customers" >
                    <td>{{customer.firstName}} {{customer.lastName}}</td>
                    <td>{{customer.email}}</td>
                    <td>{{customer.address}}</td>
                    <td>{{customer.phone}}</td>
                    <td class="center"><i class="fas fa-check-circle"></i></td>
                    <td>
                        <div class="dropdown" :id="'customer'+customer.id" @click="toggle(customer.id)" @mouseleave="close(customer.id)">
                            <div class="dropdown-trigger">
                                <button class="button" aria-haspopup="true" aria-controls="dropdown-menu">
                                <span>Actions</span>
                                <span class="icon is-small">
                                    <i class="fas fa-angle-down" aria-hidden="true"></i>
                                </span>
                                </button>
                            </div>
                            <div class="dropdown-menu" id="dropdown-menu" role="menu">
                                <div class="dropdown-content">
                                    <a href="#" class="dropdown-item">
                                        Edit
                                    </a>
                                    <a class="dropdown-item" @click="handleNewOrder(index)">
                                        New Order
                                    </a>
                               
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>
               
            </tbody>
       </table>

       <nav class="pagination" role="navigation" aria-label="pagination">
           <div>
               <!-- 1-11 of 1200 pages -->
               {{numOfPages}} page<span v-if="numOfPages>1">s</span>
           </div>
           <div class="flex">
               <span>The page you're on </span>
               <div class="select is-normal">
                <select v-model="page" >
                    <option v-for="option in numOfPages" :value="option">{{option}}</option>
                </select>
                </div>
                <div>
                    <a class="pagination-previous" title="This is the first page" v-if="prev" @click="handlePrevious()"><i class="fas fa-arrow-left"></i></a>
                    <a class="pagination-next" v-if="next" @click="handleNext()"><i class="fas fa-arrow-right"></i></a>
                </div>
           </div>
       </nav>
   </div>

    <CreateCustomer />
</template>

<script>
import PersonalInfoForm from "../components/PersonalInfoForm.vue"
import axios from "../http-common"
import router from '../router'
import _ from 'lodash'
import CreateCustomer from "../components/Customer/CreateCustomer.vue"

export default {
    components:{
        PersonalInfoForm,
        CreateCustomer
    },
    data(){
        return{
            customers: null,
            selected: 1,
            page: 1,
            numOfPages: null,
            next: null,
            prev: null,
            search: '',
            showNewCustomerForm:false
        }
    },
    methods:{
        searchit: _.debounce(
            function () { 
                // this.searchCustomers()
                this.getCustomers()
            }, 300
        ),   
        handleNext(){
            this.page = this.next.page
        },
        handlePrevious(){
            this.page = this.prev.page
        },
        handleNewOrder(index){
            this.$store.dispatch('updateCustomer', this.customers[index])
            router.push({ path: 'products' })
            
        },
        toggle(id){
            let openedEl = document.getElementById(`customer${id}`)
            if(openedEl) openedEl.classList.toggle("is-active")
        },
        close(id){
            let openedEl = document.getElementById(`customer${id}`)
            if(openedEl) openedEl.classList.remove("is-active")
        },
        getCustomers(page){
            console.log("getcustomers")
            axios.get(`/customers?page=${page || this.page}&limit=${this.selected}&search=${this.search}`)
            .then(response => {
                if(page) this.page = 1
                // handle success
                this.numOfPages = response.data.numOfPages
                this.customers = response.data.results
                this.next = response.data.next
                this.prev = response.data.previous
            })
            .catch(error => {
                // handle error
                console.log(error);
                 this.numOfPages = null
                this.customers = null
            })
        },
        // searchCustomers(){
        //     axios.post('/customers/searchAll',{
        //         query: this.search,
        //         page: this.page
        //     }).then(response => {
        //         console.log(response.data)
        //         this.customers = response.data
        //     })
        //     .catch(error => {
        //         console.log(error)
        //     })
        // },
        openNewCustomerForm(){
            document.getElementById('createCustomerForm').classList.add('is-active')
        }

    },
    watch: {
        selected: function(val) {
            this.getCustomers(1)
        },
        page: function(val){
            this.getCustomers()
        }
        
    },
    mounted(){
       this.getCustomers()
        

    }
    
}
</script>

<style>
   .customers{
       margin:40px 3em;
       padding-bottom:40px;
   }
    .customers .table th{
        text-align: left;
        color: #04162b;
        font-size: 14px;
        padding: 1.2em .75em;
        font-weight:500;
    }
    .customers .table td{
        padding: 1em .75em;
        width:0.1%;
        white-space: nowrap;
        vertical-align: middle;
    }
    /* .customers .table th:not(:last-child){
        border-right:1px solid grey;
    } */
    .customers .fa-check-circle{
        color:#5cbbac;
    }
    .customers .action_bar{
        background: #fcfbfc;
        padding:1em;
        margin-bottom:2em;
        display:grid;
        grid-template-columns: 1fr 1fr;
    }
    .customers .action_bar input{
        padding-left: 2.5em;
    }
    .customers .action_bar input::placeholder{
        color: #a7aab1;
    }
    .customers .action_bar .fa-search{
        font-size: 1.2em;
        position: absolute;
        top: 10px;
        left: 0.5em;
        z-index: 1;
        color:#9499a1;
    }
    .customers .num-entries{
        display: flex;
        align-items: center;
        gap: 0.5em;
    }
    .customers .flex{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    .customers .pagination .flex{
        height: 100%;
        align-items: center;
        gap: 0.5em;
    }
    .customers nav.pagination{
        background: #fcfbfc;
        padding:1em;
    }
</style>