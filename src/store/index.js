import {createStore} from 'vuex'
import axios from '../http-common'
import router from '../router'

export default createStore({
    state:{
        customer: {}, //id: '1',name: 'John Doe', email: 'fake@email.com', address: '123 example lane', phone: '1234567890'
        isCustomerSignedIn: false,
        jobs: [],
        user: {id:'1'}
    },
    getters:{
        jobsCount(state){
            return state.jobs.length
        },
    },
    mutations: {
        UPDATE_POST (state, customer) {
            state.customer = customer
        },
        SIGNIN_CUSTOMER(state){
            state.isCustomerSignedIn = true
        },
        ADD_TO_CART(state, job){
            console.log("JOB", job)
            job.printSpecs = JSON.parse(job.printSpecs)
            state.jobs.push(job)
        },
        REMOVE_JOB(state, index){
            state.jobs.splice(index,1)
        },
        PLACE_ORDER(state){
            axios.post('orders/', {
                agentId: state.user.id,
                customerId: state.customer.id,
                jobs: state.jobs
              })
              .then(response =>{
                state.customer = {}
                state.isCustomerSignedIn = false 
                state.jobs = []
                router.push('orders')
              })
              .catch(error => {
                console.log(error)
              });
        },
        RESET_CUSTOMER(state){
            state.customer = {}
            state.isCustomerSignedIn = false
            state.jobs =  []
        }
    },
    actions:{
        resetCustomer({commit}){
            commit('RESET_CUSTOMER')
        },
        updateCustomer ({ commit }, payload) {
            commit('UPDATE_POST', payload)
        },
        signInCustomer({commit}){
            commit('SIGNIN_CUSTOMER')
        },
        addToCart({commit}, payload){
            commit('ADD_TO_CART', payload)
        },
        removeJob({commit}, payload){
            commit('REMOVE_JOB', payload)
        },
        placeOrder({commit}){
            commit('PLACE_ORDER')
        }
    }
  })