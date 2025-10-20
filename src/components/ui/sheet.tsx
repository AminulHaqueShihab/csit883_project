'use client';

import * as React from 'react';
import * as SheetPrimitive from '@radix-ui/react-dialog';
import { cn } from '@/lib/utils';

const Sheet = SheetPrimitive.Root;
const SheetTrigger = SheetPrimitive.Trigger;
const SheetClose = SheetPrimitive.Close;
const SheetPortal = SheetPrimitive.Portal;
const SheetOverlay = React.forwardRef<
	React.ElementRef<typeof SheetPrimitive.Overlay>,
	React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>(({ className, ...props }, ref) => (
	<SheetPrimitive.Overlay
		ref={ref}
		className={cn('fixed inset-0 z-50 bg-black/40', className)}
		{...props}
	/>
));
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName;

const SheetContent = React.forwardRef<
	React.ElementRef<typeof SheetPrimitive.Content>,
	React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>
>(
	(
		{
			className,
			side = 'left',
			...props
		}: {
			className?: string;
			side?: 'left' | 'right';
		} & React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
		ref
	) => (
		<SheetPortal>
			<SheetOverlay />
			<SheetPrimitive.Content
				ref={ref}
				className={cn(
					'fixed z-50 top-0 h-full w-72 bg-background border p-4',
					side === 'left' ? 'left-0' : 'right-0',
					className
				)}
				{...props}
			/>
		</SheetPortal>
	)
);
SheetContent.displayName = SheetPrimitive.Content.displayName;

export { Sheet, SheetTrigger, SheetClose, SheetContent };
