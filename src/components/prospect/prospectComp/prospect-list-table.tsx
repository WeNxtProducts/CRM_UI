import React from 'react'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from '@/components/ui/table'
import { Check, Ellipsis, Eye, FileText, X } from 'lucide-react'
import {prospectTable} from '@/lib/constant'

const ProspectListTable = () => {
	return (
		<div className='mt-8'>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className='text-center'>Enquiry Number</TableHead>
						<TableHead className='text-center'>Enquiry Name</TableHead>
						<TableHead className='text-center'>LOB Name</TableHead>
						<TableHead className='text-center'>Product</TableHead>
						<TableHead className='text-center'>Enquiry Date</TableHead>
						<TableHead className='text-center'>Updated Date</TableHead>
						<TableHead className='text-center'>Number of Quotes</TableHead>
						<TableHead className='text-center'>Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
                    {prospectTable.map((prospect,index)=>(
					<TableRow key={index}>
						<TableCell className='text-center'>{prospect.enquiryNumber}</TableCell>
						<TableCell className='text-center'>{prospect.enquiryName}</TableCell>
						<TableCell className='text-center'>{prospect.lobName}</TableCell>
						<TableCell className='text-center'>{prospect.product}</TableCell>
						<TableCell className='text-center'>{prospect.enquiryDate}</TableCell>
						<TableCell className='text-center'>{prospect.updatedDate}</TableCell>
						<TableCell className='text-center'>{prospect.quotes}</TableCell>
						<TableCell className='flex gap-x-3'>
							<Eye className='rounded-full border bg-[#E5E9F2] p-1' />
							<FileText className='rounded-full border bg-[#E5E9F2] p-1' />
							<X className='rounded-full border bg-[#E31D1D] p-1 text-[#FFFFFF]' />
							<Check className='rounded-full border bg-[#06771F] p-1 text-[#FFFFFF]' />
							<Ellipsis />
						</TableCell>
					</TableRow>
                      ))}
				</TableBody>
			</Table>
		</div>
	)
}

export default ProspectListTable
