'use client'

import { Button } from '@/components/ui/button'
import EnquiryRightBar from '@/components/ui/enquiry-docUpload/enquiryRightBar'
import { Separator } from '@/components/ui/separator'
import { ArrowLeft, CalendarDays, Check, ChevronRight, Pencil, Trash2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { enquiries } from '@/lib/constant'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { Navigation } from 'swiper/modules'
import 'swiper/css/navigation'
import ChatBar from '@/components/ui/enquiry-docUpload/chatBar'
import useApiRequests from '@/services/useApiRequests'
import { useSelector } from 'react-redux'
import moment from 'moment'
import { useRouter } from 'next/navigation'
import FixAppoinment from '@/components/ui/enquiry-docUpload/fixAppoinment'

const documents = [
	{ id: 1, name: 'phoneix-document.pdf', status: 'Upload complete' },
	{ id: 2, name: 'report.pdf', status: 'Upload complete' },
	{ id: 3, name: 'design-mockup.png', status: 'Upload complete' }
]

// interface GetEnqData{
// 	enqLobName:string;
// }

const EnquiryView = () => {
	const router = useRouter()
	const fetchEnquiries: any = useApiRequests('enquiryById', 'GET')
	const enqId = useSelector((state: any) => state?.apps?.enqId)
	const [loader, setLoader] = useState(false)
	const [getEnqData, setGetEnqData] = useState<any>()
	const [openDialog, setOpenDialog] = useState(false)

	const fetchData = async () => {
		setLoader(true)
		try {
			const response = await fetchEnquiries('', {}, { enqId })
			if (response?.status === 'error') {
				console.log('error:', response)
			} else {
				response?.status === 'success'
				console.log('success : ', response)
				setGetEnqData(response.data)
				console.log(response.data,'check')
			}
		} catch (err) {
			console.log('err : ', err)
		} finally {
			setLoader(false)
		}
	}
	useEffect(() => {
		console.log('enqId : ', enqId)
		fetchData()
	}, [enqId])

	const {
		register,
		handleSubmit,
		formState: { errors },
		getValues,
		control
	} = useForm()

	const handleClose =()=>{
		setOpenDialog(false)
	}
	return (
		<div>
			<div className='mt-2 flex items-center gap-2 pl-1 md:pl-2 lg:pl-4'>
				<div>
					<button onClick={() => router.push('/enquiry')}>
						<ArrowLeft className='h-6 w-8' />
					</button>
				</div>

				<div>
					<h2 className='text-T-size font-medium text-T-color'>View Enquiry</h2>
				</div>
			</div>

			<Separator />

			<div className='mt-5 grid grid-cols-10 pl-2 pr-2'>
				<div className='col-span-8'>
					<div className='ml-2 grid grid-cols-3 gap-2'>
						<div>
							<p>Sales</p>
							<p className='font-semibold'>NA</p>
						</div>
						<div>
							<p>Branch</p>
							<p className='font-semibold'>Chennai, India</p>
						</div>
						<div className='flex flex-row items-center gap-x-5'>
							<Button>proceed to quote</Button>
							<Trash2 className='rounded-full border h-7 w-7 p-1 cursor-pointer' />
							<Pencil className='rounded-full border p-1 h-7 w-7 cursor-pointer' />
							<CalendarDays 
							className='rounded-full border p-1 h-7 w-7 cursor-pointer' 
							onClick={()=>{
								setOpenDialog(true	)
							}}
							/>
						</div>
						{openDialog && <FixAppoinment open={openDialog} handleClose={handleClose} />}
					</div>

					<Separator />

					<div className='ml-2 mt-5 grid grid-cols-3 gap-4 pr-2'>
						<div className='col-span-2 grid grid-cols-2 gap-4'>
							<div>
								<p className='text-xs text-[#91929E]'>LOB</p>
								<p className='font-semibold'>{getEnqData?.enqLobName}</p>
							</div>
							<div>
								<p className='text-xs text-[#91929E]'>Product</p>
								<p className='font-semibold'>{getEnqData?.enqProdName}</p>
							</div>
							<div>
								<p className='text-xs text-[#91929E]'>Date of Receipt Enquiry</p>
								<p className='font-semibold'>{moment(getEnqData?.enqDate).format('YYYY-MM-DD HH:mm')}</p>
							</div>
							<div>
								<p className='text-xs text-[#91929E]'>Expected Date for Business</p>
								<p className='font-semibold'>{moment(getEnqData?.enqExpDate).format('YYYY-MM-DD HH:mm')}</p>
							</div>
							<div>
								<p className='text-xs text-[#91929E]'>Sum Insured</p>
								<p className='font-semibold'>{getEnqData?.enqSumInsured}</p>
							</div>
							<div>
								<p className='text-xs text-[#91929E]'>Premium</p>
								<p className='font-semibold'>{getEnqData?.enqSuggestedPrem}</p>
							</div>

							<div>
								<p className='text-xs text-[#91929E]'>Buisness type</p>
								<p className='font-semibold'>{getEnqData?.enqBusType}</p>
							</div>

							<div>
								<p className='text-xs text-[#91929E]'>Intermediary Name</p>
								<p className='font-semibold'>{getEnqData?.enqIntermedName}</p>

							</div>

							<div className='col-span-2'>
								<p className='text-xs text-[#91929E]'>Description</p>
								<p>
									At risus viverra adipiscing at in tellus. Blandit massa enim nec dui nunc mattis.
									Lacus vel facilisis volutpat est velit.
								</p>
							</div>
						</div>

						<div className='col-span-1'>
							<div className='grid grid-cols-1 border bg-[#E5E9F2]'>
								<div className='ml-2 mt-2 flex flex-row gap-x-1'>
									<p className='font-semibold'>History (3)</p>
								</div>
								<div className='max-h-[300px] overflow-y-scroll'>
									{enquiries.map((enquiry: any) => {
										const key = enquiry.id ? JSON.stringify(enquiry.id) : enquiry.code
										return (
											<div
												key={key}
												className='m-2 flex max-h-[400px] flex-col gap-3 overflow-y-auto rounded-lg border bg-[#FFFFFF] py-2 pl-2'>
												<div className='flex flex-row justify-between'>
													<div>
														<p className='text-xs text-[#91929E]'>{enquiry.id}</p>
														<p className=''>
															{enquiry.code} - {enquiry.type}
														</p>
													</div>
													<div className='pr-4'>
														<Check
															className='h-7 w-5 border bg-[#32E886] p-1'
															style={{
																clipPath:
																	'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
															}}
														/>
													</div>
												</div>

												<div>
													<p className='text-xs text-[#91929E]'>Date</p>
													<p>{enquiry.date}</p>
												</div>

												<div className='flex flex-row gap-x-1'>
													<p className='text-[#002280]'>View more</p>
													<ChevronRight className='h-6 w-5 text-[#002280]' />
												</div>
											</div>
										)
									})}
								</div>
							</div>
						</div>
					</div>

					<form className='mt-4 pr-2'>
						<div className='mt-4 grid w-full grid-cols-1 gap-2 gap-x-10 gap-y-5 md:grid-cols-3'>
							<Input
								label='Lead comments'
								type='text'
								className='w-full'
								placeholder='Enter your comments'
							/>
							<Input
								label='Sales comments'
								placeholder='Enter your comments'
								type='text'
								className='w-full'
							/>
							<Input
								label='Enquiry status'
								placeholder='Status'
								type='text'
								className='w-full'
							/>
						</div>

						<div className='mt-3'>
							<h3 className='text-lg font-semibold'>Enquiry Documents (3)</h3>
							<div className='relative mb-10'>
								<Swiper
									modules={[Navigation]}
									spaceBetween={10}
									slidesPerView={3}
									navigation={true}
									cssMode={true}
									className='custom-swiper'
									style={{
										// '--swiper-navigation-color': '#ffff',
										'--swiper-navigation-size': '20px'
									}}>
									{documents.map((doc) => (
										<SwiperSlide key={doc.id}>
											<div className='mt-3'>
												<div className='flex flex-col gap-y-2 rounded-md border bg-[#E5E9F2] p-3'>
													<div className='flex flex-row justify-between pr-1'>
														<p className='text-sm font-bold'>{doc.name}</p>
														<Trash2 className='h-5 w-5 cursor-pointer text-red-500' />
													</div>
													<p className='text-sm font-semibold text-[#002280]'>{doc.status}</p>
													<Input
														label='Enter Description'
														type='text'
													/>
												</div>
											</div>
										</SwiperSlide>
									))}
								</Swiper>
							</div>
						</div>

						<div className='mb-2 flex justify-center gap-x-3'>
							<Button>Back</Button>
							<Button>Sumbit</Button>
						</div>
					</form>
				</div>

				<div className='col-span-2'>
					<EnquiryRightBar />
					<ChatBar />
				</div>
			</div>
		</div>
	)
}

export default EnquiryView
