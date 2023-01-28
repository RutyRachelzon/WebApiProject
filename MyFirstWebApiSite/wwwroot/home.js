//
//ניסיון התחברות למערכת
//1
//async function login() {
//    const userName = document.getElementById("userNameSignIn").value;
//    const password = document.getElementById("passwordSignIn").value;
//    const response = await fetch(`https://localhost:44335/api/user/?password=${password}&userName=${userName}`);
//    if (!response.ok) {
//        throw Error(`Error😒 you have some problem in status ${response.status}, try again later`)
//    }
//    else if (response.status == 204)
//    {
//        alert("oops,user not found😒");
//        return;
//    }

//    else {
//        const res = await response.json();
//        sessionStorage.setItem('user', JSON.stringify(res));
//         user = JSON.parse(sessionStorage.getItem('user'));
//        alert(`hello ${user.firstName}, we hope you will enjoy🤗🤪`);
//        window.location.href = "userDetails.html";
//    }
//}
//1

//refactor 1
async function login() {
    const userName = document.getElementById("userNameSignIn").value;
    const password = document.getElementById("passwordSignIn").value;

    try {
        const response = await fetch(`https://localhost:44335/api/user/?password=${password}&userName=${userName}`);
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        if (response.status === 204) {
            alert("oops, user not found😒");
            return;
        }
        const res = await response.json();
        sessionStorage.setItem('user', JSON.stringify(res));
        const user = JSON.parse(sessionStorage.getItem('user'));
        alert(`hello ${user.firstName}, we hope you will enjoy🤗🤪`);
        window.location.href = "userDetails.html";
    } catch (error) {
        console.error(error);
        alert(`Error: ${error.message}`);
    }
}

//refactor 1
 //2
//function getUserFromHtml( userName,  password,  firstName, lastName) {
//    UserName = document.getElementById(userName).value;
//    Password = document.getElementById(password).value;
//    FirstName = document.getElementById(firstName).value;
//    LastName = document.getElementById(lastName).value;
//    return { "userName": UserName, "password": Password, "firstName": FirstName, "lastName": LastName};
//}

//function showLogin() {
//    const f = document.getElementById("login");
//    f.style.visibility = "visible";
//}


//  // קוד רישום למשתמש חדש
//async function enrollToSite() {
//    user =getUserFromHtml("userName", "password", "fName", "lName");
//    const response = await fetch("https://localhost:44335/api/user", {
//        headers: { "Content-type": "application/json" },
//        method: 'POST',
//        body: JSON.stringify(user)
//    });
//    if (response.ok)
//        alert("yey!! we happy you chose using our site😀");
//    else {
//        alert("ooooppss something wrong, please try again later");
//    }

//}
//2

//refactor 2

function getUserFromHtml(userNameId, passwordId, firstNameId, lastNameId) {
    const userName = document.getElementById(userNameId).value;
    const password = document.getElementById(passwordId).value;
    const firstName = document.getElementById(firstNameId).value;
    const lastName = document.getElementById(lastNameId).value;
    return { userName, password, firstName, lastName };
}

function showLogin() {
    document.getElementById("login").style.visibility = "visible";
}

async function enrollToSite() {
    const user = getUserFromHtml("userName", "password", "fName", "lName");
    const response = await fetch("https://localhost:44335/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user)
    });
    if (response.ok) {
        alert("Yey! We're happy you chose to use our site 😀");
    } else {
        alert("Oops, something went wrong. Please try again later.");
    }
}

//refactor 2

//קוד עדכון פרטי המשתמש!

//async function updateDetails() {
//    let user = await getUpdatedDetails();
//    const response = await fetch(`https://localhost:44335/api/user/${user.userId}`, {
//        headers: { "Content-Type": "application/json;charset=utf-8" },
//        method: 'PUT',
//        body: JSON.stringify(user)
//    });
//    if (response.ok) {
//        user = JSON.parse(sessionStorage.getItem('user'));
//        alert(`${user.firstName} your details updated successfuly🤗`);
//    }

