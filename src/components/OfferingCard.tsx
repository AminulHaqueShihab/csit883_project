'use client';

import { ClassOffering, User } from '@/data/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useAppSelector, enroll } from '@/lib/store';
import { useState } from 'react';
import { Toast } from '@/components/ui/toast';
import { ToastDescription } from '@/components/ui/toast';

export function OfferingCard({
	offering,
	instructor,
}: {
	offering: ClassOffering;
	instructor?: User;
}) {
	const [busy, setBusy] = useState(false);
	const [toastOpen, setToastOpen] = useState(false);
	const [toastMsg, setToastMsg] = useState('');
	const enrolledCount = offering.enrolledCount;
	const capacityLeft = Math.max(0, offering.capacity - enrolledCount);
	const program = useAppSelector(s =>
		s.offerings.find(o => o.id === offering.id)
	);

	return (
		<Card>
			<CardHeader>
				<CardTitle className='flex items-center justify-between'>
					<span>{offering.title}</span>
					<Badge>{capacityLeft > 0 ? `${capacityLeft} open` : 'Full'}</Badge>
				</CardTitle>
			</CardHeader>
			<CardContent className='space-y-2 text-sm'>
				<div className='flex gap-2'>
					<span className='text-muted-foreground'>Instructor:</span>
					<span>{instructor?.name ?? 'TBD'}</span>
				</div>
				<div className='flex gap-2'>
					<span className='text-muted-foreground'>When:</span>
					<span>{new Date(offering.startsAt).toLocaleString()}</span>
				</div>
				<div className='flex gap-2'>
					<span className='text-muted-foreground'>Location:</span>
					<span>{offering.location}</span>
				</div>
				<div className='flex items-center gap-2 pt-2'>
					<Link
						href={`/offerings/${offering.id}`}
						className='text-primary underline underline-offset-4'
					>
						View details
					</Link>
					<Button
						disabled={busy}
						onClick={async () => {
							setBusy(true);
							enroll('u-emp', offering.id);
							setToastMsg(capacityLeft > 0 ? 'Enrolled' : 'Waitlisted');
							setToastOpen(true);
							setBusy(false);
						}}
					>
						Enroll
					</Button>
				</div>
				<Toast open={toastOpen} onOpenChange={setToastOpen}>
					<ToastDescription>{toastMsg}</ToastDescription>
				</Toast>
			</CardContent>
		</Card>
	);
}
