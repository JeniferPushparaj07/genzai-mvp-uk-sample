import React, { createContext, useContext } from 'react'
const TabsCtx = createContext({ value: '', onValueChange: () => {} })
export function Tabs({ value, onValueChange, children, className='' }) {
  return <TabsCtx.Provider value={{ value, onValueChange }}><div className={className}>{children}</div></TabsCtx.Provider>
}
export function TabsList({ children, className='' }) {
  return <div className={['rounded-xl border p-1 inline-grid gap-1 bg-white/60 dark:bg-gray-900/60', className].join(' ')}>{children}</div>
}
export function TabsTrigger({ value, children, className='' }) {
  const { value: cur, onValueChange } = useContext(TabsCtx)
  const active = cur === value
  return (
    <button
      onClick={() => onValueChange && onValueChange(value)}
      className={[
        'px-3 py-2 rounded-lg text-sm',
        active ? 'bg-sky-600 text-white' : 'bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800',
        className,
      ].join(' ')}
      aria-pressed={active}
    >{children}</button>
  )
}
export function TabsContent({ value, children }) {
  const { value: cur } = useContext(TabsCtx)
  if (cur !== value) return null
  return <div className="mt-3">{children}</div>
}
