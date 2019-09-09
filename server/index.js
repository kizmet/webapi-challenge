const app = require('./app.js');

// configure port #
const PORT = process.env.PORT || 4000;

// listen on port for requests
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
