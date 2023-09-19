import axios from "axios";
const baseUrl = "https://fullstackopen-part3.vercel.app/api/persons";

export const getPersons = async (setPersons) => {
  const persons = await axios.get(baseUrl);
  setPersons(persons.data);
};

export const postPerson = async (newName, newNumber) => {
  await axios.post(baseUrl, {
    name: newName,
    number: newNumber,
  });
};

export const updatePerson = async (id, newNumber, newName) => {
  await axios.put(`${baseUrl}/${id}`, {
    name: newName,
    number: newNumber,
    id: id,
  });
};

export const removePersons = async (id) => {
  await axios.delete(`${baseUrl}/${id}`);
};
