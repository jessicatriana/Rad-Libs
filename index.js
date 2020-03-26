let rating = 0

//div holding testform
const showDiv = document.getElementById('showDiv')
const templateURL = "http://localhost:3000/rad_lib_templates"
const completedURL = "http://localhost:3000/completed_rad_libs"

function fetchAllTemplates(){
    return fetch(templateURL)
    .then(response => response.json())
}

function renderTemplateList(allTemplates){
    const templateUl = document.getElementById('templateUl')
    allTemplates.forEach(template => {
        let li = document.createElement('li')
        li.innerText = template.name
        li.setAttribute('id', template.id)
        li.addEventListener("click", showTemplate)
        templateUl.appendChild(li)
    })

}

function showTemplate(e){
    templateId = e.target.id
    fetchSingleTemplate(templateId)
    .then(createRadLibFormDiv) 
}

function fetchSingleTemplate(templateId) {
    return fetch(`${templateURL}/${templateId}`)
      .then(response => response.json())
}

document.addEventListener("DOMContentLoaded", () => {
    // createRadLibFormDiv(radLibThree)
    fetchAllTemplates()
    .then(renderTemplateList)
    fetchAllCompletedLibs()
    .then(renderCompletedLibs)

})

function fetchAllCompletedLibs() {
   return fetch(completedURL)
    .then(response => response.json())
}

function renderCompletedLibs(json){
    let navBar = document.getElementById('navbar-dropdown')
    json.forEach( radLib => {
        // console.log(radLib)
        let radLibLink = document.createElement('a')
        radLibLink.class = 'navbar-item'
        radLibLink.innerHTML = `${radLib.name} <br>`
        radLibLink.setAttribute("id", radLib.id)
        radLibLink.addEventListener("click", showCompletedLib)
        navBar.appendChild(radLibLink)
    })

}

function showCompletedLib(e){
    event.preventDefault();
    let radLibId = e.target.id
    let completedLib;
    showDiv.innerHTML = ''
    fetchSingleLib(radLibId)
    .then(renderCompletedLibShowDiv)
    
}

function fetchSingleLib(radLibId){
    return fetch(`${completedURL}/${radLibId}`)
    .then(resp => resp.json())
}

function renderCompletedLibShowDiv(radLibObject){
    let header = document.createElement('h1')
    header.innerText = radLibObject.name
    header.style.textAlign = "center"
    header.style.fontSize = "50px"
    header.style.fontFamily = "marker felt"

    showDiv.appendChild(header)
    showDiv.innerHTML += radLibObject.content
    
    showDiv.innerHTML += `<br><br><button  id="${radLibObject.id}" style="border-radius: 10px; color: rgb(255, 255, 255); background-color: rgb(50, 152, 220);"> DELETE THIS ATROCITY</button>`
    let deleteButton = showDiv.querySelector('button')
    deleteButton.addEventListener("click", deleteCompletedRadLib)
}


function deleteCompletedRadLib(e){
    event.preventDefault()
    let radLibId = e.target.id
    fetch(`${completedURL}/${radLibId}`, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        }   
    })
}
//**FOLLOWING CODE ONLY TO PROCESS MAD LIB TEMPLATE FORM AND DISPLAY */
//function to split text block into an array
function splitByPipe(textBlock){
    const arrayOfContent = textBlock.split("||");
    return arrayOfContent
}

