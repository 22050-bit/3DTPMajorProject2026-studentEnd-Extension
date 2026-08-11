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

let perMinuteRefresh = setInterval(UpdatePeriodNumber, 30000);

//const testCollection = doc(db, "Applications/EJXrS24YU9RvSv3rlpfJ");

//const docData = await getDoc(testCollection);


//LIBRARY OF CALLS TO GET THE ELEMENTS ON HTML TO JS

//HOMEPAGE CONSTS STARTS HERE
//LINE 1 select teacher
const enterTeacher = document.getElementById("enterTeacher"); //the enter teacher dropdown box, get value from here
const saveTeacher = document.getElementById("saveTeacher"); //the green save button for teacher optin
const cancelTeacher = document.getElementById("cancelTeacher"); //the red "X" button to reset the option
const searchTeacher = document.getElementById("searchTeacher"); //the searching bar to find the wanted teacher

var teacherEntered=false;

//LINE 2 enter student
const enterStudent = document.getElementById("enterStudent"); //the enter student name textbox, get value from here
const saveStudent = document.getElementById("saveStudent"); //the green save button for student  optin
const cancelStudent = document.getElementById("cancelStudent"); //the red "X" button to reset the option
const showStudent = document.getElementById("showStudent"); //the thing to double check if they have chosen themselves/entered the right ID

var studentEntered=false;

//LINE 3 time and date
const enterTimeValue = document.getElementById("enterTimeValue"); //the paragraph to show value
const enterTime = document.getElementById("enterTime"); //the sliding input to assign time

var timeEntered=false;

const enterDate = document.getElementById("enterDate"); //the calander interface, get value here

var dateEntered=false;

//line 4 period number
const enterPeriod = document.getElementById("enterPeriod");

var periodEntered=false;

//line 5: reason

const chooseReasons = document.getElementById("chooseReasons"); 

const enterReason = document.getElementById("enterReason");
const saveReason = document.getElementById("saveReason"); //the green save button for student  optin
const cancelReason = document.getElementById("cancelReason"); //the red "X" button to reset the option

var reasonEntered=false;
var reasonIsOther = false;

//line 6 submission
const submission =document.getElementById("submission"); //submitting button

//STORAGE:
var studentID;
var studentName;
var teacher;
var teacherEmail;
var timeNeeded;
var dateForApplication;
var periodOfLeave;
var reasonOfLeave;

//HOMEPAGE CONSTS ENDS HERE


//LIBRARY OF CALLS TO GET THE ELEMENTS ON HTML TO JS ENDS HERE


//HOME PAGE JS STARTS HERE
//LINE 1:
//save the teacher
function SaveTeacher(){
    teacherEmail=enterTeacher.value; //set value 
    teacher=enterTeacher.options[enterTeacher.selectedIndex].text;  //set value
    
    if(teacherEmail=="invalid"){
        alert("Error: Please choose a valid teacher to request permission");
        teacherEntered=false;
    }
    else{
    enterTeacher.disabled=true; //no more changing choice
    saveTeacher.disabled=true; //no more saving, this is already saved
   
    console.log(teacher + " and "+teacherEmail) //debug testing
    saveTeacher.style.backgroundColor= "grey";

    teacherEntered=true;
    }
}
saveTeacher.onclick=SaveTeacher;

//cancel the input
function CancelTeacher(){
    enterTeacher.disabled=false; //no more changing choice
    saveTeacher.disabled=false; //no more saving, this is already saved
    teacherEmail=""; //wipe clean
    teacher=""; //wipe clean
    console.log(teacher + " and "+teacherEmail) //debug testing
    saveTeacher.style.backgroundColor= "green";

    teacherEntered=false;
}
cancelTeacher.onclick=CancelTeacher;
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

function SearchTeacher(){
    let searchText = searchTeacher.value.toLowerCase(); //the text the user searches up
    
    let matchFound = false;

    for (const option of enterTeacher.options) {
        if (option.value == "invalid"){
            option.hidden = true;
        }
        else if (!option.text.toLowerCase().includes(searchText)){
            option.hidden = true ; //hide the options which aren't relevent
        }
        else if (option.text.toLowerCase().includes(searchText)){
            option.hidden = false ; //show the options which are
            if (!matchFound){
                enterTeacher.value = option.value;
                matchFound = true;
            }
        }
    }
  
}

