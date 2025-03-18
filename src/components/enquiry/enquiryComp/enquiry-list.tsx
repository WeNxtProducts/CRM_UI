'use client'

import React, { useEffect, useState } from 'react'
import { Separator } from '../../ui/separator'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { DatePickerWithRange } from '../../ui/filterDate'
import { Plus } from 'lucide-react'
import EnquiryListTable from './enquiry-list-table'
import { Button } from '@/components/ui/button'
import Pagination from '@/components/ui/pagination'
import useApiRequests from './../../../services/useApiRequests'
import { enqRequest } from '@/lib/constant'
import { useRouter } from 'next/navigation'
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select'
import Loader from '@/components/ui/Loader'
import { useDispatch, useSelector } from 'react-redux'

const Enquirylist = () => {
	// const enquiryList: any = useApiRequests('enquiryList', 'GET')
	// const enquiryListById: any = useApiRequests('enquiryCrud', 'GET');
	// const enquiryCreate: any = useApiRequests('enquiryCrud', 'POST')
	// const enquiryUpdate: any = useApiRequests('enquiryCrud', 'PUT')

	const fetchEnquiries: any = useApiRequests('enquiryList', 'GET')

	const router = useRouter()
	const lead = useSelector((state: any) => state.apps.lead)

	const [activeTab, setActiveTab] = useState<string>('pending')
	const [totalRecords, setTotalRecords] = useState(0)
	const [loader, setLoader] = useState(false)
	const [enqData, setEnqData] = useState([])

	const fetchData = async (status = activeTab, offset = 1) => {
		setLoader(true)
		const queryParams = { status, page: offset - 1, size: 10, userId:'S0002' }
		try {
			const response = await fetchEnquiries('', queryParams)
			if (response?.status === 'error') {
				console.log('error:', response)
				setEnqData(response?.data)
			} else {
				response?.status === 'success'
				console.log('success : ', response)
				setEnqData(response?.data)
				setTotalRecords(response?.pagination?.totalRecords || 0)
			}
		} catch (err) {
			console.log('err : ', err)
		} finally {
			setLoader(false)
		}
	}
	useEffect(() => {
		fetchData(activeTab)
	}, [activeTab])

	// const enquiryAllList = async () => {
	// 	try {
	// 		const response = await enquiryList()
	// 		if (response?.status === 'error') {
	// 			console.log('error : ', response)
	// 		} else if (response?.status === 'success') {
	// 			console.log('success : ', response)
	// 		}
	// 	} catch (err) {
	// 		console.log('err : ', err)
	// 	}
	// }

	// const handleCreateEnquiry = async () => {
	// 	try {
	// 		const response = await enquiryCreate(enqRequest)
	// 		if (response?.status === 'error') {
	// 			console.log('error : ', response)
	// 		} else if (response?.status === 'success') {
	// 			console.log('success : ', response)
	// 		}
	// 	} catch (err) {
	// 		console.log('err : ', err)
	// 	}
	// }

	// const handleUpdateEnquiry = async () => {
	// 	try {
	// 		const response = await enquiryUpdate(enqRequest, {}, { id: 3 })
	// 		if (response?.status === 'error') {
	// 			console.log('error : ', response)
	// 		} else if (response?.status === 'success') {
	// 			console.log('success : ', response)
	// 		}
	// 	} catch (err) {
	// 		console.log('err : ', err)
	// 	}
	// }

	// const getEnquiryListById = async () => {
	// 	const queryParams = {
	// 		limit: 10,
	// 		offset: 20
	// 	}
	// 	try {
	// 		const response = await enquiryList('', queryParams, { id: 3 })
	// 		if (response?.status === 'error') {
	// 			console.log('error : ', response)
	// 		} else if (response?.status === 'success') {
	// 			console.log('success : ', response)
	// 		}
	// 	} catch (err) {
	// 		console.log('err : ', err)
	// 	}
	// }

	useEffect(() => {
		// enquiryAllList()
		// getEnquiryListById()
		// handleCreateEnquiry()
		// handleUpdateEnquiry()
	}, [])

	return (
		<div className='bg-white'>
			{loader && <Loader />}
			<div className='mt-2 flex items-center gap-x-[36px]'>
				<div>
					<h2 className='pl-10 text-T-size font-medium text-T-color'>Enquiry</h2>
				</div>
				<div>
					<Button
						variant='default'
						size='sm'
						onClick={() => router.push('/enquiryCreate')}>
						<Plus /> Add new enquiry
					</Button>
				</div>
			</div>

			<Separator />

			<div className='pl-10 pr-10'>
				<div>
					<Tabs
						defaultValue='pending'
						className='my-5'
						onValueChange={setActiveTab}>
						<TabsList>
							<TabsTrigger value='pending'>Pending</TabsTrigger>
							<TabsTrigger value='infoReq'>Additional Info Required</TabsTrigger>
							<TabsTrigger value='infoPro'>Additional Info Provided</TabsTrigger>
							<TabsTrigger value='accEnq'>Accepted Enquiry</TabsTrigger>
							<TabsTrigger value='rejEnq'>Rejected Enquiry</TabsTrigger>
						</TabsList>
					</Tabs>
				</div>
				<div>
					<div className='flex justify-between'>
						<div className='flex gap-7'>
							<div>
								<DatePickerWithRange />
							</div>
							<Select>
								<SelectTrigger className='w-[180px]'>
									<SelectValue placeholder='Filter by' />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										{/* <SelectLabel>Filter by</SelectLabel> */}
										<SelectItem value='pending'>Pending</SelectItem>
										<SelectItem value='Additional Info Required'>
											Additional Info Required
										</SelectItem>
										<SelectItem value='Additional Info Provided'>
											Additional Info Provided
										</SelectItem>
										<SelectItem value='Accepted Enquiry'>Accepted Enquiry</SelectItem>
										<SelectItem value='Rejected Enquiry'>Rejected Enquiry</SelectItem>
									</SelectGroup>
								</SelectContent>
							</Select>
						</div>
						{enqData && enqData?.length > 0 && (
							<div>
								<Pagination
									total={totalRecords}
									pageSize={10}
									onPageChange={(page) => fetchData(activeTab, page)}
								/>
							</div>
						)}
					</div>
					{enqData && enqData?.length > 0 ? (
						<div className='mt-10'>
							<EnquiryListTable
								leadId={lead}
								tableData={enqData}
								activetabs={activeTab}
								refreshData={fetchData}
							/>
						</div>
					) : (
						<p>No data found</p>
					)}
				</div>
			</div>
		</div>
	)
}

export default Enquirylist
