import AdminSidebar from '../../components/admin/AdminSidebar'
import AdminBreadcrumbs from '../../components/admin/AdminBreadcrumbs'
import LanguageToggle from '../../components/layout/LanguageToggle'
import PresenterMenu from '../../components/layout/PresenterMenu'
import AnimatedOutlet from '../../components/motion/AnimatedOutlet'

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-bg text-navy">
      <AdminSidebar />
      <div className="min-w-0 flex-1">
        <header className="flex items-center justify-between border-b border-border bg-white px-6 py-3">
          <AdminBreadcrumbs />
          <div className="flex items-center gap-3">
            <LanguageToggle compact />
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black/5 text-sm">🔔</div>
            <img src="https://i.pravatar.cc/150?img=68" className="h-8 w-8 rounded-full object-cover" alt="admin" />
          </div>
        </header>
        <main className="min-w-[900px] overflow-x-auto p-6">
          <AnimatedOutlet variant="fade" />
        </main>
      </div>
      <PresenterMenu />
    </div>
  )
}
