// import * as api from '../api';

// export const getPersons = async (dispatch) => {
//     try {
//         const persons = await api.getPersons();
//         dispatch({ type: 'GET_PERSONS', payload: persons });
//         // dispatch(action);
//     } catch (error) {
//         // dispatch({ type: 'GET_PERSONS_ERROR', payload: error.message });
//         console.log(error);
//     }
//     // const result = await api.get('/persons');
//     // const action = { type: 'GET_PERSONS', payload: [] };
//     // return api.get('/persons');

// }
// export const createPerson = (person) => async (dispatch) => {
//     try {
//         const result = await api.createPerson(person);
//         dispatch({ type: 'ADD_PERSON', payload: result });
//         // return result;
//     } catch (error) {
//         console.log(error);
//     }
// }