//}
////שליפת פרטי המשתמש בשביל עדכון הפרטים
//function ShowUserDetailsAfterUpdating() {
//    const f = document.getElementById("updateDetails");
//    f.style.visibility = "visible";

//    const passwordAfterUpdating = document.getElementById("passwordD");
//    const fNameAfterUpdating = document.getElementById("fNameD");
//    const lNameAfterUpdating = document.getElementById("lNameD");
//    const userNameAfterUpdating = document.getElementById("userNameD");

//    const user = JSON.parse(sessionStorage.getItem('user'));

//    userNameAfterUpdating.setAttribute("value", user.userName);
//    passwordAfterUpdating.setAttribute("value", user.password);
//    fNameAfterUpdating.setAttribute("value", user.firstName);
//    lNameAfterUpdating.setAttribute("value", user.lastName);
//}

////שליפת פרטי המשתמש המעודכנים
//function getUpdatedDetails() {
//    const user = JSON.parse(sessionStorage.getItem('user'));
//    const id = user.userId;
//    userAfterUpdate = getUserFromHtml("userNameD", "passwordD", "fNameD", "lNameD");
//    userAfterUpdate.userId = id;
//    sessionStorage.setItem('user', JSON.stringify(userAfterUpdate));
//    console.log(userAfterUpdate);
//    return userAfterUpdate;
//}

//async function checkPassword(){
//    const password = document.getElementById("password").value;
//    const response = await fetch("https://localhost:44335/api/password", {
//        headers: { "Content-type": "application/json" },
//        method: 'POST',
//        body: JSON.stringify(password)
//    });
//    console.log(response);
//    if (response.ok) {
//        const res = await response.json();
//        alert(res);
//    }
//    else {
//        alert("ooooppss ");
//    }
//}

//refactor
async function updateDetails() {
    let user = await getUpdatedDetails();
    try {
        const response = await fetch(`https://localhost:44335/api/user/${user.userId}`, {
            headers: { "Content-Type": "application/json;charset=utf-8" },
            method: 'PUT',
            body: JSON.stringify(user)
        });

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        user = JSON.parse(sessionStorage.getItem('user'));
        alert(`${user.firstName} your details updated successfuly🤗`);
    } catch (error) {
        console.error(error);
        alert('Failed to update details. Please try again later.');
    }
}

// Retrieves user details for updating
function ShowUserDetailsAfterUpdating() {
    const form = document.getElementById("updateDetails");
    form.style.visibility = "visible";

    const passwordField = document.getElementById("passwordD");
    const firstNameField = document.getElementById("fNameD");
    const lastNameField = document.getElementById("lNameD");
    const usernameField = document.getElementById("userNameD");

    const user = JSON.parse(sessionStorage.getItem('user'));

    usernameField.value = user.userName;
    passwordField.value = user.password;
    firstNameField.value = user.firstName;
    lastNameField.value = user.lastName;
}

// Retrieves updated user details
function getUpdatedDetails() {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const id = user.userId;
    const userAfterUpdate = getUserFromHtml("userNameD", "passwordD", "fNameD", "lNameD");
    userAfterUpdate.userId = id;
    sessionStorage.setItem('user', JSON.stringify(userAfterUpdate));
    console.log(userAfterUpdate);
    return userAfterUpdate;
}

async function checkPassword() {
    const password = document.getElementById("password").value;
    try {
        const response = await fetch("https://localhost:44335/api/password", {
            headers: { "Content-type": "application/json" },
            method: 'POST',
            body: JSON.stringify(password)
        });
        if (!response.ok) {
            throw new Error(response.statusText);
        }

        const res = await response.json();
        alert(res);
    } catch (error) {
        console.error(error);
        alert("ooooppss ");
    }
}

//refactor


    