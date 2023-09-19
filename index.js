import express from "express";
const PORT = 3001;
const app = express();
let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];
const infoPage = () => {
  const date = new Date();

  return `<p>Phonebook has info for ${persons.length} people</p>
  <p>${date}</p>`;
};

const getRandomId = () => {
  return Math.floor(Math.random() * 10000);
};
app.use(express.json());

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
    res.send(persons);
  } catch (error) {
    console.log(error);
  }
});

app.post("/api/persons", (req, res) => {
  const body = req.body;
  const doesExist = () => {
    return persons.some((person) => person.name === body.name);
  };
  if (!body.name || !body.number) {
    return res.status(400).json({
      error: "content missing",
    });
  } else if (doesExist()) {
    return res.status(400).json({
      error: "name must be unique",
    });
  }

  const newPerson = { id: getRandomId(), ...body };
  persons = persons.concat([newPerson]);
  res.status(201).send({
    message: `${newPerson.name} added succesfully. (id:${newPerson.id})`,
  });
});

app.get("/api/persons/:id", (req, res) => {
  if (persons[req.params.id - 1]) {
    res.send(persons[req.params.id - 1]);
    res.status(200).end();
  } else {
    res.status(404).end();
  }
});

app.delete("/api/persons/:id", (req, res) => {
  if (persons[req.params.id - 1]) {
    const id = Number(req.params.id - 1);
    persons = persons.filter((person) => person.id !== id);

    res.status(200).send({ message: "Person deleted successfully" });
  } else {
    res.status(404).send({ message: "Person not found" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
