<template>
    <nav class="navbar is-fixed-top" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <a class="navbar-item" href="https://bulma.io">
            <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28">
            </a>

            <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            </a>
        </div>

        <div id="navbarBasicExample" class="navbar-menu">
            <div class="navbar-start">
            </div>

            <div class="navbar-end">
                <router-link :to="{name: 'Customers'}" class="navbar-item">Customers</router-link>
                <router-link :to="{name: 'Products'}" class="navbar-item" >Products</router-link>
                <router-link :to="{name: 'Orders'}" class="navbar-item">Orders</router-link>

                <a class="navbar-item">
                    Settings
                </a>
                <router-link :to="{name: 'Cart'}" class="navbar-item shopping-cart" v-if="isCustomerSignedIn">
                    <i class="fas fa-shopping-cart"></i>
                    <span class="items" v-if="jobsCount">{{jobsCount}}</span>
                </router-link>
        
            </div>
        </div>
        </nav>
</template>

<script>
export default {
    computed: {
        customer(){ 
            return this.$store.state.customer
        },
        isCustomerSignedIn(){
            return this.$store.state.isCustomerSignedIn
        },
        jobsCount(){
            return this.$store.getters.jobsCount
        }
    }
}
</script>

<style>
    .shopping-cart .items{
        width: .875rem;
        height: .875rem;
        background-color: #d4d4d4;
        top: 0.6rem;
        right: 0.275rem;
        font-family: poppins,sans-serif;
        font-style: normal;
        font-weight: 400;
        font-size: .625rem;
        line-height: .9375rem;
        text-transform: uppercase;
        color: #111;
        border-radius: 50%;
        text-align: center;
        position: absolute;
    }
</style>