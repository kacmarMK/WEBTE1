
function getAge(dateString) 
{
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
    {
        age--;
    }
    return age;
}

// Defining a function to display error message
function printError(elemId, hintMsg) {
    document.getElementById(elemId).innerHTML = hintMsg;
}

function validateName() {
    var name = document.getElementById('name').value;
    var nameErr = true;
    // Validate name
    if(name == "") {
        printError("nameErr", "Chýbajúce krstné meno(Píšte bez diakritiky a iných znakov okrem abecedy)");
    } else {
        var regex = /^[a-zA-Z\s]+$/;                
        if(regex.test(name) === false) {
            printError("nameErr", "Prosím napíšte krstné meno v správnom tvare(Bez diakritiky a iných znakov okrem abecedy)");
        } else {
            printError("nameErr", "");
            nameErr = false;
        }
    }
    return nameErr;
}
function validateSurname() {
    var surname = document.getElementById('surname').value;
    var surnameErr = true;
    // Validate surname
    if(surname == "") {
        printError("surnameErr", "Chýbajúce priezvisko(Píšte bez diakritiky a iných znakov okrem abecedy)");
    } else {
        var regex = /^[a-zA-Z\s]+$/;                
        if(regex.test(surname) === false) {
            printError("surnameErr", "Prosím napíšte priezvisko v správnom tvare(Bez diakritiky a iných znakov okrem abecedy)");
        } else {
            printError("surnameErr", "");
            surnameErr = false;
        }
    }
    return surnameErr;
}

function valiDate() {
    var date = document.getElementById('date').value;
    var age = document.getElementById('age').value;
    var dateErr = true;
    // Validate date
    if(date == "") {
        printError("dateErr", "Chýbajúci dátum");
    } else if(age == "") {
        printError("dateErr", "Chýbajúci vek");
    } 
    else {
            printError("dateErr", "");
            printError("ageErr", "");
            dateErr = false;
    }
    return dateErr;
}

function validateAge() {
    var age = document.getElementById('age').value;
    var date = document.getElementById('date').value;
    var ageErr = true;
    // Validate age
    if(age == "") {
        printError("ageErr", "Chýbajúci vek");
    } else if(date == "") {
        printError("ageErr", "Chýbajúci dátum narodenia");
        printError("dateErr", "");
    } 
    else {
        if((date != "") && (age != getAge(date))) {
            printError("ageErr", "Prosím napíšte skutočný vek súhlasiaci s dátumom");
        }
        else {
            printError("ageErr", "");
            printError("dateErr", "");
            ageErr = false;
        }
    }
    return ageErr;
}

function validateEmail() {
    var email = document.getElementById('email').value;
    var emailErr = true;
    var beforeErr = true;
    var afterErr = true;
    // Validate email address
    if(email == "") {
        printError("emailErr", "Chýbajúci email");
    } else {
        // Regular expression for basic email validation
        var regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if(regex.test(email) === false) {
            printError("emailErr", "Prosím napíšte email v správnom tvare napr.(xxx@yyyy.zz)");
        } else{
            printError("emailErr", "");
            emailErr = false;
        }
    }
    //before @ test
    if(!emailErr) {
        var cnt = 0;
        for(let i = 0; i < email.length; i++) {
            if(email[i] != '@') 
                cnt++;
            else if (cnt < 3) {
                printError("emailErr", "Prosím napíšte email v správnom tvare napr.(xxx@yyyy.zz)");
                break;
            }
            else {
                printError("emailErr", "");
                beforeErr = false;
            }
        }
    }
    //two domains test
    if((!emailErr) && (!beforeErr)) {
        var after = false;
        var dotFound = false;
        var cnt = 0;
        for(let j = 0; j < email.length; j++) {
            if(email[j] == '@') {
                after = true;
                continue;
            }
            if(after){
                cnt++;
            }
            if(email[j] == '.'){
                dotFound = true;
                if(cnt == 1) {
                    printError("emailErr", "Prosím napíšte email v správnom tvare napr.(xxx@yyyy.zz)");
                    afterErr = true;
                    break;
                }
                else cnt = 0;
            }
        }
        if((cnt < 2) || (cnt > 4) || (!dotFound)) {
            printError("emailErr", "Prosím napíšte email v správnom tvare napr.(xxx@yyyy.zz)");
            afterErr = true;
        }
        else {
            printError("emailErr", "");
            afterErr = false;
        }
    }
}

