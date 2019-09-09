const router = require("express").Router();

const Actions = require("../data/helpers/actionModel");
const Projects = require("../data/helpers/projectModel");

//get all actions
//http://localhost:4000/api/actions/
router.get("/", (req, res) => {
  Actions.get()
    .then(action => {
      res.status(200).json(action);
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "The list of actions could not be retrieved" });
    });
});
//get action by id
//http://localhost:4000/api/actions/1
router.get("/:id", (req, res) => {
  const id = req.params.id;
  const getAction = async () => {
    try {
      const action = await Actions.get(id);
      await res.status(200).json(action);
    } catch (err) {
      res
        .status(500)
        .json({ message: "Could not get the specified action by ID" });
    }
  };
  getAction();
});

//delete a single action
//http://localhost:4000/api/actions/4
//needs a timeout?
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  const deletePost = async () => {
    try {
      const action = await Actions.get(id);
      await Actions.remove(id);
      await res.status(200).json(action);
    } catch (err) {
      res
        .status(500)
        .json({ message: "Could not get the specified action by ID" });
    }
  };
  deletePost();
});

//add an action
//http://localhost:4000/api/actions/project-2
router.post("/project-:id/", validateProjectId, (req, res) => {
  const newAction = req.body;
  newAction.project_id = req.params.id;
  const addAction = async () => {
    try {
      const action = await Actions.insert(newAction);
      await res.status(200).json(action);
    } catch (err) {
      res.status(500).json({
        message: "There was an error while saving the post to the database"
      });
    }
  };
  addAction();
});

// custom middleware

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

module.exports = router;
