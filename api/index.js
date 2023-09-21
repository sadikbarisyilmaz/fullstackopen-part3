import express from "express";
import "dotenv/config";
import morgan from "morgan";
import cors from "cors";
import Person from "../models/person.js";

const PORT = process.env.PORT;
const app = express();

const infoPage = () => {
  const date = new Date();

  return `<p>Phonebook has info for ${persons.length} people</p>
  <p>${date}</p>`;
};

morgan.token("body", (requset) => {
  return JSON.stringify(requset.body);
});
app.use(cors());
app.use(express.json());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms  :body")
);

app.get("/", (req, res) => {
  try {
    res.send("Home");
  } catch (error) {
    console.log(error);
  }
});

app.get("/info", (req, res) => {
  try {
    res.send(infoPage());
  } catch (error) {
    console.log(error);
  }
});

app.get("/api/persons/", (req, res) => {
  try {
    Person.find({}).then((persons) => {
      res.json(persons);
    });
  } catch (error) {
    console.log(error);
  }
});

app.post("/api/persons", (req, res) => {
  const body = req.body;

  const newPerson = new Person({
    name: body.name,
    number: body.number,
  });

  newPerson.save().then((savedNote) => {
    res.json(savedNote);
  });
});

app.get("/api/persons/:id", (req, res) => {
  // if (persons[req.params.id - 1]) {
  //   res.send(persons[req.params.id - 1]);
  //   res.status(200).end();
  // } else {
  //   res.status(404).end();
  // }

  Person.findById(req.params.id).then((person) => {
    res.json(person);
  });
});

app.delete("/api/persons/:id", (req, res) => {
  // User.findByIdAndDelete(req.params.id, function (err, docs) {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     console.log("Deleted : ", docs);
  //   }
  // });

  if (persons[req.params.id - 1]) {
    const id = Number(req.params.id - 1);
    persons = persons.filter((person) => person.id !== id);

    res.status(200).send({ message: "Person deleted successfully" });
  } else {
    res.status(404).send({ message: "Person not found" });
  }
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
