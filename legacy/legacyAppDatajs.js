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






function confirmData(){
    inputtedData=String(sheetInput.value);
    console.log(inputtedData);
    InputtingData(inputtedData);
}

//Code related to the visual stuff starts here

function test() {
    symptoms.textContent = theResponse;
}

function gettingResponse(response) {

    console.log("The Google server replied!");

    response.text().then(function(text) {

        console.log(text);

        theResponse = text;

    });

}
//ends here
//model code reusable ends here
