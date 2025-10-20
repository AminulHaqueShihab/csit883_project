'use client';

import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cn } from '@/lib/utils';

const Tabs = TabsPrimitive.Root;
const TabsList = ({
	className,
	...props
}: React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>) => (
	<TabsPrimitive.List
		className={cn(
			'inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground',
			className
		)}
		{...props}
	/>
);
const TabsTrigger = ({
	className,
	...props
}: React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>) => (
	<TabsPrimitive.Trigger
		className={cn(
			'inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm ring-offset-background transition-all data-[state=active]:bg-background data-[state=active]:text-foreground',
			className
		)}
		{...props}
	/>
);
const TabsContent = ({
	className,
	...props
}: React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>) => (
	<TabsPrimitive.Content className={cn('mt-2', className)} {...props} />
);

export { Tabs, TabsList, TabsTrigger, TabsContent };