function validateReligiosity(id) {
    var religiosity = document.form.id.value;
    var religiosityErr = true;

    if(religiosity == "") {
        printError("religiosityErr", "Prosím odpovedajte na 1 z možností")
    }
    else {
        printError("religiosityErr", "");
        religiosityErr = false;
    }
    return religiosityErr;
}

// Defining a function to validate form 
function validateForm() {
    // Retrieving the values of form elements 
    var email = document.form.email.value;
    var gender = "unknown";
    var genders = document.getElementsByName("gender");

    for(let i=0; i < genders.length; i++) {
        if(genders[i].checked) {
            gender = genders[i].value;
        }
    }
    
	// Defining error variables with a default value
    var nameErr = surnameErr = dateErr = ageErr = emailErr = beforeErr = afterErr = religiosityErr = true;

    nameErr = validateName();
    surnameErr = validateSurname();
    dateErr = valiDate();
    ageErr = validateAge();
    emailErr = validateEmail();
    religiosityErr = validateReligiosity();

    // Validate email address
    if(email == "") {
        printError("emailErr", "Chýbajúci email");
    } else {
        // Regular expression for basic email validation
        var regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if(regex.test(email) === false) {
            printError("emailErr", "Prosím napíšte email v správnom tvare napr.(xxx@yyyy.zz)");
        } else{
            printError("emailErr", "");
            emailErr = false;
        }
    }
    //before @ test
    if(!emailErr) {
        var cnt = 0;
        for(let i = 0; i < email.length; i++) {
            if(email[i] != '@') 
                cnt++;
            else if (cnt < 3) {
                printError("emailErr", "Prosím napíšte email v správnom tvare napr.(xxx@yyyy.zz)");
                break;
            }
            else {
                printError("emailErr", "");
                beforeErr = false;
            }
        }
    }
    //two domains test
    if((!emailErr) && (!beforeErr)) {
        var after = false;
        var dotFound = false;
        var cnt = 0;
        for(let j = 0; j < email.length; j++) {
            if(email[j] == '@') {
                after = true;
                continue;
            }
            if(after){
                cnt++;
            }
            if(email[j] == '.'){
                dotFound = true;
                if(cnt == 1) {
                    printError("emailErr", "Prosím napíšte email v správnom tvare napr.(xxx@yyyy.zz)");
                    afterErr = true;
                    break;
                }
                else cnt = 0;
            }
        }
        if((cnt < 2) || (cnt > 4) || (!dotFound)) {
            printError("emailErr", "Prosím napíšte email v správnom tvare napr.(xxx@yyyy.zz)");
            afterErr = true;
        }
        else {
            printError("emailErr", "");
            afterErr = false;
        }
    }

    // Prevent the form from being submitted if there are any errors
    if((nameErr || surnameErr || dateErr || ageErr || emailErr || beforeErr || afterErr || religiosityErr) == true) {
       return false;
    } 
    
}

function selectThis(id) {
    document.getElementById('man').checked = false;
    document.getElementById('woman').checked = false;
    document.getElementById('other').checked = false;

    document.getElementById(id).checked = true;
}

