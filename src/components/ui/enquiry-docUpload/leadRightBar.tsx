import { ChevronDown } from 'lucide-react'
import {Separator} from '../../../components/ui/separator'
import React from 'react'

const LeadRightBar = () => {
	return (
		<div className='rounded-xl border'>
			<div className='ml-4 mt-2 flex flex-row gap-x-1'>
				<p className='font-semibold'>Assignee Details</p>
				<ChevronDown className='h-7 w-5' />
			</div>
			<Separator/>

			<div className='m-2 flex flex-col gap-5 rounded-lg bg-[#E5E9F2] py-2 pl-2'>
				<div className='flex flex-col'>
					<p className='text-xs text-[#91929E]'>Employee ID</p>
					<p className='font-semibold'>1247463633</p>
				</div>

				<div className='flex flex-col'>
					<p className='text-xs text-[#91929E]'>Asignee Name</p>
					<p className='font-semibold'>Rakesh K M</p>
				</div>

                <div className='flex flex-col'>
					<p className='text-xs text-[#91929E]'>Designation</p>
					<p className='font-normal'>Manager</p>
				</div>
			</div>

            {/* <div className='flex flex-col gap-5 py-2 pl-2'>
					<div className='flex flex-col'>
						<p className='text-xs text-[#91929E]'>Other Assignees (1)</p>
						<p className='font-normal'>1223344 - NAME</p>
					</div>
				</div> */}
		</div>
	)
}

export default LeadRightBar
