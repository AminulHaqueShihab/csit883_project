import PageHeader from '@/components/PageHeader';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';

export default function HelpPage() {
	const items = [
		{ q: 'How to enroll', a: 'Go to Programs, open a class, click Enroll.' },
		{ q: 'Set reminders', a: 'On My > Enrollments, click Add Reminder.' },
		{
			q: 'Record attendance',
			a: 'Instructors: Roster page, toggle Present and Save.',
		},
		{ q: 'Run reports', a: 'Admin > Reports, set filters and export CSV.' },
		{
			q: 'Redeem rewards',
			a: 'Open Rewards and redeem if you have enough points.',
		},
	];
	return (
		<div className='space-y-4'>
			<a href='#main' className='sr-only focus:not-sr-only'>
				Skip to content
			</a>
			<PageHeader title='Help & FAQ' />
			<div id='main'>
				<Accordion type='single' collapsible>
					{items.map((it, i) => (
						<AccordionItem key={i} value={`item-${i}`}>
							<AccordionTrigger>{it.q}</AccordionTrigger>
							<AccordionContent>{it.a}</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			</div>
		</div>
	);
}
