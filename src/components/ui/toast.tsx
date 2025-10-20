'use client';

import * as React from 'react';
import * as ToastPrimitive from '@radix-ui/react-toast';

const ToastProvider = ToastPrimitive.Provider;
const ToastViewport = ({
	className,
	...props
}: React.ComponentPropsWithoutRef<typeof ToastPrimitive.Viewport>) => (
	<ToastPrimitive.Viewport
		className={
			'fixed bottom-0 right-0 z-50 m-0 flex w-full max-w-sm flex-col gap-2 p-4 outline-none'
		}
		{...props}
	/>
);
const Toast = ToastPrimitive.Root;
const ToastTitle = ToastPrimitive.Title;
const ToastDescription = ToastPrimitive.Description;
const ToastAction = ToastPrimitive.Action;
const ToastClose = ToastPrimitive.Close;

export {
	ToastProvider,
	ToastViewport,
	Toast,
	ToastTitle,
	ToastDescription,
	ToastAction,
	ToastClose,
};
