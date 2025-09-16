const users = require('../Model/userModel')
const jwt = require('jsonwebtoken')


//register page 

exports.registerController = async (req, res) => {
    console.log('inside registerController');

    const { username, email, password } = req.body

    try {
        const existingUser = await users.findOne({ email })

        if (existingUser) {
            res.status(406).json("user allready registered")
        }
        else {
            const newUser = new users({ username, email, password })
            await newUser.save()
            res.status(200).json(newUser)
        }
    } catch (err) {
        res.status(401).json(err)
    }

}


// login page

exports.loginController = async (req, res) => {
    console.log('inside the login controller');
    const { email, password } = req.body

    try {
        const existingUser = await users.findOne({ email, password })

        if (existingUser) {
            const token = jwt.sign({ userId: existingUser._id }, process.env.JWT_PASSWORD)
            res.status(200).json({ user: existingUser, token })
        }
        else {
            res.status(404).json("Invalid Email/Password")
        }

    } catch (err) {
        res.status(401).json(err)
    }

}

// profile updation

exports.profileUpdateController = async (req, res) => {
    console.log("inside the profileUpdateController");

    const userId = req.userId
    const { username, email, password, github, linkedin, profilepic } = req.body
    uploadImg = req.file ? req.file.filename : profilepic

    try {

        const updatedUser = await users.findByIdAndUpdate({ _id: userId }, { username, email, password, github, linkedin, ProfilePic: uploadImg }, { new: true })
        await updatedUser.save()
        res.status(200).json(updatedUser)


    } catch (err) {
        res.status(401).json(err)

    }

}
