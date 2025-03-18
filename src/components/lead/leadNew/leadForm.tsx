/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import { useForm, Controller } from 'react-hook-form'
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
import { Button } from '@/components/ui/button'
import { DatePickerDemo } from '@/components/ui/datePicker'
import LeadRightBar from '@/components/ui/enquiry-docUpload/leadRightBar'
import useApiRequests from '@/services/useApiRequests'
import LeadCreatedSuccesfully from '@/components/ui/enquiry-docUpload/leadCreatedSuccesfully'
import { useAppDispatch } from '@/store'


const LeadForm = () => {
	const router = useRouter()
	// const dispatch = useAppDispatch()
	// const [date, setDate] = React.useState<Date>()
	const [leadAccDialog, setLeadAccDialog] = useState(false)
	const {
		register,
		handleSubmit,
		formState: { errors },
		getValues,
		control
	} = useForm({})

	const leadNewData: any = useApiRequests('leadCreate', 'POST')

	const leadData = async (Data: any) => {
		try {
			const response = await leadNewData(Data)
			if (response?.status == 'error') {
				console.log('error : ', response)
			} else if (response?.status === 'success') {
				console.log('success : ', response)
				// dispatch(setEnquiryName(data.leadName))
				setLeadAccDialog(true)
			}
		} catch (err) {
			console.log('err : ', err)
		}
	}

	const onSubmit = (Data: any) => {
		console.log(Data)
		leadData(Data)
	}

	return (
		<div>
			<div className='mt-2 flex items-center gap-2 pl-3 md:pl-2 lg:pl-4'>
				<div>
					<button onClick={() => router.push('/lead')}>
						<ArrowLeft className='h-6 w-8' />
					</button>
				</div>

				<div>
					<h2 className='text-T-size font-medium text-T-color'>New Lead</h2>
				</div>
			</div>

			<Separator />

			<div className='mt-5 grid grid-cols-10 pl-6 pr-2'>
				<div className='col-span-8 pr-2'>
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className='grid w-full grid-cols-1 gap-2 gap-y-5 md:grid-cols-3'>
							<Input
								label='Lead Name'
								type='text'
								className='w-full'
								placeholder='Enter Lead Name'
								{...register('leadName')}
							/>

							<Input
								label='Email Address'
								type='text'
								className='w-full'
								placeholder='Enter Lead Email'
								{...register('leadEmail')}
							/>

							<Input
								label='Mobile Number'
								type='text'
								className='w-full'
								placeholder='Enter Mobile Number'
								{...register('leadMobileNo')}
							/>

							<Input
								label='Phone Number'
								type='text'
								className='w-full'
								placeholder='Enter Phone Number'
								{...register('leadPhoneNo')}
							/>

							<Input
								label='Address line 1'
								type='text'
								className='w-full'
								placeholder='Enter Lead Address'
								{...register('leadAddrLine1')}
							/>

							<Input
								label='Address line 2'
								type='text'
								className='w-full'
								placeholder='Enter Lead Address'
								{...register('leadAddrLine2')}
							/>

							<Controller
								name='leadCountry'
								control={control}
								render={({ field }) => (
									<SelectWrapper label='Country'>
										<Select
											onValueChange={field.onChange}
											value={field.value}>
											<SelectTrigger
												id='custom-select'
												className='w-full'>
												<SelectValue placeholder='Select a country' />
											</SelectTrigger>
											<SelectContent>
												<SelectGroup>
													<SelectItem value='option1'>Option 1</SelectItem>
													<SelectItem value='option2'>Option 2</SelectItem>
													<SelectItem value='option3'>Option 3</SelectItem>
												</SelectGroup>
											</SelectContent>
										</Select>
									</SelectWrapper>
								)}
							/>

							<Controller
								name='leadType'
								control={control}
								render={({ field }) => (
									<SelectWrapper label='Lead type'>
										<Select
											onValueChange={field.onChange}
											value={field.value}>
											<SelectTrigger
												id='custom-select'
												className='w-full'>
												<SelectValue placeholder='Type' />
											</SelectTrigger>
											<SelectContent>
												<SelectGroup>
													<SelectItem value='option1'>Option 1</SelectItem>
													<SelectItem value='option2'>Option 2</SelectItem>
													<SelectItem value='option3'>Option 3</SelectItem>
												</SelectGroup>
											</SelectContent>
										</Select>
									</SelectWrapper>
								)}
							/>

							<Controller
								name='leadAssignedBy'
								control={control}
								render={({ field }) => (
									<SelectWrapper label='Assigned by whom'>
										<Select
											onValueChange={field.onChange}
											value={field.value}>
											<SelectTrigger
												id='custom-select'
												className='w-full'>
												<SelectValue placeholder='By whom' />
											</SelectTrigger>
											<SelectContent>
												<SelectGroup>
													<SelectItem value='option1'>Option 1</SelectItem>
													<SelectItem value='option2'>Option 2</SelectItem>
													<SelectItem value='option3'>Option 3</SelectItem>
												</SelectGroup>
											</SelectContent>
										</Select>
									</SelectWrapper>
								)}
							/>

							<Controller
								name='leadAssignedTo'
								control={control}
								render={({ field }) => (
									<SelectWrapper label='Assigned to whom'>
										<Select
											onValueChange={field.onChange}
											value={field.value}>
											<SelectTrigger
												id='custom-select'
												className='w-full'>
												<SelectValue placeholder='To whom' />
											</SelectTrigger>
											<SelectContent>
												<SelectGroup>
													<SelectItem value='option1'>Option 1</SelectItem>
													<SelectItem value='option2'>Option 2</SelectItem>
													<SelectItem value='option3'>Option 3</SelectItem>
												</SelectGroup>
											</SelectContent>
										</Select>
									</SelectWrapper>
								)}
							/>

							<Controller
								name='leadPriority'
								control={control}
								render={({ field }) => (
									<SelectWrapper label='Priority'>
										<Select
											onValueChange={field.onChange}
											value={field.value}>
											<SelectTrigger
												id='custom-select'
												className='w-full'>
												<SelectValue placeholder='Select Priority' />
											</SelectTrigger>
											<SelectContent>
												<SelectGroup>
													<SelectItem value='High'>High</SelectItem>
													<SelectItem value='Medium'>Medium</SelectItem>
													<SelectItem value='Low'>Low</SelectItem>
												</SelectGroup>
											</SelectContent>
										</Select>
									</SelectWrapper>
								)}
							/>
						</div>

						<div className='mt-4 grid gap-y-6'>
							<Input
								label='Description'
								type='text'
								className='w-full'
								{...register('leadDescription')}
							/>

							<Input
								label='Comments'
								type='text'
								className='w-full'
								{...register('leadComments')}
							/>

							<Input
								label='Internal notes'
								type='text'
								className='w-full'
								{...register('leadInternalNotes')}
							/>
						</div>

						<div className='mb-3 mt-3 flex justify-center gap-x-3'>
							<Button onClick={() => { router.push('/lead') }}>Back</Button>

							<Button onClick={() => {
								setLeadAccDialog(true)
							}}>Sumbit</Button>
						</div>
					</form>
					{leadAccDialog &&
						<LeadCreatedSuccesfully
							leadCreation={leadAccDialog}
							handleLeadCreation={() => {
								setLeadAccDialog(false)
							}}
						/>
					}
				</div>
				<div className='col-span-2'>
					<LeadRightBar />
				</div>
			</div>
		</div>
	)
}

export default LeadForm
