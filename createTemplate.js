let createTemplateTopNav = el('template-create')

createTemplateTopNav.addEventListener("click", fillDiv)

let blanks = []
let content = []
let titleInputValue = ""

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
    let intro2 = document.createElement('p')
    let intro3 = document.createElement('p')
    intro.innerHTML = "1. Type or copy the paragraph(s) you would like to make into a template. <br> 2. To turn a word into a variable, surround it with || <em>(commonly called double pipes).</em><br><br>"
    intro2.innerHTML = "<em>Example:</em>  Today I learned how to ||<strong>ride</strong>|| a ||<strong>horse</strong>||. It was ||<strong>exhausting</strong>||!"
    intro3.innerHTML = "<br><br>It is important that you *only* surround the letters and not the punctuation. \n Our amazing, top of the line AI will deduce which part of speech your word is, verify it with you and then create a template based on your entry."
    intro2.style.textAlign = "center"
    intro.style.fontFamily = "marker felt"
    intro3.style.fontFamily = "marker felt"

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

    }

    //append all elements into showDiv
    showDiv.appendChild(header)
    showDiv.appendChild(intro)
    showDiv.appendChild(intro2)
    showDiv.appendChild(intro3)
    showDiv.appendChild(form)


}

function turnContentToPostData(inputContent){
    let fullContentArray = splitByPipe(inputContent)
    content = [];
    blanks = [];
    for( let i = 0; i<fullContentArray.length; i++){
        if (i % 2 == 0){
            content.push(fullContentArray[i])
        }
        else{
            blanks.push(fullContentArray[i])
        }
    }

    //collect blanks and turn them to an array of objects that hold all possible parts of speech for that object

    turnToPOS(blanks)
    .then(posArray => verifyPOS(posArray))
    
}

//HELPER FUNCTIONS//
function verifyPOS(objectArray){
    let information = document.createElement('p')
    let lineBar = document.createElement('p')
    lineBar.innerText = "-----------------------------------------------"
    information.innerText = "Using your entry above, look at our recommended parts of speech on the listed below on the left side. Type the word you think best describes your choice in the input to it's left, or type your own!"
    information.style.fontFamily = "marker felt"
    showDiv.innerHTML = ''
    showDiv.innerHTML += contentInputValue
    showDiv.appendChild(lineBar)
    showDiv.appendChild(information)
    showDiv.innerHTML += "<br>"
    let verifyForm = document.createElement('form')
    showDiv.appendChild(verifyForm)
    // take each object of data 
    objectArray.forEach(object => {
        createFormElement(object)
    })
    let verifySubmit = document.createElement('button')
    verifySubmit.style.borderRadius = "10px"
    verifySubmit.style.color = "#FFFFFF"
    verifySubmit.style.backgroundColor = "#3298dc" 
    verifySubmit.setAttribute('id','submit')
    verifySubmit.innerText = "Verify these parts of speech"
    verifyForm.appendChild(verifySubmit)
    verifySubmit.addEventListener("click", saveRadLibTemplate)
}

function saveRadLibTemplate(){
    event.preventDefault()
    //pull array of form elements, all inputs except the last of which is a button
    let formInputs = document.forms[0].elements
    let blanksArray = [];

    for(i = 0; i < (formInputs.length - 1); i++){
        blanksArray.push(formInputs[i].value)
    }
    blanks = blanksArray
    let blanksData = joinByPipe(blanks)
    let contentData = joinByPipe(content)
    let postData = {
        name: titleInputValue,
        content: contentData,
        word_blank: blanksData
    }
    let createdTemplatePostObject = {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"    
        },
        body: JSON.stringify(postData)
    }
    console.log(createdTemplatePostObject)

    fetch(`http://localhost:3000/rad_lib_templates`, createdTemplatePostObject)
    .then(showSavedStatus)
    .then(fetchAllTemplates()
    .then(renderTemplateList))
}

function showSavedStatus(){
    let header = document.createElement('h1')
    header.innerText = "Rad Lib Template Complete!"
    header.style.textAlign = "center"
    header.style.fontSize = "50px"
    header.style.fontFamily = "marker felt"
    showDiv.innerHTML = ''
    let headerInfo = document.createElement('p')
    headerInfo.style.textAlign = "center"
    headerInfo.style.fontFamily = "marker felt"
    headerInfo.innerText = "Check out your template on the left side of the screen to try it out!"
    showDiv.appendChild(header)
    showDiv.innerHTML += "<br><br>"
    showDiv.appendChild(headerInfo)
    let templateUl = document.getElementById('templateUl')
    templateUl.innerHTML = ''

}

function joinByPipe(array){
    return array.join("||")
}

function createFormElement(object){
    let verifyForm = document.querySelector('form')
    let blankLabel = document.createElement('label')
    let blankInput = document.createElement('input')
    blankLabel.innerText = "Do you mean"
    if (object.nouns.length > 0){
        blankLabel.innerText += ` "${object.nouns[0]}" the noun, `
    }
    if (object.verbs.length > 0){
        blankLabel.innerText += ` "${object.verbs[0]}" the verb, `
    }
    if (object.adjectives.length > 0){
        blankLabel.innerText += ` "${object.adjectives[0]}" the adjective, `
    }
    if (object.adverbs.length > 0){
        blankLabel.innerText += ` "${object.adverbs[0]}" the adverb, `
    }
    if (object.rest.length > 0){
        blankLabel.innerText += `...wait...${object.rest[0]}?! What is that!? Type what you think it is `
    }
    blankLabel.innerText += 'or something else?'
    verifyForm.appendChild(blankLabel)
    verifyForm.appendChild(blankInput)
    verifyForm.innerHTML += `<br>`
}

function turnToPOS(arrayOfWords){
   return Promise.all(arrayOfWords.map(word => wordpos.getPOS(word)))
}

function el(id){
    return document.getElementById(id)
}

function splitByPipe(textWithDoublePipes){
    return textWithDoublePipes.split("||")
}