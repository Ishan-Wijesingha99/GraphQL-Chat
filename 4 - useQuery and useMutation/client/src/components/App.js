
// so here is what we've done, we have a client and a server folder
// the client folder handles the frontend code and the server folder handles the backend code, when you run the command node index.js in the server folder, an Apollo Server is started on port 4000 (by default)
// just like in folder 3 - Apollo Server, all that's happening in the backend is that we have a typeDefs file and a resolvers file. We also have a FakeData.js file that acts like the database for learning purposes, that file is importing and used in resolvers.js. All of these files come together in index.js where the apollo server is actually created
// you need to start the application on server (node index.js) and start the application on client (npm start)

// import react
import React from "react";

// these are things you need to import to make apollo client work
import { ApolloClient, InMemoryCache, ApolloProvider, useQuery } from '@apollo/client'

// import this for the component that shows the functionality of useQuery
import { DisplayDataUseQuery } from "./DisplayDataUseQuery";

// import this for the component that shows the functionality of useMutation
import { CreateUserUseMutation } from './CreateUserUseMutation'



export const App = () => {
    // here we create a variable that stores a new instance of the ApolloClient constructor function
    const client = new ApolloClient({
        // this is just telling apollo client to save data in cache if need be
        cache: new InMemoryCache(),
        // the uri is just a url to where the graphql api is running
        // remember how we opened up graphql on port 4000 by default with the endpoint /graphql, that is what this is referring too
        uri: "http://localhost:4000/graphql"
    })

    return (
        // now for the returned JSX, wrap everything in <ApolloProvider></ApolloProvider> and add a client prop which takes in the client variable we created above
        <ApolloProvider client={client}>
            <div>
                <h1>List of Users</h1>
                
                {/* this is the component responsible for everything related to useQuery */}
                <DisplayDataUseQuery />

                {/* this is the component responsible for everything related to useMutation */}
                <CreateUserUseMutation />
                
            </div>
        </ApolloProvider>
    )
}