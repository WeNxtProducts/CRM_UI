'use client'

import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { DatePickerWithRange } from '@/components/ui/filterDate'
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select'
import Pagination from '@/components/ui/pagination'
import ProspectListTable from './prospect-list-table'

const Prospectlist = () => {
	const [activeTab, setActiveTab] = useState('newquote')
	const router = useRouter()
	return (
		<div>
			<div className='mt-2 flex items-center gap-x-[36px]'>
				<div>
					<h2 className='pl-10 text-T-size font-medium text-T-color'>Prospect</h2>
				</div>
				<div>
					<Button
						variant='default'
						size='sm'
						onClick={() => router.push('/prospectView')}>
						<Plus /> Create Quote
					</Button>
				</div>
			</div>

			<Separator />

			<div className='pl-10 pr-10'>
				<div>
					<Tabs
						defaultValue='pending'
						className='my-5'
						onValueChange={setActiveTab}>
						<TabsList>
							<TabsTrigger value='newquote'>New Quote</TabsTrigger>
							<TabsTrigger value='infoReq'>Additional Info Required</TabsTrigger>
							<TabsTrigger value='infoPro'>Additional Info Provided</TabsTrigger>
							<TabsTrigger value='accQuote'>Accepted Quote</TabsTrigger>
							<TabsTrigger value='rejQuote'>Rejected Quote</TabsTrigger>
						</TabsList>
					</Tabs>
				</div>

				<div>
					<div className='flex justify-between'>
						<div className='flex gap-7'>
							<div>
								<DatePickerWithRange />
							</div>

							<Select>
								<SelectTrigger className='h-[32px] w-[180px]'>
									<SelectValue placeholder='Filter by' />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										<SelectItem value='newquote'>New Quote</SelectItem>
										<SelectItem value='infoReq'>Additional Info Required</SelectItem>
										<SelectItem value='infoPro'>Additional Info Provided</SelectItem>
										<SelectItem value='accQuote'>Accepted Quote</SelectItem>
										<SelectItem value='rejQuote'>Rejected Quote</SelectItem>
									</SelectGroup>
								</SelectContent>
							</Select>
						</div>

						<div>
							{/* <Pagination  /> */}
						</div>
					</div>
				</div>

                <div className='mt-10'>
                    <ProspectListTable/>
                </div>
			</div>
		</div>
	)
}

export default Prospectlist
