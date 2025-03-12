import { FilePlus2, Trash2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { Navigation } from 'swiper/modules'
import 'swiper/css/navigation'

const UploadListArea = () => {
	const onDrop = useCallback(async (acceptedFiles: any) => {
		console.log('acceptedFiles  : ', acceptedFiles)
	}, [])

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: {
			'image/jpeg': ['.jpeg', '.jpg'],
			'image/png': ['.png'],
			'image/gif': ['.gif'],
			'image/tiff': ['.tiff', '.tif'],
			'text/plain': ['.txt'],
			'application/pdf': ['.pdf'],
			'application/msword': ['.doc'],
			'application/vnd.ms-excel': ['.xls'],
			'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
			'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
			'message/rfc822': ['.eml']
		}
	})

	const documents = [
		{ id: 1, name: 'phoneix-document.pdf', status: 'Upload complete' },
		{ id: 2, name: 'report.pdf', status: 'Upload complete' },
		{ id: 3, name: 'design-mockup.png', status: 'Upload complete' },
		// { id: 4, name: 'presentation.pptx', status: 'Upload complete' },
		// { id: 5, name: 'report.pdf', status: 'Upload complete' },
		// { id: 6, name: 'report.pdf', status: 'Upload complete' }
	]

	return (
		<div className='mt-4'>
			<h3 className='text-md font-semibold'>Enquiry Documents (3)</h3>

			<div
				className='file-drop-zone mt-2'
				{...getRootProps()}>
				<div className='inner-drop'>
					<input {...getInputProps()} />
					{isDragActive ? (
						<p>Drop the files here ...</p>
					) : (
						<div className='flex flex-col items-center justify-center gap-y-1 rounded-md border px-4 py-7'>
							<FilePlus2 className='text-[#3276E8]' />
							<p className='text-xs'>Click or drag to upload files</p>
						</div>
					)}
				</div>
			</div>

			<div className='mt-2 flex gap-x-2'>
				<p className='flex items-center rounded-md border bg-gray-200 px-2 text-xxs'>PDF</p>
				<p className='flex items-center rounded-md border bg-gray-200 px-2 text-xxs'>DOCS</p>
				<p className='flex items-center rounded-md border bg-gray-200 px-2 text-xxs'>TXT</p>
				<div className='flex items-center rounded-md border px-2'>
					<p className='text-xxs'>{'>'}10MB</p>
				</div>
			</div>

			<div className='relative mb-10'>
				<Swiper
					modules={[Navigation]}
					spaceBetween={10}
					slidesPerView={3}
					navigation={true}
					cssMode={true}
					className='custom-swiper'
					style={{
						// '--swiper-navigation-color': '#ffff',
						'--swiper-navigation-size':'20px',
					}}
				>
					{documents.map((doc) => (
						<SwiperSlide key={doc.id}>
							<div className='mt-3'>
								<div className='flex flex-col gap-y-2 rounded-md border bg-[#E5E9F2] p-3'>
									<div className='flex flex-row justify-between pr-1'>
										<p className='text-xs font-medium'>{doc.name}</p>
										<Trash2 className='h-5 w-5 cursor-pointer text-red-500' />
									</div>
									<p className='text-xs font-medium text-[#002280]'>{doc.status}</p>
									<Input
										label='Enter Description'
										type='text'
									/>
								</div>
							</div>
						</SwiperSlide>
					))}
				</Swiper>

				
			</div>
		</div>
	)
}

export default UploadListArea
