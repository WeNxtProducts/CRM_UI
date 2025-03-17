import { Separator } from '@/components/ui/separator'
import { message } from '@/lib/constant';
import { ChevronDown } from 'lucide-react';
import React from 'react'

const ChatBar = () => {
	return (
		<div className='rounded-xl border mt-6'>
			<div className='ml-4 mt-2 flex flex-row gap-x-1'>
				<p className='font-semibold'>Enquire history</p>
				<ChevronDown className='h-7 w-5' />
			</div>
            <Separator />

			<div className="flex-1 overflow-y-auto max-h-64 p-4 space-y-4">
        {message.map((message :any) => (
          <div key={message.id} className="flex flex-col">
            {message.sender === "lead" && (
              <div className="flex items-center space-x-2">
                <span className="text-xxs font-semibold">{message.name}</span>
              </div>
            )}
            <div
              className={`p-3 rounded-lg max-w-[80%] text-xs ${message.sender === "system" ? "bg-blue-900 text-white self-start" : "bg-blue-100 text-black self-end ml-auto"}`}
            >
              {message.sender === "system" ? <strong>{message.text.split(" ")[0]}</strong> : null} {message.text}
            </div>
            <span className="text-xs text-gray-500 mt-1 self-end">{message.time}</span>
          </div>
        ))}
      </div>

		</div>
	)
}

export default ChatBar
