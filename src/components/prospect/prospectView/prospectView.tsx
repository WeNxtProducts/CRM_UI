'use client'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { quoteHistory } from '@/lib/constant'
import { ArrowLeft, Check, ChevronRight, Pencil, Trash2 } from 'lucide-react'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { Navigation } from 'swiper/modules'
import 'swiper/css/navigation'
import { Input } from '@/components/ui/input'
import QuotationForm from '@/components/ui/enquiry-docUpload/quotationForm'
import EnquiryRightBar from '@/components/ui/enquiry-docUpload/enquiryRightBar'

const documents = [
	{ id: 1, name: 'phoneix-document.pdf', status: 'Upload complete' },
	{ id: 2, name: 'report.pdf', status: 'Upload complete' },
	{ id: 3, name: 'design-mockup.png', status: 'Upload complete' }
]

const ProspectView = () => {
	return (
		<div>
			<div className='mt-2 flex items-center gap-2 pl-1 md:pl-2 lg:pl-4'>
				<div>
					<button>
						<ArrowLeft className='h-6 w-8' />
					</button>
				</div>

				<div>
					<h2 className='text-T-size font-medium text-T-color'>View Quote</h2>
				</div>
			</div>

			<Separator />

			<div className='mt-5 grid grid-cols-10 pl-2 pr-2'>
				<div className='col-span-8'>
					<div className='ml-2 grid grid-cols-3 gap-2'>
						<div>
							<p className='text-xs text-[#91929E]'>Sales</p>
							<p className='font-semibold'>NA</p>
						</div>
						<div>
							<p className='text-xs text-[#91929E]'>Branch</p>
							<p className='font-semibold'>Chennai, India</p>
						</div>
						<div className='flex flex-row items-center gap-x-10'>
							<Button>proceed to quote</Button>
							<Trash2 className='rounded-full border p-1' />
							<Pencil className='rounded-full border p-1' />
						</div>
					</div>

					<Separator />

					<div className='ml-2 mt-5 grid grid-cols-3 gap-4 pr-2'>
						<div className='col-span-2 grid grid-cols-2 gap-4'>
							<div className='col-span-1'>
								<p className='text-xs text-[#91929E]'>LOB</p>
								<p className='font-semibold'>Marine</p>
							</div>
							<div className='col-span-1'>
								<p className='text-xs text-[#91929E]'>Product</p>
								<p className='font-semibold'>Marine</p>
							</div>
							<div className='col-span-1'>
								<p className='text-xs text-[#91929E]'>Date of Receipt Enquiry</p>
								<p className='font-semibold'>Nov 17, 2021 08:00</p>
							</div>
							<div className='col-span-1'>
								<p className='text-xs text-[#91929E]'>Expected Date for Business</p>
								<p className='font-semibold'>Nov 17, 2021 08:00</p>
							</div>
							<div className='col-span-1'>
								<p className='text-xs text-[#91929E]'>Sum Insured</p>
								<p className='font-semibold'>$6000</p>
							</div>
							<div className='col-span-1'>
								<p className='text-xs text-[#91929E]'>Premium</p>
								<p className='font-semibold'>$600</p>
							</div>

							<div className='col-span-1'>
								<p className='text-xs text-[#91929E]'>Buisness type</p>
								<p className='font-semibold'>$600</p>
							</div>

							<div className='col-span-1'>
								<p className='text-xs text-[#91929E]'>Intermediary Name</p>
								<p className='font-semibold'>$600</p>
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
									{quoteHistory.map((quote: any) => {
										return (
											<div
												key={quote.id}
												className='m-2 flex max-h-[400px] flex-col gap-3 overflow-y-auto rounded-lg border bg-[#FFFFFF] py-2 pl-2'>
												<div className='flex flex-row justify-between'>
													<div>
														<p className='text-xs text-[#91929E]'>{quote.id}</p>
														<p className=''>
															{quote.code} - {quote.type}
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
													<p>{quote.date}</p>
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

					<div className='mt-3'>
						<h3 className='text-lg font-semibold'>Enquiry Documents (3)</h3>
						<div className='relative mb-10 pr-2'>
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

					<div>
						<QuotationForm />
					</div>
				</div>

				<div className='col-span-2'>
					<EnquiryRightBar />
				</div>
			</div>
		</div>
	)
}

export default ProspectView
