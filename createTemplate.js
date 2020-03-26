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
<<<<<<< HEAD
    submitButton.innerText = "SAVE"
    submitButton.style = 'border-radius: 10px; color: rgb(255, 255, 255); background-color: rgb(50, 152, 220);'
=======
    submitButton.innerText = "Save"
    submitButton.style.borderRadius = "10px"
    submitButton.style.color = "#FFFFFF"
    submitButton.style.backgroundColor = "#3298dc" 
>>>>>>> 09350061276bce0eb4938685385f6e2fab145f3d
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
        
        showDiv.innerHTML = ''
        console.log("this is at the end of the postTemplate function")
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
    for( let i = 0; i<fullContentArray.length; i++){
        if (i % 2 == 0){
            content.push(fullContentArray[i])
        }
        else{
            blanks.push(fullContentArray[i])
        }
    }

    //collect blanks and turn them to an array of objects that hold all possible parts of speech for that object
    let posArray = turnToPOS(blanks)
    verifyPOS(posArray)
    

    console.log(posArray)
    console.log('content then blanks')
    console.log(content)
    console.log(blanks)
}

//HELPER FUNCTIONS//
function verifyPOS(objectArray){
    let arrayOfWords = objectArray
    console.log('start verify')
    console.log(arrayOfWords)
    console.dir(objectArray)
    console.log('loop')
    // take each object of data and 

    objectArray.forEach(object => {
        console.log(object)
    })
    console.log('end verify')
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
    // return CloneArray(posArray)
}

function CloneArray(array){
    var clone = new Array();
    for (var i = 0; i < array.length; i++)
        clone[clone.length] = array[i];
    return clone;
}

function el(id){
    return document.getElementById(id)
}

function splitByPipe(textWithDoublePipes){
    return textWithDoublePipes.split("||")
}