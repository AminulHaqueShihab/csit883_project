'use client';

import PageHeader from '@/components/PageHeader';
import { DataTable } from '@/components/DataTable';
import { useAppSelector } from '@/lib/store';

export default function AuditPage() {
	const rows = useAppSelector(s => s.audit);
	return (
		<div className='space-y-4'>
			<PageHeader title='Audit Log' description='UI-only event log' />
			<DataTable
				columns={[
					{
						key: 'ts',
						header: 'Timestamp',
						render: (v: any) => new Date(v).toLocaleString(),
					},
					{ key: 'actorUserId', header: 'Actor' },
					{ key: 'action', header: 'Action' },
					{ key: 'entity', header: 'Entity' },
					{ key: 'entityId', header: 'Entity ID' },
					{ key: 'details', header: 'Details' },
				]}
				rows={rows as any}
			/>
		</div>
	);
}
