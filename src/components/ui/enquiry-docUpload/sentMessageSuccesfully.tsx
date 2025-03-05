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

const SentMessageSuccesfully = ({ open, onOpenChange }: any) => {
	return (
		<div>
			<Dialog
				open={open}
				onOpenChange={onOpenChange}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Message sent sucessfully</DialogTitle>
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
					<div>
						<p className='text-sm'>
							The task moved to in review section and will be closed within 30 days if unattended.
						</p>
					</div>

					<DialogFooter className='sm:justify-end'>
						<DialogClose asChild>
							<Button
								variant='default'
								type='button'
								onClick={onOpenChange}>
								Close
							</Button>
						</DialogClose>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	)
}

export default SentMessageSuccesfully
