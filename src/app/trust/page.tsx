import PageHeader from '@/components/PageHeader';

export default function TrustPage() {
	const bullets = [
		'Data minimization (demo only; no PII beyond names/emails).',
		'Encryption in transit (stated for demo).',
		'Backups policy (stated).',
		'Role-based access (Employee/Instructor/Admin).',
		'See HR policy PDFs (placeholders).',
	];
	return (
		<div className='space-y-4'>
			<PageHeader title='Trust' description='Security & privacy notes (demo)' />
			<ul className='list-disc pl-6 space-y-2'>
				{bullets.map((b, i) => (
					<li key={i}>{b}</li>
				))}
			</ul>
		</div>
	);
}
