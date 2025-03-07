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

const LeadCreatedSuccesfully = ({leadCreation,handleLeadCreation}:any) => {
    
	return (
		<Dialog
            open={leadCreation}
            onOpenChange={handleLeadCreation}
        >
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Lead Created Sucessfully</DialogTitle>
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

                <DialogFooter className='sm:justify-center'>
					<DialogClose asChild>
						<Button
							variant='default'
							type='button'
							>
							Close
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

export default LeadCreatedSuccesfully
