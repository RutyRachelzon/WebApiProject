
//ניסיון התחברות למערכת
async function login() {
    const userName = document.getElementById("userNameSignIn").value;
    const password = document.getElementById("passwordSignIn").value;
    const response = await fetch(`https://localhost:44335/api/user/?password=${password}&userName=${userName}`);
    if (!response.ok) {
        throw Error(`Error😒 you have some problem in status ${response.status}, try again later`)
    }
    else if (response.status == 204)
    {
        alert("oops,user not found😒");
        return;
    }
        
    else {
        const res = await response.json();
        sessionStorage.setItem('user', JSON.stringify(res));
         user = JSON.parse(sessionStorage.getItem('user'));
        alert(`hello ${user.firstName}, we hope you will enjoy🤗🤪`);
        window.location.href = "userDetails.html";
    }
}
function userValidate(user) {
    flag = true;
    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const letters = /^[A-Za-z]+$/;
    if (!user.userName.match(validRegex)) {
        document.getElementById("emailValidations").innerHTML = "email is not valid";
        flag=false;
    }
    if (user.password == "") {
        document.getElementById("passwordValidation").innerHTML = "password is required";
        flag = false;
    }

    if (user.password.length > 8 || user.password.length < 8) { 
            document.getElementById("passwordValidation").innerHTML = "password should be 8 chars";
            flag = false;
        }

    if (user.firstName.length < 2 || user.firstName.length > 20 || !(user.firstName.match(letters))) {
        document.getElementById("firstNameValidation").innerHTML = "firatNmae should contain only letters and at least 2 letters";
        flag=false;
    }
    if (user.lastName.length.length < 2 || user.lastName.length.length > 20 || !(user.lastName.match(letters))) {
        document.getElementById("lastNameValidation").innerHTML = "LastName shuld be only letters and at least 2 letters";
        flag=false;
    }
    return flag;
}


function getUserFromHtml( userName,  password,  firstName, lastName) {
    UserName = document.getElementById(userName).value;
    Password = document.getElementById(password).value;
    FirstName = document.getElementById(firstName).value;
    LastName = document.getElementById(lastName).value;
    return { "userName": UserName, "password": Password, "firstName": FirstName, "lastName": LastName};
}

function showLogin() {
    const f = document.getElementById("login");
    f.style.visibility = "visible";
}


  // קוד רישום למשתמש חדש
async function enrollToSite() {
    document.getElementById("passwordValidation").innerHTML = "";
    document.getElementById("emailValidations").innerHTML = "";
    document.getElementById("firstNameValidation").innerHTML = "";
    document.getElementById("lastNameValidation").innerHTML = "";
    user =getUserFromHtml("userName", "password", "fName", "lName");
    if (userValidate(user)) { 
    
    const response = await fetch("https://localhost:44335/api/user", {
        headers: { "Content-type": "application/json" },
        method: 'POST',
        body: JSON.stringify(user)
    });
        if (response.ok) {
             alert("yey!! we happy you chose using our site😀");
        }
      

    else {
        alert("ooooppss something wrong, please try again later");
        }
    }

}

//קוד עדכון פרטי המשתמש!

async function updateDetails() {
    document.getElementById("passwordValidation").innerHTML = "";
    document.getElementById("emailValidations").innerHTML = "";
    document.getElementById("firstNameValidation").innerHTML = "";
    document.getElementById("lastNameValidation").innerHTML = "";
    let user = await getUpdatedDetails();
    if (userValidate(user)) { 
    const response = await fetch(`https://localhost:44335/api/user/${user.userId}`, {
        headers: { "Content-Type": "application/json;charset=utf-8" },
        method: 'PUT',
        body: JSON.stringify(user)
    });
    if (response.ok) {
        user = JSON.parse(sessionStorage.getItem('user'));
        alert(`${user.firstName} your details updated successfuly🤗`);
    }
}
}
//שליפת פרטי המשתמש בשביל עדכון הפרטים
function ShowUserDetailsAfterUpdating() {
    const f = document.getElementById("updateDetails");
    f.style.visibility = "visible";

    //const passwordAfterUpdating = document.getElementById("passwordD");
    const fNameAfterUpdating = document.getElementById("fNameD");
    const lNameAfterUpdating = document.getElementById("lNameD");
    const userNameAfterUpdating = document.getElementById("userNameD");

    const user = JSON.parse(sessionStorage.getItem('user'));

    userNameAfterUpdating.setAttribute("value", user.userName);
    //passwordAfterUpdating.setAttribute("value", user.password);
    fNameAfterUpdating.setAttribute("value", user.firstName);
    lNameAfterUpdating.setAttribute("value", user.lastName); 
}

//שליפת פרטי המשתמש המעודכנים
function getUpdatedDetails() {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const id = user.userId;

    userAfterUpdate = getUserFromHtml("userNameD", "passwordD", "fNameD", "lNameD");
    userAfterUpdate.userId = id;
    sessionStorage.setItem('user', JSON.stringify(userAfterUpdate));
    console.log(userAfterUpdate);
    return userAfterUpdate;
}

async function checkPassword(){
    const password = document.getElementById("password").value;
    const response = await fetch("https://localhost:44335/api/password", {
        headers: { "Content-type": "application/json" },
        method: 'POST',
        body: JSON.stringify(password)
    });
    console.log(response);
    if (response.ok) {
        const res = await response.json();
        document.getElementById("checkPassword").innerText = "The password strength is " + res;
        if (res < 2)
            document.getElementById("passwordValidation").innerHTML="password sould be stronger(try enter big letters)"
    }
    else {
        alert("ooooppss ");
    }
}

function goShopping() {
    window.location.href = "product.html";
}
function toMyBasket() {
    window.location.href = "ShoppingBag.html";

}

    