//function that fills the showDiv on selection of a madlib, recieving the arguement of the madlib object
function createRadLibFormDiv(radLib){
    let content = radLib.content
    //clear base div display
    showDiv.innerHTML = ""
    //set array of content for reference in future functions
    let arrayOfContent = splitByPipe(content);
    //Show title of radLib and basic information on data entry in centered text
    let header = document.createElement('h1')

    header.setAttribute('data-id', radLib.id);

    header.innerText = radLib.name
    header.style.textAlign = "center"
    header.style.fontSize = "50px"
    header.style.fontFamily = "marker felt"

    showDiv.appendChild(header)
    let instructions = document.createElement('h4')
    instructions.style.textAlign = "center"
    // instructions.innerHTML = "Fill in an entry for each part of speech!<br><br>Remember:<br>A noun is a person, place or thing (ostrich, broken shoelace, the Louvre).<br>A verb is an action (cry, juggle, yodel).<br>An adjective describes a noun (fluffy, poisonous, irritating).<br>An adverb modifies or describes a verb or adjective (gently, creepily, joyously)."
    showDiv.appendChild(instructions)
    //create a form and centered text
    const form = document.createElement('form')
    form.style.textAlign = "center"
    //add form to div
    showDiv.appendChild(form)
    //break blanks string into array by entry
    let arrayOfBlanks = splitByPipe(radLib.word_blank)
    //for each blank in the array, create labels and input fields. index value is used as an id for input form
    for (let i = 0; i < arrayOfBlanks.length; i++) {
        const label = document.createElement('label')
        const input = document.createElement('input')
        input.setAttribute('id', ('input ' + (i + 1)))
        label.innerText = arrayOfBlanks[i] + ":"
        form.appendChild(label)
        form.appendChild(input)
        form.innerHTML += "<br>";
      }
    //adding page break for small space
    form.innerHTML += "<br>"
    //setting data attribute for how many entries the form has for reference
    form.setAttribute('data-entry-count', arrayOfBlanks.length)
    //create submit button and label it
    const submit = document.createElement('button')
    submit.innerHTML = "Submit"
    submit.style.borderRadius = "10px"
    submit.style.color = "#FFFFFF"
    submit.style.backgroundColor = "#3298dc"
    //event listener to form processessing function, rendering completed radLib in showDiv
    submit.addEventListener("click", () => {
        submitRadLibEntry();
    })
    
    form.appendChild(submit)
    //button function on form, collects answers, combines them with content into a string, and renders div to show string
    function submitRadLibEntry(){
        event.preventDefault()
        //function collectAnswers collects answers in an array and returns array
        let describerArray = collectAnswers()
        //combine answer array and content array into one block of text and returns string
        let storyBlock = combineAnswersAndContent(describerArray, arrayOfContent)
        //set showDiv to and h1 tag of title and string of completed radLib
        showDiv.innerHTML = ''

        // showDiv.innerHTML = `<h1>${radLib.name}</h1>` + "<br>" + storyBlock
        
        const newDiv = document.createElement('div');
        showDiv.appendChild(newDiv);
    
        const saveBtn = document.createElement('button');
        saveBtn.id = radLib.id;
        saveBtn.innerText = "Save Your Rad Lib";
        saveBtn.style.borderRadius = "10px"
        saveBtn.style.color = "#FFFFFF"
        saveBtn.style.backgroundColor = "#3298dc" 


        saveBtn.addEventListener('click', postCompletedRadLib)
        
        // showDiv.innerHTML = `<h1>${header.innerText}</h1>` + "<br>" + storyBlock
        //     showDiv.innerHTML = ''
        let header = document.createElement('h1')
        
        header.setAttribute('data-id', radLib.id);
    
        header.innerText = radLib.name
        header.style.textAlign = "center"
        header.style.fontSize = "50px"
        header.style.fontFamily = "marker felt"
   
        showDiv.appendChild(header)
        showDiv.innerHTML += `${storyBlock} <br><br>`
        showDiv.appendChild(saveBtn);
        // showDiv.innerHTML = header + "<br>" + storyBlock


        // RATING CODE THAT SHOULD BE BROKEN INTO FUNCTIONS
        const rateForm = document.createElement("form")
        const formLabel = document.createElement('label')
        const formInput = document.createElement('input')
        formInput.setAttribute("id", "rating-input")

        rateForm.style.textAlign = "left"
        showDiv.appendChild(rateForm)
        rateForm.setAttribute('data-id', radLib.id);
    
        formLabel.innerHTML = "<br><br><br><strong>Rate this Rad Lib (1-5)</strong><br>"
        rateForm.appendChild(formLabel)
        rateForm.appendChild(formInput)
        rateForm.innerHTML += "<br><br>";

        const submitBtn = document.createElement('button')
        submitBtn.innerHTML = "Submit Rating"
        submitBtn.style.borderRadius = "10px"
        submitBtn.style.color = "#FFFFFF"
        submitBtn.style.backgroundColor = "#3298dc" 
        rateForm.appendChild(submitBtn)

      
       
        submitBtn.addEventListener("click", event => {
            event.preventDefault()

            let inputValue = document.getElementById("rating-input").value
            rating += parseInt(inputValue)
            console.log(rating)
        })      

        function showRating(rating) {

        }

    }
        // END OF RATING CODE THAT SHOULD BE BROKEN INTO FUNCTIONS
}

function postCompletedRadLib(event) {
  //if we need to move the button (titleToPost variable has the name: data)  
  //let titleToPost = document.getElementsByTagName('h1')[3].innerText;
  data = {
      name: event.target.parentElement.firstElementChild.nextElementSibling.innerText, 
      content: contentToPost, 
      template_id: event.target.id
    }

  fetch('http://localhost:3000/completed_rad_libs', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"    
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(result => console.log(result))
};

//collects data from inputs and returns an array of values
function collectAnswers(){
    let inputArray = [];
    //set upper limit of for loop to total number of input fields
    const inputTotal = document.querySelector('form').dataset.entryCount
    //add each value in successive order
    for (let i = 1; i <= inputTotal; i ++){
        let input = document.getElementById(`input ${i}`).value
        inputArray.push(input)
    }
    return inputArray
}

let contentToPost = [];
//combines and returns the array of answer and the array of content in a string
function combineAnswersAndContent(answerArray, contentArray){
    //set empty array
    let storyArray = [];

    for (let i = 0; i < contentArray.length; i++){         
         //add element at index to storyArray for answer and content. If answer array is shorter than content array, only push content
         if (i >= answerArray.length){
             storyArray += contentArray[i]
             contentToPost += contentArray[i]
            }
        else {
        contentToPost += (contentArray[i] + " " + answerArray[i] + " ");
        storyArray += (contentArray[i] + " " +`<strong>${answerArray[i]}</strong>`  + " ")
        }
    } 

    return storyArray
}

