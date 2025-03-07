import React from 'react'
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
import Image from 'next/image'
import illustration from '@/Images/illustration.png'
import { Button } from '../button'
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
	SelectWrapper
} from '@/components/ui/select'

const EnquirySavedDialog = ({ enquiryDialogOpen, enquiryDialogHandle }: any) => {
	return (
		<Dialog
			open={enquiryDialogOpen}
			onOpenChange={enquiryDialogHandle}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Enquiry Saved Sucessfully</DialogTitle>
				</DialogHeader>

				<div className='flex justify-center'>
					<Image
						src={illustration}
						height={150}
						width={400}
						alt='illustration'
						className='mt-3'
					/>
				</div>

				<div className='flex justify-center'>
					<p className='text-sm'>
						The task moved to in review section and will be closed within 30 days if unattended.
					</p>
				</div>

				<div className='flex justify-center'>
					<h3 className='font-semibold'>Do you want to change the status</h3>
				</div>

				<div className='mt-1 flex justify-center gap-x-6'>
					<Button
						variant='accept'
						type='button'>
						Accept
					</Button>

					<Button
						variant='reject'
						type='button'>
						Reject
					</Button>

					<Button
						variant='inforeq'
						type='button'>
						Info Required
					</Button>
				</div>

				<div>
					<Select>
						<SelectTrigger className='w-full text-[#002280] border-[#002280] flex justify-center'>
							<SelectValue placeholder='Other Status' />
						</SelectTrigger>
					</Select>
				</div>

				<DialogFooter className='sm:justify-center'>
					<DialogClose asChild>
						<Button
							variant='default'
							type='button'
							onClick={() => enquiryDialogHandle()}>
							Close
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

export default EnquirySavedDialog
