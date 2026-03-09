import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { User, Bell, Palette, Shield, Moon, Sun, Check, Pencil, X, KeyRound, Eye, EyeOff } from 'lucide-react';
import clsx from 'clsx';

const Section = ({ icon, title, action, children }) => (
  <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl border border-slate-200/80 dark:border-slate-700/60 overflow-hidden shadow-sm">
    <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-slate-100 dark:border-slate-700/60">
      <div className="flex items-center gap-3">
        <span className="text-blue-500">{icon}</span>
        <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200">{title}</h3>
      </div>
      {action}
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

const DetailRow = ({ label, value }) => (
  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 py-2.5 border-b border-slate-100 dark:border-slate-700/50 last:border-0">
    <span className="text-xs font-medium text-slate-400 sm:w-36 flex-shrink-0">{label}</span>
    <span className="text-sm text-slate-700 dark:text-slate-200 font-medium">{value}</span>
  </div>
);

export default function Settings() {
  const { darkMode, toggleDark } = useApp();

  // Profile
  const [editingProfile, setEditingProfile] = useState(false);
  const [profile, setProfile] = useState({ name: 'Vicky Thinknode', email: 'vicky@thinknode.in', role: 'Admin', bio: 'Freelance developer & designer.' });
  const [draft, setDraft] = useState({ ...profile });

  // Notifications
  const [notifs, setNotifs] = useState({ projectUpdates: true, paymentAlerts: true, automationAlerts: false, weeklyReport: true });

  // Password
  const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });
  const [showPw, setShowPw] = useState({ current: false, new: false, confirm: false });
  const [pwError, setPwError] = useState('');
  const [pwSaved, setPwSaved] = useState(false);

  const handleSaveProfile = () => {
    setProfile({ ...draft });
    setEditingProfile(false);
    // TODO: call API → PATCH /api/auth/profile
  };

  const handleCancelProfile = () => {
    setDraft({ ...profile });
    setEditingProfile(false);
  };

  const handleSavePassword = () => {
    setPwError('');
    if (!passwords.current) return setPwError('Enter your current password.');
    if (passwords.new.length < 8) return setPwError('New password must be at least 8 characters.');
    if (passwords.new !== passwords.confirm) return setPwError('Passwords do not match.');
    // TODO: call API → PATCH /api/auth/password
    setPwSaved(true);
    setPasswords({ current: '', new: '', confirm: '' });
    setTimeout(() => setPwSaved(false), 2500);
  };

  return (
    <div className="p-6 space-y-5 max-w-2xl">

      {/* ── Profile ────────────────────────────────────── */}
      <Section
        icon={<User size={16} />}
        title="Profile"
        action={
          editingProfile ? (
            <div className="flex gap-2">
              <button
                onClick={handleCancelProfile}
                className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
              >
                <X size={12} /> Cancel
              </button>
              <button
                onClick={handleSaveProfile}
                className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-md shadow-blue-600/20"
              >
                <Check size={12} /> Save
              </button>
            </div>
          ) : (
            <button
              onClick={() => { setDraft({ ...profile }); setEditingProfile(true); }}
              className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-900/30 dark:hover:text-blue-400 transition-colors"
            >
              <Pencil size={12} /> Edit Profile
            </button>
          )
        }
      >
        {/* Avatar */}
        <div className="flex items-center gap-4 mb-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0 shadow-lg shadow-blue-500/30">
            {profile.name.charAt(0)}
          </div>
          <div>
            <p className="text-base font-bold text-slate-800 dark:text-white">{profile.name}</p>
            <span className="inline-block mt-0.5 text-[11px] px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 font-medium">
              {profile.role}
            </span>
          </div>
        </div>

        {/* View mode */}
        {!editingProfile && (
          <div className="pt-1">
            <DetailRow label="Full Name" value={profile.name} />
            <DetailRow label="Email" value={profile.email} />
            <DetailRow label="Role" value={profile.role} />
            <DetailRow label="Bio" value={profile.bio} />
          </div>
        )}

        {/* Edit mode */}
        {editingProfile && (
          <div className="space-y-3 pt-1">
            <Field label="Full Name">
              <input value={draft.name} onChange={e => setDraft(p => ({ ...p, name: e.target.value }))}
                className="flex-1 bg-slate-50 dark:bg-slate-700/80 text-sm text-slate-700 dark:text-slate-200 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-600 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all" />
            </Field>
            <Field label="Email">
              <input value={draft.email} onChange={e => setDraft(p => ({ ...p, email: e.target.value }))}
                className="flex-1 bg-slate-50 dark:bg-slate-700/80 text-sm text-slate-700 dark:text-slate-200 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-600 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all" />
            </Field>
            <Field label="Role">
              <select value={draft.role} onChange={e => setDraft(p => ({ ...p, role: e.target.value }))}
                className="flex-1 bg-slate-50 dark:bg-slate-700/80 text-sm text-slate-700 dark:text-slate-200 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-600 outline-none focus:border-blue-500 transition-all">
                <option>Admin</option>
                <option>Developer</option>
                <option>Designer</option>
              </select>
            </Field>
            <Field label="Bio">
              <textarea value={draft.bio} onChange={e => setDraft(p => ({ ...p, bio: e.target.value }))} rows={2}
                className="flex-1 bg-slate-50 dark:bg-slate-700/80 text-sm text-slate-700 dark:text-slate-200 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-600 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all resize-none" />
            </Field>
          </div>
        )}
      </Section>

      {/* ── Appearance ─────────────────────────────────── */}
      <Section icon={<Palette size={16} />} title="Appearance">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-700 dark:text-slate-200">Dark Mode</p>
            <p className="text-xs text-slate-400 mt-0.5">Switch between light and dark theme</p>
          </div>
          <button
            onClick={toggleDark}
            className={clsx('relative w-12 h-6 rounded-full transition-colors', darkMode ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-600')}
          >
            <span className={clsx('absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow transition-transform flex items-center justify-center', darkMode && 'translate-x-6')}>
              {darkMode ? <Moon size={8} className="text-blue-500" /> : <Sun size={8} className="text-slate-400" />}
            </span>
          </button>
        </div>
      </Section>

      {/* ── Notifications ──────────────────────────────── */}
      <Section icon={<Bell size={16} />} title="Notifications">
        {[
          { key: 'projectUpdates', label: 'Project Updates', desc: 'Notify when project status changes' },
          { key: 'paymentAlerts', label: 'Payment Alerts', desc: 'Notify on invoice due or payment received' },
          { key: 'automationAlerts', label: 'Automation Alerts', desc: 'Notify on workflow errors' },
          { key: 'weeklyReport', label: 'Weekly Report', desc: 'Get weekly summary via email' },
        ].map(n => (
          <div key={n.key} className="flex items-center justify-between py-1">
            <div>
              <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{n.label}</p>
              <p className="text-xs text-slate-400">{n.desc}</p>
            </div>
            <button
              onClick={() => setNotifs(prev => ({ ...prev, [n.key]: !prev[n.key] }))}
              className={clsx('relative w-10 h-5 rounded-full transition-colors flex-shrink-0', notifs[n.key] ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-600')}
            >
              <span className={clsx('absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform', notifs[n.key] && 'translate-x-5')} />
            </button>
          </div>
        ))}
      </Section>

      {/* ── Change Password ────────────────────────────── */}
      <Section icon={<KeyRound size={16} />} title="Change Password">
        {[['current', 'Current Password'], ['new', 'New Password'], ['confirm', 'Confirm Password']].map(([key, label]) => (
          <Field key={key} label={label}>
            <div className="flex-1 relative">
              <input
                type={showPw[key] ? 'text' : 'password'}
                value={passwords[key]}
                placeholder="••••••••"
                onChange={e => setPasswords(p => ({ ...p, [key]: e.target.value }))}
                className="w-full bg-slate-50 dark:bg-slate-700/80 text-sm text-slate-700 dark:text-slate-200 pl-3 pr-10 py-2 rounded-xl border border-slate-200 dark:border-slate-600 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPw(p => ({ ...p, [key]: !p[key] }))}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
              >
                {showPw[key] ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
          </Field>
        ))}

        {pwError && (
          <p className="text-xs text-red-500 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/40 px-3 py-2 rounded-xl">{pwError}</p>
        )}

        <div className="pt-1">
          <button
            onClick={handleSavePassword}
            className={clsx(
              'flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-medium transition-all',
              pwSaved
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/20'
            )}
          >
            {pwSaved ? <><Check size={15} /> Password Updated!</> : <><Shield size={15} /> Update Password</>}
          </button>
        </div>
      </Section>
    </div>
  );
}
