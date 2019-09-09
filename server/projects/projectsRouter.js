const router = require("express").Router();
const Projects = require("../data/helpers/projectModel");

//get all projects 
//http://localhost:4000/api/projects/
router.get("/", (req, res) => {
  Projects.get()
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "The list of projects could not be retrieved" });
    });
});

//add new project
//http://localhost:4000/api/projects/
router.post("/", validateProject, (req, res) => {
  const project = req.body;
  Projects.insert(project)
    .then(project => {
      res.status(200).json(project);
    })
    .catch(error => {
      res.status(500).json({ message: "Could not add project to the db" });
    });
});

//get project ids
//http://localhost:4000/api/projects/ids
router.get("/ids", (req, res) => {
  Projects.getIds()
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "The list of projects could not be retrieved" });
    });
});

//get a project by id
//http://localhost:4000/api/projects/:id
router.get("/:id", validateProjectId, (req, res) => {
  const id = req.params.id;
  Projects.get(id)
    .then(project => {
      res.status(200).json(project);
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "Could not get the specified project by ID" });
    });
});

//get actions of a project
//http://localhost:4000/api/projects/1/actions
router.get("/:id/actions", validateProjectId, (req, res) => {
  const id = req.params.id;
  Projects.getProjectActions(id)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "The actions by that project could not be retrieved" });
    });
});

//delete a project
//http://localhost:4000/api/projects/:id
router.delete("/:id", validateProjectId, (req, res) => {
  const id = req.params.id;
  const removeProject = async () => {
    try {
      const project = await Projects.get(id)
      await Projects.remove(id)
      await res.status(200).json({deleted: project});
    }
    catch(err) {
      res.status(500).json({ message: "Could not delete a project with that ID" });
    }
  }
  removeProject()
});

//edit a project
//http://localhost:4000/api/projects/6
router.put("/:id", validateProjectId, (req, res) => {
  const id = req.params.id;
  const changes = req.body;
  const update = async () => {
  try {
    const updated = await Projects.update(id, changes)
    await res.status(200).json(updated)
  }
  catch(err) {
    res.status(500).json({ message: "Could not update the project" });
  }
  }
  update()
});

//custom middleware
//project id exists
function validateProjectId(req, res, next) {
  const id = req.params.id;
  Projects.get(id)
    .then(project => {
      if (project) {
        req.project = project;
        next();
      } else {
        res.status(400).json({ message: "Invalid Project ID" });
      }
    })
    .catch(error => {
      res.status(500).json({ message: "API Error" });
    });
}
//new project has required fields
function validateProject(req, res, next) {
  if (!Object.keys(req.body).length > 0) {
    res.status(400).json({ message: "Missing project data, could not add to db" });
  } else if (!req.body.hasOwnProperty("name" && "description" )) {
    res.status(400).json({ message: "Missing required field, could not add to db" });
  } else {
    next();
  }
}


module.exports = router;
