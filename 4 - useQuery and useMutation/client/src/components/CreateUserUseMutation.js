
import React from "react";

// import useMutation and gql
import { useMutation, gql } from '@apollo/client'

// useMutation is just a react hook like useEffect() or useState()

const CREATE_USER_MUTATION = gql`
    mutation CreateUser($input: CreateUserInput!) {
        createUser(input: $input) {
            name
            id
        }
    }
`


export const CreateUserUseMutation = () => {
    // need to create a state variable that holds the input values for all the inputs created below
    const [inputData, setInputData] = React.useState({
        Name: '',
        Username: '',
        Age: '',
        Nationality: ''
    })

    const inputChange = (event) => {
        if(event.target.placeholder === 'Name') {
            setInputData(prevObject => {
                return {
                    ...prevObject,
                    Name: event.target.value
                }
            })
        } else if(event.target.placeholder === 'Username') {
            setInputData(prevObject => {
                return {
                    ...prevObject,
                    Username: event.target.value
                }
            })
        } else if(event.target.placeholder === 'Age') {
            setInputData(prevObject => {
                return {
                    ...prevObject,
                    Age: Number(event.target.value)
                }
            })
        } else if(event.target.placeholder === 'Nationality') {
            setInputData(prevObject => {
                return {
                    ...prevObject,
                    Nationality: event.target.value.toUpperCase()
                }
            })
        }
    }

    console.log(inputData)

    // useMutation hook
    // createUser is a function
    const [createUser] = useMutation(CREATE_USER_MUTATION)

    return (
        <div>
            {/* in order to create a user, we need to send information about that user from the frontend, to the backend, for that we use inputs */}
            <input 
            type="text"
            placeholder="Name"
            onChange={inputChange}
            value={inputData.Name}
            />
            <input 
            type="text"
            placeholder="Username"
            onChange={inputChange}
            value={inputData.Username}
            />
            <input 
            type="number"
            placeholder="Age"
            onChange={inputChange}
            value={inputData.Age}
            />
            <input 
            type="text"
            placeholder="Nationality"
            onChange={inputChange}
            value={inputData.Nationality}
            />
            <button
            onClick={() => {
                createUser({
                    variables: {
                        input: { 
                            name: inputData.Name,
                            username: inputData.Username,
                            age: inputData.Age,
                            nationality: inputData.Nationality
                        }
                    }
                })
            }}
            >
                Create User
            </button>            
        </div>
    )
}