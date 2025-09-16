const express=require('express')
const userController=require('../controller/userController')
const ProjectController=require("../controller/projectController")
const jwtMiddleware=require('../midleware/jwtMiddleware')
const multerMiddleware=require('../midleware/multerMiddleware')  

const router=new express.Router()




// register page
router.post('/register',userController.registerController)
// login page'
router.post("/login",userController.loginController)

// add project
router.post('/add-project',jwtMiddleware,multerMiddleware.single('projectImg'),ProjectController.addProjectController)

// home view project
router.get('/get_homeproject',ProjectController.homeProjectController)

// allproject view
router.get("/get_allprojects",jwtMiddleware,ProjectController.allProjectController)

// own project view
router.get("/own-project",jwtMiddleware,ProjectController.ownProjectController)

// update project
router.put("/edit/project/:id",jwtMiddleware,multerMiddleware.single('projectImg'),ProjectController.upadateProjectController)

// delete or remove
router.delete("/delete/project/:id",jwtMiddleware,ProjectController.deleteProjectController)

// update profile
router.put("/edit/profile",jwtMiddleware,multerMiddleware.single('profilepic'),userController.profileUpdateController)




module.exports=router   