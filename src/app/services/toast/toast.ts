export type ToastTypes = 'success' | 'info' | 'warning' | 'danger';

export interface Toast {
    id: number;
    message: string;
    type: ToastTypes;
    duration: number;
    dismissable: boolean;
    link?: {text: string, route: string};
}
