/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { Eye, FilePlus2, Save, Trash2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useDropzone } from 'react-dropzone'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import { getFileFormat, handleFileDownloadOrView, readFileAsBase64 } from '@/lib/mediaHelper'
import 'swiper/css/navigation'
import 'swiper/css'

const UploadListArea = () => {
	const fileData = {
		module: 'enquiry',
		TranId: '1',
		DocType: 'enquiry',
		replaceFlag: 'N',
		dms_status: 'N',
		uploadscrn: 'enquiry',
		screenName: 'DMS',
	};
	const [files, setFiles] = useState<any>([])

	const onDrop = useCallback(async (acceptedFiles: any) => {
		const filesBase64: any = [];
		for (const file of acceptedFiles) {
			const base64String = await readFileAsBase64(file);
			filesBase64.push({
				filename: file.name,
				base64String: base64String,
				genType: getFileFormat(file),
				description: '',
				...fileData,
			});
		}

		setFiles((prevFiles: any) => {
			const validPrevFiles = Array.isArray(prevFiles) ? prevFiles : [];
			return [...validPrevFiles, ...filesBase64];
		});
	}, []);

	useEffect(() => {
		console.log("files : ", files)
	}, [files])

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

	const handleChangeVal = (index: any) => (e: any) => {
		const newDescription = e.target.value;
		setFiles((prevFiles: any) =>
			prevFiles.map((file: any, i: any) =>
				i === index ? { ...file, description: newDescription } : file
			)
		);
	}

	const handleViewFile = (index: any) => {
		if (Object.prototype.hasOwnProperty.call(files[index], 'base64String')) {
			handleFileDownloadOrView(files[index]);
		} else {
			console.log(files[index]);
		}
	};

	return (
		<div className='mt-4'>
			<h3 className='text-lg font-semibold'>Enquiry Documents (3)</h3>

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
							<p className='text-sm'>Click or drag to upload files</p>
						</div>
					)}
				</div>
			</div>

			<div className='mt-2 flex gap-x-2'>
				<p className='flex items-center rounded-md border bg-gray-200 px-2 text-xs'>PDF</p>
				<p className='flex items-center rounded-md border bg-gray-200 px-2 text-xs'>DOCS</p>
				<p className='flex items-center rounded-md border bg-gray-200 px-2 text-xs'>TXT</p>
				<div className='flex items-center rounded-md border px-2'>
					<p className='text-xs'>{'>'}10MB</p>
				</div>
			</div>

			<div className='relative mb-10 mt-3'>
				<Swiper
					modules={[Navigation]}
					spaceBetween={10}
					slidesPerView={3}
					navigation={true}
					cssMode={true}
					className='custom-swiper'
					style={{
						// '--swiper-navigation-color': '#ffff',
						'--swiper-navigation-size': '20px',
					} as React.CSSProperties}
				>
					{files.map((doc: any, index: any) => (
						<SwiperSlide key={`${doc.filename}-${index}`}>
							<div className=''>
								<div className='flex flex-col gap-y-2 rounded-md border bg-[#E5E9F2] p-3'>
									<div className='flex flex-row justify-between pr-1'>
										<p className='text-sm font-bold'>{doc.filename}</p>
										<div>
											<Trash2 className='h-5 w-5 cursor-pointer text-red-500' />
											<Eye
												onClick={() => handleViewFile(index)}
												className='h-5 w-5 cursor-pointer text-blue-500' />
											<Save className='h-5 w-5 cursor-pointer text-green-500' />
										</div>
									</div>
									<p className='text-sm font-semibold text-[#002280]'>{doc.genType}</p>
									<Input
										label='Enter Description'
										type='text'
										value={doc?.description}
										className='w-full'
										onChange={handleChangeVal(index)}
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
