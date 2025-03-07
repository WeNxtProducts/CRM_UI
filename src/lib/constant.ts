/* eslint-disable @typescript-eslint/no-explicit-any */
export const enqRequest: any = {
	"ENQ_NAME": "Jhn sdDsoe Insurance Enquiry",
	"LOB_NAME": "Health Insurance",
	"PROD_NAME": "Premim Health service Plan",
	"ENQ_DATE": "2025-02-17T10:00:00.000Z",
	"UPDATED_DATE": "2025-02-17T12:00:00.000Z",
	"LOB_CODE": "HLT",
	"PROD_CODE": "PHP123",
	"BUSS_TYPE": "Retail",
	"DATE_RECEIVED": "2025-02-16T09:00:00.000Z",
	"EXP_DATE": "2025-03-01T00:00:00.000Z",
	"SUM_INSURED": 500000,
	"SUGGESTED_PREM": 15000,
	"SUGGESTED_RATE": 3.0,
	"INTERMED_NAME": "XYZ Brokers",
	"UNDERWRITER": "John Underwriter",
	"QUOTE_FLAG": "Y",
	"RISK_DESC": "Coverage for hospitalization and major illnesses",
	"REMARKS": "Customer looking for family coverage",
	"ENQ_STATUS": "Pending",
	"ASSIGNED_TO": 101,
	"FIRST_NAME": "John",
	"LAST_NAME": "Doe",
	"EMAIL": "john.doe@example.com",
	"PHONE": "1234567890",
	"MOBILE": "9876543210",
	"ADDR_LINE1": "123 Main Street",
	"ADDR_LINE2": "Apt 4B",
	"COUNTRY": "USA",
	"ENQ_TYPE": "New Policy",
	"EXPECTED_VALUE": 600000,
	"DESCRIPTION": "Enquiry about premium health insurance for family",
	"INTERNAL_NOTES": "Follow up next week",
	"NEXT_FOLLOW_UP_DATE": "2025-02-24T00:00:00.000Z",
	"CREATED_BY": "Admin",
	"CREATED_DATE": "2025-02-17T10:00:00.000Z"
}


export const gender: any =[
	{value:'M',label:'Male'},
	{value:'F',label:'FeMale'}
]

export const Product: any =[
	{value:'p',label:'Personal'},
	{value:'com',label:'Commercial'},
	{value:'cor',label:'Corporate'},
	{value:'e',label:'Engineering'},
	{value:'g',label:'Gurantees'},
	{value:'m',label:'Marine'},
	{value:'a',label:'Aviation'},
	{value:'n',label:'niche'},
]

export const Lob: any =[
	{value:'m',label:'Motor'},
	{value:'nm',label:'Non-Motor'},
	{value:'l',label:'Life'},
	{value:'h',label:'Health'},
]

export const Business: any =[
	{value:'b',label:'Broker'},
	{value:'a',label:'Agent'},
	{value:'d',label:'Direct'}
]

export const Quote: any =[
	{value:'y',label:"Yes"},
	{value:'n',label:"No"}
]

export const Underwriter: any = [
	{value:"01",label:"Noah"},
	{value:"02",label:"Liam"},
	{value:"03",label:"Oliver"},
	{value:"04",label:"Olivia"}
]

export const enquiries: any = [
	{id: 'enquiry-1',
    code: 'L12334',
    type: 'Marine',
    date: 'Oct 17, 2020 08:00',
},{
	id: 'enquiry-2',
    code: 'L12334',
    type: 'Marine',
    date: 'Oct 17, 2020 08:00',
},{
	id: 'enquiry-3',
    code: 'L12334',
    type: 'Marine',
    date: 'Oct 17, 2020 08:00',
},{
	id: 'enquiry-4',
    code: 'L12334',
    type: 'Marine',
    date: 'Oct 17, 2020 08:00',
}]

export const message: any = [
	{ id: 1, text: "Emily Tyler Created a new lead", sender: "system", time: "08:15 AM" },
	{ id: 2, text: "Hi I'm Aieto, doing well, thank you! Need to know about quote tariffs", sender: "lead", time: "08:16 AM", avatar: "/user1.jpg", name: "Lead" },
	{ id: 3, text: "Enquiry created for Aieto, Appointment to be fixed soon.", sender: "system", time: "08:16 AM" },		
	{ id: 4, text: "I'm Avlb 29-Oct", sender: "lead", time: "08:16 AM", avatar: "/user1.jpg", name: "Lead" }
] 

// data.ts
export const tasks = [
	{
	  id: "IN827374",
	  name: "Hari Prassant I",
	  date: "12/12/2022",
	  remindersSent: 1,
	  priority: "Medium",
	  priorityColor: "text-yellow-500",
	  status: "Done",
	  statusColor: "bg-green-100 text-green-700",
	  actionText: "Review prospect",
	  actionColor: "bg-blue-800 text-white",
	},
	{
	  id: "IN827374",
	  name: "Hari Prassant I",
	  date: "12/12/2022",
	  remindersSent: 1,
	  priority: "Medium",
	  priorityColor: "text-yellow-500",
	  status: "In Review",
	  statusColor: "bg-pink-200 text-pink-700",
	  actionText: "Proceed enquiry",
	  
	},
	{
	  id: "IN827374",
	  name: "Hari Prassant I",
	  date: "12/12/2022",
	  remindersSent: 1,
	  priority: "Medium",
	  priorityColor: "text-yellow-500",
	  status: "In Progress",
	  statusColor: "bg-blue-200 text-blue-700",
	  actionText: "Review prospect",
	  
	},
	{
	  id: "IN827374",
	  name: "Hari Prassant I",
	  date: "12/12/2022",
	  remindersSent: 1,
	  priority: "Medium",
	  priorityColor: "text-yellow-500",
	  status: "To Do",
	  statusColor: "bg-gray-300 text-gray-700",
	  actionText: "Fix Appointment",
	  
	}
  ];

  export const prospectTable = [
	{
		enquiryNumber : 111,
		enquiryName : "Hari",
		lobName  : "Marine",
		product : "Marine",
		enquiryDate:"27-02-2025",
		updatedDate  : '27-02-2025',
	    quotes : 3
	},
	{
		enquiryNumber : 222,
		enquiryName : "Hari",
		lobName  : "Marine",
		product : "Marine",
		enquiryDate:"27-02-2025",
		updatedDate  : '27-02-2025',
	    quotes : 3
	},
	{
		enquiryNumber : 333,
		enquiryName : "Hari",
		lobName  : "Marine",
		product : "Marine",
		enquiryDate:"27-02-2025",
		updatedDate  : '27-02-2025',
	    quotes : 3
	},

  ]

  export const quoteHistory: any = [
	{id: 'enquiry-1',
    code: 'L12334',
    type: 'Marine',
    date: 'Oct 17, 2020 08:00',
},{
	id: 'enquiry-2',
    code: 'L12334',
    type: 'Marine',
    date: 'Oct 17, 2020 08:00',
},{
	id: 'enquiry-3',
    code: 'L12334',
    type: 'Marine',
    date: 'Oct 17, 2020 08:00',
},{
	id: 'enquiry-4',
    code: 'L12334',
    type: 'Marine',
    date: 'Oct 17, 2020 08:00',
}]