import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DollarSign, TrendingUp, Clock, CheckCircle } from 'lucide-react';
import { revenueData } from '../data/dummyData';
import clsx from 'clsx';

const statusBadge = {
  'Paid': 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400',
  'Pending': 'bg-red-50 dark:bg-red-900/30 text-red-500 dark:text-red-400',
  'Partial': 'bg-yellow-50 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400',
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-xl p-3 shadow-xl border border-slate-100 dark:border-slate-700">
        <p className="text-xs text-slate-500 mb-1">{label}</p>
        <p className="text-sm font-semibold text-blue-600">₹{payload[0].value.toLocaleString()}</p>
      </div>
    );
  }
  return null;
};

export default function Payments() {
  const { payments } = useApp();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const filtered = payments.filter(p => {
    const matchSearch = p.client.toLowerCase().includes(search.toLowerCase()) || p.id.includes(search);
    const matchFilter = filter === 'All' || p.status === filter;
    return matchSearch && matchFilter;
  });

  const totalInvoiced = payments.reduce((s, p) => s + p.amount, 0);
  const totalPaid = payments.filter(p => p.status === 'Paid').reduce((s, p) => s + p.amount, 0);
  const totalPending = payments.filter(p => p.status === 'Pending').reduce((s, p) => s + p.amount, 0);
  const totalPartial = payments.filter(p => p.status === 'Partial').reduce((s, p) => s + p.amount, 0);

  return (
    <div className="p-6 space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Invoiced', value: totalInvoiced, icon: <DollarSign size={18} />, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20' },
          { label: 'Total Paid', value: totalPaid, icon: <CheckCircle size={18} />, color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
          { label: 'Pending', value: totalPending, icon: <Clock size={18} />, color: 'text-red-500', bg: 'bg-red-50 dark:bg-red-900/20' },
          { label: 'Partial', value: totalPartial, icon: <TrendingUp size={18} />, color: 'text-yellow-500', bg: 'bg-yellow-50 dark:bg-yellow-900/20' },
        ].map(s => (
          <div key={s.label} className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700">
            <div className={clsx('w-9 h-9 rounded-lg flex items-center justify-center mb-3', s.bg)}>
              <span className={s.color}>{s.icon}</span>
            </div>
            <p className="text-2xl font-bold text-slate-800 dark:text-white">₹{(s.value / 1000).toFixed(0)}K</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Revenue Chart */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5">
        <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-4">Revenue Trend</h3>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={revenueData}>
            <defs>
              <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} tickFormatter={v => `₹${v / 1000}K`} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} fill="url(#revGrad)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Invoice Table */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-5 py-4 border-b border-slate-100 dark:border-slate-700">
          <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200">Invoices</h3>
          <div className="flex gap-2 flex-wrap">
            {['All', 'Paid', 'Pending', 'Partial'].map(s => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={clsx('text-xs px-3 py-1.5 rounded-lg font-medium transition-colors', filter === s ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600')}
              >
                {s}
              </button>
            ))}
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search..."
              className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 outline-none placeholder-slate-400 border border-transparent focus:border-blue-500"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-slate-400 uppercase border-b border-slate-100 dark:border-slate-700">
                <th className="text-left px-5 py-3 font-medium">Invoice</th>
                <th className="text-left px-5 py-3 font-medium">Client</th>
                <th className="text-left px-5 py-3 font-medium">Service</th>
                <th className="text-left px-5 py-3 font-medium">Amount</th>
                <th className="text-left px-5 py-3 font-medium">Due Date</th>
                <th className="text-left px-5 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-700/50">
              {filtered.map(p => (
                <tr key={p.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                  <td className="px-5 py-3.5 font-mono text-xs text-blue-600 dark:text-blue-400 font-semibold">{p.id}</td>
                  <td className="px-5 py-3.5 text-slate-700 dark:text-slate-200 font-medium">{p.client}</td>
                  <td className="px-5 py-3.5 text-slate-500 dark:text-slate-400 text-xs">{p.service}</td>
                  <td className="px-5 py-3.5 font-semibold text-slate-800 dark:text-white">₹{p.amount.toLocaleString()}</td>
                  <td className="px-5 py-3.5 text-slate-500 dark:text-slate-400 text-xs">{p.due}</td>
                  <td className="px-5 py-3.5">
                    <span className={clsx('text-xs px-2.5 py-1 rounded-full font-medium', statusBadge[p.status])}>{p.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-10 text-slate-400 text-sm">No invoices found.</div>
          )}
        </div>
      </div>
    </div>
  );
}
