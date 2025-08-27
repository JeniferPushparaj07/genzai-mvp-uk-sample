export function Button({ children, className = '', variant = 'default', size = 'md', ...props }) {
  const base = 'inline-flex items-center justify-center rounded-lg border text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2';
  const variants = {
    default: 'bg-sky-600 text-white hover:bg-sky-700 border-transparent focus:ring-sky-400',
    outline: 'bg-transparent text-slate-900 dark:text-slate-100 border-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 focus:ring-slate-400',
  };
  const sizes = { sm: 'px-2 py-1 text-xs', md: 'px-3 py-2', lg: 'px-4 py-3 text-base' };
  return (
    <button className={[base, variants[variant] || variants.default, sizes[size] || sizes.md, className].join(' ')} {...props}>
      {children}
    </button>
  );
}
export default Button;
