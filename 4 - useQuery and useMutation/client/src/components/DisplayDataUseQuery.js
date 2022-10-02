
import React from "react";

// import useQuery and gql
import { useQuery, gql } from '@apollo/client'

// now that we've done all that, we can finally query the data FROM THE BACKEND, in the frontend
// to do that, we use useQuery(), which is just a react hook like useEffect() or useState()
// useQuery() fetches data from an API whenever a component renders

// to write a graphql query here in the js code, we use a gql statement
// variable name is usually written in this format
const QUERY_ALL_USERS = gql`
    query {
        users {
            id
            name
            username
        }
    }
`

export const DisplayDataUseQuery = () => {
    
    // this is how you use useQuery, you put the query gql statement as the argument and you destructure the data out of it
    // in this case, data is an object, and one of the properties of that object is an array of the information we actually want (data.users)
    // we also destructure loading and error
    const {data, loading, error} = useQuery(QUERY_ALL_USERS)

    // this is really cool, because querying data from a database in the backend is an asynchronous task, the data object won't immediately be available, while that data object is being retrieved, the loading variable is TRUE
    // so while the data is being retrieved you can return JSX for a loading screen
    // set it up using an if statement
    if(loading) {
        return (
            <div>
                Loading Screen JSX
            </div>
        )
    }

    // if the error variable is true, you can return JSX for an error screen
    if(error) {
        return (
            <div>
                Error Screen JSX
            </div>
        )
    }

    // when loading is false and error is false, the final JSX that should be returned by this component would be the JSX we initially wanted to be returned
    return (
        <div>
            {/* remember, you only want to display this data if data currently exists, meaning data is truthy because it has been retrieved from the backend */}
            {data && data.users.map(object => {
                return (
                    <div key={object.id}>
                        <h2>ID - {object.id}</h2>
                        <h3>NAME - {object.name}</h3>
                        <h3>USERNAME - {object.username}</h3>
                    </div>
                )
            })}
        </div>
    )
}

// https://www.youtube.com/watch?v=Ucsede0gTDA
// in this video he also goes through useLazyQuery() for onClick fetching of data from the backend
// he also goes through querying something that takes in an argument