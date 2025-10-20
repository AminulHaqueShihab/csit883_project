'use client';

export function Donut({
	percent = 0,
	size = 120,
	stroke = 12,
}: {
	percent?: number;
	size?: number;
	stroke?: number;
}) {
	const r = (size - stroke) / 2;
	const c = 2 * Math.PI * r;
	const p = Math.max(0, Math.min(100, percent));
	const dash = (p / 100) * c;
	return (
		<svg
			width={size}
			height={size}
			viewBox={`0 0 ${size} ${size}`}
			role='img'
			aria-label={`Completion ${p}%`}
		>
			<circle
				cx={size / 2}
				cy={size / 2}
				r={r}
				stroke='#eee'
				strokeWidth={stroke}
				fill='none'
			/>
			<circle
				cx={size / 2}
				cy={size / 2}
				r={r}
				stroke='currentColor'
				strokeWidth={stroke}
				fill='none'
				strokeLinecap='round'
				strokeDasharray={`${dash} ${c}`}
				transform={`rotate(-90 ${size / 2} ${size / 2})`}
			/>
			<text
				x='50%'
				y='50%'
				dominantBaseline='middle'
				textAnchor='middle'
				className='text-sm'
			>
				{p}%
			</text>
		</svg>
	);
}
