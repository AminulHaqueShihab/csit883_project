import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge as UIBadge } from '@/components/ui/badge';
import { useAppSelector } from '@/lib/store';
import { Progress } from '@/components/ui/progress';

export function MilestoneList() {
	const { milestones, progress } = useAppSelector(s => s.gamification);
	const achievedPct = (m: any) => {
		const have =
			m.unit === 'sessions'
				? progress.sessionsAttended
				: m.unit === 'streak'
				? progress.currentStreak
				: progress.completionPct;
		return Math.min(100, Math.round((have / m.target) * 100));
	};
	const status = (m: any) =>
		achievedPct(m) >= 100
			? 'Achieved'
			: achievedPct(m) > 0
			? 'In Progress'
			: 'Locked';
	return (
		<Card>
			<CardHeader>
				<CardTitle>Milestones</CardTitle>
			</CardHeader>
			<CardContent className='space-y-3'>
				{milestones.map(m => (
					<div key={m.id} className='border rounded-md p-3'>
						<div className='flex items-center justify-between'>
							<div className='font-medium'>{m.name}</div>
							<UIBadge>{status(m)}</UIBadge>
						</div>
						<div className='text-xs text-muted-foreground'>
							Target: {m.target} {m.unit}
						</div>
						<Progress value={achievedPct(m)} className='mt-2' />
					</div>
				))}
			</CardContent>
		</Card>
	);
}
