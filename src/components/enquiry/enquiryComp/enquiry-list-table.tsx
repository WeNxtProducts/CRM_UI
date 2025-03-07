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

// Import the Product array from the external file
import { Lob, Product } from '@/lib/constant' // Adjust path as necessary
import { Button } from '@/components/ui/button'
import EnquiryAcceptedDialog from '@/components/ui/enquiry-docUpload/enquiryAcceptedDialog'
import { useDispatch, useSelector } from 'react-redux'
import { setEnqId } from '@/redux/slices'

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
}

const EnquiryListTable: React.FC<EnquiryListTableProps> = ({ tableData, activetabs }: any) => {
	const router = useRouter()
	const dispatch = useDispatch()
	const [isDisabled, setIsDisabled] = useState(false)
	const [messageAccepted, setMessageAccepted] = useState(false)

	const handleClick = () => {
		if (!isDisabled) {
			setIsDisabled(true)
			setMessageAccepted(true)
		}
	}

	const handleClickView = (enqId: any) => {
		dispatch(setEnqId(enqId?.enqSeqNo))
		router.push('/enquiryView')
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
						{/* <TableHead className='text-center'>Actions</TableHead> */}
					</TableRow>
				</TableHeader>
				<TableBody>
					{tableData?.map((enquiry: any, index: any) => {
						// Find the corresponding label for the product value
						const productLabel =
							Product.find((item: any) => item.value === enquiry.enqProdName)?.label ||
							enquiry.enqProdName

						const lobLabel =
							Lob.find((item: any) => item.value === enquiry.enqlobName)?.label ||
							enquiry.enqLobName
						return (
							<TableRow key={index}>
								<TableCell className='text-center'>{enquiry.enqSeqNo}</TableCell>
								<TableCell className='text-center'>{enquiry.enqName}</TableCell>
								<TableCell className='text-center'>{lobLabel}</TableCell>
								<TableCell className='text-center'>{productLabel}</TableCell>
								<TableCell className='text-center'>
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
								<TableCell className='text-center'>
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
											<X className='cursor-pointer rounded-full border bg-[#E31D1D] p-1 text-[#FFFFFF]' />
											<Check
												onClick={handleClick}
												className={`rounded-full border bg-[#06771F] p-1 text-[#FFFFFF] ${
													isDisabled ? 'pointer-events-none opacity-50' : 'cursor-pointer'
												} `}
											/>
											{messageAccepted && (
												<EnquiryAcceptedDialog
													enquiryAccepted={messageAccepted}
													enquiryAcceptedClose={setMessageAccepted}
												/>
											)}

											{/* <Ellipsis /> */}
										</div>
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
