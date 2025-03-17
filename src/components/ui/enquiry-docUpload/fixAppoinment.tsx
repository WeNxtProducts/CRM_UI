import React, { useEffect, useState } from 'react'
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
import moment from 'moment'
import useApiRequests from '@/services/useApiRequests'
import { format, addMinutes, parseISO, parse } from 'date-fns'

const FixAppoinment = ({ open, handleClose, enqId }: any) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		getValues,
		control
	} = useForm({})

	const fixAppoinmnet: any = useApiRequests('appoinments', 'POST')
	const [openApp, setOpenApp] = useState(true)
	const [successDialog, setSuccessDialog] = useState(false)

	useEffect(() => {
		setOpenApp(open)
	}, [enqId])

	const closeDialogFix = () => {
		setOpenApp(false)
		setSuccessDialog(true)
	}

	const handleCloseSuccessDialog = () => {
		setSuccessDialog(false)
		handleClose()
	}

	const appoinmentData = async (Data: any) => {
		closeDialogFix()

		console.log('data: ', Data)
		const selectedDate =
			typeof Data.activityStartDate === 'string'
				? parseISO(Data.activityStartDate)
				: Data.activityStartDate
		const formattedDate = format(selectedDate, "yyyy-MM-dd'T'HH:mm")

		const activityStartedTime = moment(Data.activityStartTime, 'HH:mm')
		console.log('activityStartedTime : ', activityStartedTime)
		const activityEndTime = activityStartedTime.add(30, 'minutes').format('HH:mm:ss')

		const formData = {
			...Data,
			activityStartDate: formattedDate,
			activityEndDate: formattedDate,
			activityType: 'APPOINTMENT',
			activityStartTime: activityStartedTime.format('HH:mm:ss'),
			activityEndTime: activityEndTime,
			enquiry: {
				enqSeqNo: enqId
			}
		}
		try {
			const response = await fixAppoinmnet(formData)
			if (response?.status === 'error') {
				console.log('error : ', response)
			} else if (response?.status === 'success') {
				setSuccessDialog(true)
				console.log('success : ', response)
			}
		} catch (error) {
			console.log('err : ', error)
		}
	}

	const onSubmit = (Data: any) => {
		console.log('form data:', Data)
		console.log('enqId:', enqId)
		appoinmentData(Data)
	}

	return (
		<>
			<Dialog
				open={openApp}
				onOpenChange={handleClose}>
				<DialogContent className='sm:max-w-md'>
					<DialogHeader>
						<DialogTitle>Fix Appoinment</DialogTitle>
					</DialogHeader>
					<form
						onSubmit={handleSubmit(onSubmit)}
						className='space-y-4'>
						<div className='mt-2'>
							<Input
								label='Probability percentage of sales'
								type='text'
								className='w-full'
								placeholder='probability'
								{...register('probabilityPercentage')}
							/>
						</div>

						<div className='mt-2'>
							<Input
								label='Appointment Name'
								type='text'
								className='w-full'
								placeholder='Name'
								{...register('activitySubject')}
							/>
						</div>

						<div className='grid grid-cols-2 gap-x-3'>
							<div>
								<Controller
									name='activityStartDate'
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
									name='activityStartTime'
									control={control}
									defaultValue='12:00'
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
								{...register('activityDescription')}
							/>
						</div>

						<div className='flex justify-end'>
							<Button
								variant='default'
								size='sm'>
								Save Appoinment
							</Button>
						</div>
					</form>
				</DialogContent>
			</Dialog>
			{successDialog && (
				<AppoinmentFixed
					appoinmentFixedOpen={successDialog}
					appoinmentHandleClose={handleCloseSuccessDialog}
				/>
			)}
		</>
	)
}

export default FixAppoinment
