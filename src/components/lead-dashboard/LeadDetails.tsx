import React from 'react';
import LeadCards from './LeadCards';
import { DatePickerWithRange } from '../ui/filterDate';
import LeadCharts from './LeadCharts';

const LeadDetails = () => {

    return (
        <div>
            <h2 className='text-[20px] text-T-color font-medium mb-1'>Lead Details</h2>
            <DatePickerWithRange />
            <LeadCards />
            <div className='mt-2 w-full h-[250px]'>
                <LeadCharts />
            </div>
        </div>
    );
};

export default LeadDetails;
