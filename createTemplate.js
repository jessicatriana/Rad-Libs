let createTemplateTopNav = el('template-create')

createTemplateTopNav.addEventListener("click", fillDiv)

function fillDiv(){
    event.preventDefault();
    showDiv.innerHTML = ''
    createAndAttachForm()
}

function createAndAttachForm(){
    //create and fill header with intro to form creation
    let header = document.createElement('h1')
    header.innerText = "Create your own Rad Lib template!"
    header.style.textAlign = "center"
    header.style.fontSize = "50px"
    header.style.fontFamily = "marker felt"

    //create and fill description box on how to use form

    let intro = document.createElement('p')
    intro.innerHTML= "1. Type or copy the paragraph(s) you would like to make into a template. <br> 2. To turn a word into a variable, surround it with || <em>(commonly called double pipes).</em><br><br><em>Example:</em>  Today I learned how to ||<strong>ride</strong>|| a ||<strong>horse</strong>||. It was ||<strong>exhausting</strong>||!<br><br>It is important that you *only* surround the letters and not the punctuation. \n Our amazing, top of the line AI will deduce which part of speech your word is, then create a template based on your entry."
    // intro.style.textAlign = "center"
    // intro.style.fontFamily = "marker felt"

    //create aspects of form to prep for post with submit
    let form = document.createElement('form')
    let titleInputLabel = document.createElement('label')
    let titleInput = document.createElement('input')
    let contentInputLabel = document.createElement('label')
    let contentInput = document.createElement('textarea')
    let submitButton = document.createElement('button')
    //label and append each element to the form
    titleInputLabel.innerText = "Title of Rad Lib: "
    titleInput.setAttribute('id','name')
    form.innerHTML += "<br>"
    form.appendChild(titleInputLabel)
    form.innerHTML += "<br>"
    form.appendChild(titleInput)
    form.innerHTML += "<br><br>"
    contentInputLabel.innerText = "Your story with double pipes!"
    contentInputLabel.setAttribute("for", "text-box")
    contentInputLabel.style["display"] = "block";
    contentInput.setAttribute('id','content')
    contentInput.setAttribute('name','text-box')
    contentInput.setAttribute('cols', 100)
    contentInput.setAttribute('rows', 5)
    contentInput.style["display"] = "block";
    submitButton.innerText = "Save"
    submitButton.style.borderRadius = "10px"
    submitButton.style.color = "#FFFFFF"
    submitButton.style.backgroundColor = "#3298dc" 
    submitButton.setAttribute('id','submit')
    submitButton.addEventListener("click", postTemplate)
    form.appendChild(contentInputLabel)
    form.innterHTML += "<br>"
    form.appendChild(contentInput)
    form.innerHTML += "<br>"
    form.appendChild(submitButton)

    function postTemplate(e){
        event.preventDefault()
        //pull the input values from the forms
        contentInputValue = document.getElementById('content').value
        titleInputValue = document.getElementById('name').value
        
        turnContentToPostData(contentInputValue)

        console.log("this is at the end of the postTemplate function"
        )
        console.log(titleInputValue)
        console.log(contentInputValue)
    }

    //append all elements into showDiv
    showDiv.appendChild(header)
    showDiv.appendChild(intro)
    showDiv.appendChild(form)


}

function turnContentToPostData(inputContent){
    let fullContentArray = splitByPipe(inputContent)
    let content = []
    let blanks = []
    for( i = 0; i<fullContentArray.length; i++){
        if (i % 2 == 0){
            content.push(fullContentArray[i])
        }
        else{
            blanks.push(fullContentArray[i])
        }
    }

    let posObjectArray = turnToPOS(blanks)
    // verifyPOS(posObjectArray)
    console.log('content then blanks')
    console.log(content)
    console.log(blanks)
}

//HELPER FUNCTIONS//
function verifyPOS(objectArray){

    //take each object of data and 
    posArray.forEach(posObject => {
    
    })
}

function turnToPOS(arrayOfWords){
    posArray = [];

    //fetch the POS data for each word, push into new array
    arrayOfWords.forEach(word => {
        wordpos.getPOS(word)
        .then(resp => posArray.push(resp))
    })
    console.log('array of parts of speech')
    console.log(posArray)
    return posArray
}

function el(id){
    return document.getElementById(id)
}

function splitByPipe(textWithDoublePipes){
    return textWithDoublePipes.split("||")
}