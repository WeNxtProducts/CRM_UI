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
import { Textarea } from '../textarea'
import { Button } from '../button'

const EnquiryAcceptedDialog = ({enquiryAccepted , enquiryAcceptedClose}:any) => {
	return (
		<Dialog 
            open={enquiryAccepted}
            onOpenChange={enquiryAcceptedClose}
        > 
			<DialogContent aria-describedby="dialog-description">
				<DialogHeader>
					<DialogTitle>Enquiry Accepted Sucessfully</DialogTitle>
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

                <div className='mt-2'>
					<Textarea
						label='Description'
						id='description'
						placeholder='Add some description of the task.'
						className='w-full mb-1 block text-sm font-medium text-gray-700'
					/>
				</div>

                <DialogFooter className='sm:justify-center'>
					<DialogClose asChild>
						<Button
							variant='default'
							type='button'>
							Close
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

export default EnquiryAcceptedDialog
