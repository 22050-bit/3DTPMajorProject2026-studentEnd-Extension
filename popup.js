//FANCY FIREBASE FIRESTOR STUFF
import { initializeApp } from "firebase/app";
import {
    collection,
    doc,
    getDoc,
    getFirestore,
    addDoc,
    setDoc,
    updateDoc,
    deleteDoc
} from "firebase/firestore";// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAuEz3JIVLCKUV-_jlmRytldLJU5qnnFZM",
  authDomain: "test-bdb0b.firebaseapp.com",
  projectId: "test-bdb0b",
  storageBucket: "test-bdb0b.firebasestorage.app",
  messagingSenderId: "572350694455",
  appId: "1:572350694455:web:c06d6dd4ce637bb8ab2bb2",
  measurementId: "G-WV58WKDE5M"
};

const app = initializeApp(firebaseConfig); 
const db = getFirestore(app); 

var documentName;  //the name of which one submission will be named

//firebase fancy stuff ends here


//updating interval to refresh period number every 30s
let perMinuteRefresh = setInterval(UpdatePeriod, 30000);


//LIBRARY OF CALLS TO GET THE ELEMENTS ON HTML TO JS AND DEFINITIONS

//HOMEPAGE CONSTS STARTS HERE
//LINE 1 select teacher
const enterTeacher = document.getElementById("enterTeacher"); //the enter teacher dropdown box, get value from here
const saveTeacher = document.getElementById("saveTeacher"); //the green save button for teacher optin
const cancelTeacher = document.getElementById("cancelTeacher"); //the red "X" button to reset the option
const searchTeacher = document.getElementById("searchTeacher"); //the searching bar to find the wanted teacher

var teacherInputLocked = false; //checking measure to ensure that the automatic selecting function of the search box doesn't 
//override a saved teacher value / when the save button has been pressed

var teacherEntered = false; //checking if the teacher question has been entered

//LINE 2 enter student
const enterStudent = document.getElementById("enterStudent"); //the enter student name textbox, get value from here
const saveStudent = document.getElementById("saveStudent"); //the green save button for student  optin
const cancelStudent = document.getElementById("cancelStudent"); //the red "X" button to reset the option
const showStudent = document.getElementById("showStudent"); //the thing to double check if they have chosen themselves/entered the right ID

var studentEntered = false; //checking if the student question has been entered

//LINE 3 time and date
const enterTimeValue = document.getElementById("enterTimeValue"); //the paragraph to show value
const enterTime = document.getElementById("enterTime"); //the sliding input to assign time

var timeEntered = true; //checking if time has been entered. this is set to true due to there being a default option. kept as safeguard

const enterDate = document.getElementById("enterDate"); //the calander interface, get value here

var dateEntered = false; 

//line 4 period number
const enterPeriod = document.getElementById("enterPeriod");  //the textbox which shows what period it is currently

var periodEntered = false;

//line 5: reason

const chooseReasons = document.getElementById("chooseReasons"); //the select element for choosing generic reasons

const enterReason = document.getElementById("enterReason"); //the reason textbox which shows up when choosing "other" as the reason
const saveReason = document.getElementById("saveReason"); //the green save button for saving that reason
const cancelReason = document.getElementById("cancelReason"); //the red "X" button to cancel the save

var reasonEntered = false; //if the user has chosen "other" as their reason, have they saved it / pressed save button?
var reasonIsOther = false;  //has the user chosen "other" as their reason

//line 6 submission
const submission = document.getElementById("submission"); //submitting button

//STORAGE, block of code which will be used to process stuff and is sent to Firestore
var studentID; 
var studentName;
var teacher;
var teacherEmail;
var timeNeeded = "5"; //default value, being a var makes it able of being overwritten so it's fine
var dateForApplication;
var periodOfLeave;
var reasonOfLeave;

//HOMEPAGE CONSTS ENDS HERE

//LIBRARY OF GETELEMENT AND DEFINTION ENDS HERE


//HOME PAGE JS STARTS HERE
//LINE 1:
//save the teacher
function SaveTeacher(){

    teacherEmail = enterTeacher.value; //the email of the teacher has been set as the value as it is correct-in-all-circumstances 

    teacher = enterTeacher.options[enterTeacher.selectedIndex].text;  //whereas the way they are referred to may be informal. so they are set as the texts

    teacherInputLocked = true;  //once save is pressed, the search button shouldn't assign values anymore

    if (teacherEmail == "invalid"){ //if the student attempts to save when the option is on the default cue "choose teacher" hidden option

        alert("Error: Please choose a valid teacher to request permission");  

        teacherEntered = false; //in case of complexities, specify that the teacher hasn't been enteredd

    }

    else{

    enterTeacher.disabled = true; //no more changing choice when save is pressed
    saveTeacher.disabled = true; //the save button has been pressed, do not let it be pressed again
    saveTeacher.style.backgroundColor = "grey"; //make the save button grey to signal the change to the user
    teacherEntered = true;  //the teacher has been entered, keep that information

    console.log(teacher + " and "+teacherEmail); //debug testing

    }
}

