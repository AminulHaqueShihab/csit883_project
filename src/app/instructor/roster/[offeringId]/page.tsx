'use client';

import PageHeader from '@/components/PageHeader';
import { useParams } from 'next/navigation';
import { useAppSelector, saveAttendance } from '@/lib/store';
import { DataTable } from '@/components/DataTable';
import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Toast, ToastDescription } from '@/components/ui/toast';

export default function RosterPage() {
	const { offeringId } = useParams<{ offeringId: string }>();
	const enrollments = useAppSelector(s =>
		s.enrollments.filter(
			e => e.offeringId === offeringId && e.status === 'Enrolled'
		)
	);
	const users = useAppSelector(s => s.users);
	const rows = useMemo(
		() =>
			enrollments.map(e => ({
				userId: e.userId,
				present: true as boolean,
				result: undefined as 'Pass' | 'Incomplete' | undefined,
			})),
		[enrollments]
	);
	const [state, setState] = useState(rows);
	const [toastOpen, setToastOpen] = useState(false);
	const [toastMsg, setToastMsg] = useState('');

	return (
		<div className='space-y-4'>
			<PageHeader title='Record Attendance' />
			<DataTable
				columns={[
					{
						key: 'name' as any,
						header: 'Participant',
						render: (_, r: any) =>
							users.find(u => u.id === r.userId)?.name ?? r.userId,
					},
					{
						key: 'present' as any,
						header: 'Present',
						render: (_, r: any) => (
							<input
								type='checkbox'
								checked={r.present}
								onChange={e =>
									setState(s =>
										s.map(x =>
											x.userId === r.userId
												? { ...x, present: e.target.checked }
												: x
										)
									)
								}
							/>
						),
					},
					{
						key: 'result' as any,
						header: 'Result',
						render: (_, r: any) => (
							<select
								className='border rounded px-2 py-1 text-sm'
								value={r.result ?? ''}
								onChange={e =>
									setState(s =>
										s.map(x =>
											x.userId === r.userId
												? { ...x, result: (e.target.value || undefined) as any }
												: x
										)
									)
								}
							>
								<option value=''>-</option>
								<option value='Pass'>Pass</option>
								<option value='Incomplete'>Incomplete</option>
							</select>
						),
					},
				]}
				rows={state as any}
			/>
			<Button
				onClick={() => {
					saveAttendance(offeringId, state);
					setToastMsg('Attendance saved');
					setToastOpen(true);
				}}
			>
				Save
			</Button>
			<Toast open={toastOpen} onOpenChange={setToastOpen}>
				<ToastDescription>{toastMsg}</ToastDescription>
			</Toast>
		</div>
	);
}
