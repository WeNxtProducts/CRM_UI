/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from '@/components/ui/table'
import { format, parseISO } from 'date-fns'
import { Check, Ellipsis, Eye, FileText, X } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { Lob, Product } from '@/lib/constant'
import { Button } from '@/components/ui/button'
import EnquiryAcceptedDialog from '@/components/ui/enquiry-docUpload/enquiryAcceptedDialog'
import useApiRequests from '@/services/useApiRequests'
import { setEnqId } from '@/store/slices/app.slice'
import { useAppDispatch } from '@/store'

interface Enquiry {
	enquiryNumber: string
	enquiryName: string
	lobName: string
	product: string
	enquiryDate: string
	updatedDate: string
}

interface EnquiryListTableProps {
	tableData: Enquiry[]
	activetabs: string
	refreshData: () => void
	leadId: any
}

const EnquiryListTable: React.FC<EnquiryListTableProps> = ({
	tableData,
	activetabs,
	refreshData,
	leadId
}: EnquiryListTableProps) => {
	const statusUpdate: any = useApiRequests('enqinfoUpdate', 'PUT')

	const router = useRouter()
	const dispatch = useAppDispatch()
	const [isDisabled, setIsDisabled] = useState(false)
	const [messageAccepted, setMessageAccepted] = useState(false)


	const handleClick = (enqId: any) => {
		if (!isDisabled) {
			setIsDisabled(true)
			setMessageAccepted(true)
			status(enqId, 'accEnq')
		}
	}

	const handleReject = (enqId: any) => {
		console.log('handleRejecthandleReject : ', enqId)
		status(enqId, 'rejEnq')
	}

	const handleClickView = (enqId: any) => {
		dispatch(setEnqId(enqId?.enqSeqNo))
		router.push('/enquiryView')
	}

	const closedDialaog2 = (enqId: any) => {
		refreshData()
		setMessageAccepted(false)
	}

	const status = async (enq: any, status: any) => {
		console.log('enqId : ', enq)
		const payload = {
			status,
			enqDescription: 'Test'
		}
		try {
			const response = await statusUpdate(payload, {}, { id: enq?.enqSeqNo })
			if (response?.status === 'error') {
				console.log('error:', response)
			} else {
				response?.status === 'success'
				console.log('success : ', response)
			}
		} catch (error) {
			console.log('err : ', error)
		}
	}
	return (
		<div className='mt-8'>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className='text-center'>Enquiry Number</TableHead>
						<TableHead className='text-center'>Enquiry Name</TableHead>
						<TableHead className='text-center'>LOB Name</TableHead>
						<TableHead className='text-center'>Product</TableHead>
						<TableHead className='text-center'>Enquiry Date</TableHead>
						<TableHead className='text-center'>Updated Date</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{tableData?.map((enquiry: any, index: any) => {
						const productLabel =
							Product.find((item: any) => item.value === enquiry.enqProdName)?.label ||
							enquiry.enqProdName

						const lobLabel =
							Lob.find((item: any) => item.value === enquiry?.enqLobName)?.label ||
							(enquiry?.enqLobName ? enquiry.enqLobName : 'Invalid')
						return (
							<TableRow key={index} >
								<TableCell className='text-center text-xs p-0'>{enquiry.enqSeqNo}</TableCell>
								<TableCell className='text-center text-xs p-0'>{enquiry.enqName}</TableCell>
								<TableCell className='text-center text-xs p-0'>{lobLabel}</TableCell>
								<TableCell className='text-center text-xs p-0'>{productLabel}</TableCell>
								<TableCell className='text-center p-0'>
									<div className='flex flex-col items-center gap-y-1'>
										{enquiry.enqDate ? (
											<>
												<span className='text-xs font-medium'>
													{format(parseISO(enquiry.enqDate), 'yyyy-MM-dd')}
												</span>
												<span className='text-[11px] text-gray-500'>
													{format(parseISO(enquiry.enqDate), 'hh:mma')}
												</span>
											</>
										) : (
											<span className='text-xs text-gray-400'>N/A</span>
										)}
									</div>
								</TableCell>
								<TableCell className='text-center p-0'>
									<div className='flex flex-col items-center gap-y-1'>
										{enquiry.enqUpdatedDate ? (
											<>
												<span className='text-xs font-medium'>
													{format(parseISO(enquiry.enqUpdatedDate), 'yyyy-MM-dd')}
												</span>
												<span className='text-[11px] text-gray-500'>
													{format(parseISO(enquiry.enqUpdatedDate), 'hh:mma')}
												</span>
											</>
										) : (
											<span className='text-xs text-gray-400'>N/A</span>
										)}
									</div>
								</TableCell>
								<TableCell className='flex gap-x-3'>
									{activetabs === 'accEnq' ? (
										<div className='flex flex-row gap-x-3'>
											<Button
												variant='default'
												className='bg-primary text-xs text-white'
												onClick={() => router.push('/prospect')}>
												Create Prospect
											</Button>
											{/* <Ellipsis className='mt-1' /> */}
										</div>
									) : (
										<div className='mt-1 flex flex-row gap-x-3'>
											<Eye
												onClick={() => handleClickView(enquiry)}
												className='cursor-pointer rounded-full border bg-[#E5E9F2] p-1'
											/>
											<FileText className='cursor-pointer rounded-full border bg-[#E5E9F2] p-1' />
											<X
												onClick={() => handleReject(enquiry)}
												className='cursor-pointer rounded-full border bg-[#E31D1D] p-1 text-[#FFFFFF]'
											/>
											<Check
												onClick={() => handleClick(enquiry)}
												className={`cursor-pointer rounded-full border bg-[#06771F] p-1 text-[#FFFFFF]`}
											/>

											{/* <Ellipsis /> */}
										</div>
									)}
									{messageAccepted && (
										<EnquiryAcceptedDialog
											enquiryAccepted={messageAccepted}
											enquiryAcceptedClose={setMessageAccepted}
											closedDialaog={() => closedDialaog2(enquiry)}
										/>
									)}
								</TableCell>
							</TableRow>
						)
					})}
				</TableBody>
			</Table>
		</div>
	)
}

export default EnquiryListTable
