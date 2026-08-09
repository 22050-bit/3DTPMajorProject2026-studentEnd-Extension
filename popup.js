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

//const testCollection = doc(db, "Applications/EJXrS24YU9RvSv3rlpfJ");

//const docData = await getDoc(testCollection);


//LIBRARY OF CALLS TO GET THE ELEMENTS ON HTML TO JS

//HOMEPAGE CONSTS STARTS HERE
//LINE 1 select teacher
const enterTeacher = document.getElementById("enterTeacher"); //the enter teacher dropdown box, get value from here
const saveTeacher = document.getElementById("saveTeacher"); //the green save button for teacher optin
const cancelTeacher = document.getElementById("cancelTeacher"); //the red "X" button to reset the option

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
const enterPeriod = document.querySelectorAll('input[name="enterPeriod"]');

var periodEntered=false;

//line 5: reason
const enterReason = document.getElementById("enterReason");
const saveReason = document.getElementById("saveReason"); //the green save button for student  optin
const cancelReason = document.getElementById("cancelReason"); //the red "X" button to reset the option

var reasonEntered=false;

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
    enterTimeValue.innerHTML = `MAX 60 min, MIN 1 min:<br> ${time} minutes`;

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
document.addEventListener("DOMContentLoaded",DateEntered); //once changed, entered date, changed? check that

//Line 4: period number
//const periodOfLeave = document.querySelector('input[name="enterPeriod"]:checked')?.value;
function PeriodEntered(){
    periodEntered=true;
}

enterPeriod.forEach(radio => {
    radio.addEventListener("change", PeriodEntered);
});

//Line 5: reason
function SaveReason(){
    reasonOfLeave=enterReason.value; //set value 
    console.log(reasonOfLeave) //debug testing
    
    if(reasonOfLeave==""){
        alert("Error: Please enter a valid reason");
        reasonEntered=false;
    }
    else{
    enterReason.disabled=true; //no more changing choice
    saveReason.disabled=true; //no more saving, this is already saved
    
    saveReason.style.backgroundColor= "grey";

    reasonEntered=true;
    }
}
saveReason.onclick=SaveReason;

//cancel the input
function CancelReason(){
    enterReason.disabled=false; //no more changing choice
    saveReason.disabled=false; //no more saving, this is already saved
    reasonOfLeave=""; //wipe clean
    console.log(reasonOfLeave) //debug testing
    saveReason.style.backgroundColor= "green";

    reasonEntered=false;
}
cancelReason.onclick=CancelReason;

//LINE 6: SUBMISSION BOIIIIIIS we made it
async function Submission(){
    
    if(studentEntered && teacherEntered && dateEntered && timeEntered && periodEntered && reasonEntered){
    //flexible values are now assigned to variabl
    dateForApplication=enterDate.value;
    timeNeeded= enterTime.value;
    periodOfLeave = document.querySelector('input[name="enterPeriod"]:checked')?.value; //period number

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
