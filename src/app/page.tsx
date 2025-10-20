import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import { KpiTile } from '@/components/KpiTile';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { programs, offerings, enrollments } from '@/data/seed';

export default function Home() {
	const totalPrograms = programs.length;
	const activeOfferings = offerings.length;
	const enrollmentsToday = enrollments.filter(
		e => new Date(e.createdAt).toDateString() === new Date().toDateString()
	).length;
	const links = [
		{ href: '/programs', title: 'Browse Programs' },
		{ href: '/my', title: 'My Schedule' },
		{ href: '/admin/offers', title: 'Manage Offerings' },
	];
	return (
		<div className='space-y-6'>
			<PageHeader
				title='Recreation & Wellness Intranet'
				description='Quick access to programs, enrollments, and analytics.'
			/>
			<div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
				<KpiTile title='Total Programs' value={totalPrograms} />
				<KpiTile title='Active Offerings' value={activeOfferings} />
				<KpiTile title='Enrollments Today' value={enrollmentsToday} />
			</div>
			<div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
				{links.map(l => (
					<Card key={l.href}>
						<CardHeader>
							<CardTitle className='text-base'>{l.title}</CardTitle>
						</CardHeader>
						<CardContent>
							<Link
								href={l.href}
								className='text-primary underline underline-offset-4'
							>
								Go
							</Link>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	);
}
