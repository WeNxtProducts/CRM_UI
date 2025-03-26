const GET_API_URL = {
    // enquiryList: {
    //     url: 'Enquiry/all'
    // },
    leadList: {
        url: 'Lead/all'
    },
    eventList: {
        url: '/api/saleslead/dashboard/events'
    },
    taskList: {
        url: '/api/saleslead/dashboard/tasks'
    },
    activityList: {
        url: '/api/saleslead/dashboard/activitylogs'
    },
    leadCards: {
        url: '/api/saleslead/dashboard/stats'
    },
    salesGraph: {
        url: '/api/saleslead/dashboard/salesgraph'
    },
    enquiryById: {
        url: 'Enquiry'
    },

    // leadList: {
    //     url: 'api/leads/getAll'
    // }

    leadById: {
        url: "Lead"
    },
    appoinmentHistory: {
        url: "api/activities/enquiry"
    },
    calenderEventActivityList: {
        url: "/api/activities"
    },
    conversationDisplay:{
        url:'Conversation/all'
    }
};

export default GET_API_URL;
