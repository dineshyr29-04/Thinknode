import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { User, Bell, Palette, Shield, Save, Moon, Sun, Check } from 'lucide-react';
import clsx from 'clsx';

const Section = ({ icon, title, children }) => (
  <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
    <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-100 dark:border-slate-700">
      <span className="text-blue-500">{icon}</span>
      <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200">{title}</h3>
    </div>
    <div className="p-5 space-y-4">{children}</div>
  </div>
);

const Field = ({ label, children }) => (
  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
    <label className="text-xs font-medium text-slate-500 dark:text-slate-400 sm:w-36 flex-shrink-0">{label}</label>
    {children}
  </div>
);

export default function Settings() {
  const { darkMode, toggleDark } = useApp();
  const [saved, setSaved] = useState(false);
  const [profile, setProfile] = useState({ name: 'Vicky Thinknode', email: 'vicky@thinknode.in', role: 'Admin', bio: 'Freelance developer & designer.' });
  const [notifs, setNotifs] = useState({ projectUpdates: true, paymentAlerts: true, automationAlerts: false, weeklyReport: true });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="p-6 space-y-6 max-w-2xl">
      {/* Profile */}
      <Section icon={<User size={16} />} title="Profile">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
            {profile.name.charAt(0)}
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">{profile.name}</p>
            <p className="text-xs text-slate-400">{profile.role}</p>
          </div>
        </div>
        <Field label="Full Name">
          <input value={profile.name} onChange={e => setProfile(p => ({ ...p, name: e.target.value }))} className="flex-1 bg-slate-50 dark:bg-slate-700 text-sm text-slate-700 dark:text-slate-200 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 outline-none focus:border-blue-500 transition-colors" />
        </Field>
        <Field label="Email">
          <input value={profile.email} onChange={e => setProfile(p => ({ ...p, email: e.target.value }))} className="flex-1 bg-slate-50 dark:bg-slate-700 text-sm text-slate-700 dark:text-slate-200 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 outline-none focus:border-blue-500 transition-colors" />
        </Field>
        <Field label="Role">
          <select value={profile.role} onChange={e => setProfile(p => ({ ...p, role: e.target.value }))} className="flex-1 bg-slate-50 dark:bg-slate-700 text-sm text-slate-700 dark:text-slate-200 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 outline-none focus:border-blue-500 transition-colors">
            <option>Admin</option>
            <option>Developer</option>
            <option>Designer</option>
          </select>
        </Field>
        <Field label="Bio">
          <textarea value={profile.bio} onChange={e => setProfile(p => ({ ...p, bio: e.target.value }))} rows={2} className="flex-1 bg-slate-50 dark:bg-slate-700 text-sm text-slate-700 dark:text-slate-200 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 outline-none focus:border-blue-500 transition-colors resize-none" />
        </Field>
      </Section>

      {/* Appearance */}
      <Section icon={<Palette size={16} />} title="Appearance">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-700 dark:text-slate-200">Dark Mode</p>
            <p className="text-xs text-slate-400">Switch between light and dark theme</p>
          </div>
          <button
            onClick={toggleDark}
            className={clsx('relative w-12 h-6 rounded-full transition-colors flex items-center', darkMode ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-600')}
          >
            <span className={clsx('absolute left-1 w-4 h-4 bg-white rounded-full shadow transition-transform flex items-center justify-center', darkMode && 'translate-x-6')}>
              {darkMode ? <Moon size={8} className="text-blue-500" /> : <Sun size={8} className="text-slate-400" />}
            </span>
          </button>
        </div>
      </Section>

      {/* Notifications */}
      <Section icon={<Bell size={16} />} title="Notifications">
        {[
          { key: 'projectUpdates', label: 'Project Updates', desc: 'Notify when project status changes' },
          { key: 'paymentAlerts', label: 'Payment Alerts', desc: 'Notify on invoice due or payment received' },
          { key: 'automationAlerts', label: 'Automation Alerts', desc: 'Notify on workflow errors', },
          { key: 'weeklyReport', label: 'Weekly Report', desc: 'Get weekly summary via email' },
        ].map(n => (
          <div key={n.key} className="flex items-center justify-between py-1">
            <div>
              <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{n.label}</p>
              <p className="text-xs text-slate-400">{n.desc}</p>
            </div>
            <button
              onClick={() => setNotifs(prev => ({ ...prev, [n.key]: !prev[n.key] }))}
              className={clsx('relative w-10 h-5 rounded-full transition-colors', notifs[n.key] ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-600')}
            >
              <span className={clsx('absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform', notifs[n.key] && 'translate-x-5')} />
            </button>
          </div>
        ))}
      </Section>

      {/* Security */}
      <Section icon={<Shield size={16} />} title="Security">
        <Field label="Current Password">
          <input type="password" placeholder="••••••••" className="flex-1 bg-slate-50 dark:bg-slate-700 text-sm text-slate-700 dark:text-slate-200 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 outline-none focus:border-blue-500 transition-colors" />
        </Field>
        <Field label="New Password">
          <input type="password" placeholder="••••••••" className="flex-1 bg-slate-50 dark:bg-slate-700 text-sm text-slate-700 dark:text-slate-200 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 outline-none focus:border-blue-500 transition-colors" />
        </Field>
        <Field label="Confirm Password">
          <input type="password" placeholder="••••••••" className="flex-1 bg-slate-50 dark:bg-slate-700 text-sm text-slate-700 dark:text-slate-200 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 outline-none focus:border-blue-500 transition-colors" />
        </Field>
      </Section>

      {/* Save Button */}
      <button
        onClick={handleSave}
        className={clsx('flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium transition-all', saved ? 'bg-emerald-600 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/30')}
      >
        {saved ? <><Check size={16} /> Saved!</> : <><Save size={16} /> Save Changes</>}
      </button>
    </div>
  );
}
