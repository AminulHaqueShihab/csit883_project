'use client';

import * as React from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';

const TooltipProvider = TooltipPrimitive.Provider;
const Tooltip = TooltipPrimitive.Root;
const TooltipTrigger = TooltipPrimitive.Trigger;
const TooltipContent = ({ children }: { children: React.ReactNode }) => (
	<div className='z-50 rounded-md border bg-popover px-2 py-1 text-xs shadow-md text-popover-foreground'>
		{children}
	</div>
);

export { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent };
