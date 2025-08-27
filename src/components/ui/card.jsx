export function Card({ className = '', children, ...props }) {
  return <div className={['rounded-2xl border bg-white/60 dark:bg-gray-900/60 shadow-sm', className].join(' ')} {...props}>{children}</div>;
}
export function CardHeader({ className = '', children }) {
  return <div className={['p-4 border-b', className].join(' ')}>{children}</div>;
}
export function CardTitle({ className = '', children }) {
  return <div className={['font-semibold text-lg flex items-center gap-2', className].join(' ')}>{children}</div>;
}
export function CardContent({ className = '', children }) {
  return <div className={['p-4', className].join(' ')}>{children}</div>;
}
export default Card;
