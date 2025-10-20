import {
	Attendance,
	ClassOffering,
	Enrollment,
	Policy,
	Program,
	User,
	Reward,
	Badge,
	Milestone,
	Notification,
	AuditLog,
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

export const rewards: Reward[] = [
	{
		id: 'r1',
		title: 'Company Mug',
		cost: 100,
		description: 'Ceramic mug with logo',
		imageUrl: '',
	},
	{
		id: 'r2',
		title: 'Gym Towel',
		cost: 150,
		description: 'Quick-dry towel',
		imageUrl: '',
	},
	{
		id: 'r3',
		title: 'Desk Plant',
		cost: 200,
		description: 'Small succulent',
		imageUrl: '',
	},
	{
		id: 'r4',
		title: 'Water Bottle',
		cost: 250,
		description: 'Insulated bottle',
		imageUrl: '',
	},
	{
		id: 'r5',
		title: 'Yoga Mat',
		cost: 400,
		description: 'Non-slip mat',
		imageUrl: '',
	},
];

export const badges: Badge[] = [
	{
		id: 'b-starter',
		name: 'Starter',
		criteria: 'First attendance',
		icon: '⭐',
	},
	{
		id: 'b-streak5',
		name: '5x Streak',
		criteria: 'Attend 5 sessions in a row',
		icon: '🔥',
	},
	{
		id: 'b-10-classes',
		name: '10 Classes Badge',
		criteria: 'Attend 10 classes',
		icon: '🏅',
	},
];

export const milestones: Milestone[] = [
	{
		id: 'm1',
		name: 'First Class',
		target: 1,
		unit: 'sessions',
		rewardPoints: 20,
		badgeId: 'b-starter',
	},
	{
		id: 'm2',
		name: '5 Classes',
		target: 5,
		unit: 'sessions',
		rewardPoints: 50,
	},
	{
		id: 'm3',
		name: '10 Classes Badge',
		target: 10,
		unit: 'sessions',
		rewardPoints: 100,
		badgeId: 'b-10-classes',
	},
	{
		id: 'm4',
		name: '3x Streak',
		target: 3,
		unit: 'streak',
		rewardPoints: 30,
		badgeId: 'b-streak5',
	},
];

export const notifications: Notification[] = [
	{
		id: 'n1',
		kind: 'Latest',
		title: 'Enrollment Confirmed',
		message: 'Yoga - Beginner',
		createdAt: new Date().toISOString(),
	},
	{
		id: 'n2',
		kind: 'Reminder',
		title: 'Upcoming Session',
		message: 'Mindfulness at Noon tomorrow',
		createdAt: new Date().toISOString(),
	},
	{
		id: 'n3',
		kind: 'System',
		title: 'Policy Update',
		message: '10-Classes Badge extended',
		createdAt: new Date().toISOString(),
	},
];

export const audit: AuditLog[] = [
	{
		id: 'a1',
		ts: new Date().toISOString(),
		actorUserId: 'u-admin',
		action: 'CreateOffering',
		entity: 'Offering',
		entityId: 'o1',
		details: 'Yoga - Beginner',
	},
	{
		id: 'a2',
		ts: new Date().toISOString(),
		actorUserId: 'u-emp',
		action: 'Enroll',
		entity: 'Offering',
		entityId: 'o1',
		details: 'u-emp enrolled',
	},
	{
		id: 'a3',
		ts: new Date().toISOString(),
		actorUserId: 'u-admin',
		action: 'PolicySave',
		entity: 'Policy',
		entityId: 'p1',
		details: 'Updated points',
	},
];
