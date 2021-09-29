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

                 
                <router-link :to="{name: 'Products'}" class="navbar-item" >Products</router-link>
                <router-link :to="{name: 'Customers'}" class="navbar-item">Customers</router-link>
                <a class="navbar-item">
                    Orders
                </a>

                <a class="navbar-item">
                    Settings
                </a>
                <router-link :to="{name: 'Cart'}" class="navbar-item" v-if="isCustomerSignedIn"><i class="fas fa-shopping-cart"></i></router-link>
        
            </div>
        </div>
        </nav>
</template>

<script>
export default {
    computed: {
        customer(){ 
            return this.$store.customer
        },
        isCustomerSignedIn(){
            return this.$store.state.isCustomerSignedIn
        }
    }
}
</script>

<style>

</style>