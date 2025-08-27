export function Switch({ checked, onCheckedChange, ...props }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onCheckedChange && onCheckedChange(!checked)}
      className={['h-6 w-10 rounded-full transition flex items-center px-1', checked ? 'bg-sky-600' : 'bg-slate-300'].join(' ')}
      {...props}
    >
      <span className={['h-4 w-4 rounded-full bg-white transition', checked ? 'translate-x-4' : 'translate-x-0'].join(' ')} />
    </button>
  );
}
export default Switch;
