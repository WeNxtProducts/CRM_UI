import React, { useState } from 'react'
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
import { Button } from '../button'
import Image from 'next/image'
import group2 from '@/Images/Group 2.png'
import group3 from '@/Images/Group 3.png'
import progress from '@/Images/progress.png'
import { Input } from '../input'
import { DatePickerDemo } from '../datePicker'
import { Textarea } from '../textarea'
import AppoinmentFixed from './appoinmentFixed'
import { TimePicker } from '../timePicker'
import { Controller, useForm } from 'react-hook-form'

const FixAppoinment = ({ open, handleClose }: any) => {
	const [openDialog, setOpenDialog] = useState(false)
	// const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
	// const [selectedTime, setSelectedTime] = useState<any>('12:00')
	const {
		register,
		handleSubmit,
		formState: { errors },
		getValues,
		control
	} = useForm({})
	// const [selectedTime, setSelectedTime] = useState<string | undefined>(undefined)

	// const dialogClose = () => {
	// 	setOpenDialog(false)
	// }

	const onSubmit = (data: any) => {
		console.log('form data:', data)
	}

	return (
		<Dialog
			open={open}
			onOpenChange={handleClose}>
			<DialogContent className='sm:max-w-md'>
				<DialogHeader>
					<DialogTitle>Fix Appoinment</DialogTitle>
				</DialogHeader>

				{/* <div>
					<div className='relative top-3 z-10 rounded-md border bg-[#E5E9F2] p-2'>
						<div className='flex flex-row items-center gap-x-5'>
							<div>
								<Image
									src={progress}
									height={30}
									width={30}
									alt='progress bar'
								/>
							</div>
							<div className='flex flex-col gap-y-1'>
								<p className='text-sm'>1d 3h 25m logged</p>
								<p className='text-xs'>Original Estimate 3d 8h</p>
							</div>
						</div>
					</div>
					<div className='absolute bottom-0 left-[-15px]'>
						<Image
							src={group3}
							height={30}
							width={30}
							alt='image'
						/>
					</div>

					<div className='absolute bottom-0 right-[-15px]'>
						<Image
							src={group2}
							height={30}
							width={30}
							alt='image'
						/>
					</div>
				</div> */}
					<form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
						<div className='mt-2'>
							<Input
								label='Probability percentage of sales'
								type='text'
								className='w-full'
								placeholder='probability'
								{...register('probability')}
							/>
						</div>

						<div className='grid grid-cols-2 gap-x-3'>
							<div>
								<Controller
									name='date'
									control={control}
									defaultValue={new Date()}
									render={({ field }) => (
										<DatePickerDemo
											label='Date'
											date={field.value}
											setDate={field.onChange}
										/>
									)}
								/>
							</div>
							<div>
								<Controller
									name='time'
									control={control}
									defaultValue="12:00"
									render={({ field }) => (
										<TimePicker
											label='Time'
											value={field.value}
											onChange={field.onChange}
										/>
									)}
								/>
							</div>
						</div>

						<div>
							<Textarea
								label='Description'
								id='description'
								placeholder='Add some description of the task.'
								className='mb-1 block w-full text-sm font-medium text-gray-700'
								{...register('description')}
							/>
						</div>

						<div className='flex justify-end'>
							<Button
								variant='default'
								size='sm'
								onClick={() => {
									setOpenDialog(true)
								}}>
								Save Appoinment
							</Button>
						</div>
					</form>
				{openDialog && (
					<AppoinmentFixed
						appoinmentFixedOpen={openDialog}
						appoinmentHandleClose={handleClose}
					/>
				)}
			</DialogContent>
		</Dialog>
	)
}

export default FixAppoinment
