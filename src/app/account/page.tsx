"use client";

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { ClockCounterClockwise, DownloadSimple, CurrencyDollar, CheckCircle, Package, ArrowUpRight, Crown } from '@phosphor-icons/react';

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
        <div className="w-12 h-12 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!userEmail) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-obsidian-deep text-on-surface relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-primary/10 to-transparent opacity-50"></div>
        <Crown size={64} className="text-primary mb-8" weight="thin" />
        <h2 className="font-display-lg text-6xl mb-4 text-center tracking-tighter uppercase drop-shadow-lg">Restricted <br/><span className="text-primary italic">Access</span></h2>
        <p className="font-body-lg text-xl text-on-surface-variant font-light mt-4">Please authenticate to access your Pro Member dashboard.</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-obsidian-deep text-on-surface pt-[120px] pb-32 selection:bg-primary/30 selection:text-primary relative">
      {/* Background Ambience */}
      <div className="fixed top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] pointer-events-none -z-10"></div>
      
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex flex-col lg:flex-row gap-12 relative z-10">
        
        {/* Sidebar / Profile Card */}
        <aside className="w-full lg:w-1/4 flex flex-col gap-8">
          <div className="glass-panel rounded-2xl p-8 flex flex-col items-center text-center relative overflow-hidden group hover:border-primary/50 transition-colors duration-500">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>
            
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
              <div className="relative w-32 h-32 rounded-full border border-primary/30 flex items-center justify-center overflow-hidden bg-obsidian-deep p-1">
                <div className="w-full h-full rounded-full overflow-hidden bg-charcoal-surface">
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userEmail}`} alt="Avatar" className="w-full h-full object-cover filter contrast-125 saturate-50" />
                </div>
              </div>
              <div className="absolute bottom-0 right-0 w-8 h-8 bg-obsidian-deep border border-primary rounded-full flex items-center justify-center text-primary shadow-[0_0_10px_rgba(242,202,80,0.5)]">
                <Crown size={16} weight="fill" />
              </div>
            </div>
            
            <h2 className="font-headline-md text-2xl text-on-surface truncate w-full mb-2">{userEmail}</h2>
            <div className="inline-flex items-center gap-2 text-primary font-label-sm text-[10px] uppercase tracking-[0.2em]">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              Pro Member
            </div>
          </div>

          <nav className="flex flex-col gap-2">
            {[
              { id: 'overview', label: 'Command Center', icon: Package },
              { id: 'library', label: 'Asset Library', icon: DownloadSimple },
              { id: 'activity', label: 'Activity Logs', icon: ClockCounterClockwise },
              { id: 'transactions', label: 'Treasury', icon: CurrencyDollar }
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button 
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-4 px-6 py-5 rounded-xl font-label-sm text-xs uppercase tracking-widest transition-all duration-300 w-full text-left ${isActive ? 'bg-primary text-on-primary shadow-[inset_0_0_20px_rgba(255,255,255,0.2)]' : 'glass-panel text-on-surface-variant hover:text-primary hover:border-primary/50'}`}
                >
                  <Icon size={20} weight={isActive ? "fill" : "regular"} className={isActive ? 'text-on-primary' : 'text-on-surface-variant'} />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Main Content Area */}
        <section className="w-full lg:w-3/4 flex flex-col">
          
          {/* OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
              <header className="border-b border-glass-border pb-8">
                <h2 className="font-display-lg text-5xl md:text-7xl text-on-surface uppercase tracking-tighter">Command <span className="text-primary italic">Center</span></h2>
              </header>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-panel rounded-2xl p-8 group hover:border-primary transition-all duration-500 relative overflow-hidden">
                  <div className="absolute -right-4 -top-4 text-primary/5 group-hover:text-primary/10 transition-colors duration-500 transform group-hover:scale-110">
                    <Package size={120} weight="fill" />
                  </div>
                  <div className="relative z-10 flex flex-col h-full justify-between">
                    <span className="font-label-sm text-[10px] uppercase tracking-[0.2em] text-on-surface-variant mb-8 block">Assets Acquired</span>
                    <div className="font-headline-lg text-6xl text-on-surface group-hover:text-primary transition-colors">{purchases.length}</div>
                  </div>
                </div>

                <div className="glass-panel rounded-2xl p-8 group hover:border-primary transition-all duration-500 relative overflow-hidden">
                  <div className="absolute -right-4 -top-4 text-primary/5 group-hover:text-primary/10 transition-colors duration-500 transform group-hover:scale-110">
                    <DownloadSimple size={120} weight="fill" />
                  </div>
                  <div className="relative z-10 flex flex-col h-full justify-between">
                    <span className="font-label-sm text-[10px] uppercase tracking-[0.2em] text-on-surface-variant mb-8 block">Total Downloads</span>
                    <div className="font-headline-lg text-6xl text-on-surface group-hover:text-primary transition-colors">{downloads.length}</div>
                  </div>
                </div>

                <div className="glass-panel rounded-2xl p-8 group hover:border-primary transition-all duration-500 relative overflow-hidden">
                  <div className="absolute -right-4 -top-4 text-primary/5 group-hover:text-primary/10 transition-colors duration-500 transform group-hover:scale-110">
                    <CurrencyDollar size={120} weight="fill" />
                  </div>
                  <div className="relative z-10 flex flex-col h-full justify-between">
                    <span className="font-label-sm text-[10px] uppercase tracking-[0.2em] text-on-surface-variant mb-8 block">Treasury Balance</span>
                    <div className="flex items-baseline gap-2">
                      <div className="font-headline-lg text-6xl text-on-surface group-hover:text-primary transition-colors">{deposits.reduce((acc, curr) => acc + curr.amount, 0)}</div>
                      <span className="font-label-sm text-xs text-on-surface-variant uppercase tracking-widest">CRD</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* LIBRARY TAB */}
          {activeTab === 'library' && (
            <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
              <header className="border-b border-glass-border pb-8 flex justify-between items-end">
                <h2 className="font-display-lg text-5xl md:text-7xl text-on-surface uppercase tracking-tighter">Asset <span className="text-primary italic">Library</span></h2>
                <span className="font-label-sm text-xs text-on-surface-variant uppercase tracking-widest border border-glass-border px-4 py-2 rounded-full">{purchases.length} Items</span>
              </header>
              
              <div className="glass-panel rounded-2xl overflow-hidden">
                {purchases.length === 0 ? (
                  <div className="p-16 flex flex-col items-center text-center">
                    <Package size={64} className="text-glass-border mb-6" weight="thin" />
                    <p className="text-on-surface font-body-lg text-xl mb-4">Your vault is empty.</p>
                    <button className="text-primary font-label-sm text-xs uppercase tracking-widest border-b border-primary pb-1 hover:text-primary-fixed">Explore Marketplace</button>
                  </div>
                ) : (
                  <ul className="divide-y divide-glass-border">
                    {purchases.map(p => (
                      <li key={p.id} className="p-6 md:p-8 flex items-center justify-between hover:bg-white/5 transition-colors group">
                        <div className="flex items-center gap-6">
                          <div className="w-16 h-16 bg-obsidian-deep rounded-sm border border-glass-border flex items-center justify-center group-hover:border-primary/50 transition-colors">
                            <Package size={28} className="text-on-surface-variant group-hover:text-primary transition-colors" />
                          </div>
                          <div>
                            <p className="font-headline-md text-xl md:text-2xl text-on-surface mb-2">{p.item_id || 'Classified Asset'}</p>
                            <p className="font-label-sm text-[10px] uppercase tracking-widest text-on-surface-variant">{new Date(p.timestamp).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <button className="text-on-surface hover:text-primary transition-colors flex items-center gap-3 font-label-sm text-xs uppercase tracking-widest bg-obsidian-deep border border-glass-border hover:border-primary px-6 py-3 rounded-sm">
                          <DownloadSimple size={16} /> <span className="hidden md:inline">Extract</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}

          {/* ACTIVITY TAB */}
          {activeTab === 'activity' && (
            <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
              <header className="border-b border-glass-border pb-8">
                <h2 className="font-display-lg text-5xl md:text-7xl text-on-surface uppercase tracking-tighter">System <span className="text-primary italic">Logs</span></h2>
              </header>
              
              <div className="glass-panel rounded-2xl overflow-hidden">
                <table className="w-full text-left font-body-md">
                  <thead className="bg-obsidian-deep border-b border-glass-border font-label-sm text-[10px] uppercase tracking-[0.2em] text-on-surface-variant">
                    <tr>
                      <th className="p-8 font-normal">Operation</th>
                      <th className="p-8 font-normal">Target Asset</th>
                      <th className="p-8 font-normal text-right">Timestamp</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-glass-border">
                    {activities.length === 0 && (
                      <tr>
                        <td colSpan={3} className="p-16 text-center text-on-surface-variant font-body-lg text-xl">No telemetry recorded.</td>
                      </tr>
                    )}
                    {activities.map(a => (
                      <tr key={a.id} className="hover:bg-white/5 transition-colors">
                        <td className="p-8">
                           <span className={`inline-flex items-center justify-center w-28 py-2 rounded-sm text-[10px] font-bold tracking-[0.2em] uppercase ${a.action_type === 'DOWNLOAD' ? 'bg-primary text-on-primary' : 'bg-obsidian-deep text-on-surface border border-glass-border'}`}>
                             {a.action_type}
                           </span>
                        </td>
                        <td className="p-8 text-on-surface font-headline-md text-xl">{a.item_name}</td>
                        <td className="p-8 text-on-surface-variant text-right font-label-sm text-xs tracking-widest">{new Date(a.timestamp).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TRANSACTIONS TAB */}
          {activeTab === 'transactions' && (
            <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
              <header className="border-b border-glass-border pb-8">
                <h2 className="font-display-lg text-5xl md:text-7xl text-on-surface uppercase tracking-tighter">Treasury <span className="text-primary italic">Ledger</span></h2>
              </header>
              
              <div className="glass-panel rounded-2xl overflow-hidden">
                <table className="w-full text-left font-body-md">
                  <thead className="bg-obsidian-deep border-b border-glass-border font-label-sm text-[10px] uppercase tracking-[0.2em] text-on-surface-variant">
                    <tr>
                      <th className="p-8 font-normal">Type</th>
                      <th className="p-8 font-normal">Volume</th>
                      <th className="p-8 font-normal">Reference</th>
                      <th className="p-8 font-normal text-right">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-glass-border">
                    {transactions.length === 0 && (
                      <tr>
                        <td colSpan={4} className="p-16 text-center text-on-surface-variant font-body-lg text-xl">Ledger is empty.</td>
                      </tr>
                    )}
                    {transactions.map(t => (
                      <tr key={t.id} className="hover:bg-white/5 transition-colors">
                        <td className="p-8">
                           <span className={`inline-flex items-center justify-center w-24 py-2 rounded-sm text-[10px] font-bold tracking-[0.2em] uppercase ${t.type === 'DEPOSIT' ? 'text-primary border border-primary/30' : 'text-on-surface border border-glass-border'}`}>
                             {t.type}
                           </span>
                        </td>
                        <td className={`p-8 font-headline-md text-2xl ${t.type === 'DEPOSIT' ? 'text-primary' : 'text-on-surface'}`}>
                          {t.type === 'DEPOSIT' ? '+' : '-'}{t.amount}
                        </td>
                        <td className="p-8 text-on-surface-variant">{t.item_id || '—'}</td>
                        <td className="p-8 text-on-surface-variant text-right font-label-sm text-xs tracking-widest">{new Date(t.timestamp).toLocaleDateString()}</td>
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
