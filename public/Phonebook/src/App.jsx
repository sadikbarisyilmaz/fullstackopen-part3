import { useState } from "react";
import { Filter } from "./components/Filter";
import { Persons } from "./components/Persons";
import { PersonForm } from "./components/PersonForm";
import { useEffect } from "react";
import { getPersons, postPerson, updatePerson } from "./services/persons";
import { Notification } from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState(null);
  const [filter, setFilter] = useState("");
  const [toast, setToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    getPersons(setPersons);
  }, []);

  const toastPost = () => {
    setToastMessage(`Added ${newName}`);
    setToast(true);
    setTimeout(() => {
      setToast(false);
    }, 2000);
  };
  const toastUpdate = () => {
    setToastMessage(`Updated ${newName}`);
    setToast(true);
    setTimeout(() => {
      setToast(false);
    }, 2000);
  };
  const toastDelete = (name) => {
    setToastMessage(`Deleted ${name}`);
    setToast(true);
    setTimeout(() => {
      setToast(false);
    }, 2000);
  };
  const toastError = (name) => {
    setToastMessage(`Person "${name}" is Already deleted`);
    setToast(true);
    setTimeout(() => {
      setToast(false);
    }, 2000);
  };

  const handleChangeName = (e) => {
    setNewName(e.target.value);
  };
  const handleChangeNumber = (e) => {
    setNewNumber(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const person = persons.filter((person) => person.name === newName)[0];

    const confirmUpdatePerson = (id, newNumber, newName) => {
      window.confirm(
        `"${newName}" already exists in the phonebook, update this persons number ?`
      ) && updatePerson(id, newNumber, newName);
    };

    if (persons.filter((person) => person.name === newName).length > 0) {
      person.number == newNumber
        ? alert(`"${newName}" already exists in the phonebook`)
        : confirmUpdatePerson(person.id, newNumber, newName),
        toastUpdate();
    } else {
      toastPost(), postPerson(newName, newNumber);
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>

      {toast && <Notification toastMessage={toastMessage} />}
      <Filter setFilter={setFilter} />
      <h3>Add a new person</h3>
      <PersonForm
        handleChangeName={handleChangeName}
        handleChangeNumber={handleChangeNumber}
        handleSubmit={handleSubmit}
      />
      <h3>Numbers</h3>
      <Persons
        filter={filter}
        persons={persons}
        toastDelete={toastDelete}
        toastError={toastError}
      />
    </div>
  );
};

export default App;
