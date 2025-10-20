import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function ActivityFeed() {
	const items = [
		'+10 points for Attendance',
		'Badge earned: Starter',
		'+20 points for Milestone',
	];
	return (
		<Card>
			<CardHeader>
				<CardTitle>Activity Feed</CardTitle>
			</CardHeader>
			<CardContent>
				<ul className='text-sm space-y-2'>
					{items.map((i, idx) => (
						<li key={idx}>• {i}</li>
					))}
				</ul>
			</CardContent>
		</Card>
	);
}
