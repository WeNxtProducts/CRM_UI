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
        url: '/Task/all'
    },
    activityList: {
        url: '/ActivityLog/all'
    },
    leadCards: {
        url: '/Lead/Stats'
    },
    salesGraph: {
        url: '/api/saleslead/dashboard/salesgraph'
    },
    enquiryById: {
        url: 'Enquiry'
    },
    dashboardEvents: {
        url: '/Activity/Filter'
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
    conversationDisplay: {
        url: 'Conversation/all'
    }
};

export default GET_API_URL;
