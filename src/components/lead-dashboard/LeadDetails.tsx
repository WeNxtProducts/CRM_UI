/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useState, useEffect, createContext } from 'react';
import LeadCards from './LeadCards';
import { DatePickerWithRange } from '../ui/filterDate';
import LeadCharts from './LeadCharts';
import useApiRequests from '@/services/useApiRequests'
import Loader from '../ui/Loader';

export const LeadContext: any = createContext({});

const LeadDetails = () => {
    const leadCards: any = useApiRequests('leadCards', 'GET')
    const [cardDetails, setCardDetails] = useState<any>(null)
    const [loader, setLoader] = useState(false)

    const handleLeadCards = async () => {
        setLoader(true)
        try {
            const response = await leadCards()
            if (response?.statusCode === 400) {
                console.log('error : ', response)
            } else if (response?.statusCode === 200) {
                setCardDetails(response?.data[0])
            }
        } catch (err) {
            console.log('err : ', err)
        } finally {
            setLoader(false)
        }
    }

    useEffect(() => {
        handleLeadCards()
    }, [])

    const data = {
        cardDetails
    }

    return (
        <LeadContext.Provider value={data}>
            <div>
                {loader && <Loader />}
                <h2 className='text-[20px] text-T-color font-medium mb-1'>Lead Details</h2>
                <DatePickerWithRange />
                {cardDetails !== null && <LeadCards />}
                <div className='mt-2 w-full h-[250px]'>
                    {cardDetails !== null && <LeadCharts />}
                </div>
            </div>
        </LeadContext.Provider>
    );
};

export default LeadDetails;
