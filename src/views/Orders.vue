<template>
   <!-- <PersonalInfoForm  /> -->
   <div class="orders">

       <div class="flex">
            <h1 class="title">Orders</h1>
            <button class="button is-primary" @click="openNewCustomerForm">Add Customer</button>
       </div>

       <div class="action_bar">
           <div class="control">
                <i class="fas fa-search"></i>
                <input class="input" type="text" placeholder="Search by Job Name" v-model="search" @keyup="searchit">
            </div>

           <div class="num-entries">
                <span>Filter: </span>
                <div class="select">
                    <select v-model="selected" >
                        <option value="0">Today</option>
                        <option value="1">Yesterday</option>
                        <option value="7">Last 7 days</option>
                        <option value="30">Last 30 days</option>
                        <option value="90">Last 90 days</option>
                    </select>

                </div>
           </div>
        
       </div>


        <h5 class="title is-5" style="font-style:italic;">Results: <span style="font-weight:500;" v-if="orders">{{orders.length}}</span> orders placed</h5>

        <div v-for="(order, index) in orders" class="order-list mb-5">
            <div class="grid border" style="background: #efeeee;">
                <div>
                    <h6 class="title is-6">Order ID</h6>
                    <h4 class="subtitle is-5">{{formatOrderId(order.id)}}</h4>
                </div>
                <div>
                    <h6 class="title is-6">Customer Name</h6>
                    <h5 class="subtitle is-5">{{order.Customer.firstName}} {{order.Customer.lastName}}</h5>
                </div>
                <div>
                    <h6 class="title is-6">Total Jobs</h6>
                    <h5 class="subtitle is-5" style="padding-left: 2em;">{{order.Jobs.length}}</h5>
                </div>
                <div>
                    <h6 class="title is-6">Created On</h6>
                    <h5 class="subtitle is-5">{{format(new Date(order.createdAt), 'yyyy-MM-dd')}}</h5>
                </div>
            </div>
           
            <div class="grid border job-header" style="border-bottom:0;border-top:0;">
                <div><h6 class="title is-6">Job ID</h6></div>
                <div><h6 class="title is-6">Job Name</h6></div>
                <div><h6 class="title is-6">Job Status</h6></div>
                <div></div>
            </div>
            
            <div class="grid border job-list" v-for="(job, index) in order.Jobs" >
                <p>{{formatOrderId(order.id)}}-00{{index+1}}</p>
                <p>Name</p>
                <p>{{job.status}}</p>
            </div>



        </div>


     
   </div>

    
</template>

<script>
import PersonalInfoForm from "../components/PersonalInfoForm.vue"
import axios from "../http-common"
import router from '../router'
import _ from 'lodash'
import { format } from 'date-fns'

export default {
    components:{
        PersonalInfoForm
    },
    data(){
        return{
            orders: null,
            selected: 30,
            page: 1,
            numOfPages: null,
            next: null,
            prev: null,
            search: '',
            showNewCustomerForm:false,
            format
        }
    },
    methods:{
        formatOrderId(id){
            return `0000${id}`
        },
        searchit: _.debounce(
            function () { 
                // this.searchCustomers()
                this.getOrders()
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
        getOrders(page){
            axios.get('/orders')
            .then(response => {
                this.orders = response.data.results
                
            })
            .catch(error => {
                // handle error
                console.log(error);
                 this.numOfPages = null
                this.orders = null
            })
        },
        openNewCustomerForm(){
            document.getElementById('createCustomerForm').classList.add('is-active')
        }

    },
    watch: {
        selected: function(val) {
            this.getOrders(1)
        },
        page: function(val){
            this.getOrders()
        }
        
    },
    mounted(){
       this.getOrders()
        

    }
    
}
</script>

<style>
    .orders .grid{
        display: grid;
        grid-template-columns: 1fr 2fr 1fr 2fr;
        gap:1em;
    }
   .orders{
       margin:40px 3em;
       padding-bottom:40px;
   }
    .orders .table th{
        text-align: left;
        color: #04162b;
        font-size: 14px;
        padding: 1.2em .75em 0 .75em;
        font-weight:500;
    }
    .orders .table td{
        padding: 1em .75em;
        width:0.1%;
        white-space: nowrap;
        vertical-align: middle;
    }
    .orders .action_bar{
        background: #fcfbfc;
        padding:1em;
        margin-bottom:2em;
        display:grid;
        grid-template-columns: 1fr 1fr;
    }
    .orders .action_bar input{
        padding-left: 2.5em;
    }
    .orders .action_bar input::placeholder{
        color: #a7aab1;
    }
    .orders .action_bar .fa-search{
        font-size: 1.2em;
        position: absolute;
        top: 10px;
        left: 0.5em;
        z-index: 1;
        color:#9499a1;
    }
    .orders .num-entries{
        display: flex;
        align-items: center;
        gap: 0.5em;
    }
    .orders .flex{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    .orders .pagination .flex{
        height: 100%;
        align-items: center;
        gap: 0.5em;
    }
    .orders nav.pagination{
        background: #fcfbfc;
        padding:1em;
    }
    .orders .border{
        border:1px solid grey;
        padding:1em;
    }
    .order-list .title{
        color:grey;
        text-transform: uppercase;
    }
    .job-header .title{
        color:#333;
        font-weight:600 !important;
    }
    .job-list{
        padding-top:12px;
        padding-bottom:12px;
        border-bottom: 0 !important;
    }
    .job-list:last-child{
        border-bottom:1px solid grey !important;
    }
</style>