import {
	Attendance,
	ClassOffering,
	Enrollment,
	Policy,
	Program,
	User,
} from './types';

export const programs: Program[] = [
	{
		id: 'pr1',
		title: 'Morning Yoga',
		type: 'Fitness',
		description: 'Gentle yoga to start your day.',
	},
	{
		id: 'pr2',
		title: 'Mindfulness Basics',
		type: 'Wellness',
		description: 'Breathing and focus techniques.',
	},
	{
		id: 'pr3',
		title: 'Healthy Cooking 101',
		type: 'Nutrition',
		description: 'Simple meals for busy weeks.',
	},
];

export const users: User[] = [
	{
		id: 'u-emp',
		name: 'Alex Employee',
		email: 'alex@corp.com',
		roles: ['Employee'],
	},
	{
		id: 'u-inst',
		name: 'Ivy Instructor',
		email: 'ivy@corp.com',
		roles: ['Instructor'],
	},
	{ id: 'u-admin', name: 'Ari Admin', email: 'ari@corp.com', roles: ['Admin'] },
];

export const offerings: ClassOffering[] = [
	{
		id: 'o1',
		programId: 'pr1',
		title: 'Yoga - Beginner',
		instructorId: 'u-inst',
		startsAt: new Date(Date.now() + 86400000).toISOString(),
		endsAt: new Date(Date.now() + 9000000).toISOString(),
		location: 'Studio A',
		capacity: 12,
		enrolledCount: 3,
	},
	{
		id: 'o2',
		programId: 'pr1',
		title: 'Yoga - Lunchtime Stretch',
		instructorId: 'u-inst',
		startsAt: new Date(Date.now() + 2 * 86400000).toISOString(),
		endsAt: new Date(Date.now() + 2 * 86400000 + 3600000).toISOString(),
		location: 'Studio B',
		capacity: 8,
		enrolledCount: 8,
	},
	{
		id: 'o3',
		programId: 'pr2',
		title: 'Mindfulness at Noon',
		instructorId: 'u-inst',
		startsAt: new Date(Date.now() + 3 * 86400000).toISOString(),
		endsAt: new Date(Date.now() + 3 * 86400000 + 3600000).toISOString(),
		location: 'Wellness Room',
		capacity: 15,
		enrolledCount: 5,
	},
	{
		id: 'o4',
		programId: 'pr2',
		title: 'Breathing Basics',
		instructorId: 'u-inst',
		startsAt: new Date(Date.now() + 4 * 86400000).toISOString(),
		endsAt: new Date(Date.now() + 4 * 86400000 + 3600000).toISOString(),
		location: 'Wellness Room',
		capacity: 10,
		enrolledCount: 2,
	},
	{
		id: 'o5',
		programId: 'pr3',
		title: 'Quick Healthy Dinners',
		instructorId: 'u-inst',
		startsAt: new Date(Date.now() + 5 * 86400000).toISOString(),
		endsAt: new Date(Date.now() + 5 * 86400000 + 7200000).toISOString(),
		location: 'Kitchen Lab',
		capacity: 10,
		enrolledCount: 9,
	},
	{
		id: 'o6',
		programId: 'pr3',
		title: 'Meal Prep Sunday',
		instructorId: 'u-inst',
		startsAt: new Date(Date.now() + 6 * 86400000).toISOString(),
		endsAt: new Date(Date.now() + 6 * 86400000 + 7200000).toISOString(),
		location: 'Kitchen Lab',
		capacity: 6,
		enrolledCount: 1,
	},
];

export const enrollments: Enrollment[] = [
	{
		id: 'e1',
		userId: 'u-emp',
		offeringId: 'o1',
		status: 'Enrolled',
		createdAt: new Date().toISOString(),
	},
	{
		id: 'e2',
		userId: 'u-emp',
		offeringId: 'o2',
		status: 'Waitlisted',
		createdAt: new Date().toISOString(),
	},
];

export const policies: Policy[] = [
	{
		id: 'p1',
		name: '10-Classes Badge',
		criterion: '>=10 attendances in 90 days',
		points: 100,
		badge: 'Streak',
	},
];

export const attendance: Attendance[] = [];
