'use client'

import { Button } from '@/components/ui/button'
import LeadRightBar from '@/components/ui/enquiry-docUpload/leadRightBar'
import LeadtableListing from '@/components/ui/enquiry-docUpload/leadtableListing'
import { Separator } from '@/components/ui/separator'
import useApiRequests from '@/services/useApiRequests'
import { Filter, Plus } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Pagination from '@/components/ui/pagination'
// import {tasks} from '@/lib/constant'

const LeadList = () => {
	const [leads, setLeads] = useState([])
	const router = useRouter()
	const fetchLeads: any = useApiRequests('leadList', 'GET')
	const [leadListRecords, setLeadListRecords] = useState(0)

	const fetchLeadData = async (offset = 1) => {
		const queryParams = {page: offset - 1, size: 10, userId: 'S0002'}
		try {
			const response = await fetchLeads('',queryParams)
			// console.log(response,"lead")
			if (response?.status === 'error') {
				console.log('error : ', response)
			} else if (response?.status === 'success') {
				console.log('success : ', response)
				setLeads(response?.data)
				setLeadListRecords(response?.pagination?.totalRecords || 0)
			}
		} catch (error) {
			console.log('err :', error)
		}
	}

	useEffect(() => {
		fetchLeadData()
	}, [])

	return (
		<div className='bg-white'>
			<div className='mt-2 flex items-center gap-x-[36px]'>
				<div>
					<h2 className='pl-5 text-T-size font-medium text-T-color'>Lead board</h2>
				</div>
				<div>
					<Button
						variant='default'
						size='sm'
						onClick={() => router.push('/leadCreate')}>
						<Plus /> Create New Lead
					</Button>
				</div>
			</div>

			<Separator />

			<div className='mt-5 grid grid-cols-10 pl-2 pr-2'>
				<div className='col-span-8 pl-3 pr-2'>
					<div className='flex flex-row justify-between pr-2'>
						<h3 className='font-semibold'>Tasks</h3>
						{/* <Filter className='h-8 w-10 rounded-lg border p-2' /> */}
					</div>

					<div className='mt-3 flex justify-center rounded-full border bg-[#E6EDF5] p-1'>
						<h1 className='text-sm font-semibold'>Active Tasks</h1>
					</div>
					{leads?.length > 0 ? (
						<div className='mt-3'>
							<LeadtableListing leads={leads} />
						</div>
					) : (
						<p>No data</p>
					)}
				</div>

				<div className='col-span-2'>
					<LeadRightBar />
				</div>
			</div>
{/* 
			<div className='col-span-8 pl-3 pr-2'> 
                <Pagination/>
            </div> */}

			{leads && leads?.length > 0 && (
				<div className='col-span-8 pl-3 pr-2 mt-2'>
				<Pagination 
					total={leadListRecords}
					pageSize={10}
					onPageChange={(page) => fetchLeadData(page)}
				/>
				</div>
			)}
		</div>
	)
}

export default LeadList
