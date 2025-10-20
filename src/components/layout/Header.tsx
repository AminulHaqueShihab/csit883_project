'use client';

import Link from 'next/link';
import { Menu, Dumbbell, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export function Header() {
	return (
		<div className='flex items-center justify-between h-14 border-b px-4'>
			<div className='flex items-center gap-2'>
				<Sheet>
					<SheetTrigger asChild>
						<Button variant='ghost' size='icon' className='md:hidden'>
							<Menu className='h-5 w-5' />
						</Button>
					</SheetTrigger>
					<SheetContent className='p-0 w-64'>
						<nav className='p-3 space-y-1'>
							<NavLinks />
						</nav>
					</SheetContent>
				</Sheet>
				<Dumbbell className='h-5 w-5' />
				<Link href='/' className='font-semibold'>
					Recreation & Wellness Intranet
				</Link>
			</div>
			<div className='flex items-center gap-2'>
				<Link
					href='/admin/offers'
					className='hidden md:inline-flex text-sm text-muted-foreground hover:text-foreground'
				>
					Admin
				</Link>
				<Button variant='ghost' size='icon' aria-label='Settings'>
					<Settings className='h-5 w-5' />
				</Button>
			</div>
		</div>
	);
}

export function NavLinks() {
	const links = [
		{ href: '/', label: 'Home' },
		{ href: '/programs', label: 'Programs' },
		{ href: '/my', label: 'My' },
		{ href: '/rewards', label: 'Rewards' },
		{ href: '/progress', label: 'My Progress' },
		{ href: '/admin/offers', label: 'Admin: Offers' },
		{ href: '/admin/rewards', label: 'Admin: Rewards' },
		{ href: '/admin/policies', label: 'Admin: Policies' },
		{ href: '/admin/reports', label: 'Admin: Reports' },
		{ href: '/admin/users', label: 'Admin: Users' },
	];
	return (
		<div className='grid gap-1'>
			{links.map(l => (
				<Link
					key={l.href}
					href={l.href}
					className='rounded-md px-2 py-1.5 text-sm hover:bg-accent'
				>
					{l.label}
				</Link>
			))}
		</div>
	);
}
