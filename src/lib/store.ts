'use client';

import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
	Attendance,
	ClassOffering,
	Enrollment,
	Policy,
	User,
} from '@/data/types';
import {
	attendance as seedAttendance,
	enrollments as seedEnrollments,
	offerings as seedOfferings,
	policies as seedPolicies,
	users as seedUsers,
} from '@/data/seed';
import { useDispatch, useSelector } from 'react-redux';
import { useMemo } from 'react';

type RootState = ReturnType<typeof store.getState>;

function load<T>(key: string, fallback: T): T {
	if (typeof window === 'undefined') return fallback;
	try {
		const raw = window.localStorage.getItem(key);
		return raw ? (JSON.parse(raw) as T) : fallback;
	} catch {
		return fallback;
	}
}

function persist(key: string, value: unknown) {
	if (typeof window === 'undefined') return;
	try {
		window.localStorage.setItem(key, JSON.stringify(value));
	} catch {}
}

const offeringsSlice = createSlice({
	name: 'offerings',
	initialState: load<ClassOffering[]>('offerings', seedOfferings),
	reducers: {
		createOffering: (state, action: PayloadAction<ClassOffering>) => {
			state.push(action.payload);
			persist('offerings', state);
		},
		updateOffering: (state, action: PayloadAction<ClassOffering>) => {
			const idx = state.findIndex(o => o.id === action.payload.id);
			if (idx >= 0) state[idx] = action.payload;
			persist('offerings', state);
		},
		incrementEnrollment: (
			state,
			action: PayloadAction<{ offeringId: string; delta: number }>
		) => {
			const item = state.find(o => o.id === action.payload.offeringId);
			if (item) {
				item.enrolledCount = Math.max(
					0,
					item.enrolledCount + action.payload.delta
				);
				persist('offerings', state);
			}
		},
	},
});

const usersSlice = createSlice({
	name: 'users',
	initialState: load<User[]>('users', seedUsers),
	reducers: {
		updateUser: (state, action: PayloadAction<User>) => {
			const idx = state.findIndex(u => u.id === action.payload.id);
			if (idx >= 0) state[idx] = action.payload;
			persist('users', state);
		},
	},
});

const enrollmentsSlice = createSlice({
	name: 'enrollments',
	initialState: load<Enrollment[]>('enrollments', seedEnrollments),
	reducers: {
		addEnrollment: (state, action: PayloadAction<Enrollment>) => {
			state.push(action.payload);
			persist('enrollments', state);
		},
		updateEnrollment: (state, action: PayloadAction<Enrollment>) => {
			const idx = state.findIndex(e => e.id === action.payload.id);
			if (idx >= 0) state[idx] = action.payload;
			persist('enrollments', state);
		},
	},
});

const policiesSlice = createSlice({
	name: 'policies',
	initialState: load<Policy[]>('policies', seedPolicies),
	reducers: {
		createPolicy: (state, action: PayloadAction<Policy>) => {
			state.push(action.payload);
			persist('policies', state);
		},
	},
});

const attendanceSlice = createSlice({
	name: 'attendance',
	initialState: load<Attendance[]>('attendance', seedAttendance),
	reducers: {
		upsertAttendance: (state, action: PayloadAction<Attendance[]>) => {
			for (const row of action.payload) {
				const idx = state.findIndex(a => a.id === row.id);
				if (idx >= 0) state[idx] = row;
				else state.push(row);
			}
			persist('attendance', state);
		},
	},
});

export const store = configureStore({
	reducer: {
		offerings: offeringsSlice.reducer,
		users: usersSlice.reducer,
		enrollments: enrollmentsSlice.reducer,
		policies: policiesSlice.reducer,
		attendance: attendanceSlice.reducer,
	},
});

export type AppDispatch = typeof store.dispatch;

export const { createOffering, updateOffering, incrementEnrollment } =
	offeringsSlice.actions;
export const { updateUser } = usersSlice.actions;
export const { addEnrollment, updateEnrollment } = enrollmentsSlice.actions;
export const { createPolicy } = policiesSlice.actions;
export const { upsertAttendance } = attendanceSlice.actions;

export function useAppDispatch() {
	return useDispatch<AppDispatch>();
}

export function useAppSelector<T>(selector: (state: RootState) => T): T {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	return useSelector(selector);
}

// Helpers
export function enroll(userId: string, offeringId: string) {
	const state = store.getState();
	const offering = state.offerings.find(o => o.id === offeringId);
	if (!offering) return;
	const already = state.enrollments.find(
		e =>
			e.userId === userId &&
			e.offeringId === offeringId &&
			e.status !== 'Withdrawn'
	);
	if (already) return;
	const canEnroll = offering.enrolledCount < offering.capacity;
	const status = canEnroll ? 'Enrolled' : 'Waitlisted';
	const enrollment: Enrollment = {
		id: `e-${Date.now()}`,
		userId,
		offeringId,
		status,
		createdAt: new Date().toISOString(),
	};
	store.dispatch(addEnrollment(enrollment));
	if (status === 'Enrolled') {
		store.dispatch(incrementEnrollment({ offeringId, delta: 1 }));
	}
}

export function withdraw(enrollmentId: string) {
	const state = store.getState();
	const existing = state.enrollments.find(e => e.id === enrollmentId);
	if (!existing || existing.status === 'Withdrawn') return;
	const wasEnrolled = existing.status === 'Enrolled';
	const updated: Enrollment = { ...existing, status: 'Withdrawn' };
	store.dispatch(updateEnrollment(updated));
	if (wasEnrolled) {
		store.dispatch(
			incrementEnrollment({ offeringId: existing.offeringId, delta: -1 })
		);
	}
}

export function saveAttendance(
	offeringId: string,
	rows: (Omit<Attendance, 'id' | 'date' | 'offeringId'> & { userId: string })[]
) {
	const toUpsert: Attendance[] = rows.map(r => ({
		id: `a-${offeringId}-${r.userId}`,
		offeringId,
		userId: r.userId,
		present: r.present,
		result: r.result,
		date: new Date().toISOString(),
	}));
	store.dispatch(upsertAttendance(toUpsert));
}
