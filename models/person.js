import { set, connect, Schema, model } from "mongoose";
import "dotenv/config";

set("strictQuery", false);

const url = process.env.MONGODB_URI;
console.log("connecting to", url);

connect(url)
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

const personSchema = new Schema({
  name: {
    type: String,
    minLength: 8,
    validate: {
      validator: function (v) {
        return /^[A-Za-z]+[A-Za-z\s]+[A-Za-z]+$/.test(v);
      },
      message: (props) => `Name should only contain letters`,
    },
    required: true,
  },
  number: {
    type: Number,
    minLength: 3,
    validate: {
      validator: function (v) {
        return /^\d{2}\d?-\d{5,}$/.test(v);
      },
      message: (props) =>
        `The phone number must be in one of this format: xx-xxxxxx or xxx-xxxxx`,
    },
    required: true,
  },
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Person = model("Person", personSchema);

export default Person;
