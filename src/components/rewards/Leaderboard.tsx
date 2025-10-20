import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { useAppSelector } from '@/lib/store';

export function Leaderboard() {
	const users = useAppSelector(s => s.users);
	const { pointsCurrent } = useAppSelector(s => s.gamification);
	const rows = users
		.slice(0, 5)
		.map((u, i) => ({
			rank: i + 1,
			name: u.name,
			points: u.id === 'u-emp' ? pointsCurrent : 200 - i * 20,
		}));
	return (
		<Card>
			<CardHeader>
				<CardTitle>Leaderboard</CardTitle>
			</CardHeader>
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Rank</TableHead>
							<TableHead>User</TableHead>
							<TableHead>Points</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{rows.map(r => (
							<TableRow key={r.rank}>
								<TableCell>#{r.rank}</TableCell>
								<TableCell>{r.name}</TableCell>
								<TableCell>{r.points}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
}
