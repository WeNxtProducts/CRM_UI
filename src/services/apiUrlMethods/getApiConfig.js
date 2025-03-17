const GET_API_URL = {
    enquiryList: {
        url: 'api/enquiries/getAll'
    },
    leadList: {
        url: 'api/leads/getAll'
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
        url: 'api/enquiries/get'
    },

    // leadList: {
    //     url: 'api/leads/getAll'
    // }

    leadById:{
        url:"api/leads/get"
    }

};

export default GET_API_URL;
