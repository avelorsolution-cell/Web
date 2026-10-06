interface TabsProps {
  tabs: { id: string; label: string }[]
  active: string
  onChange: (id: string) => void
}

export default function Tabs({ tabs, active, onChange }: TabsProps) {
  return (
    <div className="flex gap-1 rounded-xl bg-black/5 p-1">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => onChange(tab.id)}
          className={[
            'flex-1 rounded-lg px-3 py-2 text-sm font-semibold transition-colors',
            active === tab.id ? 'bg-white text-navy shadow-card' : 'text-muted hover:text-navy',
          ].join(' ')}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
