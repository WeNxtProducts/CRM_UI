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
import useApiRequests from '@/services/useApiRequests'
import toast from '../toast'

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
	const DMSFileUpload = useApiRequests('DMSFileUpload', 'POST');
	const DMSFileDescriptionUpdate = useApiRequests('DMSDescUpdate', 'POST');
	const DMSFileDelete = useApiRequests('DMSDelete', 'POST');
	const DMSFileView = useApiRequests('DMSView', 'POST');
	const [files, setFiles] = useState<any>([])


	const updateFileKeyAtIndex = (index: any, newValue: any) => {
		setFiles((prevFiles: any) => {
			const updatedFiles = [...prevFiles];
			const updatedFile = { ...updatedFiles[index], ...newValue };
			updatedFiles[index] = updatedFile;
			return updatedFiles;
		});
	};

	const handleUpdateDescription = async (files: any) => {
		const payload: any = {
			doc_sys_id: files?.doc_sys_id,
			param_add1: files?.param_add1
		}
		try {
			const response = await DMSFileDescriptionUpdate(payload);
			if (response?.status === 'failure')
				toast.error('Description Not Updated!');
			if (response?.status === 'success') {
				toast.success(response?.status_msg);
			}
		} catch {
			toast.warning('Description Not Updated!');
		}
	};


	const handleUpload = async (files: any, index: any) => {
		const payload: any = [files]
		try {
			const response = await DMSFileUpload(payload);
			if (response?.Overall[0]?.status === 'failure')
				toast.error('File Not Uploaded!');
			if (response?.Overall[0]?.status === 'success') {
				updateFileKeyAtIndex(index, response?.Overall[0]?.Data);
				toast.success(`${files?.filename} Uploaded Successfully`);
			}
		} catch {
			toast.warning('File Not Uploaded!');
		}
	};

	const deleteByIndex = (index: number) => {
		setFiles((prevFiles: any[]) => prevFiles.filter((_, i) => i !== index));
	}

	const handleDelete = async (payload: any, index: any) => {
		const { doc_sys_id } = payload
		const deleteId: any = { doc_sys_id: [doc_sys_id] };
		try {
			const response = await DMSFileDelete(deleteId);
			if (response?.status === 'success') {
				deleteByIndex(index)
				toast.success(`${payload?.filename} Deleted Successfully`);
			} else if (response?.status === 'failure') {
				toast.error('File Not Deleted!');
			}
		} catch {
			toast.warning('File Not Deleted!');
		}
	};

	const onDrop = useCallback(async (acceptedFiles: any) => {
		const filesBase64: any = [];
		for (const file of acceptedFiles) {
			const base64String = await readFileAsBase64(file);
			filesBase64.push({
				filename: file.name,
				base64String: base64String,
				genType: getFileFormat(file),
				param_add1: '',
				param_add2: '',
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
				i === index ? { ...file, param_add1: newDescription } : file
			)
		);
	}

	const handleGetAndView = async (item: any) => {
		const payload: any = [{ path: item?.filePath }];
		try {
			const response = await DMSFileView(payload);
			if (response?.status === 'failure') console.log(response?.status_msg);
			if (response?.status === 'success') {
				const updatedItem = { ...item, base64String: response?.base64Strings[0] };
				handleFileDownloadOrView(updatedItem);
			}
		} catch (err: any) {
			console.log("err : ", err)
		}
	};

	const handleViewFile = (index: any) => {
		if (Object.prototype.hasOwnProperty.call(files[index], 'base64String')) {
			handleFileDownloadOrView(files[index]);
		} else {
			handleGetAndView(files[index]);
		}
	};

	return (
		<div className='mt-4'>
			<h3 className='text-md font-semibold'>Enquiry Documents (3)</h3>

			<div
				className='file-drop-zone mt-2 cursor-pointer'
				{...getRootProps()}>
				<div className='inner-drop'>
					<input {...getInputProps()} />
					{isDragActive ? (
						<p>Drop the files here ...</p>
					) : (
						<div className='flex flex-col items-center justify-center gap-y-1 rounded-md border px-3 py-3'>
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
							<div className="rounded-md border bg-[#E5E9F2] p-3">
								<div className="flex justify-between items-center">
									<p
										className="text-sm font-bold whitespace-nowrap overflow-hidden text-ellipsis cursor-pointer flex-1 mr-2"
										title={doc.filename}>
										{doc.filename}
									</p>
									<div className="flex space-x-2">
										<Save
											onClick={() => {
												if (doc?.doc_sys_id) handleUpdateDescription(doc);
												else if (!doc?.doc_sys_id) handleUpload(doc, index);
											}}
											className="h-5 w-5 cursor-pointer text-green-500"
										/>
										<Eye
											onClick={() => handleViewFile(index)}
											className="h-5 w-5 cursor-pointer text-blue-500"
										/>
										<Trash2
											onClick={() => {
												if (doc?.doc_sys_id) handleDelete(doc, index)
												else if (!doc?.doc_sys_id) deleteByIndex(index)
											}}
											className="h-5 w-5 cursor-pointer text-red-500"
										/>
									</div>
								</div>
								<div className="mt-2">
									<p className="text-sm font-semibold text-[#002280]">{doc.genType}</p>
								</div>
								<div className="mt-2">
									<Input
										label="Enter Description"
										type="text"
										value={doc?.param_add1}
										className="w-full"
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
