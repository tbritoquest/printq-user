<template>
   <!-- <PersonalInfoForm  /> -->
   <div class="customers">
       <table class="table is-fullwidth">
           <thead>
                <tr>
                    <th>NAME</th>
                    <th>EMAIL</th>
                    <th>ADDRESS</th>
                    <th>PHONE</th>
                    <th>ENABLED</th>
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
                                    <a class="dropdown-item" @click="handleNewOrder()">
                                        New Order
                                    </a>
                               
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>
                <!-- <tr>
                    <td>Thalia Brito</td>
                    <td>britothalia212@gmail.com</td>
                    <td>66 Reservoir Ave Jersey City NJ, 07307</td>
                    <td>201-914-4129</td>
                    <td class="center"><i class="fas fa-check-circle"></i></td>
                    <td>action</td>
                </tr>
                <tr>
                    <td>Thalia Brito</td>
                    <td>britothalia212@gmail.com</td>
                    <td>66 Reservoir Ave Jersey City NJ, 07307</td>
                    <td>201-914-4129</td>
                    <td class="center"><i class="fas fa-check-circle"></i></td>
                    <td>action</td>
                </tr> -->
            </tbody>
       </table>
   </div>
</template>

<script>
import PersonalInfoForm from "../components/PersonalInfoForm.vue"
import axios from "../http-common"
import router from '../router'

export default {
    data(){
        return{
            customers: null,

        }
    },
    methods:{
        handleNewOrder(){
            this.$store.dispatch('updateCustomer',this.customers[0])
            router.push({ path: 'products' })
            
        },
        toggle(id){
            let openedEl = document.getElementById(`customer${id}`)
            if(openedEl) openedEl.classList.toggle("is-active")
        },
        close(id){
            let openedEl = document.getElementById(`customer${id}`)
            if(openedEl) openedEl.classList.remove("is-active")
        }

    },
    components:{
        PersonalInfoForm
    },
    mounted(){
        axios.get('/customers')
            .then(response => {
                // handle success
                this.customers = response.data
                
            })
            .catch(error => {
                // handle error
                console.log(error);
            })

        // const onClickOutside = (e) => {
        //     console.log(e.target)
        //     if (!e.target.className.includes(className)) {
        //         show = false;
        //     }

        // };



        

    }
    
}
</script>

<style>
   
    .customers .table th{
        text-align: center ;
        background: #fafafa;
        color: #797e87;
        padding: 1.2em .75em;
    }
    .customers .table td{
        padding: 1.5em .75em;
        width:0.1%;
        white-space: nowrap;
    }
    .customers .table th:not(:last-child){
        border-right:1px solid grey;
    }
    .customers .fa-check-circle{
        color:#5cbbac;
    }
</style>