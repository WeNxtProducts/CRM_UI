'use client'

import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { ArrowLeft } from 'lucide-react'
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
import UploadListArea from '@/components/ui/enquiry-docUpload/uploadListArea'
import { useRouter } from 'next/navigation'
import { Business, gender, Lob, Product, Quote, Underwriter } from '@/lib/constant'
import useApiRequests from '@/services/useApiRequests'
import { Button } from '@/components/ui/button'
import { DatePickerDemo } from '@/components/ui/datePicker'
import EnquiryRightBar from '@/components/ui/enquiry-docUpload/enquiryRightBar'
import EnquirySavedDialog from '@/components/ui/enquiry-docUpload/enquirySavedDialog'

const EnquiryForm = () => {
	const router = useRouter()
	const [date, setDate] = React.useState<Date>()
	const [enquirySaved, setEnquirySaved] = useState(false)
	const {
		register,
		handleSubmit,
		formState: { errors },
		getValues,
		control
	} = useForm({})

	const newEnquiry: any = useApiRequests('enquiryCreate', 'POST')

	const newData = async (data: any) => {
		const formattedData = {
			...data,
			enqDate: data.enqDate ? new Date(data.enqDate).toISOString() : null
		}
		try {
			const response = await newEnquiry(data, formattedData)
			if (response?.status === 'error') {
				console.log('error : ', response)
			} else if (response?.status === 'success') {
				console.log('Enquiry saved successfully!')
				setEnquirySaved(true)
				console.log('success : ', response)
			}
		} catch (err) {
			console.log('err : ', err)
		}
	}

	const onSubmit = (data: any) => {
		console.log('form data:', data)
		newData(data)
	}

	return (
		<div>
			<div className='mt-2 flex items-center gap-2 pl-3 md:pl-2 lg:pl-4'>
				<div>
					<button onClick={() => router.push('/enquiry')}>
						<ArrowLeft className='h-6 w-8' />
					</button>
				</div>

				<div>
					<h2 className='text-T-size font-medium text-T-color'>New Enquiry</h2>
				</div>
			</div>

			<Separator />

			<div className='mt-5 grid grid-cols-10 pl-6 pr-2'>
				<div className='col-span-8 pr-2'>
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className='grid w-full grid-cols-1 gap-2 gap-y-5 md:grid-cols-3'>
							<Controller
								name='enqLobName'
								control={control}
								render={({ field }) => (
									<SelectWrapper label='LOB'>
										<Select
											onValueChange={field.onChange}
											value={field.value}>
											<SelectTrigger className='w-full'>
												<SelectValue placeholder='Select LOB' />
											</SelectTrigger>
											<SelectContent>
												<SelectGroup>
													{Lob?.map((item: any) => (
														<SelectItem
															key={item?.value}
															value={item?.value}>
															{item?.label}
														</SelectItem>
													))}
												</SelectGroup>
											</SelectContent>
										</Select>
									</SelectWrapper>
								)}
							/>

							<Controller
								name='enqProdName'
								control={control}
								render={({ field }) => (
									<SelectWrapper label='Product'>
										<Select
											onValueChange={field.onChange}
											value={field.value}>
											<SelectTrigger className='w-full'>
												<SelectValue placeholder='Select Product' />
											</SelectTrigger>
											<SelectContent>
												<SelectGroup>
													{Product?.map((item: any) => (
														<SelectItem
															key={item?.value}
															value={item?.value}>
															{item?.label}
														</SelectItem>
													))}
												</SelectGroup>
											</SelectContent>
										</Select>
									</SelectWrapper>
								)}
							/>

							<Controller
								name='enqBusType'
								control={control}
								defaultValue=''
								render={({ field }) => (
									<SelectWrapper label='Buisness Type'>
										<Select
											onValueChange={field.onChange}
											value={field.value}>
											<SelectTrigger className='w-full'>
												<SelectValue placeholder='Select buisness type' />
											</SelectTrigger>
											<SelectContent>
												<SelectGroup>
													{Business.map((item: any) => (
														<SelectItem
															key={item.value}
															value={item.value}>
															{item.label}
														</SelectItem>
													))}
												</SelectGroup>
											</SelectContent>
										</Select>
									</SelectWrapper>
								)}
							/>

							<Controller
								name='enqDate'
								control={control}
								render={({ field }) => (
									<DatePickerDemo
										date={field.value}
										setDate={field.onChange} // Updates the form state
										label='Date of reciept for enquiry'
									/>
								)}
							/>

							<Controller
								name='enqDate'
								control={control}
								render={({ field }) => (
									<DatePickerDemo
										date={field.value}
										setDate={field.onChange}
										label='Expected date for buisness' // Updates the form state
									/>
								)}
							/>

							<Input
								label='Sum Insured'
								type='text'
								className='w-full'
								{...register('enqSumInsured')}
							/>

							<Input
								label='Suggested Premium'
								type='text'
								className='w-full'
								{...register('enqSuggestedPrem')}
							/>
							<Input
								label='Suggested Rate'
								type='text'
								className='w-full'
								{...register('enqSuggestedRate')}
							/>

							<Controller
								name='enqIntermedName'
								control={control}
								render={({ field }) => (
									<SelectWrapper label='Intermidiatery name'>
										<Select
											onValueChange={field.onChange}
											value={field.value}
											disabled={true}>
											<SelectTrigger className='w-full'>
												<SelectValue placeholder='Name' />
											</SelectTrigger>
											<SelectContent>
												<SelectGroup>
													{gender?.map((item: any) => (
														<SelectItem
															key={item?.value}
															value={item?.value}>
															{item?.label}
														</SelectItem>
													))}
												</SelectGroup>
											</SelectContent>
										</Select>
									</SelectWrapper>
								)}
							/>

							<Controller
								name='enqUnderwriter'
								control={control}
								render={({ field }) => (
									<SelectWrapper label='Choose UnderWriter'>
										<Select
											onValueChange={field.onChange}
											value={field.value}>
											<SelectTrigger className='w-full'>
												<SelectValue placeholder='Select Name' />
											</SelectTrigger>
											<SelectContent>
												<SelectGroup>
													{Underwriter?.map((item: any) => (
														<SelectItem
															key={item?.value}
															value={item?.value}>
															{item?.label}
														</SelectItem>
													))}
												</SelectGroup>
											</SelectContent>
										</Select>
									</SelectWrapper>
								)}
							/>

							<Controller
								name='enqQuoteFlag'
								control={control}
								render={({ field }) => (
									<SelectWrapper label='Do you like to give a quote'>
										<Select
											onValueChange={field.onChange}
											value={field.value}>
											<SelectTrigger className='w-full'>
												<SelectValue placeholder='Select quote' />
											</SelectTrigger>
											<SelectContent>
												<SelectGroup>
													{Quote?.map((item: any) => (
														<SelectItem
															key={item?.value}
															value={item?.value}>
															{item?.label}
														</SelectItem>
													))}
												</SelectGroup>
											</SelectContent>
										</Select>
									</SelectWrapper>
								)}
							/>
						</div>

						<div className='mt-4 grid gap-y-6'>
							<Input
								label='Description of Risk'
								type='text'
								className='w-full'
							/>

							<Input
								label='Description of Risk'
								type='text'
								className='w-full'
							/>
						</div>

						<UploadListArea />

						<div className='flex justify-center gap-x-3'>
							<Button>Back</Button>

							<Button onClick={() => setEnquirySaved(true)}>Sumbit</Button>
						</div>
					</form>
					{enquirySaved && (
						<EnquirySavedDialog
							enquiryDialogOpen={enquirySaved}
							enquiryDialogHandle={() => {
								setEnquirySaved(false)
							}}
						/>
					)}
				</div>
				<div className='col-span-2'>
					<EnquiryRightBar />
				</div>
			</div>
		</div>
	)
}

export default EnquiryForm
