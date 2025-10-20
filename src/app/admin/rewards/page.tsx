'use client';

import PageHeader from '@/components/PageHeader';
import { DataTable } from '@/components/DataTable';
import {
	useAppDispatch,
	useAppSelector,
	createReward,
	updateRewardAdmin,
	archiveReward,
} from '@/lib/store';
import { Button } from '@/components/ui/button';
import { FormDialog } from '@/components/FormDialog';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

export default function AdminRewardsPage() {
	const rewards = useAppSelector(s => s.gamification.rewards);
	const dispatch = useAppDispatch();
	const [form, setForm] = useState({
		title: '',
		cost: 100,
		description: '',
		imageUrl: '',
	});

	return (
		<div className='space-y-4'>
			<PageHeader
				title='Manage Rewards'
				description='Create, edit, and archive rewards.'
			/>
			<div className='flex justify-end'>
				<FormDialog
					trigger={<Button>New Reward</Button>}
					title='New Reward'
					footer={
						<Button
							onClick={() => {
								const id = `r-${Date.now()}`;
								dispatch(
									createReward({
										id,
										title: form.title,
										cost: Number(form.cost) || 0,
										description: form.description || undefined,
										imageUrl: form.imageUrl || undefined,
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
							type='number'
							placeholder='Cost'
							value={form.cost}
							onChange={e =>
								setForm(f => ({ ...f, cost: Number(e.target.value) }))
							}
						/>
						<Input
							placeholder='Description'
							value={form.description}
							onChange={e =>
								setForm(f => ({ ...f, description: e.target.value }))
							}
						/>
						<Input
							placeholder='Image URL'
							value={form.imageUrl}
							onChange={e => setForm(f => ({ ...f, imageUrl: e.target.value }))}
						/>
					</div>
				</FormDialog>
			</div>
			<DataTable
				columns={[
					{ key: 'title', header: 'Title' },
					{ key: 'cost', header: 'Cost' },
					{ key: 'archived', header: 'Archived' },
					{
						key: 'actions',
						header: 'Actions',
						render: (_: any, row: any) => (
							<div className='flex gap-2'>
								<Button
									variant='outline'
									onClick={() =>
										dispatch(
											updateRewardAdmin({
												id: row.id,
												patch: { title: row.title + ' *' },
											})
										)
									}
								>
									Edit
								</Button>
								<Button
									variant='ghost'
									onClick={() => dispatch(archiveReward(row.id))}
								>
									Archive
								</Button>
							</div>
						),
					},
				]}
				rows={rewards as any}
			/>
		</div>
	);
}
