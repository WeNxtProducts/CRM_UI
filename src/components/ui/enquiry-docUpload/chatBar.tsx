import { Separator } from '@/components/ui/separator'
import { message } from '@/lib/constant'
import { ChevronDown } from 'lucide-react'
import React from 'react'

const ChatBar = ({ conversationData }: any) => {
	return (
		<div className='mt-6 rounded-xl border'>
			<div className='ml-4 mt-2 flex flex-row gap-x-1'>
				<p className='font-semibold'>Enquire history</p>
				<ChevronDown className='h-7 w-5' />
			</div>
			<Separator />

			{/* <div className='max-h-64 flex-1 space-y-4 overflow-y-auto p-4'>
				{message.map((message: any) => (
					<div
						key={message.id}
						className='flex flex-col'>
						{message.sender === 'lead' && (
							<div className='flex items-center space-x-2'>
								<span className='text-xxs font-semibold'>{message.name}</span>
							</div>
						)}
						<div
							className={`max-w-[80%] rounded-lg p-3 text-xs ${message.sender === 'system' ? 'self-start bg-blue-900 text-white' : 'ml-auto self-end bg-blue-100 text-black'}`}>
							{message.sender === 'system' ? <strong>{message.text.split(' ')[0]}</strong> : null}{' '}
							{message.text}
						</div>
						<span className='mt-1 self-end text-xs text-gray-500'>{message.time}</span>
					</div>
				))}
			</div> */}

			<div className='max-h-64 flex-1 space-y-4 overflow-y-auto p-4'>
				{conversationData?.map((message: any) => {
					return (
						<div key={message?.convCreatedAt}>
							{message.convLeadComment} <br/>
							{message.convSalesComment}
						</div>
					)
				})}
			</div>
		</div>
	)
}

export default ChatBar
