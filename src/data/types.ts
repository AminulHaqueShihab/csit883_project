export type Program = {
	id: string;
	title: string;
	type: 'Fitness' | 'Wellness' | 'Nutrition';
	description: string;
};

export type ClassOffering = {
	id: string;
	programId: string;
	title: string;
	instructorId: string;
	startsAt: string;
	endsAt: string;
	location: string;
	capacity: number;
	enrolledCount: number;
};

export type User = {
	id: string;
	name: string;
	email: string;
	roles: ('Employee' | 'Instructor' | 'Admin')[];
};

export type Enrollment = {
	id: string;
	userId: string;
	offeringId: string;
	status: 'Enrolled' | 'Waitlisted' | 'Withdrawn';
	createdAt: string;
};

export type Policy = {
	id: string;
	name: string;
	criterion: string;
	points: number;
	badge?: string;
};

export type Attendance = {
	id: string;
	offeringId: string;
	userId: string;
	present: boolean;
	result?: 'Pass' | 'Incomplete';
	date: string;
};

export type Reward = {
	id: string;
	title: string;
	cost: number;
	description?: string;
	imageUrl?: string;
	archived?: boolean;
};

export type Badge = {
	id: string;
	name: string;
	description?: string;
	icon?: string;
	criteria: string;
};

export type ProgressSnapshot = {
	userId: string;
	monthKey: string; // '2025-10'
	enrollments: number;
	sessionsAttended: number;
	completionPct: number; // 0..100
	currentStreak: number; // consecutive days/weeks attended
};

export type Milestone = {
	id: string;
	name: string;
	target: number;
	unit: 'sessions' | 'streak' | 'completion';
	rewardPoints?: number;
	badgeId?: string;
};
