const Auth = require("../model/auth");
const passwordComplexity = require('joi-password-complexity');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const SignUpFunction = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const isExist = await Auth.findOne({ email });
        if (isExist) return res.status(400).send("This email has already been used.");

        const validation = passwordValidate(password);
        if (validation.error) return res.status(400).send(validation.error.details[0].message);

        const hashedPassword = await bcrypt.hash(password, 15);

        const newAuth = await Auth.create({
            username,
            email,
            password: hashedPassword,
        });

        // Generate a JWT token for the user
        const token = jwt.sign({ id: newAuth._id }, process.env.JWT_KEY, { expiresIn: "30d" });

        // Send the response with the new user and token
        res.status(201).json({ user: newAuth, token });
    } catch (error) {
        console.error("Error during user signup:", error.message);
        res.status(500).json({ message: "An error occurred during signup. Please try again." });
    }
};


const signInFunction = async (req, res) => {
    try {
        const { email, password } = req.body;

        const foundAuth = await Auth.findOne({ email })
    
        if (!foundAuth) return res.status(404).send("User could not be found");

        const isPassword = await bcrypt.compare(password, foundAuth.password);
        if (!isPassword) return res.status(400).send("Password is incorrect");

        const token = jwt.sign({ id: foundAuth._id}, process.env.JWT_KEY, { expiresIn: "30d" });
        res.status(201).json({ data: foundAuth, token });
    } catch (error) {
        console.log(error.message);
        res.status(500).json(error);
    }
};

const getAllUser = async(req, res)=>{
    try {
        const allUser = await Auth.find()
        res.status(200).json(allUser)
    } catch (error) {
        console.log(error.message);
        res.status(500).json(error);
    }
}

const passwordValidate = (password) => {
    const schema = {
        min: 5,
        max: 30,
        numeric: 1,
    }
    return passwordComplexity(schema).validate(password)
}

module.exports = {
    SignUpFunction,
    signInFunction,
    getAllUser,
}