'use client';

import PageHeader from '@/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
	useAppDispatch,
	useAppSelector,
	dismissNotification,
	markAllRead,
} from '@/lib/store';

export default function NotificationsPage() {
	const items = useAppSelector(s => s.notifications);
	const dispatch = useAppDispatch();
	const grouped = {
		Latest: items.filter(n => n.kind === 'Latest'),
		Reminders: items.filter(n => n.kind === 'Reminder'),
		System: items.filter(n => n.kind === 'System'),
	} as const;
	return (
		<div className='space-y-4' aria-live='polite'>
			<PageHeader
				title='Notifications'
				description='Latest updates and reminders.'
			/>
			<div className='flex gap-2'>
				<Button
					aria-label='Mark all read'
					onClick={() => dispatch(markAllRead())}
				>
					Mark all read
				</Button>
			</div>
			{Object.entries(grouped).map(([title, list]) => (
				<Card key={title}>
					<CardHeader>
						<CardTitle>{title}</CardTitle>
					</CardHeader>
					<CardContent className='grid gap-3'>
						{list.length === 0 ? (
							<div className='text-sm text-muted-foreground'>No items</div>
						) : null}
						{list.map(n => (
							<div
								key={n.id}
								className='border rounded p-3 flex items-start justify-between gap-4'
							>
								<div>
									<div className='font-medium'>{n.title}</div>
									<div className='text-sm text-muted-foreground'>
										{n.message}
									</div>
								</div>
								<Button
									variant='ghost'
									aria-label='Dismiss'
									onClick={() => dispatch(dismissNotification(n.id))}
								>
									Dismiss
								</Button>
							</div>
						))}
					</CardContent>
				</Card>
			))}
		</div>
	);
}
