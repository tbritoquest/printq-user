<template>
    <div class="modal is-active" id="editJobForm">
        <div class="modal-background"></div>
        <div class="modal-content">
            <div class="main">
                <div class="bar">
                    <p class="desc">Orders/Edit Job</p>
                </div>
                <div class="header">
                    <h3 class="title is-3">{{job.name}} : Details</h3>
                    <h6 class="subtitle is-6">Job ID: {{getJobId()}}</h6>
                </div>
                <div class="fields">
                    <span v-bind:class="{isActive: field=='specs'}" @click="changeField('specs')">Print Specifications</span>
                    <span v-bind:class="{isActive: field=='notes'}" @click="changeField('notes')">Notes</span>
                </div>
                <div class="showcase">
                    <div class="print-specifications" v-show="field=='specs'">
                        <ul>
                            <li>
                                <span>Product:</span>
                                <span>Business Cards</span>
                            </li>
                            <li>
                                <span>Size:</span>
                                <span>2" x 3.5"</span>
                            </li>
                            <li>
                                <span>Stock:</span>
                                <span>16PT Stock, coated two sides</span>
                            </li>
                            <li>
                                <span>Runsize:</span>
                                <span>5000</span>
                            </li>
                            <li>
                                <span>Colorspec:</span>
                                <span>N/A</span>
                            </li>
                            <li>
                                <span>Coating:</span>
                                <span>16PT Stock, coated two sides</span>
                            </li>
                            
                        </ul>
                    </div>
                    <div class="notes" v-show="field=='notes'">
                        <ul>
                            <li v-for="note in notes">
                                <i class="far fa-sticky-note"></i>
                                <p>{{note}}</p>
                            </li>
                            
                        </ul>
                        <div class="addnote-area">
                            <textarea name="note" id="note" cols="30" rows="3" v-model="note"></textarea>
                            <div class="actions">
                                <a @click="resetNote()">Discard</a>
                                <a @click="addNote()">Add note</a>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
            <div class="sidebar">
                <div class="other">

                </div>
                <ul class="attributes">
                    <li>
                        <span>Status</span>
                        <span v-bind:class="['status',job.status]"><i class="fas fa-circle"></i> {{job.status}}</span>
                    </li>
                    <li>
                        <span>Sample Date</span>
                        <input type="date">
                    </li>
                    <li>
                        <span>Customer</span>
                        <span>{{customerName()}}</span>
                    </li>
                </ul>
                <ul class="order-info">
                    <li>
                        <span>Order #</span>
                        <span>{{formatOrderId()}}</span>
                    </li>
                    <li>
                        <span>Order Date</span>
                        <span>11/04/2021</span>
                    </li>
                </ul>

                <div class="bottom-bar">
                    <button class="button" v-on:click="$emit('close')">Cancel</button>
                    <button class="button" @click="handleSubmit()">Save</button>
                </div>
            </div>
        </div>
        <button class="modal-close is-large" aria-label="close" v-on:click="$emit('close')"></button>
    </div>
</template>

<script>
import Swal from 'sweetalert2'

export default {
    props: ['job'],
    data(){
        return{
            field: 'specs',
            note: null,
            notes: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."]
        }
    },
    methods:{
        handleSubmit(){
            const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                    })

            Toast.fire({
            icon: 'success',
            title: 'Saved successfully'
            })
        },
        addNote(){
            if(this.note && this.note.length>0){
                this.notes.push(this.note)
                this.note = ""
                setTimeout(() => {  
                    console.log("hey")
                    document.querySelector(".notes ul").scrollTo(0,document.body.scrollHeight)
                 }, 400);
            }
        },
        resetNote(){
            this.note = ""
        },
        changeField(field){
            this.field = field
        },
        formatOrderId(){
            return String(this.job.orderId).padStart(8,'0')
            
        },
        customerName(){
            let customer = this.job.order.Customer
            return `${customer.firstName} ${customer.lastName}`
        },
        getJobId(){
            return `${this.formatOrderId()}-${this.job.indexOfJob}`
        }
        
    }
}
</script>

<style scoped>
    
     .modal-content{
        min-width:1295px !important;
        min-height:751px;
        border-radius:20px;
        background:#F2F5F8;
        display: grid;
        grid-template-columns: 3fr 1fr;
        /* padding: 1em 2em 2em 2em; */

    }
    .main{
        padding: 2.5em 2.5em;
    }
    .main .bar{
        margin-bottom: 4em;
    }
    .main .bar .desc{
        color: #55626d;
        font-size: 14px;
    }
    .header{
        margin-bottom: 3em;
    }
    .fields{
        margin-bottom:2.5em;
        display: flex;
        gap:1em;
    }
   .fields span{
        color: #2A3136;
        cursor:pointer;
        padding:0.4em 1em;
        color:#2A3136;
        border-radius: 6px;
    }
    .fields span.isActive{
        background:#fff;
        border:1px solid #EEF1F4;
    }
    .showcase .print-specifications{
        border: 1px dashed #000000;
        padding:2em;
        height:360px;
        overflow-y: scroll;
        max-width:856px;
    }
    .showcase .print-specifications li{
        display: flex;
        justify-content: space-between;
        margin-bottom:0.5em;
    }
    .sidebar{
        background: #fff;
        padding: 1em 0 2em 0;
        position: relative;
    }
    .sidebar .other{
        min-height: 130px;
        border-bottom: 1px solid #e9edf0;
        margin-bottom: 2em;
    }
    .sidebar ul{
        padding:0 2em;
    }
    .sidebar ul li{
        display: flex;
        justify-content: space-between;
        margin-bottom:1em;
    }
    .sidebar .attributes{
        margin-bottom: 3.5em;
    }
    .bottom-bar{
        position: absolute;
        bottom:2em;
        right:2em;
        
    }
    .bottom-bar button:first-child{
        margin-right: 1em;
    }
    .bottom-bar button:nth-child(2){
        background: var(--action-color);
        color:#fff;
    }
    .sidebar input{
        height: 2em;
        padding-left: 1em;
        border-radius: 4px;
        border:1px solid #65717B;
        width:143px;
    }
   .sidebar .status{
       padding:0 0.5em;
       border-radius: 4px;
   }
   .status{
       color:#000000;
   }
   .status i{
       font-size: 7px;
        vertical-align: middle;
   }
   .review i{
       color:#D4B42D;
   }
    .completed i{
        color: #257976;
    }
    .cancelled i{
        color: #65717B;
    }
    .new i{
        color: #1D4DAB;
    }
    .notes{
        /* max-width:760px; */
        width: 85%;
        border-left: 1px solid #C4C4C4;
        padding-left: 2em;
        min-height: 336px;
        position: relative;
    }
    .notes ul{
        height: 180px;
        overflow-y: scroll;
    }
    .notes ul li{
        display: flex;
        justify-content: left;
        gap:2em;
        align-items: center;
        margin-bottom: 1em;
    }
    .notes .addnote-area{
        position: absolute;
        bottom: 0;
        width:100%;
    }
    .notes textarea{
        width:100%;
        padding:1em;
        border:1px solid #C4C4C4;
    }
    .notes textarea:focus{
        outline: 1px solid #3fcb86;
        border:none;
    }
    .notes .actions a{
        color:#65717B;
    }
    .notes .actions a:nth-child(2){
        color:#36CB83;
        margin-left:1em;
    }
</style>