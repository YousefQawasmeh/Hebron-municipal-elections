import Person from "../models/person.js";

export const getPersons = async (req, res) => {
    // const persons = await Person.find({});
    try {
        const persons = await Person.find({ no: 55 });
        res.status(200).json(persons);
    } catch (error) {
        res.status(500).json({ message: error.message });
        // res.json(error);
    }
    // res.json("persons");
}

export const createPerson = async (req, res) => {
    // const result = await person.save();
    try {
        const person = new Person(req.body);
        const result = await person.save();
        res.status(201).json(result);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
    // res.json("person");
}