export default function PageHeader({
	title,
	description,
}: {
	title: string;
	description?: string;
}) {
	return (
		<div className='mb-4'>
			<h1 className='text-2xl font-semibold'>{title}</h1>
			{description ? (
				<p className='text-sm text-muted-foreground mt-1'>{description}</p>
			) : null}
		</div>
	);
}
