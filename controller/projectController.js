const projects = require("../Model/projectModel")


// projects add
exports.addProjectController = async (req, res) => {
    console.log("inside addprojectcontroller");
    console.log("req", req.file.filename, req.userId);


    const { userId } = req
    console.log(userId);
    // console.log(req.body);
    // console.log(req.file);


    const { title, languages, github, website, overview } = req.body
    const projectImg = req.file.filename

    try {
        const existingProject = await projects.findOne({ github })
        if (existingProject) {
            res.status(406).json("project already added...please add another one")
        }
        else {
            const newproject = new projects({ title, languages, github, website, overview, projectImg, userId })

            await newproject.save()
            res.status(200).json(newproject)
        }


    } catch (err) {
        res.status(401).json(err)
        console.log("error to add project(project controller)", err);


    }



}

// homepage view projects

exports.homeProjectController = async (req, res) => {
    console.log("inside the homeprojectController");

    try {
        const homeProject = await projects.find().limit(3)
        res.status(200).json(homeProject)


    } catch (err) {
        res.status(401).json(err)
        console.log("error to view home project");


    }
}
// all project view
exports.allProjectController = async (req, res) => {
    console.log("inside the allProjectController");
    const{search}=req.query //or const a= req.query.search
    try {
        const allprojects = await projects.find({languages:{$regex:search,$options:"i"}})
        res.status(200).json(allprojects)


    } catch (err) {
        res.status(401).json(err)
        console.log("error to view all project");
    }


}

exports.ownProjectController = async (req, res) => {
    console.log("inside the ownprojects");

    const userId = req.userId

    try {
        const ownProject = await projects.find({ userId })
        res.status(200).json(ownProject)
        console.log(ownProject);


    } catch (err) {
        res.status(401).json(err)
        console.log(err);

    }

}

// update project
exports.upadateProjectController = async (req, res) => {
    console.log("inside the upadateProjectController");
    const { id } = req.params
    const { title, languages, github, website, overview, projectImg } = req.body
    const uploadImg = req.file ? req.file.filename : projectImg
    const userId = req.userId

    try {

        const updateProject = await projects.findOneAndUpdate({ _id: id }, { title, languages, github, website, overview, projectImg: uploadImg, userId }, { new: true })
        await updateProject.save()
        res.status(200).json(updateProject)

    } catch (err) {
        res.status(401).json(err)

    }

}

// delete project
exports.deleteProjectController = async (req, res) => {
    console.log("inside the deleteProjectController");

    const { id } = req.params
    try {
        const deleteProject = await projects.findByIdAndDelete({ _id: id })
        res.status(200).json(deleteProject)

    } catch (err) {
        res.status(401).json(err)

    }

}
