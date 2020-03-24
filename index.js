//test madlib
const radLibOne ={
    title: "How to Date the Coolest Guy/Girl in School",

    content: "It's simple. Turn the ||. Make him/her want || to date you. Make sure you're always dressed to ||. Each and every day, wear a/an || that you know shows off your || to || advantage and make your || look like a million ||. Even if the two of you make meaningful || contact, don't admit it. No hugs or ||. Just shake his/her || firmly. And remember, when he/she asks you out, even though a chill may run down your || and you can't stop your || from ||, just play it ||. Take a long pause before answering in a very || voice. \"I'll have to || it over.\"",
    
    blanks: "plural noun||adverb||verb||article of clothing||body part||adjective||noun||plural noun||another body part||plural noun||another body part||noun||noun||verb ending in ing||adjective||adjective||verb"
    
};

const radLibTwo ={
    title: "How To Cross a Piranha-Infested River",

content: "If you are traveling in||and find yourself having to cross a piranha-filled river, here's how to do it||: \n Piranhas are more||during the day, so cross the river at night.\n Avoid areas with netted||traps--piranhas may be||there looking to||them!\n When||the river, swim||. You don't want to wake them up and make them||!\n Whatever you do, if you have an open wound, try to find another way to get back to the||. Piranhas are attracted to fresh||and will most likely take a bite out of your||if you||in the water!",

blanks: "foreign country||adverb||adjective||animal||verb ending in 'ing'||verb||verb ending in 'ing'||adverb||adjective||a place||type of liquid||part of the body||verb"

};

const radLibThree ={
    title: "My Ideal President",

    content: "There are||qualities I admire in a leader.  First, he or she must be||because||the||is a sign of||character.  Second, a good President should be||, always making sure people feel||and||. Third, a President represents our country around the||, and should be||when||, with other world||.Strength of||, a good sense of||, and||leadership are all things my ideal President would have.",
    
    blanks: "number||adjective||verb ending in 'ing'||noun||adjective||adjective||adjective||adjective||place||adjective||verb ending in 'ing'||plural noun||noun||noun||adjective",
    
};

const radLibFour ={
    title: "Three Little Pigs",
    
    content:"Once up a time, there were three||pigs. One day, their mother said, \"You are all grown up and must||on your own.\" So they left to||their houses. The first little pig wanted only to||all day and quickly built his house out of||. The second little pig wanted to||and||all day so he||his house with||. The third||pig knew the wolf lived nearby and worked hard to||his house out of||. One day, the wolf knocked on the first pig's||. \"Let me in or I'll||your house down!\" The pig didn't, so the wolf||down the||. The wolf knocked on the second pig's||. \"Let me in or I'll blow your||down!\" The pig didn't, so the wolf||down the house. Then the wolf knocked on the third||pig's door. \"Let me in or I'll blow your house down!\" The little pig didn't so the wolf||,and||. He could not blow the house down. All the pigs went to live in the||house and they all||happily ever after.",
    
    blanks: "adjective||verb||verb||verb||plural noun||verb||verb||past tense verb||plural noun||adjective||verb||plural noun||noun||verb||past tense verb||noun||noun||noun||past tense verb||adjective||past tense verb||past tense verb||noun||past tense verb"
};

const radLibFive ={
    title: "Fitness Tips", 

    content: "Looking for a no-nonsense workout for those days when you're too||to get to the gym? We've got you covered. First, warm up with|| minutes of cardio.  Burpees, ||climbers, or||jacks will get your||pumping. Then, move on to one of these targeted workouts: ARMS: Whether you want to get jacked like||or simply look||in sleeveless dresses this summer, ||training is key. For cut arms, try a superset of push-ups and dips. To complete a push-up, start in a locked-out position and lower your||to the floor.  Either way, you're going to feel the burn! LEGS: Muscular thighs and ||-size butts are totally in right now! For||results, add squats and lunges into your daily routine. When squatting, make sure your||gets below your knees for the full range of motion. To amp up your workout, add some weight to both movements. Hold a pair of||or grab the family||. Then squat and lunge your little||off! ABS: Abs...the unicorn of the fitness world. The||truth is, you can do all the crunches, ||-ups, and||-raises you want...but abs are ultimately made in (the)||. So put away that double order of||and reach for a nice||salad instead! Your||will thank you, even if your taste buds won't!",
    
    blanks: "adjective||number||noun||verb ending in 'ing'||body part||celebrity||adjective||noun||body part||plural noun||type of food||adjective||body part||plural noun||animal||body part||adjective||verb||a place||type of food||color||body part"
    
};

