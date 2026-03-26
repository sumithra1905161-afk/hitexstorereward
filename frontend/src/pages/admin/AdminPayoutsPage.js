import React, { useState } from 'react';
import { Check, Clock } from 'lucide-react';
import { AdminLayout } from '@/components/Layout';
import { mockPayouts } from '@/lib/mockData';
import { formatCurrency, formatDate, formatMobileNumber } from '@/lib/utils';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export default function AdminPayoutsPage() {
  const [payouts, setPayouts] = useState(mockPayouts);

  const handleComplete = (payoutId) => {
    setPayouts(prev =>
      prev.map(payout =>
        payout.id === payoutId
          ? { ...payout, status: 'completed', completed_at: new Date().toISOString() }
          : payout
      )
    );
  };

  const pendingPayouts = payouts.filter(p => p.status === 'pending');
  const completedPayouts = payouts.filter(p => p.status === 'completed');

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto p-6 md:p-12 space-y-12 fade-in">
        {/* Header */}
        <section>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter text-white mb-3">
            Payout Management
          </h1>
          <p className="text-base text-[#A1A1AA] leading-relaxed">
            Process UPI withdrawal requests from users.
          </p>
        </section>

        {/* Pending Payouts */}
        <section data-testid="pending-payouts-section" className="space-y-4">
          <p className="text-xs tracking-[0.2em] uppercase text-[#A1A1AA] font-bold">
            Pending Requests ({pendingPayouts.length})
          </p>

          {pendingPayouts.length === 0 ? (
            <div className="bg-transparent border border-[#222222] rounded-lg p-12 text-center">
              <p className="text-[#A1A1AA]" data-testid="no-pending-payouts-message">No pending payout requests</p>
            </div>
          ) : (
            <div className="space-y-3">
              {pendingPayouts.map((payout) => (
                <div
                  key={payout.id}
                  data-testid={`pending-payout-${payout.id}`}
                  className="bg-transparent border border-[#F59E0B] rounded-lg p-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center mb-4">
                    <div>
                      <p className="text-xs tracking-[0.2em] uppercase text-[#A1A1AA] font-bold mb-1">
                        User
                      </p>
                      <p className="text-white font-semibold">{payout.user_name}</p>
                      <p className="text-[#A1A1AA] text-sm font-mono">
                        {formatMobileNumber(payout.mobile_no)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs tracking-[0.2em] uppercase text-[#A1A1AA] font-bold mb-1">
                        UPI ID
                      </p>
                      <p className="text-white font-mono">{payout.upi_id}</p>
                    </div>
                    <div>
                      <p className="text-xs tracking-[0.2em] uppercase text-[#A1A1AA] font-bold mb-1">
                        Amount
                      </p>
                      <p className="text-[#10B981] font-mono font-bold text-2xl">
                        {formatCurrency(payout.amount)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs tracking-[0.2em] uppercase text-[#A1A1AA] font-bold mb-1">
                        Requested
                      </p>
                      <p className="text-[#A1A1AA] text-sm">
                        {formatDate(payout.requested_at)}
                      </p>
                    </div>
                  </div>

                  <Button
                    onClick={() => handleComplete(payout.id)}
                    data-testid={`complete-payout-btn-${payout.id}`}
                    className="w-full bg-[#10B981] text-black hover:bg-[#059669] font-bold uppercase tracking-wide"
                  >
                    <Check className="w-4 h-4 mr-2" />
                    Mark as Completed
                  </Button>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Completed Payouts */}
        <section data-testid="completed-payouts-section" className="space-y-4">
          <p className="text-xs tracking-[0.2em] uppercase text-[#A1A1AA] font-bold">
            Recently Completed ({completedPayouts.length})
          </p>

          <div className="space-y-3">
            {completedPayouts.map((payout) => (
              <div
                key={payout.id}
                data-testid={`completed-payout-${payout.id}`}
                className="bg-transparent border border-[#10B981] rounded-lg p-6 bg-[#10B981] bg-opacity-5"
              >
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                  <div>
                    <p className="text-white font-semibold">{payout.user_name}</p>
                    <p className="text-[#A1A1AA] text-sm font-mono">
                      {formatMobileNumber(payout.mobile_no)}
                    </p>
                  </div>
                  <div>
                    <p className="text-white font-mono text-sm">{payout.upi_id}</p>
                  </div>
                  <div>
                    <p className="text-white font-mono font-bold">
                      {formatCurrency(payout.amount)}
                    </p>
                  </div>
                  <div>
                    <p className="text-[#A1A1AA] text-sm">
                      {formatDate(payout.completed_at || payout.requested_at)}
                    </p>
                  </div>
                  <div className="flex justify-end">
                    <span
                      className="px-4 py-2 rounded-md text-xs font-bold uppercase tracking-wide bg-[#10B981] text-black"
                      data-testid={`status-completed-${payout.id}`}
                    >
                      <Check className="w-3 h-3 inline mr-1" />
                      Completed
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