searchTeacher.oninput = SearchTeacher;

//LINE 2:
//save the student names

function SaveStudent(){
    studentID=enterStudent.value; //set value 
    console.log(studentID) //debug testing
    if(studentID == ""){
        alert("Error: You need to fill in your student ID");
        studentEntered=false;
    }
    else if (isNaN(Number(studentID))){
        alert("Error: Please enter a valid Student ID");
        studentEntered=false;
    }
    else{
    var studentIsFound = false;
    fetch("studentNames.json")
    .then(studentInfo => studentInfo.json())
        .then(students => students.forEach(student =>{ 
            console.log(student[0]);
            console.log(student[1]);
            if(student[1] == Number(studentID)){
                showStudent.value = student[0];
                studentIsFound = true;
                studentName =student[0];
            }
            }
        )
    );
    if (studentIsFound == false){
        showStudent.value = "Not Found";
    }

    enterStudent.disabled=true; //no more changing choice
    saveStudent.disabled=true; //no more saving, this is already saved
    saveStudent.style.backgroundColor= "grey";
    studentEntered=true;

    }
    

}

saveStudent.onclick=SaveStudent;

//cancel the input
function CancelStudent(){
    enterStudent.disabled=false; //no more changing choice
    saveStudent.disabled=false; //no more saving, this is already saved
    studentID=""; //wipe clean
    console.log(studentID) //debug testing
    saveStudent.style.backgroundColor= "green";

    showStudent.value = "Name to ID";
    studentEntered=false;
}
cancelStudent.onclick=CancelStudent;

//LINE 3: date and time left
//for the value shown to correspond with the slider
function EnterTimeChange() {
    var time=enterTime.value;
    enterTimeValue.innerHTML = `MAX 15 min, MIN 1 min:<br> ${time} minutes`;

    timeEntered=true;
}
enterTime.addEventListener("input", EnterTimeChange); //changed? okay check that
//FLEXIBLE ENTERING; WONT BE SET DEAD HERE
//DATES; FLEXIBLE ENTERING, WONT BE SET DEAD HERE, but needs a checker

function DateEntered(){
    const now=new Date();
    const dateString =
    `${now.getFullYear()}-${
        String(now.getMonth() + 1).padStart(2, "0")
    }-${
        String(now.getDate()).padStart(2, "0")
    }`;

    enterDate.value = dateString;
    dateEntered = true;

}
document.addEventListener("DOMContentLoaded",DateEntered); //shown period updates 

//Line 4: period number
//const periodOfLeave = document.querySelector('input[name="enterPeriod"]:checked')?.value;
function PeriodEntered(){
    periodEntered=true;
    UpdatePeriodNumber();

    switch(enterPeriod.value){
        case "RAPID":
            periodOfLeave = "RAPID";
        break;

        case "Period 1":
            periodOfLeave = "1";
        break;
        
        case "Period 2":
            periodOfLeave = "2";
        break;

        case "Period 3":
            periodOfLeave = "3";
        break;

        case "Period 4":
            periodOfLeave = "4";
        break;

        case "Period 5":
            periodOfLeave = "5";
        break;

        default:
            periodOfLeave = "Null";
        break;
    }
    
    console.log (periodOfLeave);
    
}

window.addEventListener("DOMContentLoaded",PeriodEntered);

