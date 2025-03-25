const POST_API_URL = {
    enquiryList:{
        url:'Enquiry/Filter'
    },
    enquiryCreate: {
        url: 'Enquiry/create'
    },
    leadCreate: {
        url: 'Lead/create'
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
    appoinments:{
        url:"api/activities"
    }
};

export default POST_API_URL;
