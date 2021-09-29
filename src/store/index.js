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
        }
    },
    actions:{
        updateCustomer ({ commit }, payload) {
            commit('UPDATE_POST', payload)
        },
        signInCustomer({commit}){
            commit('SIGNIN_CUSTOMER')
        }
    }
  })