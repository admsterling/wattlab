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
        _id: ID!
        title: String!
        helpers: [String]
        status: Boolean!
        code: String!
        desc: String!
        url: String!
        creator: Prof!
        createdAt: String!
        updatedAt: String!
        messages: [Message!]
        labMembers: [LabMember!]
    }

    type joinLabReturnData {
        lab: Lab!
        memberid: String!
    }

    type LabList {
        labs: [Lab!]!
    }

    type Message {
        _id: ID!
        sender: String!
        accountType: accountType!
        text: String!
        createdAt: String!
        updatedAt: String!
        lab_id: String!
    }

    type MessageReturn {
        sender: String!
        accountType: accountType!
        text: String!
        createdAt: String!
        updatedAt: String!
        lab_id: String!
        labCode: String!
    }
    
    type LabMember {
        _id: ID!
        username: String!
        socketid: String!
        inRoom: Boolean!
        lab_id: String!
    }

    enum accountType {
        STUDENT
        HELPER
        PROFESSOR
     }

    input ProfCreateData {
        email: String!
        fname: String!
        lname: String!
        password: String!
    }

    input LabCreateData {
        title: String!
        helpers: [String!]
        desc: String!
        url: String!
    }

    input MessageCreateData {
        sender: String!
        accountType: accountType!
        text: String!
        lab_id: String!
    }

    type RootMutation {
        createProf(profInput: ProfCreateData): Prof!
        createLab(labInput: LabCreateData): Lab!
        joinLab(code: String!, username: String!, socketid: String!): joinLabReturnData!
        memberLeaveLab(id: ID!): Boolean!
        createMessage(messageInput: MessageCreateData): MessageReturn!
        startLab(id: ID!): Boolean!
        endLab(id: ID!): Boolean!
        deleteLab(id: ID!): Boolean!
    }

    type RootQuery {
        login(email: String!, password: String!): AuthData!
        getLabs(id: String!): LabList!
        labExist(code: String!): Boolean!
        prof(id: String!): Prof!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
