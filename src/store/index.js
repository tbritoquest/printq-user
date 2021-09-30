import {createStore} from 'vuex'


export default createStore({
    state:{
        customer: {}, //id: '1',name: 'John Doe', email: 'fake@email.com', address: '123 example lane', phone: '1234567890'
        isCustomerSignedIn: false,
        jobs: []
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
            job.specifications = JSON.parse(job.specifications)
            state.jobs.push(job)
        },
        REMOVE_JOB(state, index){
            state.jobs.splice(index,1)
        }
    },
    actions:{
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
            console.log("blah")
            commit('REMOVE_JOB', payload)
        }
    }
  })