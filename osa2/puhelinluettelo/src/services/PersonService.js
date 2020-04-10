import axios from 'axios'
const url = '/api/persons'

const getPersons = () => {
    const request = axios.get(url)
    return request.then(response => response.data)
}

const createPerson = newPerson => {
    const request = axios.post(url, newPerson)
    return request.then(response => response.data)
}

const deletePerson = id => {
    const request = axios.delete(`${url}/${id}`)
    return request.then(response => response.data)
}

const putNumber = (idd, updatedPerson) => {
    const request = axios.put(`${url}/${idd}`, {
        name: updatedPerson.name,
        number: updatedPerson.number,
        id: updatedPerson.id
    })
    console.log('putNumber called into id: ', updatedPerson.id)
    return request.then(response => response.data)
}

export default { getPersons, createPerson, deletePerson, putNumber }