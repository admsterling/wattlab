const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type Prof {
        _id: ID!
        fname: String!
        lname: String!
        email: String!
        password: String!
        approved: Boolean!
        labs: [Lab!]!
    }

    type AuthData {
        token: String!
        prof: Prof!
    }

    type Lab {
        title: String!
        studentCode: String!
        labHelperCode: String!
        desc: String
        gitLab: String
        creator: Prof!
        createdAt: String!
        updatedAt: String!
    }

    input ProfCreateData {
        email: String!
        fname: String!
        lname: String!
        password: String!
    }

    input LabCreateData {
        title: String!
        studentCode: String!
        labHelperCode: String!
        desc: String!
        gitLab: String!
    }

    type RootMutation {
        createProf(profInput: ProfCreateData): Prof!
        createLab(labInput: LabCreateData): Lab!
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
