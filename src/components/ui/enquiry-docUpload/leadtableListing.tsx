'use client'

import { useRouter } from 'next/navigation'
import { ArrowUp, Smartphone } from 'lucide-react'
import whatsapp from '@/Images/icons8-whatsapp.svg'
import mail from '@/Images/mail-image.svg'
import mobile from '@/Images/mobile-image.svg'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Button } from '../button'
import FixAppoinment from './fixAppoinment'
import moment from 'moment'
import SentMessage from './sentMessage'

const LeadtableListing = ({ leads = []  }: any) => {
	const router = useRouter()
	const [openDialog, setOpenDialog] = useState(false)
	const [messageDialog, setMessageDialog] = useState(false)
	const [selectedLead, setSelectedLead] = useState<{ leadSource: string; leadDesc: string, id:any } | null>(
		null
	)
	const [activeIcon, setActiveIcon] = useState<string | null>(null)
	const handleClose = () => {
		setOpenDialog(false)
		setMessageDialog(false)
	}

	const handleIconClick = (icon: any, lead: any) => {
		setActiveIcon(icon)
		setMessageDialog(true)
		setSelectedLead({
			leadSource: icon,
			leadDesc: lead.leadDescription || '',
			id  : lead.leadSeqNo
		})
	}

	return (
		<div className='space-y-4'>
			{leads?.length > 0 &&
				leads?.map((lead: any, index: any) => (
					<div
						key={index}
						className='grid grid-cols-8 items-center gap-3 rounded-lg bg-white p-4 shadow-md'
					>
						<div className='col-span-2 flex flex-col'>
							<div className='text-sm text-gray-500'>{lead.leadSeqNo}</div>
							<div className='text-base font-medium'>{lead.leadName}</div>
						</div>

						<div className='col-span-1 flex flex-col text-sm text-gray-600'>
							<div className='text-sm text-gray-500'>Date</div>
							<div className='mt-1'>{moment(lead.leadCreatedDate).format('YYYY-MM-DD ')}</div>
						</div>

						<div className='col-span-1 flex flex-col text-sm text-gray-600'>
							<div className='text-sm text-gray-500'>Reminders Sent</div>
							<div className='mt-1'>{lead.remainderCount}</div>
						</div>

						<div className='col-span-1 flex flex-col text-sm'>
							<div className='text-sm text-gray-500'>Priority</div>
							<div
								className={`mt-1 flex items-center gap-x-1 p-1 ${
									lead.leadPriority === 'High'
										? 'text-green-500'
										: lead.leadPriority === 'Medium'
											? 'text-[#FFBD21]'
											: lead.leadPriority === 'Low'
												? 'text-red-500'
												: 'text-gray-400'
								}`}>
								<ArrowUp className='h-5 w-4' />
								{lead.leadPriority}
							</div>
						</div>

						<div className='col-span-1 flex items-center'>
							<div
								className={`rounded-md px-3 py-1 text-sm ${
									lead.leadStatus === 'Done'
										? 'bg-[#E0F9F2] text-[#00D097]'
										: lead.leadStatus === 'Inreview'
											? 'bg-[#F5E0F9] text-[#CA31E8]'
											: lead.leadStatus === 'Inprogress'
												? 'bg-[#E0EBFF] text-[#3F8CFF]'
												: lead.leadStatus === 'Todo'
													? 'bg-[#E7E9EB] text-[#7D8592]'
													: ''
								}`}>
								{lead.leadStatus}
							</div>
						</div>

						<div className='col-span-1 flex items-center'>
							<Button
								variant='default'
								size='sm'
								onClick={() => {
									if (lead.leadStatus === 'Todo') {
										setOpenDialog(true)
									}
								}}>
								{lead.leadStatus === 'Done'
									? 'Review Prospect'
									: lead.leadStatus === 'Inreview'
										? 'Proceed Enquiry'
										: lead.leadStatus === 'Inprogress'
											? 'Review Prospect'
											: lead.leadStatus === 'Todo'
												? 'Fix Appointment'
												: 'Unknown Status'}
							</Button>
							{openDialog && (
								<FixAppoinment
									open={openDialog}
									handleClose={handleClose}
								/>
							)}
						</div>

						<div className='col-span-1 flex gap-1'>
							<Image
								src={mobile}
								width={30}
								height={30}
								alt='Mobile Icon'
								className='rounded-full border bg-[#E6EDF5] p-1 cursor-pointer'
								onClick={() => router.push('/enquiry')}
							/>
							<Image
								src={whatsapp}
								width={30}
								height={30}
								alt='WhatsApp Icon'
								onClick={(e) => {
									e.stopPropagation()
									handleIconClick('whatsapp', lead)
								}}
								className='cursor-pointer'
							/>
							{messageDialog && selectedLead &&(
								<SentMessage
									messageOpen={messageDialog}
									messageClose={() => setMessageDialog(false)}
									activeIcon={activeIcon}
									leadSource={selectedLead.leadSource}
									leadDesc={selectedLead.leadDesc}
									id = {selectedLead.id}
								/>
							)}

							<Image
								src={mail}
								width={30}
								height={30}
								alt='Mail Icon'
								className='cursor-pointer rounded-full border bg-[#E6EDF5] p-1'
								onClick={(e) => {
									e.stopPropagation()
									handleIconClick('mail', lead)
								}}
							/>
							{messageDialog && selectedLead && (
								<SentMessage
									messageOpen={messageDialog}
									messageClose={() => setMessageDialog(false)}
									activeIcon={activeIcon}
									leadSource={selectedLead.leadSource}
									leadDesc={selectedLead.leadDesc}
									id={selectedLead.id}
								/>
							)}
						</div>
					</div>
				))}
		</div>
	)
}

export default LeadtableListing
