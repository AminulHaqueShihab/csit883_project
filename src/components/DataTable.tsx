import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

type Column = {
	key: string;
	header: string;
	render?: (value: any, row: any) => React.ReactNode;
};

export function DataTable({
	columns,
	rows,
}: {
	columns: Column[];
	rows: any[];
}) {
	return (
		<div className='border rounded-md'>
			<Table>
				<TableHeader>
					<TableRow>
						{columns.map(c => (
							<TableHead key={String(c.key)}>{c.header}</TableHead>
						))}
					</TableRow>
				</TableHeader>
				<TableBody>
					{rows.map((row, i) => (
						<TableRow key={i}>
							{columns.map(c => (
								<TableCell key={String(c.key)}>
									{c.render
										? c.render((row as any)[c.key], row)
										: String((row as any)[c.key])}
								</TableCell>
							))}
						</TableRow>
					))}
				</TableBody>
			</Table>
			<div className='p-2 text-xs text-muted-foreground'>
				Pagination coming soon
			</div>
		</div>
	);
}
