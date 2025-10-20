'use client';

import { Provider } from 'react-redux';
import { store } from '@/lib/store';
import { ToastProvider, ToastViewport } from '@/components/ui/toast';

export default function Providers({ children }: { children: React.ReactNode }) {
	return (
		<Provider store={store}>
			<ToastProvider>
				{children}
				<ToastViewport />
			</ToastProvider>
		</Provider>
	);
}
