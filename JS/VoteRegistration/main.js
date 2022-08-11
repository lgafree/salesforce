errors = []

function validate(){
    errors = []
    errorList = document.getElementById("errors")
    errorList.innerHTML = ""

    ValidateName()
    ValidateUsername()
    ValidatePassword()
    ValidateDOB()

    if(errors.length == 0 ){
        dob = new Date(document.getElementById('dob').value)
        today = new Date()
        age = (today.getFullYear() - dob.getFullYear())

        errorList.innerHTML = ""

        age >= 18 ? alert("Succesfully registered!") : alert("Age should be more than 18. ")        
    }
    else{       
        errorList.innerHTML = "ERRORS:<br>"

        errors.forEach(err => {
            errorList.innerHTML+=`<li class="error">${err}</li>`
        });
    }
}

function ValidateUsername(){
    username = document.getElementById("username").value

    if(username.length == 0 ){
        errors.push("Username can't be null.")
    }
    else if(/[0-9]/.test(username) && /[a-zA-z]/.test(username)) {
        null;
    } 
    else{
        errors.push("Username should have a combination of character and numerals.")
    }
}

function ValidatePassword(){
    password = document.getElementById("password").value

    if(password.length == 0){
        errors.push("Password can't be null.")
    }
    else{
        password.length < 8 || password.length > 16 ? errors.push("Password should range between 8 to 16.") : null

        if(/[0-9]/.test(password) && /[a-z]/.test(password) && /[A-Z]/.test(password)){
            null
        }
        else{
            errors.push("Password should have at least one upper case letter, at least one lower case, at least one number")
        }
    }
}

function ValidateName(){
    voters_name = document.getElementById("name").value
    
    if(voters_name.length == 0){
        errors.push("Name can't be null.")
    }
    else{
        /[0-9]/.test(voters_name) ? errors.push("Name should not contain numerals") : null
    }
}

function ValidateDOB(){
    dob = document.getElementById("dob").value

    !dob ? errors.push("DOB should not be null") : null
}