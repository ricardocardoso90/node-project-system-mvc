const express = require('express');
const exphbs = require('express-handlebars');

const app = express();
const conn = require('./db/conn');

const tasksRoutes = require('./routes/tasksRoutes');

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.set("view engine", "handlebars");
app.engine("handlebars", exphbs.engine());

app.use(express.json());
app.use(express.static("./public"));

app.use('/tasks', tasksRoutes);

conn
  .sync()
  // .sync({ force: true })
  .then(() => app.listen(3000))
  .catch((error) => console.log(error));