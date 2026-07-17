//LIBRARY OF CALLS TO GET THE ELEMENTS ON HTML TO JS

//HOMEPAGE CONSTS STARTS HERE
//LINE 1 select teacher
const enterTeacher = document.getElementById("enterTeacher"); //the enter teacher dropdown box, get value from here
const saveTeacher = document.getElementById("saveTeacher"); //the green save button for teacher optin
const cancelTeacher = document.getElementById("cancelTeacher"); //the red "X" button to reset the option

//LINE 2 enter student
const enterStudent = document.getElementById("enterStudent"); //the enter student name textbox, get value from here
const saveStudent = document.getElementById("saveStudent"); //the green save button for student  optin
const cancelStudent = document.getElementById("cancelStudent"); //the red "X" button to reset the option

//LINE 3 time and date
const enterTimeValue = document.getElementById("enterTimeValue"); //the paragraph to show value
const enterTime = document.getElementById("enterTime"); //the sliding input to assign time

const enterDate = document.getElementById("enterDate"); //the calander interface, get value here

//line 4 period number
const enterPeriod = document.getElementsByTagName("enterPeriod"); 

//line 5: reason
const enterReason = document.getElementById("enterReason");
const saveReason = document.getElementById("saveReason"); //the green save button for student  optin
const cancelReason = document.getElementById("cancelReason"); //the red "X" button to reset the option

//line 6 submission
const submission =document.getElementById("submission"); //submitting button

//STORAGE:
var studentName;
var teacher;
var teacherEmail;
var timeNeeded;
var dateOfApplication;
var periodOfLeave;
var reasonOfLeave;

//HOMEPAGE CONSTS ENDS HERE


//LIBRARY OF CALLS TO GET THE ELEMENTS ON HTML TO JS ENDS HERE


//HOME PAGE JS STARTS HERE
//LINE 1:
//save the teacher
function SaveTeacher(){
    enterTeacher.disabled=true; //no more changing choice
    saveTeacher.disabled=true; //no more saving, this is already saved
    teacherEmail=enterTeacher.value; //set value 
    teacher=enterTeacher.options[enterTeacher.selectedIndex].text;  //set value
    console.log(teacher + " and "+teacherEmail) //debug testing
    saveTeacher.style.backgroundColor= "grey";
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
}
cancelTeacher.onclick=CancelTeacher;

//LINE 2:
//save the student names
function SaveStudent(){
    enterStudent.disabled=true; //no more changing choice
    saveStudent.disabled=true; //no more saving, this is already saved
    studentName=enterStudent.value; //set value 
    console.log(studentName) //debug testing
    saveStudent.style.backgroundColor= "grey";
}
saveStudent.onclick=SaveStudent;

//cancel the input
function CancelStudent(){
    enterStudent.disabled=false; //no more changing choice
    saveStudent.disabled=false; //no more saving, this is already saved
    studentName=""; //wipe clean
    console.log(studentName) //debug testing
    saveStudent.style.backgroundColor= "green";
}
cancelStudent.onclick=CancelStudent;

//LINE 3: date and time left
//for the value shown to correspond with the slider
function enterTimeChange() {
    var time=enterTime.value;
    enterTimeValue.innerHTML = `MAX 60 min, MIN 1 min:<br> ${time} minutes`;
}
enterTime.addEventListener("input", enterTimeChange);
//FLEXIBLE ENTERING; WONT BE SET DEAD HERE
//DATES; FLEXIBLE ENTERING, WONT BE SET DEAD HERE

//Line 4: period number
//const periodOfLeave = document.querySelector('input[name="enterPeriod"]:checked')?.value;

//Line 5: reason
function SaveReason(){
    enterReason.disabled=true; //no more changing choice
    saveReason.disabled=true; //no more saving, this is already saved
    reasonOfLeave=enterReason.value; //set value 
    console.log(reasonOfLeave) //debug testing
    saveReason.style.backgroundColor= "grey";
}
saveReason.onclick=SaveReason;

//cancel the input
function CancelReason(){
    enterReason.disabled=false; //no more changing choice
    saveReason.disabled=false; //no more saving, this is already saved
    reasonOfLeave=""; //wipe clean
    console.log(reasonOfLeave) //debug testing
    saveReason.style.backgroundColor= "green";
}
cancelReason.onclick=CancelReason;

//LINE 6: SUBMISSION BOIIIIIIS we made it
function Submission(){
    //flexible values are now assigned to variable
    dateOfApplication=enterDate.value;
    timeNeeded= enterTime.value;
    periodOfLeave = document.querySelector('input[name="enterPeriod"]:checked')?.value; //period number

    //debug, testing allvariables are documented correctly. this will be the palce when they are posted
    console.log(studentName+teacher+teacherEmail+timeNeeded+dateOfApplication+periodOfLeave+reasonOfLeave);

    submission.style.backgroundColor= "grey";
    submission.disabled=true;
}

submission.onclick= Submission;


//HOME PAGE JS ENDS HERE


const sheetInput = document.getElementById("testingInput");
const sheetData = document.getElementById ("testingButton");
const sheetSend = document.getElementById("testingOutput");
const symptoms= document.getElementById("wahhh");
const openOther= document.getElementById("openTheOther");

//code for misc styling of home application page starts here

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






//ends here

//model code from the first page to reuse in the future
fetch("https://script.google.com/macros/s/AKfycbxwPo-LNfj3aHkThOpFzQS7pRq_y9H69Ucp-1Chn553sGaybghbViVgkuCMrwmxYJb_qQ/exec")
    .then(gettingResponse);
let theResponse = "";

function Open(){
    window.location.href = "newHome.html";
}

openOther.click = Open;

let inputtedData = "";
function InputtingData(input){

fetch("https://script.google.com/macros/s/AKfycbxwPo-LNfj3aHkThOpFzQS7pRq_y9H69Ucp-1Chn553sGaybghbViVgkuCMrwmxYJb_qQ/exec", {
    method: "POST",
    body: JSON.stringify({"test":input})
});
}




function confirmData(){
    inputtedData=String(sheetInput.value);
    console.log(inputtedData);
    InputtingData(inputtedData);
}
sheetSend.onclick = confirmData;
//Code related to the visual stuff starts here

function test() {
    symptoms.textContent = theResponse;
}

function gettingResponse(response) {

    console.log("The server replied!");

    response.text().then(function(text) {

        console.log("The text is:", text);

        theResponse = text;

    });

}

sheetData.onclick = test;
//ends here
//model code reusable ends here






