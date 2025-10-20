'use client';

import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { cn } from '@/lib/utils';

const Accordion = AccordionPrimitive.Root;
const AccordionItem = AccordionPrimitive.Item;
const AccordionTrigger = ({
	className,
	...props
}: React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>) => (
	<AccordionPrimitive.Header>
		<AccordionPrimitive.Trigger
			className={cn(
				'w-full text-left py-2 font-medium underline-offset-4 hover:underline',
				className
			)}
			{...props}
		/>
	</AccordionPrimitive.Header>
);
const AccordionContent = ({
	className,
	...props
}: React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>) => (
	<AccordionPrimitive.Content
		className={cn('pb-3 text-sm text-muted-foreground', className)}
		{...props}
	/>
);

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
