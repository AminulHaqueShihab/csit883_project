'use client';

import PageHeader from '@/components/PageHeader';
import { useAppSelector } from '@/lib/store';
import { Input } from '@/components/ui/input';
import { DataTable } from '@/components/DataTable';
import { Button } from '@/components/ui/button';
import { useMemo, useState } from 'react';

export default function AdminReportsPage() {
	const offerings = useAppSelector(s => s.offerings);
	const enrollments = useAppSelector(s => s.enrollments);
	const [start, setStart] = useState('');
	const [end, setEnd] = useState('');

	const rows = useMemo(() => {
		const sd = start ? new Date(start) : undefined;
		const ed = end ? new Date(end) : undefined;
		const filt = enrollments.filter(e => {
			const d = new Date(e.createdAt);
			return (!sd || d >= sd) && (!ed || d <= ed);
		});
		const byOffering: Record<string, number> = {};
		for (const e of filt)
			byOffering[e.offeringId] = (byOffering[e.offeringId] || 0) + 1;
		return Object.entries(byOffering).map(([offeringId, count]) => ({
			offering: offerings.find(o => o.id === offeringId)?.title || offeringId,
			count,
		}));
	}, [start, end, offerings, enrollments]);

	function exportCSV() {
		const header = 'Offering,Count\n';
		const body = rows.map(r => `${r.offering},${r.count}`).join('\n');
		const blob = new Blob([header + body], { type: 'text/csv;charset=utf-8;' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = 'report.csv';
		a.click();
		URL.revokeObjectURL(url);
	}

	return (
		<div className='space-y-4'>
			<PageHeader title='Reports & Exports' />
			<div className='grid grid-cols-2 gap-2 max-w-md'>
				<Input
					type='date'
					value={start}
					onChange={e => setStart(e.target.value)}
				/>
				<Input type='date' value={end} onChange={e => setEnd(e.target.value)} />
			</div>
			<DataTable
				columns={[
					{ key: 'offering' as any, header: 'Offering' },
					{ key: 'count' as any, header: 'Enrollments' },
				]}
				rows={rows as any}
			/>
			<div className='h-24 bg-muted rounded flex items-end gap-1 p-2'>
				{rows.map((r, i) => (
					<div
						key={i}
						className='bg-primary/70 w-6'
						style={{ height: Math.min(100, r.count * 10) }}
					/>
				))}
			</div>
			<Button onClick={exportCSV}>Export CSV</Button>
		</div>
	);
}
