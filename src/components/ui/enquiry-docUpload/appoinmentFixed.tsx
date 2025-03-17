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

const AppoinmentFixed = ({ appoinmentFixedOpen, appoinmentHandleClose }: any) => {
	return (
		<Dialog
			open={appoinmentFixedOpen}
			onOpenChange={appoinmentHandleClose}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Appoinment fixed successfully</DialogTitle>
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
							onClick={() => appoinmentHandleClose()}>
							Close
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

export default AppoinmentFixed
