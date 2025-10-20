'use client';

import PageHeader from '@/components/PageHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DataTable } from '@/components/DataTable';
import { useAppSelector, withdraw } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Toast, ToastDescription } from '@/components/ui/toast';
import { useState } from 'react';

export default function MyPage() {
	const [toastOpen, setToastOpen] = useState(false);
	const [toastMsg, setToastMsg] = useState('');
	const offerings = useAppSelector(s => s.offerings);
	const enrollments = useAppSelector(s =>
		s.enrollments.filter(e => e.userId === 'u-emp' && e.status !== 'Withdrawn')
	);

	const upcoming = enrollments
		.map(e => ({ e, o: offerings.find(o => o.id === e.offeringId) }))
		.filter(x => !!x.o)
		.sort(
			(a, b) =>
				new Date(a.o!.startsAt).getTime() - new Date(b.o!.startsAt).getTime()
		);

	return (
		<div className='space-y-4'>
			<PageHeader title='My Schedule & Enrollments' />
			<Tabs defaultValue='schedule'>
				<TabsList>
					<TabsTrigger value='schedule'>Schedule</TabsTrigger>
					<TabsTrigger value='enrollments'>Enrollments</TabsTrigger>
				</TabsList>
				<TabsContent value='schedule'>
					<DataTable
						columns={[
							{
								key: 'title' as any,
								header: 'Session',
								render: (_, row: any) => row.o.title,
							},
							{
								key: 'startsAt' as any,
								header: 'When',
								render: (_, row: any) =>
									new Date(row.o.startsAt).toLocaleString(),
							},
							{
								key: 'location' as any,
								header: 'Location',
								render: (_, row: any) => row.o.location,
							},
						]}
						rows={upcoming as any}
					/>
				</TabsContent>
				<TabsContent value='enrollments'>
					<DataTable
						columns={[
							{
								key: 'title' as any,
								header: 'Session',
								render: (_, row: any) => row.o.title,
							},
							{
								key: 'status' as any,
								header: 'Status',
								render: (_, row: any) => row.e.status,
							},
							{
								key: 'actions' as any,
								header: 'Actions',
								render: (_, row: any) => (
									<div className='flex gap-2'>
										<Button
											variant='outline'
											onClick={() => withdraw(row.e.id)}
										>
											Withdraw
										</Button>
										<Button
											variant='ghost'
											onClick={() => {
												setToastMsg('Reminder scheduled');
												setToastOpen(true);
											}}
										>
											Add Reminder
										</Button>
									</div>
								),
							},
						]}
						rows={upcoming as any}
					/>
					<Toast open={toastOpen} onOpenChange={setToastOpen}>
						<ToastDescription>{toastMsg}</ToastDescription>
					</Toast>
				</TabsContent>
			</Tabs>
		</div>
	);
}
