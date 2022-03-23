export default (persons = [], action) => {
    switch (action.type) {
        case 'ADD_PERSON':
            return [
                ...persons,
                action.person
            ];
        case 'REMOVE_PERSON':
            return persons.filter(person => person.id !== action.id);
        // case 'TOGGLE_PERSON':
        //     return persons.map(person => {
        //         if (person.id === action.id) {
        //             return {
        //                 ...person,
        //                 done: !person.done
        //             };
        //         }
        //         return person;
        //     }
        //     );
        case 'GET_PERSONS':
            return action.payload;
        default:
            return persons;
    }
    // if (action.type === 'PERSONS_LIST') {
    //     return action.payload;
    // }
}