'use client';

import PageHeader from '@/components/PageHeader';
import { useAppDispatch, useAppSelector, updateUser } from '@/lib/store';
import { DataTable } from '@/components/DataTable';

export default function AdminUsersPage() {
	const users = useAppSelector(s => s.users);
	const dispatch = useAppDispatch();

	return (
		<div className='space-y-4'>
			<PageHeader title='Users & Roles' />
			<DataTable
				columns={[
					{ key: 'name' as any, header: 'Name' },
					{ key: 'email' as any, header: 'Email' },
					{
						key: 'roles' as any,
						header: 'Roles',
						render: (_, u: any) => (
							<select
								multiple
								className='border rounded px-2 py-1 text-sm'
								value={u.roles}
								onChange={e => {
									const vals = Array.from(e.currentTarget.selectedOptions).map(
										o => o.value
									);
									dispatch(updateUser({ ...u, roles: vals as any }));
								}}
							>
								{['Employee', 'Instructor', 'Admin'].map(r => (
									<option key={r} value={r}>
										{r}
									</option>
								))}
							</select>
						),
					},
				]}
				rows={users as any}
			/>
		</div>
	);
}
