//test madlib
const madLibOne ={
    title: "How to Date the Coolest Guy/Girl in School",

    content: "It's simple. Turn the ||. Make him/her want || to date you. Make sure you're always dressed to ||. Each and every day, wear a/an || that you know shows off your || to || advantage and make your || look like a million ||. Even if the two of you make meaningful || contact, don't admit it. No hugs or ||. Just shake his/her || firmly. And remember, when he/she asks you out, even though a chill may run down your || and you can't stop your || from ||, just play it ||. Take a long pause before answering in a very || voice. \"I'll have to || it over.\"",
    
    blanks: "plural noun||adverb||verb||article of clothing||body part||adjective||noun||plural noun||another body part||plural noun||another body part||noun||noun||verb ending in ing||adjective||adjective||verb"
    
};
const madLibTwo ={
    title: "How To Cross a Piranha-Infested River",

content: "If you are traveling in||and find yourself having to cross a piranha-filled river, here's how to do it||: \n Piranhas are more||during the day, so cross the river at night.\n Avoid areas with netted||traps--piranhas may be||there looking to||them!\n When||the river, swim||. You don't want to wake them up and make them||!\n Whatever you do, if you have an open wound, try to find another way to get back to the||. Piranhas are attracted to fresh||and will most likely take a bite out of your||if you||in the water!",

blanks: "foreign country||adverb||adjective||animal||verb ending in 'ing'||verb||verb ending in 'ing'||adverb||adjective||a place||type of liquid||part of the body||verb"

};
const madLibThree ={
    title: "My Ideal President",

    content: "There are||qualities I admire in a leader.  First, he or she must be||because||the||is a sign of||character.  Second, a good President should be||, always making sure people feel||and||. Third, a President represents our country around the||, and should be||when||, with other world||.Strength of||, a good sense of||, and||leadership are all things my ideal President would have.",
    
    blanks: "number||adjective||verb ending in 'ing'||noun||adjective||adjective||adjective||adjective||place||adjective||verb ending in 'ing'||plural noun||noun||noun||adjective",
    
};
const madLibFour ={
    title: "Three Little Pigs",
    
    content:"Once up a time, there were three||pigs. One day, their mother said, \"You are all grown up and must||on your own.\" So they left to||their houses. The first little pig wanted only to||all day and quickly built his house out of||. The second little pig wanted to||and||all day so he||his house with||. The third||pig knew the wolf lived nearby and worked hard to||his house out of||. One day, the wolf knocked on the first pig's||. \"Let me in or I'll||your house down!\" The pig didn't, so the wolf||down the||. The wolf knocked on the second pig's||. \"Let me in or I'll blow your||down!\" The pig didn't, so the wolf||down the house. Then the wolf knocked on the third||pig's door. \"Let me in or I'll blow your house down!\" The little pig didn't so the wolf||,and||. He could not blow the house down. All the pigs went to live in the||house and they all||happily ever after.",
    
    blanks: "adjective||verb||verb||verb||plural noun||verb||verb||past tense verb||plural noun||adjective||verb||plural noun||noun||verb||past tense verb||noun||noun||noun||past tense verb||adjective||past tense verb||past tense verb||noun||past tense verb"
    }

//div holding testform
const showDiv = document.getElementById('test')

//test code
createMadLibFormDiv(madLibThree)

//splitting the content into an array
// var arrayOfContent = [];
let arrayOfContent = splitByPipe(madLibThree.content);

//function to split text block into an array
function splitByPipe(textBlock){
    return textBlock.split("||")
}

//function that fills the showDiv on selection of a madlib, recieving the arguement of the madlib object
function createMadLibFormDiv(madLib){
    //clear base div display
    showDiv.innerHTML = ""
    //set array of content for reference in future functions
    let arrayOfContent = splitByPipe(madLib.content);
    //Show title of madLib and basic information on data entry in centered text
    let header = document.createElement('h1')
    header.innerText = madLib.title
    header.style.textAlign = "center"
    showDiv.appendChild(header)
    let instructions = document.createElement('h4')
    instructions.style.textAlign = "center"
    instructions.innerHTML = "Fill in an entry for each part of speech!<br>Remember:<br>A noun is a person, place or thing (ostrich, broken shoelace, the Louvre).<br>A verb is an action (cry, juggle, yodel).<br>An adjective describes a noun (fluffy, poisonous, irritating).<br>An adverb modifies or describes a verb or adjective (gently, creepily, joyously)."
    showDiv.appendChild(instructions)
    //create a form and centered text
    const form = document.createElement('form')
    form.style.textAlign = "center"
    //add form to div
    showDiv.appendChild(form)
    //break blanks string into array by entry
    let arrayOfBlanks = splitByPipe(madLib.blanks)
    //for each blank in the array, create labels and input fields. index value is used as an id for input form
    for (i = 0; i < arrayOfBlanks.length; i++) {
        const label = document.createElement('label')
        const input = document.createElement('input')
        input.setAttribute('id', (i + 1))
        label.innerText = arrayOfBlanks[i]
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
    //event listener to form processessing function, rendering completed madLib in showDiv
    submit.addEventListener("click", submitMadLibEntry)
    //attach button to form
    form.appendChild(submit)

}

//button function on form, collects answers, combines them with content into a string, and renders div to show string
function submitMadLibEntry(){
    //stop page refresh from submit button
    event.preventDefault()
    //function collectAnswers collects answers in an array and returns array
    let describerArray = collectAnswers()
    //combine answer array and content array into one block of text and returns string
    let storyBlock = combineAnswersAndContent(describerArray, arrayOfContent)
    //set showDiv to string of completed madLib
    showDiv.innerHTML = storyBlock
    console.log("I can't believe it works") 
}

//collects data from inputs and returns an array of values
function collectAnswers(){
    //set up empty array
    let inputArray = [];
    //set upper limit of for loop to total number of input fields
    const inputTotal = document.querySelector('form').dataset.entryCount
    //add each value in successive order
    for (i = 1; i <= inputTotal; i ++){
        let input = document.getElementById(i).value
        inputArray.push(input)
    }
 
    return inputArray

}

//combines and returns the array of answer and the array of content in a string
function combineAnswersAndContent(answerArray, contentArray){
    //set empty array
    let storyArray = [];
    for (i = 0; i < contentArray.length; i++){
        console.log(answerArray[i])
        //if there is an answer array at this index
        // if(answerArray[i] == true) {
            
            //add element at index to storyArray for answer and content
            storyArray += (contentArray[i] + " " + answerArray[i] + " ")
        // }
        //else just add content
        // else {
        //     storyArray += contentArray[i] + " "
        // }
    } 
    console.log(storyArray.substring(storyArray.length - 10))
    if(storyArray.substring(storyArray.length - 10) == "undefined"){
        console.log('undefined again')
        storyArray.slice(0, -9)
    }
    return storyArray
}