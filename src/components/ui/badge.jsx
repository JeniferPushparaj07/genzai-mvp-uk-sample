export function Badge({ children, className = '', variant = 'secondary' }) {
  const styles = variant === 'secondary'
    ? 'bg-slate-200 text-slate-800 dark:bg-slate-800 dark:text-slate-100'
    : 'bg-sky-600 text-white'
  return <span className={['inline-flex items-center rounded-full px-2 py-0.5 text-xs', styles, className].join(' ')}>{children}</span>
}
export default Badge;
