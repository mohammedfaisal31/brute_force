const form = document.getElementById('form1');
const username = document.getElementById('username');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const password = document.getElementById('password');
const cpassword = document.getElementById('cpassword');
let doc_id = ['dr.adnan','dr.janya','dr.faisal','dr.arham']
let day_id = ['monday','tuesday','wednesday','thursday','friday','saturday']

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const form_data = new FormData(event.target);
    let formCon = document.getElementsByClassName('form-control');
    var count = formCon.length - 1;
    validate();
    console.log(event.keyCode);
    let flag = true
    for(i = 0;i<formCon.length; i++){
        if (!(formCon[i].className === "form-control success" ))
            flag = false
    } 
    if(flag)
        document.getElementById("form1").submit();
})

const sendData = (usernameVal, sRate, count) => {
    if(sRate === count){
        swal("Welcome "+usernameVal, "Registration successful", "success").then(function() 
        {
            window.location = "doctors";
        })
    }
}

const successMsg = (usernameVal) => {
    let formCon = document.getElementsByClassName('form-control');
    var count = formCon.length - 1;
    for(i = 0;i<formCon.length; i++){
        if (formCon[i].className === "form-control success" ){
            var sRate = 0 + i;
            sendData(usernameVal, sRate, count);
        } else{
            return false;
        }
    }
}

const isEmail = (emailVal) =>{
    var atSymbol = emailVal.indexOf("@");
    if(atSymbol == -1) return false;
    if(atSymbol < 1) return false;
    var dot  = emailVal.indexOf('.');
    if(dot <= atSymbol + 1) return false;
    if(dot === emailVal.length - 1) return false;
    return true;
}

const validate = () => {
    const usernameVal = username.value.trim();
    const emailVal = email.value.trim();
    const phoneVal = phone.value.trim();
    const passwordVal = password.value.trim();
    const cpasswordVal = cpassword.value.trim();

    if(usernameVal === ""){
        setErrorMsg(username, 'username cannot be empty');
    }else if(usernameVal.length <= 2){
        setErrorMsg(username, 'enter minimum 3 characters');
    }else{
        setSuccessMsg(username);
    }

    if(emailVal === ""){
        setErrorMsg(email, 'email cannot be empty');
    }else if(!isEmail(emailVal)){
        setErrorMsg(email, 'not a valid email');
    }else{
        setSuccessMsg(email);
    }

    if(phoneVal === ""){
        setErrorMsg(phone, 'phone number cannot be empty');
    }else if(phoneVal.length != 10){
        setErrorMsg(phone, 'not a valid mobile number');
    }else{
        setSuccessMsg(phone);
    }

    if(passwordVal === ""){
        setErrorMsg(password, 'password cannot be empty');
    }else if(passwordVal.length < 6){
        setErrorMsg(password, 'password should be atleat 6 characters');
    }else{
        setSuccessMsg(password);
    }

    if(cpasswordVal === ""){
        setErrorMsg(cpassword, 'field cannot be empty');
    }else if(passwordVal != cpasswordVal){
        setErrorMsg(cpassword, 'password does not match');
    }else{
        setSuccessMsg(cpassword);
    }
    successMsg(usernameVal);
}

function setErrorMsg(input, errormsgs){
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    formControl.className = "form-control error";
    small.innerText = errormsgs;
}

function setSuccessMsg(input){
    const formControl = input.parentElement;
    formControl.className = "form-control success";
}

function unCheckRest(clicked_id){
    let temp_id
    if(doc_id.includes(clicked_id))
        temp_id = doc_id.slice()
    if(day_id.includes(clicked_id))
        temp_id = day_id.slice()
    temp_id.splice(temp_id.indexOf(clicked_id),1)
    for(let i=0;i<temp_id.length;i++){
        document.getElementById(temp_id[i]).checked = false
    } 
}

// $(document).ready(function() {
//     $(window).keydown(function(event){
//       if(event.keyCode == 13) {
//         event.validate();
//         return false;
//       }
//     });
//   });
