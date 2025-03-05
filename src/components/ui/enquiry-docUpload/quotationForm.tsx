import React from 'react'
import { useForm } from 'react-hook-form'
import { Input } from '../input'
import UploadListArea from './uploadListArea'
import { Button } from '../button'

const QuotationForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		getValues,
		control
	} = useForm({})
	return (
		<div>
			<div>
				<h3>Quotation Form</h3>

				<form>
					<div className='mt-4 grid gap-y-6'>
						<Input
							label='Quote description'
							type='text'
							className='w-full'
                            placeholder='Enter your text'
						/>
					</div>

					<div className='grid w-full grid-cols-1 gap-2 gap-y-5 md:grid-cols-3 mt-3'>
						<Input
							label='Sum Insured'
							type='text'
							className='w-full'
                            placeholder='sum insured'
						/>

						<Input
							label='Suggested Premium'
							type='text'
							className='w-full'
                            placeholder='premium'
						/>

						<Input
							label='Suggested Rate'
							type='text'
							className='w-full'
                            placeholder='Round off'
						/>

						<Input
							label='Technical Discount'
							type='text'
							className='w-full'
                            placeholder='Round off'
						/>

						<Input
							label='Additional Discount'
							type='text'
							className='w-full'
                            placeholder='Round off'
						/>
					</div>

                    <UploadListArea/>

                    <div className='flex justify-center gap-x-3 mt-3 mb-3'>
							<Button>Back</Button>
							<Button>Sumbit</Button>
						</div>
				</form>
			</div>
		</div>
	)
}

export default QuotationForm
