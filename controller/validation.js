// var checker = false

function checkValidation() {
    const passwordPattern =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()]).{8,}$/;
    const inputPassword = document.getElementById("inputPassword").value;
    const wrongPass = document.getElementById("errPass");
    console.log(inputPassword);
    const validPass = passwordPattern.test(inputPassword);

    if (!validPass) {
        wrongPass.innerText = "wrong pass";
        return false;
    } else {
        wrongPass.innerText = "";
        return true;
        // checker = true
    }
    // !validPass ? (wrongPass.innerText = "wrong pass") : (wrongPass.innerText = "");
}

