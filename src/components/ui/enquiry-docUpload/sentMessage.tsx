import React, { useEffect, useState } from 'react'
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/components/ui/dialog'
import { Textarea } from '../textarea'
import { Button } from '../button'
import Image from 'next/image'
import whatsapp from '@/Images/icons8-whatsapp.svg'
import mail from '@/Images/mail-image.svg'
import SentMessageSuccesfully from './sentMessageSuccesfully'
import useApiRequests from '@/services/useApiRequests'

const SentMessage = ({ messageOpen, messageClose, activeIcon, leadSource, leadDesc, id }: any) => {
	const messageSent: any = useApiRequests('sendMessage', 'POST')
	const [sentMessage, setSentMessage] = useState(false)
	const [messageText, setMessageText] = useState(leadDesc || '')
	const closed = () => {
		setSentMessage(false)
		messageClose()
	}
	const handleSendMessage = () => {
		setSentMessage(true)
		fetchSentMessage()
	}

	const fetchSentMessage = async () => {
		console.log('fetchSentMessage')
		const payload = {
			leadSource: leadSource,
			leadDescription: messageText,
			leadSeqNo: id
		}
		try {
			const response = await messageSent(payload)
			if (response?.status === 'error') {
				console.log('error : ', response)
			} else if (response?.status === 'success') {
				console.log('success : ', response)
			}
		} catch (error) {
			console.log('err :', error)
		}
	}

	// useEffect(()=>{
	// 	fetchSentMessage()
	// }, [])

	return (
		<Dialog
			open={messageOpen}
			onOpenChange={messageClose}>
			<DialogContent aria-describedby='dialog-description'>
				<DialogHeader>
					<DialogTitle>Send Message</DialogTitle>
				</DialogHeader>

				{/* ✅ Add DialogDescription for better accessibility */}
				<DialogDescription id='dialog-description'>
					Choose your preferred message channel and provide a description.
				</DialogDescription>

				<div className='flex flex-row gap-x-2'>
					<Image
						src={mail}
						width={30}
						height={30}
						alt='Mail Icon'
						className={`rounded-full border p-1 ${
							activeIcon === 'mail' ? 'ring-2 ring-red-500' : ''
						}`}
					/>

					<Image
						src={whatsapp}
						width={30}
						height={30}
						alt='WhatsApp Icon'
						className={`rounded-full border p-1 ${
							activeIcon === 'whatsapp' ? 'ring-2 ring-green-500' : ''
						}`}
					/>
				</div>

				<div>
					<label
						htmlFor='description'
						className='mb-1 block text-xs font-medium text-gray-700'>
						Description
					</label>
					<Textarea
						id='description'
						placeholder='Add some description of the task.'
						className='mt-2 w-full'
						value={messageText}
						onChange={(e) => setMessageText(e.target.value)}
					/>
				</div>

				<div className='flex justify-end'>
					<Button
						variant='default'
						size='sm'
						onClick={handleSendMessage}>
						Send Message
					</Button>
					{sentMessage && (
						<SentMessageSuccesfully
							open={sentMessage}
							onOpenChange={closed}
						/>
					)}
				</div>
			</DialogContent>
		</Dialog>
	)
}

export default SentMessage
