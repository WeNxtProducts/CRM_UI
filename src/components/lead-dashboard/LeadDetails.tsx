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
    const salesGraph: any = useApiRequests('salesGraph', 'GET')

    const [cardDetails, setCardDetails] = useState<any>({})
    const [graphDetails, setGraphDetails] = useState<any>([])
    const [loader, setLoader] = useState(false)

    const handleLeadCards = async () => {
        setLoader(true)
        try {
            const response = await leadCards()
            if (response?.status === 'error') {
                console.log('error : ', response)
            } else if (response?.status === 'success') {
                setCardDetails(response?.data)
            }
        } catch (err) {
            console.log('err : ', err)
        } finally {
            setLoader(false)
        }
    }

    const handleGraphDetails = async () => {
        setLoader(true)
        try {
            const response = await salesGraph()
            if (response?.status === 'error') {
                console.log('error : ', response)
            } else if (response?.status === 'success') {
                setGraphDetails(response?.data)
            }
        } catch (err) {
            console.log('err : ', err)
        } finally {
            setLoader(false)
        }
    }

    useEffect(() => {
        handleGraphDetails()
        handleLeadCards()
    }, [])

    const data = {
        cardDetails, graphDetails
    }

    return (
        <LeadContext.Provider value={data}>
            <div>
                {loader && <Loader />}
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
