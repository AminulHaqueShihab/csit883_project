'use client';

import { useParams, useRouter } from 'next/navigation';
import PageHeader from '@/components/PageHeader';
import { useAppSelector, enroll, withdraw } from '@/lib/store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Toast, ToastDescription } from '@/components/ui/toast';
import { useState } from 'react';

export default function OfferingDetailsPage() {
	const [toastOpen, setToastOpen] = useState(false);
	const [toastMsg, setToastMsg] = useState('');
	const params = useParams<{ id: string }>();
	const router = useRouter();
	const offering = useAppSelector(s =>
		s.offerings.find(o => o.id === params.id)
	);
	const enrollments = useAppSelector(s =>
		s.enrollments.filter(
			e =>
				e.offeringId === params.id &&
				e.userId === 'u-emp' &&
				e.status !== 'Withdrawn'
		)
	);
	const mine = enrollments[0];

	if (!offering) return <div className='text-sm'>Not found</div>;

	return (
		<div className='space-y-4'>
			<PageHeader
				title={offering.title}
				description={`Location: ${offering.location}`}
			/>
			<Card>
				<CardHeader>
					<CardTitle>Details</CardTitle>
				</CardHeader>
				<CardContent className='space-y-2 text-sm'>
					<div>Starts: {new Date(offering.startsAt).toLocaleString()}</div>
					<div>Ends: {new Date(offering.endsAt).toLocaleString()}</div>
					<div>Capacity: {offering.capacity}</div>
					<div>Enrolled: {offering.enrolledCount}</div>
					<div className='flex gap-2 pt-2'>
						{!mine ? (
							<Button
								onClick={() => {
									enroll('u-emp', offering.id);
									setToastMsg('Enrollment updated');
									setToastOpen(true);
								}}
							>
								Enroll
							</Button>
						) : (
							<Button
								variant='outline'
								onClick={() => {
									withdraw(mine.id);
									setToastMsg('Withdrawn');
									setToastOpen(true);
								}}
							>
								Withdraw
							</Button>
						)}
						<Button variant='ghost' onClick={() => router.back()}>
							Back
						</Button>
					</div>
					<Toast open={toastOpen} onOpenChange={setToastOpen}>
						<ToastDescription>{toastMsg}</ToastDescription>
					</Toast>
				</CardContent>
			</Card>
		</div>
	);
}
