'use client';

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export function FormDialog({
	trigger,
	title,
	children,
	footer,
}: {
	trigger: React.ReactNode;
	title: string;
	children: React.ReactNode;
	footer?: React.ReactNode;
}) {
	return (
		<Dialog>
			<DialogTrigger asChild>{trigger}</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
				</DialogHeader>
				<div className='py-2'>{children}</div>
				<DialogFooter>
					{footer ?? <Button type='submit'>Save</Button>}
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
