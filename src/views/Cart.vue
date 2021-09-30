<template>
  <div id="cart">
      <div class="columns is-variable is-8" v-if="jobsCount">
        <div class="column is-two-thirds" >
         
          <h1  class="title is-3">Shopping Cart: {{jobsCount}} item<span v-if="jobsCount>1">s</span></h1>
          
          <div class="divider-40"></div>

          <div class="items">
            <div v-for="(job,index) in jobs">
              <div class="flex">
                <h4 class="subtitle is-4">{{job.specifications["Product"]}} - {{job.specifications["Product Category"]}}</h4>
                <a href="#" class="remove-btn" @click="remove(index)">Remove</a>
              </div>
              <ul class="specs">
                <li v-for="(value, propertyName) in job.specifications">
                    <span style="font-weight:bold;">{{propertyName}}</span> : {{value}}
                </li>
              </ul>

              <p><span style="font-weight:bold;">Notes:</span> {{job.notes}}</p>
              <p><span style="font-weight:bold;">Sample Date:</span> {{job.sampleDate}}</p>
              <hr>
            </div>
          </div> 

        </div>
       
        <div class="column">
          <div style="text-align:right;">
            <router-link :to="{name: 'Products'}" class="text-underline" style="color:#333;">Continue Shopping</router-link>
          </div>
          <div class="divider-40"></div>
          <div class="box">
            <h5 class="title is-5">Customer Details</h5>
            <div class="flex">
                <span>Name:</span>
                <span>{{customer.firstName}} {{customer.lastName}}</span>
            </div>
            <div class="flex"> 
              <span>Email:</span>
              <span>{{customer.email}}</span>
            </div>
            <div class="flex">
              <span>Phone:</span>
              <span>{{customer.phone}}</span>
            </div>
            <div class="flex">
              <span>Address:</span>
              <span>{{customer.address}}</span>
            </div>

            <hr>
            <button class="button is-medium is-black is-fullwidth" @click="this.$store.dispatch('placeOrder')">PLACE ORDER</button>
          </div>
        </div>
      </div>

      <div class="column is-two-thirds" v-else>
          <div class="divider-40"></div>
        <p class="title is-3">Shopping Cart is empty.</p>
        <router-link :to="{name: 'Products'}" class="text-underline" style="color:#333;">Continue Shopping</router-link>

      </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      
    }
  },
  methods:{
    remove(index){
      this.$store.dispatch('removeJob',index)
    }
  },
  computed:{
    customer(){
      return this.$store.state.customer
    },
    jobs(){
       window.x = this.$store.state.jobs[0]
        return this.$store.state.jobs
    },
    jobsCount(){
      return this.$store.getters.jobsCount
    }
  }
}
</script>

<style>
  #cart{
    width:100%;
    max-width:1440px;
    margin:40px auto;
  }
 #cart .box .flex{
   gap:1em;
 }
 #cart .flex{
   flex-direction: row;
   justify-content: space-between;
 }
 #cart .remove-btn{
   font-style: normal;
    font-weight: 700;
    font-size: .75rem;
    line-height: 1.125rem;
    letter-spacing: .03em;
    text-decoration: underline;
    text-transform: uppercase;
    color: #949494;
 }
</style>