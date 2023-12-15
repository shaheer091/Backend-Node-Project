const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const { log } = require("console");
// const signupValidation = require('./validation')
//  const checkSignup = require("./loginValidation");
const userData = [];

router.get("/", (req, res) => {
    if (req.session.mail) {
        res.redirect("/homepage");
    } else {
        res.render("signup");
    }
});

router.get("/signup", (req, res) => {
    res.render('signup')
})

router.post("/signup", (req, res) => {
    const { email, password } = req.body;

    const oldUser = userData.find((user) => user.email === email);

    if (!email || !password) {
        res.redirect("signup");
    } else if (oldUser) {
        console.log("user already exist");
        res.redirect("login");
    } else {
        req.session.mail = email;
        console.log(req.session.mail);
        const newUser = {
            email,
            password,
        };
        console.log("new user added");
        userData.push(newUser);
        res.redirect("/homepage");
    }
    console.log("userData", userData);
});

router.get("/login", (req, res) => {
    if (req.session.mail) {
        res.redirect("/homepage");
    } else {
        res.render("login");
    }
});

router.post("/login", checkSignup, (req, res) => {
    const { email, password } = req.body;

    const loginedUser = userData.find(
        (user) => user.email === email && user.password === password
    );

    if (loginedUser) {
        console.log("successfully logged in");
        req.session.mail = email;
        res.redirect("homepage");
    } else {
        console.log("enter email and password correctly");
        res.redirect("login");
    }
});

router.get("/homepage", (req, res) => {
    if (req.session.mail) {
        res.render("homepage");
    } else {
        res.redirect('/')
    }

});

router.post("/logoutt", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log('error destroying session', err);
        } else {
            res.redirect('/login')
        }
    })
})


function checkSignup(req, res, next) {
    const { email, password } = req.body;
    // console.log(req.body);

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const validEmail = emailPattern.test(email);

    const passPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()]).{8,}$/;
    const validPassword = passPattern.test(password);

    if (!validEmail || !validPassword) {
        res.redirect("/login");
    } else {
        next();
    }
}

module.exports = router;
