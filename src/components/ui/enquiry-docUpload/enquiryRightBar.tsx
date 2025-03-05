import {Separator} from '../../../components/ui/separator'
import { ChevronDown } from 'lucide-react'
import React from 'react'

const EnquiryRightBar = () => {
	return (
		<>
			<div className='rounded-xl border'>
				<div className='ml-4 mt-2 flex flex-row gap-x-1'>
					<p className='font-semibold'>Customer details</p>
					<ChevronDown className='h-7 w-5' />
				</div>
				<Separator />
				<div className='m-2 flex flex-col gap-5 rounded-lg bg-[#E5E9F2] py-2 pl-2'>
					<div className='flex flex-col'>
						<p className='text-xs text-[#91929E]'>Customer ID</p>
						<p className='font-semibold'>1247463633</p>
					</div>

					<div className='flex flex-col'>
						<p className='text-xs text-[#91929E]'>Client Name</p>
						<p className='font-semibold'>Hari Prasad</p>
					</div>

					<div className='flex flex-col'>
						<p className='text-xs text-[#91929E]'>Address-1</p>
						<p className='font-normal'>AG1123 - TEST ADDRESS</p>
					</div>

					<div className='flex flex-col'>
						<p className='text-xs text-[#91929E]'>Address-2</p>
						<p className='font-normal'>Fortune</p>
					</div>

					<div className='flex flex-col'>
						<p className='text-xs text-[#91929E]'>City, State</p>
						<p className='font-normal'>AG1123 - TEST ADDRESS</p>
					</div>

					<div className='flex flex-col'>
						<p className='text-xs text-[#91929E]'>Mobile Number</p>
						<p className='font-normal'>+91 8726358901</p>
					</div>
				</div>

				<div className='flex flex-col gap-5 py-2 pl-2'>
					<div className='flex flex-col'>
						<p className='text-xs text-[#91929E]'>Intermidatery Details</p>
						<p className='font-normal'>AG123 - TEST NAME</p>
					</div>
				</div>
			</div>
			</>
	)
}

export default EnquiryRightBar