function show(element)
{
    switch(element.value){
        case "Yes":
            {

                document.getElementById('q1').style.display = 'block';
                document.getElementById('religionType').style.display = 'block';          

                document.getElementById('q2').style.display = 'none';
                document.getElementById('church').style.display = 'none';
                document.getElementById('q3').style.display = 'none';
                document.getElementById('branch').style.display = 'none';
                document.getElementById('q6').style.display = 'none';
                document.getElementById('discrimination').style.display = 'none';
                document.getElementById('q5').style.display = 'none';
                document.getElementById('separation').style.display = 'none';
                document.getElementById('q4').style.display = 'none';
                document.getElementById('saria').style.display = 'none';
                document.getElementById('q7').style.display = 'none';
                document.getElementById('beliefPeriod').style.display = 'none';
                document.getElementById('atheistReason').style.display = 'none';
                document.getElementById('q0').style.display = 'none';
            break;
            }
        case "No":
            {
                document.getElementById('atheistReason').style.display = 'block';
                document.getElementById('q0').style.display = 'block';

                document.getElementById('q1').style.display = 'none';
                document.getElementById('religionType').style.display = 'none';          
                document.getElementById('q2').style.display = 'none';
                document.getElementById('church').style.display = 'none';
                document.getElementById('q3').style.display = 'none';
                document.getElementById('branch').style.display = 'none';
                document.getElementById('q6').style.display = 'none';
                document.getElementById('discrimination').style.display = 'none';
                document.getElementById('q5').style.display = 'none';
                document.getElementById('separation').style.display = 'none';
                document.getElementById('q4').style.display = 'none';
                document.getElementById('saria').style.display = 'none';
                document.getElementById('q7').style.display = 'none';
                document.getElementById('beliefPeriod').style.display = 'none';
                break;
            }
        case "Christianity":
            {
            document.getElementById('q2').style.display = 'block';
            document.getElementById('church').style.display = 'block';
 
            document.getElementById('q3').style.display = 'none';
            document.getElementById('branch').style.display = 'none';
            document.getElementById('q6').style.display = 'none';
            document.getElementById('discrimination').style.display = 'none';
            document.getElementById('q4').style.display = 'none';
            document.getElementById('saria').style.display = 'none';
            document.getElementById('q7').style.display = 'none';
            document.getElementById('beliefPeriod').style.display = 'none';
            break;
            }
        case "Islam":
            {
            document.getElementById('q3').style.display = 'block';
            document.getElementById('branch').style.display = 'block';

            document.getElementById('q2').style.display = 'none';
            document.getElementById('church').style.display = 'none';
            document.getElementById('q6').style.display = 'none';
            document.getElementById('discrimination').style.display = 'none';
            document.getElementById('q5').style.display = 'none';
            document.getElementById('separation').style.display = 'none';
            document.getElementById('q7').style.display = 'none';
            document.getElementById('beliefPeriod').style.display = 'none';
            break;
            }
        case "Other religion":
            {
            document.getElementById('q6').style.display = 'block';
            document.getElementById('discrimination').style.display = 'block';

            document.getElementById('q2').style.display = 'none';
            document.getElementById('church').style.display = 'none';
            document.getElementById('q3').style.display = 'none';
            document.getElementById('branch').style.display = 'none';
            document.getElementById('q5').style.display = 'none';
            document.getElementById('separation').style.display = 'none';
            document.getElementById('q4').style.display = 'none';
            document.getElementById('saria').style.display = 'none';
            break;
            }
        case "Catholic":
        case "Evangelic":
        case "Orthodox": 
        case "Other":
            {
            document.getElementById('q5').style.display = 'block';
            document.getElementById('separation').style.display = 'block';

            document.getElementById('q3').style.display = 'none';
            document.getElementById('branch').style.display = 'none';
            document.getElementById('q4').style.display = 'none';
            document.getElementById('saria').style.display = 'none';
            document.getElementById('q7').style.display = 'none';
            document.getElementById('beliefPeriod').style.display = 'none';
            document.getElementById('q6').style.display = 'none';
            document.getElementById('discrimination').style.display = 'none';
            break;
            }
        case "Sunna":
        case "Si'a":
            {
            document.getElementById('q4').style.display = 'block';
            document.getElementById('saria').style.display = 'block';

            document.getElementById('q2').style.display = 'none';
            document.getElementById('church').style.display = 'none';
            document.getElementById('q7').style.display = 'none';
            document.getElementById('beliefPeriod').style.display = 'none';
            document.getElementById('q5').style.display = 'none';
            document.getElementById('separation').style.display = 'none';
            document.getElementById('q6').style.display = 'none';
            document.getElementById('discrimination').style.display = 'none';
            break;
            }
        case "Is discriminated":
        case "Is not discriminated":
        case "Doesn't know(discrimination)":
            {
            document.getElementById('q7').style.display = 'block';
            document.getElementById('beliefPeriod').style.display = 'block';

            document.getElementById('q4').style.display = 'none';
            document.getElementById('saria').style.display = 'none';
            document.getElementById('q2').style.display = 'none';
            document.getElementById('church').style.display = 'none';
            document.getElementById('q3').style.display = 'none';
            document.getElementById('branch').style.display = 'none';
            document.getElementById('q5').style.display = 'none';
            document.getElementById('separation').style.display = 'none';
            break;
            }
        default: return;
    }
}