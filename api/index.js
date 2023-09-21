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

app.post("/api/persons", (req, res, next) => {
  const body = req.body;

  const newPerson = new Person({
    name: body.name,
    number: body.number,
  });

  newPerson
    .save()
    .then((savedNote) => {
      res.json(savedNote);
    })
    .catch((error) => next(error));
});

app.get("/api/persons/:id", (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      res.json(person);
    })
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (req, res, next) => {
  const id = req.params.id;
  Person.findByIdAndRemove(id)
    .then((result) => {
      result === null && res.status(404).end();
      res.status(204).end();
    })
    .catch((error) => next(error));
});

app.put("/api/persons/:id", (req, res, next) => {
  const id = req.params.id;
  const person = {
    name: req.body.name,
    number: req.body.number,
  };

  Person.findByIdAndUpdate(id, person, { new: true })
    .then((updatedPerson) => {
      res.json(updatedPerson);
    })
    .catch((error) => next(error));
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

app.use(unknownEndpoint);
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
