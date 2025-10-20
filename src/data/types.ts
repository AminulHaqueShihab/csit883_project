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
