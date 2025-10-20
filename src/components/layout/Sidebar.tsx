'use client';
import Link from 'next/link';
import {
	Calendar,
	Users,
	Dumbbell,
	ClipboardCheck,
	Bell,
	Trophy,
} from 'lucide-react';
import { useAppSelector } from '@/lib/store';
import { useEffect, useState } from 'react';

export default function Sidebar() {
	const role = useAppSelector(s => s.role.currentRole);
	const [mounted, setMounted] = useState(false);
	useEffect(() => setMounted(true), []);
	const baseItems = [
		{ href: '/', label: 'Home', icon: Dumbbell },
		{ href: '/programs', label: 'Programs', icon: Calendar },
		{ href: '/my', label: 'My', icon: Bell },
		{ href: '/notifications', label: 'Notifications', icon: Bell },
		{ href: '/rewards', label: 'Rewards', icon: Trophy },
		{ href: '/progress', label: 'My Progress', icon: Trophy },
		{ href: '/help', label: 'Help', icon: ClipboardCheck },
		{ href: '/trust', label: 'Trust', icon: ClipboardCheck },
		{ href: '/status', label: 'Status', icon: ClipboardCheck },
	];
	const adminItems = [
		{ href: '/admin/offers', label: 'Offers', icon: ClipboardCheck },
		{ href: '/admin/rewards', label: 'Rewards (Admin)', icon: ClipboardCheck },
		{ href: '/admin/users', label: 'Users', icon: Users },
		{ href: '/admin/audit', label: 'Audit', icon: ClipboardCheck },
		{ href: '/admin/import', label: 'Import', icon: ClipboardCheck },
		{ href: '/admin/reports', label: 'Reports', icon: ClipboardCheck },
	];
	if (!mounted) return null;

	return (
		<aside className='hidden md:flex md:w-64 border-r min-h-screen sticky top-0'>
			<nav className='p-4 w-full space-y-1'>
				{baseItems.map(item => (
					<Link
						key={item.href}
						href={item.href}
						className='flex items-center gap-2 rounded-md px-2 py-2 text-sm hover:bg-accent'
					>
						<item.icon className='h-4 w-4' />
						<span>{item.label}</span>
					</Link>
				))}
				{role === 'Admin' ? (
					<>
						<div className='text-xs uppercase text-muted-foreground mt-4 px-2'>
							Admin
						</div>
						{adminItems.map(item => (
							<Link
								key={item.href}
								href={item.href}
								className='flex items-center gap-2 rounded-md px-2 py-2 text-sm hover:bg-accent'
							>
								<item.icon className='h-4 w-4' />
								<span>{item.label}</span>
							</Link>
						))}
					</>
				) : null}
			</nav>
		</aside>
	);
}
