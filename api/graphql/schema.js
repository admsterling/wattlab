const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type Prof {
        _id: ID!
        fname: String!
        lname: String!
        email: String!
        password: String!
        approved: Boolean!
    }

    type AuthData {
        token: String!
        userId: String!
    }

    input ProfCreateData {
        email: String!
        fname: String!
        lname: String!
        password: String!
    }

    type RootMutation {
        createProf(profInput: ProfCreateData): Prof!
    }

    type RootQuery {
        login(email: String!, password: String!): AuthData!
        prof(id: String!): Prof!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
