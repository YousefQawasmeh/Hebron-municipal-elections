import React, { useEffect, useState } from "react";
import { Container, AppBar, Typography, Grow, Grid } from "@material-ui/core";
import { Button } from '@material-ui/core';
import axios from "axios";
import useStyles from "./styles";

const LoadData = ({ }) => {
    const [persons, setPersons] = useState([]);
    const [person, setPerson] = useState({});

    useEffect(() => {
        axios.get("http://localhost:5000/api/persons")
            .then(res => {
                setPersons(res.data);
                console.log("persons LoadData", persons);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);
    const handelChange = ({ target: { name, value } }) => {
        console.log("handelChange", name, value);
        setPerson({ ...person, [name]: value });
    }
    console.log("0000000000000000persons", persons);
    return (
        <Grid item xs={12}>
            <Typography variant="h3" color="inherit">
                create person
            </Typography>
            <form>
                <input onChange={handelChange} type="text" name="name" placeholder="name" value={person.name} />
                <input onChange={handelChange} type="text" name="number" placeholder="number" value={person.number} />
                <input onChange={handelChange} type="text" name="school" placeholder="school" value={person.school} />
                <input onChange={handelChange} type="checkbox" name="done" placeholder="done" value={!!person.done} />
                {/* <input type="text" name="phone" placeholder="phone" /> */}
                {/* <input type="text" name="address" placeholder="address" /> */}
                {/* <input type="text" name="city" placeholder="city" /> */}
                <button type="submit" onClick={
                    (e) => {
                        e.preventDefault();
                        // dispatch(createPerson({
                        //     name: e.target.name.value,
                        //     age: e.target.number.value,
                        //     email: e.target.school.value,
                        //     // phone: e.target.phone.value,
                        //     // address: e.target.address.value,
                        //     // city: e.target.city.value,
                        // }));
                        console.log("1111111person", person);
                        axios.post("http://localhost:5000/api/person", {
                            ...person
                        })
                    }
                }>submit0</button>
            </form>
        </Grid>
    );
}

export default LoadData;