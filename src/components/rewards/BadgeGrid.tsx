'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge as UIBadge } from '@/components/ui/badge';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';
import { useAppSelector } from '@/lib/store';

export function BadgeGrid() {
	const { badges, earnedBadgeIds } = useAppSelector(s => s.gamification);
	return (
		<Card>
			<CardHeader>
				<CardTitle>Badges & Achievements</CardTitle>
			</CardHeader>
			<CardContent className='grid grid-cols-2 sm:grid-cols-3 gap-3'>
				{badges.map(b => {
					const earned = earnedBadgeIds.includes(b.id);
					return (
						<TooltipProvider key={b.id}>
							<Tooltip>
								<TooltipTrigger className={earned ? '' : 'opacity-60'}>
									<div className='border rounded-md p-3 flex flex-col items-center text-center'>
										<div className='text-2xl' aria-hidden>
											{b.icon ?? '🏅'}
										</div>
										<div className='text-sm font-medium'>{b.name}</div>
										<UIBadge variant={earned ? 'default' : 'outline'}>
											{earned ? 'Earned' : 'Locked'}
										</UIBadge>
									</div>
								</TooltipTrigger>
								<TooltipContent>
									{earned
										? b.description ?? b.criteria
										: 'Locked — keep participating'}
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					);
				})}
			</CardContent>
		</Card>
	);
}
