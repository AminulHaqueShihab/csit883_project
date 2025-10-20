'use client';

import PageHeader from '@/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/DataTable';
import { useState } from 'react';
import { addImportedPersons, useAppDispatch } from '@/lib/store';

export default function ImportPage() {
	const [rows, setRows] = useState<any[]>([]);
	const dispatch = useAppDispatch();
	function parse(text: string) {
		const [header, ...lines] = text.trim().split(/\r?\n/);
		const cols = header.split(',');
		return lines.map(l =>
			Object.fromEntries(l.split(',').map((v, i) => [cols[i], v]))
		);
	}
	return (
		<div className='space-y-4'>
			<PageHeader
				title='Import Personnel'
				description='Read-only import preview'
			/>
			<Card>
				<CardHeader>
					<CardTitle>Upload CSV</CardTitle>
				</CardHeader>
				<CardContent className='space-y-3'>
					<Input
						type='file'
						accept='.csv'
						aria-label='Upload CSV'
						onChange={async e => {
							const file = e.target.files?.[0];
							if (!file) return;
							const t = await file.text();
							setRows(parse(t));
						}}
					/>
					<div className='text-sm text-muted-foreground'>
						Sample: /samples/users-mini.csv
					</div>
					<Button
						disabled={rows.length === 0}
						onClick={() => {
							dispatch(addImportedPersons(rows as any));
							alert('Imported to demo store');
						}}
					>
						Import (read-only)
					</Button>
				</CardContent>
			</Card>
			{rows.length > 0 && (
				<DataTable
					columns={[
						{ key: 'id', header: 'ID' },
						{ key: 'name', header: 'Name' },
						{ key: 'email', header: 'Email' },
						{ key: 'department', header: 'Department' },
					]}
					rows={rows}
				/>
			)}
		</div>
	);
}
