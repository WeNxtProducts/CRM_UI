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

				<div>
					<h3>Do you want to change the status</h3>

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
						variant='default'
						type='button'>
						Info Required
					</Button>
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