function UpdatePeriodNumber(){
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
        console.log("RAPID");
    }
    else if (totalMinutes >= p1Starts && totalMinutes <= p1Ends){ //period 1
        enterPeriod.value = "Period 1";
        console.log("P1");
    }
    else if (totalMinutes >= p2Starts && totalMinutes <= p2Ends){ //period 2
        enterPeriod.value = "Period 2";
        console.log("P2");
    }
    else if (totalMinutes >= intervalStarts && totalMinutes <= intervalEnds){ //interval
        enterPeriod.value = "Interval";
        console.log("Interval");
    }
    else if (totalMinutes >= p3Starts && totalMinutes <= p3Ends){ //period 3
        enterPeriod.value = "Period 3";
        console.log("P3");
    }
    else if (totalMinutes >= p4Starts && totalMinutes <= p4Ends){ //period 4
        enterPeriod.value = "Period 4";
        console.log("P4");
    }
    else if (totalMinutes >= lunchStarts && totalMinutes <= lunchEnds){ //lunch
        enterPeriod.value = "Lunch";
        console.log("lunch");
    }
    else if (totalMinutes >= p5Starts && totalMinutes <= p5Ends){ //period 5
       enterPeriod.value = "Period 5";
       console.log("P5");
    }
   
    else{ //put placeholder text
        enterPeriod.value = "School Closed";
    }

}


//Line 5: reason
function GenericReasonChosen(){
    if (chooseReasons.value == "Other"){
        reasonIsOther = true;

        enterReason.style.visibility = "visible";
        saveReason.style.visibility = "visible";
        cancelReason.style.visibility = "visible";

        reasonEntered = false;
    }

    else if (chooseReasons.value == "INVALID"){
        reasonIsOther = false;

        reasonEntered = false;

        enterReason.style.visibility = "hidden";
        saveReason.style.visibility = "hidden";
        cancelReason.style.visibility = "hidden";
    }

    else {
        reasonIsOther = false;
        reasonOfLeave = chooseReasons.value;

        enterReason.style.visibility = "hidden";
        saveReason.style.visibility = "hidden";
        cancelReason.style.visibility = "hidden";

        console.log(reasonOfLeave);
        reasonEntered = true;
    }
}

chooseReasons.oninput = GenericReasonChosen;


function SaveReason(){
    if (reasonIsOther == true){
    
        reasonOfLeave=enterReason.value; //set value 
        console.log(reasonOfLeave); //debug testing
    
        if(reasonOfLeave==""){ //even after setting value, if the user has entered nothing, fire a warning
            alert("Error: Please enter a valid reason");
            reasonEntered=false;
        }

        else{ //the user has properly entered something, so just make the UI and checks align with those results.

            enterReason.disabled=true; //no more changing choice
            saveReason.disabled=true; //no more saving, this is already saved
    
            saveReason.style.backgroundColor= "grey";

            reasonEntered=true;
        }
    }
}

saveReason.onclick=SaveReason;

//cancel the input
function CancelReason(){

    if (reasonIsOther == true) {
        enterReason.disabled=false; //no more changing choice
        saveReason.disabled=false; //no more saving, this is already saved
        reasonOfLeave=""; //wipe clean
        console.log(reasonOfLeave) //debug testing
        saveReason.style.backgroundColor= "green";
    }
    reasonEntered=false;
}
cancelReason.onclick=CancelReason;

//LINE 6: SUBMISSION BOIIIIIIS we made it
async function Submission(){
    
    if(studentEntered && teacherEntered && dateEntered && timeEntered && periodEntered && reasonEntered){
    //flexible values are now assigned to variabl
    dateForApplication=enterDate.value;
    timeNeeded= enterTime.value;

    //default variables which must be added to the sheet
    const now=new Date();
    var timeOfApplication = now.toLocaleTimeString("en-GB", {
    timeZone: "Pacific/Auckland",
    hour12: false
    });;

    var isApproved = false;

    //debug, testing allvariables are documented correctly. this will be the palce when they are posted
    
    await InputtingData(teacher,teacherEmail,studentID, studentName, timeNeeded,dateForApplication,periodOfLeave,reasonOfLeave,timeOfApplication,isApproved);

    submission.style.backgroundColor= "grey";
    submission.disabled=true;
    }

    else{
        alert('Please fill in all questions with valid answers and press "Save"');
        console.log("the error message should show");
    }
}

submission.onclick= Submission;

//HOME PAGE JS ENDS HERE

var documentName;

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
            isApproved:isapproved
        });
    

}
