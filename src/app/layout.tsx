import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Providers from '@/components/providers';
import { Header } from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'Recreation & Wellness Intranet',
	description: 'Demo intranet for programs and wellness',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<Providers>
					<Header />
					<div className='flex'>
						<Sidebar />
						<main className='flex-1 p-4 max-w-[1200px] mx-auto w-full'>
							{children}
						</main>
					</div>
				</Providers>
			</body>
		</html>
	);
}
