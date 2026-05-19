// app/components/ui/toast.ts
export interface ToastProps {
  title?: string;
  description?: string;
  duration?: number;
}
export interface ToastActionElement {
  label: string
  onClick: () => void
}

export function toast(props: ToastProps) {
  console.log("Toast:", props.title, props.description);
}
