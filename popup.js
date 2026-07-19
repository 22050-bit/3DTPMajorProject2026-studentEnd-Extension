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
    enterTeacher.disabled=true; //no more changing choice
    saveTeacher.disabled=true; //no more saving, this is already saved
    teacherEmail=enterTeacher.value; //set value 
    teacher=enterTeacher.options[enterTeacher.selectedIndex].text;  //set value
    console.log(teacher + " and "+teacherEmail) //debug testing
    saveTeacher.style.backgroundColor= "grey";

    teacherEntered=true;
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
    enterStudent.disabled=true; //no more changing choice
    saveStudent.disabled=true; //no more saving, this is already saved
    studentName=enterStudent.value; //set value 
    console.log(studentName) //debug testing
    saveStudent.style.backgroundColor= "grey";

    studentEntered=true;
}
saveStudent.onclick=SaveStudent;

//cancel the input
function CancelStudent(){
    enterStudent.disabled=false; //no more changing choice
    saveStudent.disabled=false; //no more saving, this is already saved
    studentName=""; //wipe clean
    console.log(studentName) //debug testing
    saveStudent.style.backgroundColor= "green";

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
    dateEntered=true;
}

enterDate.addEventListener("input", DateEntered); //once changed, entered date, changed? check that

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
    enterReason.disabled=true; //no more changing choice
    saveReason.disabled=true; //no more saving, this is already saved
    reasonOfLeave=enterReason.value; //set value 
    console.log(reasonOfLeave) //debug testing
    saveReason.style.backgroundColor= "grey";

    reasonEntered=true;
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
function Submission(){
    
    if(studentEntered && teacherEntered && dateEntered && timeEntered && periodEntered && reasonEntered){
    //flexible values are now assigned to variabl
    dateForApplication=enterDate.value;
    timeNeeded= enterTime.value;
    periodOfLeave = document.querySelector('input[name="enterPeriod"]:checked')?.value; //period number

    //default variables which must be added to the sheet
    var timeOfApplication = new Date().toString();
    var isApproved = false;

    //debug, testing allvariables are documented correctly. this will be the palce when they are posted
    
    InputtingData(teacher,teacherEmail,studentName,timeNeeded,dateForApplication,periodOfLeave,reasonOfLeave,timeOfApplication,isApproved);

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



//TRANSMITTION CODE STARTS HERE

function InputtingData(teachername, teacheremail, studentname, timeneeded, dateforapplication, periodofleave, reasonofleave, timeofapplication, isapproved){

fetch("https://script.google.com/macros/s/AKfycbxKy5d_DRBqh9NwLQHSE21yPlDrWVfJrPJYbd97C585BP8qY3nPebJggKfwKoCFkICObg/exec", {
    method: "POST",
    body: JSON.stringify(
        {
            "teachername":teachername,
            "teacheremail":teacheremail,
            "studentname": studentname,
            "timeneeded": timeneeded,
            "dateforapplication":dateforapplication,
            "periodofleave":periodofleave,
            "reasonofleave":reasonofleave,
            "timeofapplication":timeofapplication,
            "isapproved":isapproved
        }
    )
});
}

//TRANSMITTION CODE ENDS HERE



const sheetInput = document.getElementById("testingInput");
const sheetData = document.getElementById ("testingButton");
const sheetSend = document.getElementById("testingOutput");
const symptoms= document.getElementById("wahhh");
const openOther= document.getElementById("openTheOther");

//code for misc styling of home application page starts here







//ends here

//model code from the first page to reuse in the future
fetch("https://script.google.com/macros/s/AKfycbxwPo-LNfj3aHkThOpFzQS7pRq_y9H69Ucp-1Chn553sGaybghbViVgkuCMrwmxYJb_qQ/exec")
    .then(gettingResponse);
let theResponse = "";

function Open(){
    window.location.href = "newHome.html";
}

openOther.click = Open;





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






