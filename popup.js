
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

//line3 
const enterTimeValue = document.getElementById("enterTimeValue");
const enterTime = document.getElementById("enterTime");

function enterTimeChange() {
    var time=enterTime.value;
    enterTimeValue.innerHTML = `MAX 60 min, MIN 1 min:<br> ${time} minutes`;
}

enterTime.addEventListener("input", enterTimeChange);



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






