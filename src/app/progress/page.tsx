'use client';

import PageHeader from '@/components/PageHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { KpiTile } from '@/components/KpiTile';
import { Progress } from '@/components/ui/progress';
import { Donut } from '@/components/rewards/Donut';
import { MilestoneList } from '@/components/rewards/MilestoneList';
import { DataTable } from '@/components/DataTable';
import { useAppSelector } from '@/lib/store';
import { Button } from '@/components/ui/button';

export default function ProgressPage() {
	const g = useAppSelector(s => s.gamification);
	const goal = 10;
	const pctToGoal = Math.min(
		100,
		Math.round((g.progress.sessionsAttended / goal) * 100)
	);
	return (
		<div className='space-y-4'>
			<PageHeader
				title='My Progress'
				description='Track your participation and milestones.'
			/>
			<Tabs defaultValue='overview'>
				<TabsList>
					<TabsTrigger value='overview'>Overview</TabsTrigger>
					<TabsTrigger value='milestones'>Milestones</TabsTrigger>
					<TabsTrigger value='history'>History</TabsTrigger>
				</TabsList>
				<TabsContent value='overview'>
					<div className='grid grid-cols-1 sm:grid-cols-4 gap-3 mb-4'>
						<KpiTile title='Enrollments' value={g.progress.enrollments} />
						<KpiTile
							title='Sessions Attended'
							value={g.progress.sessionsAttended}
						/>
						<KpiTile
							title='Completion %'
							value={`${g.progress.completionPct}%`}
						/>
						<KpiTile title='Current Streak' value={g.progress.currentStreak} />
					</div>
					<Card>
						<CardHeader>
							<CardTitle>Goal: 10 sessions this month</CardTitle>
						</CardHeader>
						<CardContent>
							<Progress value={pctToGoal} />
						</CardContent>
					</Card>
					<div className='mt-4'>
						<Card>
							<CardHeader>
								<CardTitle>Completion</CardTitle>
							</CardHeader>
							<CardContent className='flex justify-center'>
								<Donut percent={g.progress.completionPct} />
							</CardContent>
						</Card>
					</div>
				</TabsContent>
				<TabsContent value='milestones'>
					<MilestoneList />
				</TabsContent>
				<TabsContent value='history'>
					<DataTable
						columns={[
							{
								key: 'date',
								header: 'Date',
								render: (v: any) => new Date(v).toLocaleDateString(),
							},
							{ key: 'classTitle', header: 'Class' },
							{ key: 'status', header: 'Status' },
							{ key: 'points', header: 'Points' },
						]}
						rows={g.historyRows as any}
					/>
					<Button
						className='mt-2'
						onClick={() => {
							const header = 'Date,Class,Status,Points\n';
							const body = g.historyRows
								.map(
									r =>
										`${new Date(r.date).toISOString()},${r.classTitle},${
											r.status
										},${r.points}`
								)
								.join('\n');
							const blob = new Blob([header + body], {
								type: 'text/csv;charset=utf-8;',
							});
							const url = URL.createObjectURL(blob);
							const a = document.createElement('a');
							a.href = url;
							a.download = 'history.csv';
							a.click();
							URL.revokeObjectURL(url);
						}}
					>
						Export CSV
					</Button>
				</TabsContent>
			</Tabs>
		</div>
	);
}
