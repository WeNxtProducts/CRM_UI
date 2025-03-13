const POST_API_URL = {
    enquiryCreate: {
        url: 'api/enquiries/create'
    },
    leadCreate: {
        url: 'api/leads/create'
    },
    sendMessage: {
        url: 'api/leads/increment-remainder'
    },
    createEditEvents: {
        url: '/api/saleslead/dashboard/events'
    },
    DMSFileUpload: {
        url: '/dms/new/uploadMultiple',
        baseURL: 'http://192.168.1.181:8097/',
    },
    DMSView: {
        url: '/dms/retrieve',
        baseURL: 'http://192.168.1.181:8097/',
    },
    DMSDelete: {
        url: '/dms/deleteFiles',
        baseURL: 'http://192.168.1.181:8097/',
    },
    DMSDescUpdate: {
        url: '/dms/editFiles',
        baseURL: 'http://192.168.1.181:8097/',
    },
};

export default POST_API_URL;
