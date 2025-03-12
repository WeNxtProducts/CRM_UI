'use client'

import { useRouter } from 'next/navigation'
import { ArrowUp, MessageSquareMore, Smartphone } from 'lucide-react'
import whatsapp from '@/Images/icons8-whatsapp.svg'
import mail from '@/Images/mail-image.svg'
import mobile from '@/Images/mobile-image.svg'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Button } from '../button'
import FixAppoinment from './fixAppoinment'
import moment from 'moment'
import SentMessage from './sentMessage'
import { useDispatch } from 'react-redux'
import { setLeadId } from '@/redux/slices'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from '@/components/ui/table'

const LeadtableListing = ({ leads = [] }: any) => {
	const router = useRouter()
	const dispatch = useDispatch()
	const [openDialog, setOpenDialog] = useState(false)
	const [messageDialog, setMessageDialog] = useState(false)
	const [selectedLead, setSelectedLead] = useState<{
		leadSource: string
		leadDesc: string
		id: any
	} | null>(null)
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
			id: lead.leadSeqNo
		})
	}

	return (
		<div className="mt-8">
		<Table>
		  <TableHeader>
			<TableRow>
			  <TableHead className="text-center">Lead Number</TableHead>
			  <TableHead className="text-center">Lead Name</TableHead>
			  <TableHead className="text-center">Date</TableHead>
			  <TableHead className="text-center">Reminders Sent</TableHead>
			  <TableHead className="text-center">Priority</TableHead>
			  <TableHead className="text-center">Status</TableHead>
			  <TableHead className="text-center">Actions</TableHead>
			  <TableHead className="text-center">Contact</TableHead>
			</TableRow>
		  </TableHeader>
		  <TableBody>
			{leads?.map((lead: any, index: number) => {
			  return (
				<TableRow key={index}>
				  <TableCell className="text-center">{lead.leadSeqNo}</TableCell>
				  <TableCell className="text-center font-medium">{lead.leadName}</TableCell>
				  <TableCell className="text-center">
					{moment(lead.leadCreatedDate).format("YYYY-MM-DD")}
				  </TableCell>
				  <TableCell className="text-center">{lead.remainderCount}</TableCell>
				  <TableCell className="text-center">
					<div
					  className={`inline-flex items-center gap-x-1 p-1 ${
						lead.leadPriority === "High"
						  ? "text-green-500"
						  : lead.leadPriority === "Medium"
						  ? "text-[#FFBD21]"
						  : lead.leadPriority === "Low"
						  ? "text-red-500"
						  : "text-gray-400"
					  }`}
					>
					  <ArrowUp className="h-5 w-4" />
					  {lead.leadPriority}
					</div>
				  </TableCell>
				  <TableCell className="text-center">
					<div
					  className={`rounded-md px-3 py-1 text-sm ${
						lead.leadStatus === "Done"
						  ? "bg-[#E0F9F2] text-[#00D097]"
						  : lead.leadStatus === "Inreview"
						  ? "bg-[#F5E0F9] text-[#CA31E8]"
						  : lead.leadStatus === "Inprogress"
						  ? "bg-[#E0EBFF] text-[#3F8CFF]"
						  : lead.leadStatus === "Todo"
						  ? "bg-[#E7E9EB] text-[#7D8592]"
						  : ""
					  }`}
					>
					  {lead.leadStatus}
					</div>
				  </TableCell>
				  <TableCell className="text-center">
					<Button
					  variant="default"
					  size="sm"
					  onClick={() => {
						if (lead.leadStatus === "Todo") {
						  setOpenDialog(true);
						}

						router.push('/enquiryCreate')
					  }}
					>
					  {/* {lead.leadStatus === "Done"
						? "Review Prospect"
						: lead.leadStatus === "Inreview"
						? "Proceed Enquiry"
						: lead.leadStatus === "Inprogress"
						? "Review Prospect"
						: lead.leadStatus === "Todo"
						? "Fix Appointment"
						: "Unknown Status"} */}
						Enquiry
					</Button>
				  </TableCell>
				  <TableCell className="flex justify-center gap-2">
					<MessageSquareMore
					  className="h-7 w-7 cursor-pointer rounded-full border bg-[#E6EDF5] p-1"
					  onClick={(e) => {
						e.stopPropagation();
						handleIconClick("phone", lead);
					  }}
					/>
					<Image
					  src={whatsapp}
					  width={30}
					  height={30}
					  alt="WhatsApp Icon"
					  onClick={(e) => {
						e.stopPropagation();
						handleIconClick("whatsapp", lead);
					  }}
					  className="cursor-pointer"
					/>
					<Image
					  src={mail}
					  width={30}
					  height={30}
					  alt="Mail Icon"
					  className="cursor-pointer rounded-full border bg-[#E6EDF5] p-1"
					  onClick={(e) => {
						e.stopPropagation();
						handleIconClick("mail", lead);
					  }}
					/>
				  </TableCell>
				</TableRow>
			  );
			})}
		  </TableBody>
		</Table>
	  
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
	  
		{openDialog && <FixAppoinment open={openDialog} handleClose={handleClose} />}
	  </div>
	  
	)
}

export default LeadtableListing
