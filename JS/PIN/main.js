errors = []
person_name = ''
person_dob = ''
person_contact = ''


class Person{
    constructor(namee, dob, contact){
        this.name = namee
        this.dob = dob
        this.contact = contact
    }

    getPIN(){
        let dd = new Date(this.dob).getDate().toString()
        let mm = (new Date(this.dob).getMonth() + 1).toString()
        let yyyy = new Date(this.dob).getFullYear().toString()

        alert("PIN: "+
            this.name.slice(0,4)+
            dd+mm+yyyy.slice(2,4)+
            this.contact.slice(6,11))
    }
}

function check(){
    errors = []
    errorList = document.getElementById("errors")
    errorList.innerHTML = ""

    ValidateName()
    ValidateDOB()
    ValidateContact()

    if(errors.length == 0 ){
        person = new Person(person_name, person_dob, person_contact)   
        person.getPIN()    
    }
    else{       
        errorList.innerHTML = "ERRORS:<br>"

        errors.forEach(err => {
            errorList.innerHTML+=`<li class="error">${err}</li>`
        });
    }
}

function ValidateName(){
    voters_name = document.getElementById("name").value
    
    if(voters_name.length == 0){
        errors.push("Name can't be null.")
    }
    else if( voters_name.length < 4){
        errors.push("Name must be 4 or more characters.")
    }
    else if( /[0-9]/.test(voters_name)){
        errors.push("Name should not contain numerals")
    }
    else{
        person_name = voters_name
    }
}

function ValidateDOB(){
    dob = document.getElementById("dob").value

    !dob ? errors.push("DOB should not be null") : person_dob = dob
}

function ValidateContact(){
    contact = document.getElementById("contact").value
    
    if(/^[0-9]{11}?$/.test(contact)){
        person_contact = contact
    }
    else{
        errors.push("Contact number should contain numerics only and should be 11 digits long.")
    }
}