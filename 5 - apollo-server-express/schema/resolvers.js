
import { users } from '../FakeData.js'

// the resolvers file is where you actually write the code for queries and mutations you defined in typeDefs, there you defined the names and expected outputs and expected arguments and what not, but you can't expect graphql to know exactly what to do just based off that
// you need to write the code for those queries and mutations you defined in typeDefs here in resolvers
// this is where you would use mongoDB and mongoose, this is where you would use MySQL and Sequelize
export const resolvers = {
    Query: {
        getAllUsers: () => {
            // because we have a users array to mock a database for learning purposes, all we need to do is return the users array
            return users
        }
    },
    Mutation: {
        createUser: (root, args) => {
            // because we have a users array to mock a database for learning purposes, all we need to do is push newUser to that array
            const newUser = args
            users.push(newUser)
            return newUser
        }
    }
}