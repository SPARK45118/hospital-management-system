import DashboardLayout from "@/components/dashboard-layout"
import SettingsPanel from "@/components/settings-panel"

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600">Manage your hospital system preferences and configurations</p>
        </div>

        <SettingsPanel />
      </div>
    </DashboardLayout>
  )
}
