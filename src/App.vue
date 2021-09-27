<template>
  
    <Navbar />
    <section class="container is-widescreen">
    
      <router-view/>
  
    </section>
  

</template>

<script>
// @ is an alias to /src
import Navbar from '@/components/Navbar.vue'

export default {
  components: {
    Navbar
  },
  mounted(){
  
  }
}
</script>

<style>
  .navbar{
    background:#fff;
    border-bottom: 2px solid #f0edf4;
  }
  .navbar a{
    color: #333;
  }
  .navbar-link.is-active, .navbar-link:focus, .navbar-link:focus-within, .navbar-link:hover, a.navbar-item.is-active, a.navbar-item:focus, a.navbar-item:focus-within, a.navbar-item:hover {
    /* background-color: #292a64;
    color: #fff; */
  }
  
  .container{
    padding-top:52px;
      width: 100%;
      max-width: 100vw !important;
      height:100vh;
  }
</style>
