'use client';

import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { useState } from 'react';
import { Reward } from '@/data/types';

export function RewardCard({
	reward,
	canAfford,
	onConfirm,
}: {
	reward: Reward;
	canAfford: boolean;
	onConfirm: () => void;
}) {
	const [open, setOpen] = useState(false);
	return (
		<Card className='flex flex-col'>
			<CardHeader>
				<CardTitle className='flex items-center justify-between text-base'>
					<span>{reward.title}</span>
					<Badge>{reward.cost} pts</Badge>
				</CardTitle>
			</CardHeader>
			<CardContent className='text-sm text-muted-foreground'>
				{reward.description}
			</CardContent>
			<CardFooter className='mt-auto'>
				<Dialog open={open} onOpenChange={setOpen}>
					<DialogTrigger asChild>
						<Button disabled={!canAfford}>Redeem</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Confirm redemption</DialogTitle>
						</DialogHeader>
						<div className='text-sm'>
							Redeem {reward.title} for {reward.cost} points?
						</div>
						<div className='flex gap-2 justify-end pt-2'>
							<Button variant='outline' onClick={() => setOpen(false)}>
								Cancel
							</Button>
							<Button
								onClick={() => {
									onConfirm();
									setOpen(false);
								}}
							>
								Confirm
							</Button>
						</div>
					</DialogContent>
				</Dialog>
			</CardFooter>
		</Card>
	);
}