const radLibSix ={
    title: "We Are Looking For The Right Candidate",

    content: "The right candidate will be able to develop information systems by||, developing, and||software solutions.  They will be able to develop software||by||information needs, conferring with ||, and studying systems||, data usage, and||processes. This person should be able to demonstrate solutions by developing||, flowcharts, layouts, code comments and||code.  The candidate should|| operations by keeping information||.  Our company is looking for the following qualifications and skills: Analyzing||, ||programming skills, problem solving, and teamwork.  The ideal education and experience would include: ||+ years of||software development experience, proficiency in||or||, and object-oriented||skills.",

    blanks: "verb ending in 'ing'||verb ending in 'ing'||plural noun||verb ending in 'ing'||plural noun||noun||noun||plural noun||adjective||verb||adverb||plural noun||adjective||number||adjective||programming language||hobby||adjective"

};

const radLibSeven ={
    title: "My Last Job",

    content: "I was just fired from my||job. I didn't really like it anyways because my boss was a||. Luckily,  I had a||idea. I always wanted to own my own business because I am good at||. The problem I solved for customers was helping them||their||. I decided to||a business plan. I asked my best friend, ||to help. Since I was broke, I asked my|| || for the money to start the business. They agreed. The ||business was a huge success from the start. We hired as many|| employees as we could. The biggest problem was that the ||kept ||the||. Fortunately, it was only temporary. After a few years, a very large ||came along and wanted to buy the company. I sold it for ||dollars and a few ||. Now I spend all my time ||.",

    blanks: "adjective||noun||adjective||verb||verb||noun||verb||person's name||adjective||noun||adjective||adjective||noun||verb||noun||noun||number||plural noun||verb ending in 'ing'"

}

//div holding testform
const showDiv = document.getElementById('test')

//test code
createRadLibFormDiv(radLibThree)

//function to split text block into an array
function splitByPipe(textBlock){
    return textBlock.split("||")
}

//function that fills the showDiv on selection of a madlib, recieving the arguement of the madlib object
function createRadLibFormDiv(radLib){
    //clear base div display
    showDiv.innerHTML = ""
    //set array of content for reference in future functions
    let arrayOfContent = splitByPipe(radLib.content);
    //Show title of radLib and basic information on data entry in centered text
    let header = document.createElement('h1')
    header.innerText = radLib.title
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
    let arrayOfBlanks = splitByPipe(radLib.blanks)
    //for each blank in the array, create labels and input fields. index value is used as an id for input form
    for (i = 0; i < arrayOfBlanks.length; i++) {
        const label = document.createElement('label')
        const input = document.createElement('input')
        input.setAttribute('id', (i + 1))
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
    //event listener to form processessing function, rendering completed radLib in showDiv
    submit.addEventListener("click", submitRadLibEntry)
    //attach button to form
    form.appendChild(submit)

    //button function on form, collects answers, combines them with content into a string, and renders div to show string
    function submitRadLibEntry(){
        //pull title from radLib form
        const title = document.querySelector('h1').innerText
        //stop page refresh from submit button
        event.preventDefault()
        //function collectAnswers collects answers in an array and returns array
        let describerArray = collectAnswers()
        //combine answer array and content array into one block of text and returns string
        let storyBlock = combineAnswersAndContent(describerArray, arrayOfContent)
        //set showDiv to and h1 tag of title and string of completed radLib
        showDiv.innerHTML = `<h1>${title}</h1>` + "<br>" + storyBlock
        console.log("I can't believe it works") 
    }
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
         //add element at index to storyArray for answer and content
        storyArray += (contentArray[i] + " " + answerArray[i] + " ")
    } 
    console.log(contentArray)
    console.log(answerArray)
    return storyArray
}