'use client';

import { useMemo, useState } from 'react';
import PageHeader from '@/components/PageHeader';
import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { OfferingCard } from '@/components/OfferingCard';
import { useAppSelector } from '@/lib/store';
import { programs as seedPrograms } from '@/data/seed';

export default function ProgramsPage() {
	const allOfferings = useAppSelector(s => s.offerings);
	const programs = seedPrograms;
	const users = useAppSelector(s => s.users);

	const [q, setQ] = useState('');
	const [type, setType] = useState<string>('');
	const [start, setStart] = useState<string>('');
	const [end, setEnd] = useState<string>('');

	const programById = useMemo(
		() => Object.fromEntries(programs.map(p => [p.id, p])),
		[programs]
	);

	const filtered = useMemo(() => {
		return allOfferings.filter(o => {
			const prog = programById[o.programId];
			const matchQ = q
				? o.title.toLowerCase().includes(q.toLowerCase()) ||
				  prog?.title.toLowerCase().includes(q.toLowerCase())
				: true;
			const matchType =
				!type || type === 'all' ? true : prog?.type === (type as any);
			const sd = start ? new Date(start) : undefined;
			const ed = end ? new Date(end) : undefined;
			const date = new Date(o.startsAt);
			const matchStart = sd ? date >= sd : true;
			const matchEnd = ed ? date <= ed : true;
			return matchQ && matchType && matchStart && matchEnd;
		});
	}, [allOfferings, q, type, start, end, programById]);

	return (
		<div className='space-y-4'>
			<PageHeader
				title='Browse Programs & Classes'
				description='Filter and explore available offerings.'
			/>
			<div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
				<div className='md:col-span-1 space-y-3'>
					<Input
						placeholder='Search'
						value={q}
						onChange={e => setQ(e.target.value)}
					/>
					<Select value={type} onValueChange={setType}>
						<SelectTrigger>
							<SelectValue placeholder='Program type' />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value='all'>All</SelectItem>
							<SelectItem value='Fitness'>Fitness</SelectItem>
							<SelectItem value='Wellness'>Wellness</SelectItem>
							<SelectItem value='Nutrition'>Nutrition</SelectItem>
						</SelectContent>
					</Select>
					<div className='grid grid-cols-2 gap-2 text-sm'>
						<Input
							type='date'
							value={start}
							onChange={e => setStart(e.target.value)}
						/>
						<Input
							type='date'
							value={end}
							onChange={e => setEnd(e.target.value)}
						/>
					</div>
				</div>
				<div className='md:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4'>
					{filtered.map(o => (
						<OfferingCard
							key={o.id}
							offering={o}
							instructor={users.find(u => u.id === o.instructorId)}
						/>
					))}
				</div>
			</div>
		</div>
	);
}
