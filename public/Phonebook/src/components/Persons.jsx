import React from "react";
import { removePersons } from "../services/persons";

export const Persons = ({ persons, filter, toastError, toastDelete }) => {
  const deletePerson = (id) => {
    const person = persons.filter((person) => person.id === id)[0];
    window.confirm("Delete This Person ?") && toastDelete(person.name),
      removePersons(id).catch(() => {
        toastError(person.name);
      });
  };

  return (
    <ul>
      {persons &&
        persons.map(
          (person, i) =>
            person.name.includes(filter) && (
              <li key={i}>
                {person.name}: {person.number}
                <button onClick={() => deletePerson(person.id)}>Delete</button>
              </li>
            )
        )}
    </ul>
  );
};
