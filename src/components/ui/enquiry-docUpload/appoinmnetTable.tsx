import React, { useEffect, useState } from 'react'
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle
} from '@/components/ui/dialog'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import useApiRequests from '@/services/useApiRequests'
import { useRouter } from 'next/navigation'
import FixAppoinment from './fixAppoinment'
import { Pencil, Trash } from 'lucide-react'
import moment from 'moment'

const AppoinmnetTableDialog = ({ open, handleCloseAppTable, enqId }: any) => {
	const router = useRouter()
	const appoinmentTable: any = useApiRequests('appoinmentHistory', 'GET')
	const [appoinments, setAppoinmnets] = useState([])
	const [openFixApp, setOpenFixApp] = useState(false)
	const [openTable, setOpenTable] = useState(false)

	const appoinmentTableData = async () => {
		try {
			const response = await appoinmentTable('', {}, { enqId })
			if (response?.status === 'error') {
				console.log('Error:', response)
			} else if (response?.status === 'success') {
				console.log('success : ', response)
				setAppoinmnets(response.data)
			}
		} catch (error) {
			console.log('err :', error)
		}
	}

	useEffect(() => {
		setOpenTable(open)
	}, [enqId])

	useEffect(() => {
		if (openTable) appoinmentTableData()
	}, [openTable])

	const handleCloseFixAppointment = () => {
		setOpenFixApp(false)
		setOpenTable(true)
	}

	const handleFixAppointmentDialog = () => {
		setOpenFixApp(true)
		setOpenTable(false)
	}

	const handleClose = () => {
		handleCloseAppTable()
	}

	return (
		<>
			<Dialog
				open={openTable}
				onOpenChange={handleClose}>
				<DialogContent className='sm:max-w-lg'>
					<DialogHeader className='flex flex-row items-center gap-x-5'>
						<DialogTitle>Appointment History</DialogTitle>
						<Button
							variant='default'
							onClick={() => handleFixAppointmentDialog()}
							size='sm'>
							Fix Appointment
						</Button>
					</DialogHeader>

					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className='text-center'>App. Date</TableHead>
								<TableHead className='text-center'>App. Name</TableHead>
								<TableHead className='text-center'>App. Time</TableHead>
								{/* <TableHead className='text-center'>Actions</TableHead> */}
							</TableRow>
						</TableHeader>
						<TableBody>
							{appoinments.length > 0 ? (
								appoinments.map((appointment: any, index: number) => (
									<TableRow key={index}>
										<TableCell className='text-center text-xs'>
											{moment(appointment.activityStartDate).format('DD-MMM-YYYY')}
										</TableCell>
										<TableCell className='text-center text-xs'>
											{appointment.activitySubject}
										</TableCell>
										<TableCell className='text-center text-xs'>
											{moment(appointment.activityStartTime, 'HH:mm').format('hh:mm A')}
										</TableCell>
										<TableCell className='flex items-center gap-3 text-center'>
											<Pencil
												size={20}
												className='rounded-full border p-1 bg-[#E6EDF5] cursor-pointer'
											/>
											<Trash
												size={20}
												className='rounded-full border p-1 bg-[#E6EDF5] cursor-pointer'
											/>
										</TableCell>
									</TableRow>
								))
							) : (
								<TableRow>
									<TableCell
										className='text-center'
										colSpan={4}>
										No appointments available
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>

					<DialogFooter className='sm:justify-center'>
						<DialogClose asChild>
							<Button
								variant='default'
                                size='sm'
								type='button'>
								Close
							</Button>
						</DialogClose>
					</DialogFooter>
				</DialogContent>
			</Dialog>
			{openFixApp && (
				<FixAppoinment
					open={openFixApp}
					handleClose={handleCloseFixAppointment}
					enqId={enqId}
				/>
			)}
		</>
	)
}

export default AppoinmnetTableDialog
