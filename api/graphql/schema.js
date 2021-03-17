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
        submission: Boolean!
        code: String!
        helperPIN: Int!
        desc: String!
        urlTitles: [String!]!
        urlLinks: [String!]!
        usefulLinkTitles: [String!]!
        usefulLinkLinks: [String!]!
        creator: Prof!
        createdAt: String!
        updatedAt: String!
        messages: [Message!]
        labMembers: [LabMember!]
        privateChats: [Message!]
        socketIDQue: [QueObj!]
        queTimes: [Int]!
        profOnlyQue: Boolean!
    }

    type urlObj {
        title: String!
        link: String!
    }

    type QueObj {
        _id: ID!
        socketid: String!
        queType: queType!
        title: String!
        desc: String
        requireProf: Boolean!
        lab_id: ID!
        createdAt: String!
        updatedAt: String!
    }

    enum queType {
        Help
        Marking
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
        submissionLink: String
        marked: Boolean
    }

    type PrivateChat {
        _id: ID!
        student: String!
        staff: String!
        messages: [Message!]
        rating: Int
        feedback: String
        response: String
        requiredCall: Boolean!
        active: Boolean!
        createdAt: String!
        updatedAt: String!
    }

    type queReturn {
        que: [QueObj]!
        averageTime: Int!
        times: [Int]!
    }

    type staffLinkReturn {
        usefulLinkTitles: [String!]!
        usefulLinkLinks: [String!]!
    }

    type membersList { 
        members: [LabMember!]!
        totalMembers: Int!
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

    input QueCreateData {
        socketid: String!
        queType: queType!
        title: String!
        desc: String
        requireProf: Boolean!
        lab_id: ID!
    }

    input LabCreateData {
        title: String!
        helpers: [String!]
        desc: String!
        urlTitles: [String!]!
        urlLinks: [String!]!
        usefulLinkTitles: [String!]!
        usefulLinkLinks: [String!]!
        submission: Boolean!
        profOnlyQue: Boolean!
    }

    input MessageCreateData {
        sender: String!
        accountType: accountType!
        text: String!
        lab_id: String!
    }

    input PrivateMessageCreateData {
        sender: String!
        accountType: accountType!
        text: String!
        private_id: String!
    }

    type RootMutation {
        createProf(profInput: ProfCreateData): Prof!
        createLab(labInput: LabCreateData): Boolean!
        updateLab(code: String!, title: String!, desc: String!, urlTitles: [String!]!, urlLinks: [String!], helpers: [String!]!, submission: Boolean!, profOnlyQue: Boolean!, usefulLinkTitles: [String!]!, usefulLinkLinks: [String!]!): Boolean!
        joinLab(code: String!, username: String!, helperPIN: Int, socketid: String!, prof: Boolean!): joinLabReturnData!
        memberLeaveLab(id: ID!): Boolean!
        socketMemberLeaveLab(id: String!): Lab!
        createMessage(messageInput: MessageCreateData): MessageReturn!
        startLab(id: ID!): Boolean!
        endLab(id: ID!): Boolean!
        deleteLab(id: ID!): Boolean!
        joinQue(queObj: QueCreateData!): queReturn!
        leaveQue(lab_id: ID!, socketid: String!, helpingTime: Int): queReturn!
        getFirstInQueAndShift(lab_id : ID!): [String!]
        createPrivateChat(lab_id: ID!, student: String!, staff: String!): PrivateChat!
        createPrivateMessage(privateMessageInput: PrivateMessageCreateData): Message!
        sendFeedback(id: ID!, value: Int!, feedback: String): Boolean!
        addSubmission(member_id: ID!, submissionLink: String!): String!
        requireCall(private_chat_id: ID!): Boolean!
        stopHelp(priv_id: ID!) : Boolean!
        sendResponse(priv_id: ID!, response: String!): Boolean!
        markWork(lab_id: ID!, username: String!, bool: Boolean!): Boolean!
    }

    type RootQuery {
        login(email: String!, password: String!): AuthData!
        getLabs(id: String!): LabList!
        getLab(code: String!): Lab!
        labExist(code: String!): Boolean!
        getQue(lab_id: ID!): queReturn!
        prof(id: String!): Prof!
        getSubmission(member_id: ID!): String!
        getActiveMembers(lab_id: ID!): Int!
        getActiveChats(lab_id: ID!): Int!
        getPrivateChat(id: ID, staff: String, lab_id: ID): [PrivateChat!]!
        getHistory(lab_id: ID!, staff: String!): [String!]!
        getStaffLinks(code: String!): staffLinkReturn!
        getFeedback(lab_id: ID!, staff: String!): [PrivateChat!]!
        getLabMembers(id: ID!, page: Int, itemsPerPage: Int, sortBy: [String], sortDesc: [Boolean]): membersList
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
