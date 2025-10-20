import PageHeader from '@/components/PageHeader';

export default function StatusPage() {
	return (
		<div className='space-y-4'>
			<PageHeader title='Status' description='Operational metrics (demo)' />
			<div
				className='rounded-md border p-3 bg-green-50 text-green-700'
				role='status'
			>
				All systems operational
			</div>
			<div className='grid grid-cols-1 sm:grid-cols-3 gap-3'>
				<div className='border rounded p-3'>
					<div className='text-sm text-muted-foreground'>SLA</div>
					<div className='text-xl font-semibold'>99.5% (pilot)</div>
				</div>
				<div className='border rounded p-3'>
					<div className='text-sm text-muted-foreground'>Performance Goal</div>
					<div className='text-xl font-semibold'>≤ 2s</div>
				</div>
				<div className='border rounded p-3'>
					<div className='text-sm text-muted-foreground'>Incidents</div>
					<div className='text-xl font-semibold'>0</div>
				</div>
			</div>
		</div>
	);
}
