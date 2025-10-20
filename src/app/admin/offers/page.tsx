'use client';

import PageHeader from '@/components/PageHeader';
import {
	useAppSelector,
	useAppDispatch,
	createOffering,
	updateOffering,
} from '@/lib/store';
import { DataTable } from '@/components/DataTable';
import { Button } from '@/components/ui/button';
import { FormDialog } from '@/components/FormDialog';
import { Input } from '@/components/ui/input';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { useAppSelector as useSel, setRoster } from '@/lib/store';
import { useState } from 'react';

export default function AdminOffersPage() {
	const offerings = useAppSelector(s => s.offerings);
	const dispatch = useAppDispatch();
	const [form, setForm] = useState({
		title: '',
		date: '',
		capacity: 10,
		instructorId: 'u-inst',
		location: '',
	});

	return (
		<div className='space-y-4'>
			<PageHeader title='Class Offerings' />
			<div className='flex justify-end'>
				<FormDialog
					trigger={<Button>New Offering</Button>}
					title='New Offering'
					footer={
						<Button
							onClick={() => {
								const id = `o-${Date.now()}`;
								dispatch(
									createOffering({
										id,
										programId: 'pr1',
										title: form.title || 'New Class',
										instructorId: form.instructorId,
										startsAt: new Date(form.date || Date.now()).toISOString(),
										endsAt: new Date(
											(form.date ? new Date(form.date).getTime() : Date.now()) +
												3600000
										).toISOString(),
										location: form.location || 'TBD',
										capacity: Number(form.capacity) || 10,
										enrolledCount: 0,
									})
								);
							}}
						>
							Save
						</Button>
					}
				>
					<div className='grid gap-2'>
						<Input
							placeholder='Title'
							value={form.title}
							onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
						/>
						<Input
							type='datetime-local'
							placeholder='Start'
							value={form.date}
							onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
						/>
						<Input
							placeholder='Location'
							value={form.location}
							onChange={e => setForm(f => ({ ...f, location: e.target.value }))}
						/>
						<Input
							type='number'
							placeholder='Capacity'
							value={form.capacity}
							onChange={e =>
								setForm(f => ({ ...f, capacity: Number(e.target.value) }))
							}
						/>
					</div>
				</FormDialog>
			</div>
			<DataTable
				columns={[
					{ key: 'title' as any, header: 'Title' },
					{
						key: 'startsAt' as any,
						header: 'Starts',
						render: (v: any) => new Date(v).toLocaleString(),
					},
					{ key: 'location' as any, header: 'Location' },
					{ key: 'capacity' as any, header: 'Capacity' },
					{ key: 'enrolledCount' as any, header: 'Enrolled' },
					{
						key: 'roster' as any,
						header: 'Roster',
						render: (_: any, row: any) => <BuildRoster offeringId={row.id} />,
					},
				]}
				rows={offerings as any}
			/>
		</div>
	);
}

function BuildRoster({ offeringId }: { offeringId: string }) {
	const users = useSel(s => s.users);
	const dispatch = useAppDispatch();
	const [open, setOpen] = useState(false);
	const [instructorId, setInstructorId] = useState('u-inst');
	const [participants, setParticipants] = useState<string[]>([]);
	const instructors = users.filter(u => u.roles.includes('Instructor'));
	const employees = users.filter(u => u.roles.includes('Employee'));
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant='outline' aria-label='Build roster'>
					Build Roster
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Build Roster</DialogTitle>
				</DialogHeader>
				<div className='space-y-2 text-sm'>
					<div>
						<div className='text-xs text-muted-foreground mb-1'>Instructor</div>
						<select
							className='border rounded px-2 py-1 w-full'
							value={instructorId}
							onChange={e => setInstructorId(e.target.value)}
							aria-label='Select instructor'
						>
							{instructors.map(i => (
								<option key={i.id} value={i.id}>
									{i.name}
								</option>
							))}
						</select>
					</div>
					<div>
						<div className='text-xs text-muted-foreground mb-1'>
							Participants
						</div>
						<select
							className='border rounded px-2 py-1 w-full'
							multiple
							value={participants}
							onChange={e =>
								setParticipants(
									Array.from(e.currentTarget.selectedOptions).map(o => o.value)
								)
							}
							aria-label='Select participants'
						>
							{employees.map(u => (
								<option key={u.id} value={u.id}>
									{u.name}
								</option>
							))}
						</select>
					</div>
					<div className='flex justify-end gap-2 pt-2'>
						<Button variant='outline' onClick={() => setOpen(false)}>
							Cancel
						</Button>
						<Button
							onClick={() => {
								dispatch(
									setRoster({
										offeringId,
										instructorId,
										participantIds: participants,
									})
								);
								setOpen(false);
							}}
						>
							Save
						</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
