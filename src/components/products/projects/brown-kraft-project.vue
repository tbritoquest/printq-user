<template>

    <h3 class="title is-3">Project</h3>

    <div id="form-fields">
    <div class="field spec">
        <label class="label">Product Category</label>
        <div class="select ">
            <select>
            <option value="" disabled selected>Select Product Category</option>
            <option value="70">Business Cards</option> 
            <option value="bkc-gc80">Greeting Cards</option>
            <option value="bkc-m70">Menu</option>
            <option value="bkc-pc100">Postcards</option>
            <option value="bkc-ss100">Sell Sheets</option>
            <option value="bkc-tc100">Trading Cards</option>
            </select>
        </div>
    </div>


    </div><br>



    <div class="field is-grouped mb-80">
        <div class="control">
        <button class="button is-link is-light" id="back-button" @click="prevQuestion" style="display: none;" type="button">Previous</button>
        </div>
        <div class="control">
        <button class="button is-link " @click="nextQuestion" type="button" id="next-button">Next</button>
        </div>
    </div>

    <!-- <button @click="previous" class="button round previous" type="button"><i class="fas fa-arrow-left"></i></button> -->
    <button @click="handleSubmit" class="button round next primary" type="button" v-if="showNextBtn"><i class="fas fa-arrow-right"></i></button>


    
</template>

<script>

import * as myTest from '../../../../public/js/brown-kraft.js'
export default {
    emits: ["logProjectInfo","previous"],
    data(){
        return{
            showNextBtn: false
        }
    },
     methods: {
        handleSubmit(){

            let project = {}

            const specs = document.querySelectorAll(".field.spec")
         
            for(let i=0;i<specs.length;i++){
                let label = specs[i].querySelector("label").innerText
                let select = specs[i].querySelector("select")
                let value = select.options[select.selectedIndex].innerText
                project[label] = value
            }
            this.$emit("logProjectInfo", project)

        },
        previous(){
            this.$emit("previous")
        },
        prevQuestion(){
            console.log("previousQuestion")
            document.querySelector('#next-button').style.display="block"
            this.showNextBtn = false



             //remove current question from stack
            stack.pop()
            //remove from DOM
            let parent = document.getElementById("form-fields");
            parent.removeChild(parent.lastElementChild);
            //
            //hide prev
            if(stack.length===1){
                document.querySelector('#back-button').style.display="none"
            }

            parent.lastElementChild.querySelector("select").removeAttribute("disabled")

        },
        nextQuestion(){
            
            console.log("nextQuestion")
            //0. check if we've reached the end of form
            let fields = document.querySelectorAll("select")
            let node = fields[fields.length-1]
            let answerObj = answers.get(node.value)

            if(answerObj.path=== null){
                console.log("END sort of")
                document.querySelector('#next-button').style.display="none"
                this.showNextBtn = true
                // document.querySelector(".field.sample-date").classList.remove("hide")
                // document.querySelector(".field.notes").classList.remove("hide")
                // return
            }else{
                // 1a. disable current input field 
                node.setAttribute("disabled",true)
                // 1b. add next question to stack
                stack.push(answerObj.path)
                // 1c. render latest question in stack
                this.renderNextQuestion()
                // 1d. render prev button if doesnt exist
                document.querySelector('#back-button').style.display="block"
            }
            
        },
        renderNextQuestion(){

                let parentNode = document.querySelector("#form-fields")
                let node= document.querySelector(".field")
                let cloneNode = node.cloneNode(true)
                cloneNode.querySelector("select").textContent = ""

                // 0. Get latest question
                let question = questions.get(stack[stack.length-1])
                console.log(question)
                //1. change label
                let label = cloneNode.querySelector("label")
                label.innerText = question.text

                //2. add options and values
                let selectorEl =  cloneNode.querySelector("select")
                selectorEl.removeAttribute("disabled")
                let defaultEl = document.createElement("option")
                defaultEl.setAttribute("value", "")
                defaultEl.selected = true
                defaultEl.innerText = `Select ${question.text}`
                defaultEl.setAttribute("disabled",true)
                selectorEl.append(defaultEl)

                for(let i=0;i<question.answers.length;i++){
                
                    let answer = answers.get(question.answers[i])
                    let optionEl = document.createElement("option")
                    optionEl.setAttribute("value", answer.id)
                    optionEl.innerText = answer.text
                    selectorEl.append(optionEl)
                }
                //3. add element to DOM
                parentNode.append(cloneNode)
            
        }
    },
   
}
</script>

<style>

</style>