saveTeacher.onclick = SaveTeacher;  //when the save button is pressed, save the choice 

//cancel the input
function CancelTeacher(){  //when the red cross cancel button is pressed:

    enterTeacher.disabled = false; //re-enable for teachers to be chosen
    saveTeacher.disabled = false; //re-enable for the save button to be used again
    saveTeacher.style.backgroundColor = "green"; //make the save button green again

    teacherInputLocked = false; //since the cancel button has been pressed, the user is looking for a teacher choice again. 
    //the search function is now allowed to automatically choose values close to the thing searched

    teacherEmail = ""; //wipe clean
    teacher = ""; //wipe clean
    teacherEntered = false; //the value has been cancelled, therefore the safeguard should be active again

    console.log(teacher + " and " + teacherEmail); //debug testing

}

cancelTeacher.onclick = CancelTeacher; 

//reads the teachers there are and files them into the options of the dropdown box
fetch("teacherNames.json")
    .then(teacherInfo => teacherInfo.json())
        .then(teachers => {
            
            const dropdownBox = document.getElementById("enterTeacher");

            teachers.forEach(teacher=> {
                    
                    const option = document.createElement("option");
                    option.value = teacher[1];
                    option.textContent = teacher[0];
                    dropdownBox.appendChild(option);

                }
            );

        });

function SearchTeacher(){ //finding the value which is the closest to the thing searched

    if (teacherInputLocked == false){  //only work if the teacher hasn't been saved

        let searchText = searchTeacher.value.toLowerCase(); //the text the user enters into textbox to searches up
        let matchFound = false; //no match found yet

        for (const option of enterTeacher.options) {//for every option in the select element

            if (option.value == "invalid"){ //do not allow the hidden placeholder option to reappear
                option.hidden = true;
            }

            else if (!option.text.toLowerCase().includes(searchText)){ //if an option doesn't include what we want
                option.hidden = true ; //hide the options which aren't relevent
            }

            else if (option.text.toLowerCase().includes(searchText)){ //if an option does though
                option.hidden = false ; //ensure it shows up (why we need a case for invalid)
                if (!matchFound){ //if a match isn't found 
                    enterTeacher.value = option.value; //let the thing chosen in the select element be this value which matches
                    matchFound = true;  //a match is now found
                }
            }
        }   
    }
}

searchTeacher.oninput = SearchTeacher; //any changes in the textbox should allow this function to be ran once


//LINE 2:
//save the student names

function SaveStudent(){

    studentID = enterStudent.value; //set value 
    console.log(studentID); //debug testing

    if (studentID == ""){ //if the user tries to press save without entering anything

        alert("Error: You need to fill in your student ID");
        studentEntered=false; //ensure that we know the user hasn't filled in this field
    
    }

    else if (isNaN(Number(studentID))){ //if the user tries to enter something not their ID, a number

        alert("Error: Please enter a valid Student ID");
        studentEntered=false;

    }

    else{ //actual functions of save starts now

    var studentIsFound = false; //student hasn't been found in the thing

    fetch("studentNames.json") //open the file with all student names and corresponding ID
    .then(studentInfo => studentInfo.json())
        .then(students => students.forEach(student =>{ //for each array of student names and corresponding id

            console.log(student[0]); //string names
            console.log(student[1]);  //student ID

            if(student[1] == Number(studentID)){ //if the student id in this array corresponds with the id given by user

                showStudent.value = student[0]; //the shown text to tell the user the student the program found to be corresponding to that id
                studentIsFound = true; //student has been found
                studentName =student[0]; //remember the name found
                studentEntered=true; //the student is found, and the value assigned, so things can be carried onwards

            }
            }
        )
    );

    if (studentIsFound == false){ //if the student hasn't been found
        showStudent.value = "Not Found"; //show that this student hasn't been found
        studentEntered = false;  //ensure that the incomplete data won't be passed on as a valid request
    }

    //this will be executed no matter what happens, even if the student entered is invalid
    enterStudent.disabled = true; //no more changing choice
    saveStudent.disabled = true; //the save button has already been pressed, no more pressing again
    saveStudent.style.backgroundColor= "grey"; //make the save button grey

    }
}

saveStudent.onclick = SaveStudent; 

//cancel the input
function CancelStudent(){

    enterStudent.disabled = false; //allow inputs again for students
    saveStudent.disabled = false; //allow the save button to be pressed again
    saveStudent.style.backgroundColor= "green"; //make the save button green once more

    showStudent.value = "Name to ID"; //show the default placeholder text in the student to id textbox
    studentID = ""; //wipe clean

    console.log(studentID); //debug testing
    
    studentEntered = false; //ensure that it submit won't be allowed when cancelling student input

}

