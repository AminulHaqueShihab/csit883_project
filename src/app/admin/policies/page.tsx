'use client';

import PageHeader from '@/components/PageHeader';
import { useAppSelector, useAppDispatch, createPolicy } from '@/lib/store';
import { DataTable } from '@/components/DataTable';
import { Button } from '@/components/ui/button';
import { FormDialog } from '@/components/FormDialog';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

export default function AdminPoliciesPage() {
	const policies = useAppSelector(s => s.policies);
	const dispatch = useAppDispatch();
	const [form, setForm] = useState({
		name: '',
		criterion: '',
		points: 0,
		badge: '',
	});

	return (
		<div className='space-y-4'>
			<PageHeader title='Incentive Policies' />
			<div className='flex justify-end'>
				<FormDialog
					trigger={<Button>New Policy</Button>}
					title='New Policy'
					footer={
						<Button
							onClick={() => {
								const id = `p-${Date.now()}`;
								dispatch(
									createPolicy({
										id,
										name: form.name,
										criterion: form.criterion,
										points: Number(form.points) || 0,
										badge: form.badge || undefined,
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
							placeholder='Name'
							value={form.name}
							onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
						/>
						<Input
							placeholder='Criterion'
							value={form.criterion}
							onChange={e =>
								setForm(f => ({ ...f, criterion: e.target.value }))
							}
						/>
						<Input
							type='number'
							placeholder='Points'
							value={form.points}
							onChange={e =>
								setForm(f => ({ ...f, points: Number(e.target.value) }))
							}
						/>
						<Input
							placeholder='Badge (optional)'
							value={form.badge}
							onChange={e => setForm(f => ({ ...f, badge: e.target.value }))}
						/>
					</div>
				</FormDialog>
			</div>
			<DataTable
				columns={[
					{ key: 'name' as any, header: 'Name' },
					{ key: 'criterion' as any, header: 'Criterion' },
					{ key: 'points' as any, header: 'Points' },
					{ key: 'badge' as any, header: 'Badge' },
				]}
				rows={policies as any}
			/>
		</div>
	);
}
