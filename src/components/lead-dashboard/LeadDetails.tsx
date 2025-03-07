/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useState, useEffect, createContext } from 'react';
import LeadCards from './LeadCards';
import { DatePickerWithRange } from '../ui/filterDate';
import LeadCharts from './LeadCharts';
import useApiRequests from '@/services/useApiRequests'

export const LeadContext: any = createContext({});

const LeadDetails = () => {
    const leadCards: any = useApiRequests('leadCards', 'GET')
    const salesGraph: any = useApiRequests('salesGraph', 'GET')

    const [cardDetails, setCardDetails] = useState<any>({})
    const [graphDetails, setGraphDetails] = useState<any>([])

    const handleLeadCards = async () => {
        try {
            const response = await leadCards()
            if (response?.status === 'error') {
                console.log('error : ', response)
            } else if (response?.status === 'success') {
                setCardDetails(response?.data)
            }
        } catch (err) {
            console.log('err : ', err)
        }
    }

    const handleGraphDetails = async () => {
        try {
            const response = await salesGraph()
            if (response?.status === 'error') {
                console.log('error : ', response)
            } else if (response?.status === 'success') {
                setGraphDetails(response?.data)
            }
        } catch (err) {
            console.log('err : ', err)
        }
    }

    useEffect(() => {
        handleGraphDetails()
        handleLeadCards()
    }, [])

    const data = {
        cardDetails,graphDetails
    }

    return (
        <LeadContext.Provider value={data}>
            <div>
                <h2 className='text-[20px] text-T-color font-medium mb-1'>Lead Details</h2>
                <DatePickerWithRange />
                {cardDetails !== null && <LeadCards />}
                <div className='mt-2 w-full h-[250px]'>
                    {graphDetails?.length > 0 && <LeadCharts />}
                </div>
            </div>
        </LeadContext.Provider>
    );
};

export default LeadDetails;
