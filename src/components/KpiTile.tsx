import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function KpiTile({
	title,
	value,
}: {
	title: string;
	value: number | string;
}) {
	return (
		<Card>
			<CardHeader>
				<CardTitle className='text-sm text-muted-foreground'>{title}</CardTitle>
			</CardHeader>
			<CardContent>
				<div className='text-2xl font-semibold'>{value}</div>
			</CardContent>
		</Card>
	);
}
