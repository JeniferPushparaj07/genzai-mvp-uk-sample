export function Input({ className = '', ...props }) {
  return <input className={['w-full px-3 py-2 rounded border bg-transparent outline-none focus:ring-2 focus:ring-sky-400', className].join(' ')} {...props} />;
}
export default Input;
