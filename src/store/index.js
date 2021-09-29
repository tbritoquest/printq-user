import {createStore} from 'vuex'


export default createStore({
    state:{
        customer: {}, //id: '1',name: 'John Doe', email: 'fake@email.com', address: '123 example lane', phone: '1234567890'
        jobs: []
    },
    getters:{
        jobsCount(state){
            return state.jobs.length
        },
    },
    mutations: {},
    actions:{}
  })