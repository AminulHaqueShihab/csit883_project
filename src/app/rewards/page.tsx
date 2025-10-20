'use client';

import PageHeader from '@/components/PageHeader';
import { PointsWallet } from '@/components/rewards/PointsWallet';
import { ActivityFeed } from '@/components/rewards/ActivityFeed';
import { BadgeGrid } from '@/components/rewards/BadgeGrid';
import { Leaderboard } from '@/components/rewards/Leaderboard';
import { RewardCard } from '@/components/rewards/RewardCard';
import { useAppDispatch, useAppSelector, redeemReward } from '@/lib/store';
import { Toast, ToastDescription } from '@/components/ui/toast';
import { useState } from 'react';

export default function RewardsPage() {
	const g = useAppSelector(s => s.gamification);
	const dispatch = useAppDispatch();
	const [toastOpen, setToastOpen] = useState(false);
	const [toastMsg, setToastMsg] = useState('');
	return (
		<div className='space-y-4'>
			<PageHeader
				title='Rewards'
				description='Earn points, collect badges, and redeem rewards.'
			/>
			<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
				<div className='md:col-span-1 space-y-4'>
					<PointsWallet />
					<ActivityFeed />
				</div>
				<div className='md:col-span-2 space-y-4'>
					<div>
						<h2 className='text-lg font-semibold mb-2'>Available Rewards</h2>
						<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3'>
							{g.rewards
								.filter(r => !r.archived)
								.map(r => (
									<RewardCard
										key={r.id}
										reward={r}
										canAfford={g.pointsCurrent >= r.cost}
										onConfirm={() => {
											if (g.pointsCurrent >= r.cost) {
												dispatch(redeemReward(r.id));
												setToastMsg('Redeemed (dummy)');
											} else {
												setToastMsg('Insufficient points');
											}
											setToastOpen(true);
										}}
									/>
								))}
						</div>
					</div>
					<BadgeGrid />
					<Leaderboard />
				</div>
			</div>
			<Toast open={toastOpen} onOpenChange={setToastOpen}>
				<ToastDescription>{toastMsg}</ToastDescription>
			</Toast>
		</div>
	);
}
