const express = require("express");
const cors = require("cors");
const ActionsRouter = require("./actions/actionsRouter.js");
const ProjectsRouter = require("./projects/projectsRouter.js");
const app = express();

app.use(express.json());
app.use(cors());

app.all('*',function(req, res, next) {
  console.log('Time:', Date.now())
  next()
}, function (req, res, next) {
  console.log(req.method)
  next()
})

app.use('/api/actions',  ActionsRouter)

app.use('/api/projects',  ProjectsRouter)

app.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});
module.exports = app;
