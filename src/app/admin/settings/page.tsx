import AdminLayout from "@/app/admin/layout";
import { Settings, Shield, Mail, User } from "lucide-react";

export default function AdminSettings() {
  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-charcoal mb-2">
            Settings
          </h1>
          <p className="text-gray-600">
            Configure platform settings, payment providers, and security options.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
              <h3 className="font-serif font-bold text-lg text-charcoal mb-4">
                Payment Provider
              </h3>
              <p className="text-gray-600 mb-4">
                Configure your payment provider for integrated checkout. Available
                providers depend on your location and business model.
              </p>
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="radio" name="provider" className="form-radio" />
                  <span>Paystack (Nigeria/Africa)</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer opacity-50">
                  <input type="radio" name="provider" disabled className="form-radio" />
                  <span>Stripe (Coming soon)</span>
                </label>
              </div>
              <p className="text-xs text-gray-500 mt-3">
                ⚠️ Confirm provider eligibility for your content and business model
                before enabling integrated checkout.
              </p>
            </div>

            <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
              <h3 className="font-serif font-bold text-lg text-charcoal mb-4">
                Notification Preferences
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Email confirmations</span>
                  <input type="checkbox" className="form-checkbox" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Event reminders</span>
                  <input type="checkbox" className="form-checkbox" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Refund notifications</span>
                  <input type="checkbox" className="form-checkbox" defaultChecked />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
              <h3 className="font-serif font-bold text-lg text-charcoal mb-4">
                Account Security
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-charcoal">Two-factor authentication</p>
                    <p className="text-sm text-gray-500">Add an extra layer of security</p>
                  </div>
                  <button className="px-4 py-2 bg-gray-100 text-charcoal rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
                    Enable
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-charcoal">Recovery email</p>
                    <p className="text-sm text-gray-500">admin@thecreatoredit.com</p>
                  </div>
                  <button className="px-4 py-2 bg-charcoal text-white rounded-lg text-sm font-medium hover:bg-burgundy transition-colors">
                    Change
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
              <h3 className="font-serif font-bold text-lg text-charcoal mb-4">
                Support
              </h3>
              <div className="space-y-3">
                <a href="mailto:support@thecreatoredit.com" className="flex items-center gap-3 p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                  <Mail size={18} strokeWidth={2} className="text-gray-400" />
                  <span className="text-sm text-charcoal">Contact Support</span>
                </a>
                <a href="/admin" className="flex items-center gap-3 p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                  <Shield size={18} strokeWidth={2} className="text-gray-400" />
                  <span className="text-sm text-charcoal">View Audit Logs</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}