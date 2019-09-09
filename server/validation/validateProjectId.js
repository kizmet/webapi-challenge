

function validateProjectId(req, res, next) {
  const id = req.params.id;
  Actions.get(id)
    .then(action => {
      if (action) {
        req.action = action;
        next();
      } else {
        res.status(400).json({ message: "Invalid action ID" });
      }
    })
    .catch(error => {
      res.status(500).json({ message: "API Error" });
    });
}