cancelStudent.onclick = CancelStudent;

//LINE 3: date and time left
//for the value shown to correspond with the slider

//time
function EnterTimeChange(){

    var time = enterTime.value;  //save the time entered

    enterTimeValue.innerHTML = `MAX 15 min, MIN 1 min:<br> ${time} minutes`; //update the texts shown with the actual number of minutes now

    timeNeeded = enterTime.value; //assign that value to the time needed
    timeEntered = true; //time value has been assign, the time allows proceed in submission

}

enterTime.addEventListener("input", EnterTimeChange); //for any change in the time range input, execute the code again to update

//date
function DateEntered(){

    const now = new Date(); //get the date of the time of execution

    const dateString =
    `${now.getFullYear()}-${
        String(now.getMonth() + 1).padStart(2, "0")
    }-${
        String(now.getDate()).padStart(2, "0")
    }`;  //using that date object, mimic the format of that of the date input 

    enterDate.value = dateString; //assign this value to the date input
    dateForApplication = dateString; //assign it to the variable that will be passing onto the database
    dateEntered = true; //the date has now been filled

}

document.addEventListener("DOMContentLoaded", DateEntered); //will automatically execute on opening of the extension/html

//Line 4: period number

function UpdatePeriod(){

    const now = new Date();
    const currentHour = now.getHours(); //hours of the day
    const currentMinutes = now.getMinutes(); //the exact minutes of those hours

    const totalMinutes = (currentHour * 60) + currentMinutes;

    const rapidStarts = (8 * 60) + 45; //8:45
    const rapidEnds = 9*60; //9:00

    const p1Starts = rapidEnds; //9:00
    const p1Ends = 10*60; //10:00

    const p2Starts = p1Ends; //10:00
    const p2Ends = 11*60; //11:00

    const intervalStarts = p2Ends; //11:00
    const intervalEnds = p2Ends +30; //11:30

    const p3Starts = intervalEnds; //11:30
    const p3Ends = (12*60) + 30; //12:30

    const p4Starts = p3Ends; //12:30
    const p4Ends = (13*60) + 30; //1:30

    const lunchStarts = p4Ends; //1:30
    const lunchEnds = (14 * 60) + 20; //2:20

    const p5Starts = lunchEnds; //2:20
    const p5Ends = (15 * 60) + 20;  //3:20

    if(totalMinutes >= rapidStarts && totalMinutes <= rapidEnds){ //rapid time
        enterPeriod.value = "RAPID";
        periodOfLeave = "RAPID";
        periodEntered = true;
        console.log("RAPID");
    }

    else if (totalMinutes >= p1Starts && totalMinutes <= p1Ends){ //period 1
        enterPeriod.value = "Period 1";
        periodOfLeave = "1";
        periodEntered = true;
        console.log("P1");
    }

    else if (totalMinutes >= p2Starts && totalMinutes <= p2Ends){ //period 2
        enterPeriod.value = "Period 2";
        periodOfLeave = "2";
        periodEntered = true;
        console.log("P2");
    }

    else if (totalMinutes >= intervalStarts && totalMinutes <= intervalEnds){ //interval
        enterPeriod.value = "Interval";
        periodOfLeave = "null";
        console.log("Interval");
    }

    else if (totalMinutes >= p3Starts && totalMinutes <= p3Ends){ //period 3
        enterPeriod.value = "Period 3";
        periodOfLeave = "3";
        periodEntered = true;
        console.log("P3");
    }

    else if (totalMinutes >= p4Starts && totalMinutes <= p4Ends){ //period 4
        enterPeriod.value = "Period 4";
        periodOfLeave = "4";
        periodEntered = true;
        console.log("P4");
    }

    else if (totalMinutes >= lunchStarts && totalMinutes <= lunchEnds){ //lunch
        enterPeriod.value = "Lunch";
        periodOfLeave = "null";
        console.log("lunch");
    }

    else if (totalMinutes >= p5Starts && totalMinutes <= p5Ends){ //period 5
       enterPeriod.value = "Period 5";
       periodOfLeave = "5";
       periodEntered = true;
       console.log("P5");
    }
   
    else{ //put placeholder text
        enterPeriod.value = "School Closed";
        periodOfLeave = "null";
        periodEntered = true;  //CHANGE BACK TO FALSE AFTER THE AFTER SCHOOL TESTING IS FINISH
    }
    
    console.log (periodOfLeave);

}

window.addEventListener("DOMContentLoaded", UpdatePeriod); //automatic assigning 


