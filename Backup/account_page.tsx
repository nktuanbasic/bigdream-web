"use client";

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { ClockCounterClockwise, DownloadSimple, CurrencyDollar, CheckCircle, Package, ArrowUpRight } from '@phosphor-icons/react';
import Image from 'next/image';

interface Transaction {
  id: string;
  type: 'DEPOSIT' | 'PURCHASE';
  amount: number;
  item_id?: string;
  timestamp: string;
}

interface Activity {
  id: string;
  action_type: 'VIEW' | 'DOWNLOAD';
  item_id: string;
  item_name: string;
  timestamp: string;
}

export default function AccountDashboardPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'library' | 'activity' | 'transactions'>('overview');
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setIsLoading(false);
        return;
      }
      setUserEmail(session.user.email || '');

      try {
        const res = await fetch('/api/account/history', {
          headers: { 'Authorization': `Bearer ${session.access_token}` }
        });
        const data = await res.json();
        if (data.transactions) setTransactions(data.transactions);
        if (data.activities) setActivities(data.activities);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const downloads = activities.filter(a => a.action_type === 'DOWNLOAD');
  const views = activities.filter(a => a.action_type === 'VIEW');
  const purchases = transactions.filter(t => t.type === 'PURCHASE');
  const deposits = transactions.filter(t => t.type === 'DEPOSIT');

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-obsidian-deep text-primary">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!userEmail) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-obsidian-deep text-on-surface">
        <h2 className="font-headline-lg text-4xl mb-4">Access Denied</h2>
        <p className="font-body-md text-on-surface-variant">Please connect your wallet/login to view your dashboard.</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-obsidian-deep text-on-surface pt-[100px] pb-32 selection:bg-primary/30 selection:text-primary">
      <div className="max-w-[1600px] mx-auto px-4 md:px-margin-desktop flex flex-col md:flex-row gap-8">
        
        {/* Sidebar / Profile Card */}
        <aside className="w-full md:w-1/4 flex flex-col gap-6">
          <div className="bg-charcoal-surface/60 backdrop-blur-md border border-glass-border rounded-xl p-8 flex flex-col items-center text-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="w-24 h-24 rounded-full bg-surface-container-high border border-glass-border mb-4 flex items-center justify-center overflow-hidden">
               <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userEmail}`} alt="Avatar" className="w-full h-full object-cover" />
            </div>
            <h2 className="font-headline-md text-xl text-on-surface truncate w-full">{userEmail}</h2>
            <div className="mt-2 inline-flex items-center gap-1 bg-primary/10 text-primary border border-primary/20 px-3 py-1 rounded-full font-label-sm text-xs uppercase tracking-widest">
              <CheckCircle size={14} weight="fill" /> Pro Member
            </div>
          </div>

          <nav className="flex flex-col gap-2">
            {[
              { id: 'overview', label: 'Overview', icon: Package },
              { id: 'library', label: 'My Library', icon: DownloadSimple },
              { id: 'activity', label: 'Activity Logs', icon: ClockCounterClockwise },
              { id: 'transactions', label: 'Billing & Deposits', icon: CurrencyDollar }
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button 
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-3 px-6 py-4 rounded-xl font-label-sm text-xs uppercase tracking-widest transition-all duration-300 ${isActive ? 'bg-primary text-on-primary shadow-[0_0_15px_rgba(242,202,80,0.2)]' : 'bg-transparent text-on-surface-variant hover:bg-charcoal-surface/60 hover:text-on-surface border border-transparent hover:border-glass-border'}`}
                >
                  <Icon size={18} weight={isActive ? "fill" : "regular"} />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Main Content Area */}
        <section className="w-full md:w-3/4 flex flex-col gap-8">
          
          {/* OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="font-display-lg text-4xl text-on-surface">Dashboard</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-charcoal-surface/60 backdrop-blur-md border border-glass-border rounded-xl p-6 hover:border-primary/50 transition-colors">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-label-sm text-xs uppercase tracking-widest text-on-surface-variant">Assets Owned</span>
                    <Package size={20} className="text-primary" />
                  </div>
                  <div className="font-headline-md text-4xl text-on-surface">{purchases.length}</div>
                </div>
                <div className="bg-charcoal-surface/60 backdrop-blur-md border border-glass-border rounded-xl p-6 hover:border-primary/50 transition-colors">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-label-sm text-xs uppercase tracking-widest text-on-surface-variant">Total Downloads</span>
                    <DownloadSimple size={20} className="text-primary" />
                  </div>
                  <div className="font-headline-md text-4xl text-on-surface">{downloads.length}</div>
                </div>
                <div className="bg-charcoal-surface/60 backdrop-blur-md border border-glass-border rounded-xl p-6 hover:border-primary/50 transition-colors">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-label-sm text-xs uppercase tracking-widest text-on-surface-variant">Total Deposits</span>
                    <CurrencyDollar size={20} className="text-primary" />
                  </div>
                  <div className="font-headline-md text-4xl text-on-surface">{deposits.reduce((acc, curr) => acc + curr.amount, 0)} <span className="text-sm text-on-surface-variant">Coins</span></div>
                </div>
              </div>
            </div>
          )}

          {/* LIBRARY TAB */}
          {activeTab === 'library' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="font-display-lg text-4xl text-on-surface">My Library</h2>
              <div className="bg-charcoal-surface/60 backdrop-blur-md border border-glass-border rounded-xl overflow-hidden">
                <div className="p-6 border-b border-glass-border bg-obsidian-deep/50">
                  <h3 className="font-headline-md text-xl text-on-surface">Purchased Models</h3>
                </div>
                <div className="p-6">
                  {purchases.length === 0 ? (
                     <p className="text-on-surface-variant font-body-md py-8 text-center">No purchases found. Explore the BIG MODEL marketplace.</p>
                  ) : (
                    <ul className="space-y-4">
                      {purchases.map(p => (
                        <li key={p.id} className="flex items-center justify-between p-4 border border-glass-border rounded hover:bg-surface-container-high transition-colors">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-surface-container-high rounded border border-glass-border flex items-center justify-center">
                              <Package size={24} className="text-on-surface-variant" />
                            </div>
                            <div>
                              <p className="font-body-md text-on-surface font-semibold">{p.item_id || 'Unknown Item'}</p>
                              <p className="font-label-sm text-xs text-on-surface-variant">{new Date(p.timestamp).toLocaleDateString()}</p>
                            </div>
                          </div>
                          <button className="text-primary hover:text-white transition-colors flex items-center gap-2 font-label-sm text-xs uppercase tracking-widest">
                            <DownloadSimple size={16} /> Download
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ACTIVITY TAB */}
          {activeTab === 'activity' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="font-display-lg text-4xl text-on-surface">Activity Logs</h2>
              <div className="bg-charcoal-surface/60 backdrop-blur-md border border-glass-border rounded-xl overflow-hidden">
                <table className="w-full text-left font-body-md">
                  <thead className="bg-obsidian-deep/50 border-b border-glass-border font-label-sm text-xs uppercase tracking-widest text-on-surface-variant">
                    <tr>
                      <th className="p-6 font-normal">Action</th>
                      <th className="p-6 font-normal">Item</th>
                      <th className="p-6 font-normal">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activities.length === 0 && (
                      <tr>
                        <td colSpan={3} className="p-8 text-center text-on-surface-variant">No recent activity.</td>
                      </tr>
                    )}
                    {activities.map(a => (
                      <tr key={a.id} className="border-b border-glass-border hover:bg-surface-container-high transition-colors">
                        <td className="p-6">
                           <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-widest ${a.action_type === 'DOWNLOAD' ? 'bg-primary/10 text-primary border border-primary/20' : 'bg-white/5 text-on-surface-variant border border-glass-border'}`}>
                             {a.action_type}
                           </span>
                        </td>
                        <td className="p-6 text-on-surface">{a.item_name}</td>
                        <td className="p-6 text-on-surface-variant">{new Date(a.timestamp).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TRANSACTIONS TAB */}
          {activeTab === 'transactions' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="font-display-lg text-4xl text-on-surface">Billing & Deposits</h2>
              <div className="bg-charcoal-surface/60 backdrop-blur-md border border-glass-border rounded-xl overflow-hidden">
                <table className="w-full text-left font-body-md">
                  <thead className="bg-obsidian-deep/50 border-b border-glass-border font-label-sm text-xs uppercase tracking-widest text-on-surface-variant">
                    <tr>
                      <th className="p-6 font-normal">Type</th>
                      <th className="p-6 font-normal">Amount</th>
                      <th className="p-6 font-normal">Details</th>
                      <th className="p-6 font-normal">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.length === 0 && (
                      <tr>
                        <td colSpan={4} className="p-8 text-center text-on-surface-variant">No transactions found.</td>
                      </tr>
                    )}
                    {transactions.map(t => (
                      <tr key={t.id} className="border-b border-glass-border hover:bg-surface-container-high transition-colors">
                        <td className="p-6">
                           <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-widest ${t.type === 'DEPOSIT' ? 'bg-[#4CAF50]/10 text-[#4CAF50] border border-[#4CAF50]/20' : 'bg-error/10 text-error border border-error/20'}`}>
                             {t.type}
                           </span>
                        </td>
                        <td className={`p-6 font-bold ${t.type === 'DEPOSIT' ? 'text-[#4CAF50]' : 'text-error'}`}>
                          {t.type === 'DEPOSIT' ? '+' : '-'}{t.amount}
                        </td>
                        <td className="p-6 text-on-surface">{t.item_id || 'N/A'}</td>
                        <td className="p-6 text-on-surface-variant">{new Date(t.timestamp).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </section>
      </div>
    </main>
  );
}
