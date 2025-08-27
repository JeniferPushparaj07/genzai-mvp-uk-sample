export function Progress({ value = 0, className = '' }) {
  const pct = Math.max(0, Math.min(100, value))
  return (
    <div className={['w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden', className].join(' ')}>
      <div className="h-full bg-sky-600" style={{ width: pct + '%' }} />
    </div>
  )
}
export default Progress;
