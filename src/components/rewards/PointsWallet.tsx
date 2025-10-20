'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';
import { useAppSelector } from '@/lib/store';
import { Info } from 'lucide-react';

export function PointsWallet() {
	const g = useAppSelector(s => s.gamification);
	return (
		<Card>
			<CardHeader className='flex items-center justify-between'>
				<CardTitle>Points Wallet</CardTitle>
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger
							aria-label='How to earn points'
							className='text-muted-foreground'
						>
							<Info className='h-4 w-4' />
						</TooltipTrigger>
						<TooltipContent>
							Attend sessions, hit milestones, earn badges.
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			</CardHeader>
			<CardContent className='grid grid-cols-2 gap-4'>
				<div>
					<div className='text-sm text-muted-foreground'>Current</div>
					<div className='text-2xl font-semibold'>{g.pointsCurrent}</div>
				</div>
				<div>
					<div className='text-sm text-muted-foreground'>Lifetime</div>
					<div className='text-2xl font-semibold'>{g.pointsLifetime}</div>
				</div>
				<div className='col-span-2'>
					<Badge>Tips: +10 attendance, +20 milestone, +100 badge</Badge>
				</div>
			</CardContent>
		</Card>
	);
}