//Line 5: reason
function GenericReasonChosen(){

    if (chooseReasons.value == "Other"){ //if the user chooses "other" as the reason

        reasonIsOther = true; //activate functionalities of the reason "other"

        enterReason.style.visibility = "visible"; //show the textbox
        saveReason.style.visibility = "visible"; //show the green save button for the textbox
        cancelReason.style.visibility = "visible"; //show the red cross cancel for the textbox

        reasonEntered = false; //the reason hasn't really been entered. in the case of "other", to check whether or not a reason is 
        //entered, it must be checked by its save button

    }

    else if (chooseReasons.value == "INVALID"){ //if the hidden default placeholding option is chosen for some reason

        reasonIsOther = false; //the user hasn't chosen "other"

        reasonEntered = false; //the user hasn't provided a valid reason yet

        //ensure the bunch is still hidden
        enterReason.style.visibility = "hidden"; 
        saveReason.style.visibility = "hidden";
        cancelReason.style.visibility = "hidden";

    }

    else { //in the cases where the user normally chooses a generic value

        reasonIsOther = false; //isn't "other"
        reasonEntered = true; //the reason has been selected
        reasonOfLeave = chooseReasons.value;  //the reason is the value of the choosen option

        //ensure the bunch for case "other" is still hidden
        enterReason.style.visibility = "hidden";
        saveReason.style.visibility = "hidden";
        cancelReason.style.visibility = "hidden";

        console.log(reasonOfLeave);

    }
}

chooseReasons.oninput = GenericReasonChosen; //any changes in the select element will call this function

//in the case of the reason being "other"
function SaveReason(){

    if (reasonIsOther == true){ //only execute if the reason truly is "other"
    
        chooseReasons.disabled = true; //make sure nothing funny like choose other > save custome reason > choose another option in the select element happens

        reasonOfLeave = enterReason.value; //set value 
        console.log(reasonOfLeave); //debug testing
    
        if(reasonOfLeave == ""){ //even after setting value, if the user has entered nothing, fire a warning
            alert("Error: Please enter a valid reason");
            reasonEntered = false;
        }

        else{ //the user has properly entered something, so just make the UI and checks align with those results.

            enterReason.disabled = true; //disable changing choice
            saveReason.disabled = true; //disable the save button
            saveReason.style.backgroundColor = "grey"; //make the save button grey

            reasonEntered = true;

        }
    }
}

saveReason.onclick = SaveReason;  //execute when the save button is clicked

//cancel the save for the "other" 's reason
function CancelReason(){

    if (reasonIsOther == true) { //double check "other" is truly chosen

        chooseReasons.disabled = false; //re-enable users to choose back to the generic reasons

        enterReason.disabled = false; //re-enable textbox
        saveReason.disabled = false; //re-enable green saving button
        saveReason.style.backgroundColor = "green"; //make the button green again

        reasonOfLeave = ""; //wipe clean
        reasonEntered = false; //the reason hasn't been entered

        console.log(reasonOfLeave); //debug testing
        
    } 
}

cancelReason.onclick = CancelReason; //cancel button of the hidden "other" reason textbox 

//LINE 6: SUBMISSION (BOIIIIIIS we made it)
async function Submission(){
    
    if(studentEntered && teacherEntered && dateEntered && timeEntered && periodEntered && reasonEntered){ //if everything has been entered correctly

        const now = new Date();
        var timeOfApplication = now.toLocaleTimeString("en-GB", {
            timeZone: "Pacific/Auckland",
            hour12: false
        }); //time of which the request is sent

        var isApproved = false;  //all requests aren't approved yet

    
        //send stuff through the posting function to firestore if everything has been entered correctly
        await InputtingData(teacher,teacherEmail,studentID, studentName, timeNeeded,dateForApplication,periodOfLeave,reasonOfLeave,timeOfApplication,isApproved);

        submission.style.backgroundColor= "grey"; //make the submission button grey
        submission.disabled=true; //disable the submission button

    }

    else{//if one of those variables are false, which means something hasn't been filled up correctly

        alert('Error in sending the request. Please check if you have filled in all questions with valid answers and pressed "Save"');
        console.log("the error message should show");

    }
}

submission.onclick = Submission;

//HOME PAGE JS ENDS HERE


//TRANSMITTION CODE STARTS HERE

async function InputtingData(teachername, teacheremail, studentid, studentname, timeneeded, dateforapplication, periodofleave, reasonofleave, timeofapplication, isapproved){

    documentName = studentID+ "-" + dateforapplication + "-" + timeofapplication;

    await setDoc(doc(db, "Applications",documentName),{
        teacherName:teachername,
        teacherEmail:teacheremail,
        studentName: studentname,
        studentID: studentid,
        timeNeeded: timeneeded,
        dateForApplication:dateforapplication,
        periodOfLeave:periodofleave,
        reasonOfLeave:reasonofleave,
        timeOfApplication:timeofapplication,
        isApproved:isapproved,
        reasonOfDecision: "None",
        timeOfDecision: "Unattended"
    });
    
}
