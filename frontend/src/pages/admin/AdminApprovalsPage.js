import React, { useState } from 'react';
import { Check, X } from 'lucide-react';
import { AdminLayout } from '@/components/Layout';
import { mockTransactions } from '@/lib/mockData';
import { formatCurrency, formatDate, formatMobileNumber } from '@/lib/utils';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export default function AdminApprovalsPage() {
  const [transactions, setTransactions] = useState(mockTransactions);

  const handleApprove = (txnId) => {
    setTransactions(prev =>
      prev.map(txn => txn.id === txnId ? { ...txn, status: 'approved' } : txn)
    );
  };

  const handleReject = (txnId) => {
    setTransactions(prev =>
      prev.map(txn => txn.id === txnId ? { ...txn, status: 'rejected' } : txn)
    );
  };

  const pendingTransactions = transactions.filter(t => t.status === 'pending');
  const processedTransactions = transactions.filter(t => t.status !== 'pending');

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto p-6 md:p-12 space-y-12 fade-in">
        {/* Header */}
        <section>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter text-white mb-3">
            Transaction Approvals
          </h1>
          <p className="text-base text-[#A1A1AA] leading-relaxed">
            Use keyboard shortcuts: <kbd className="px-2 py-1 bg-[#09090B] border border-[#222222] rounded text-[#10B981] text-xs">A</kbd> to Approve, <kbd className="px-2 py-1 bg-[#09090B] border border-[#222222] rounded text-[#EF4444] text-xs">R</kbd> to Reject
          </p>
        </section>

        {/* Pending Transactions */}
        <section data-testid="pending-transactions-section" className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-xs tracking-[0.2em] uppercase text-[#A1A1AA] font-bold">
              Pending Approvals ({pendingTransactions.length})
            </p>
          </div>

          {pendingTransactions.length === 0 ? (
            <div className="bg-transparent border border-[#222222] rounded-lg p-12 text-center">
              <p className="text-[#A1A1AA]" data-testid="no-pending-message">No pending transactions</p>
            </div>
          ) : (
            <div className="space-y-3">
              {pendingTransactions.map((txn) => (
                <div
                  key={txn.id}
                  data-testid={`pending-transaction-${txn.id}`}
                  className="bg-transparent border border-[#3B82F6] rounded-lg p-6 space-y-4"
                >
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-xs tracking-[0.2em] uppercase text-[#A1A1AA] font-bold mb-1">
                        Buyer
                      </p>
                      <p className="text-white font-semibold">{txn.buyer_name}</p>
                      <p className="text-[#A1A1AA] text-sm font-mono">
                        {formatMobileNumber(txn.buyer_mobile)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs tracking-[0.2em] uppercase text-[#A1A1AA] font-bold mb-1">
                        Mill Name
                      </p>
                      <p className="text-white font-semibold">{txn.mill_name}</p>
                    </div>
                    <div>
                      <p className="text-xs tracking-[0.2em] uppercase text-[#A1A1AA] font-bold mb-1">
                        Amount
                      </p>
                      <p className="text-white font-mono font-bold text-xl">
                        {formatCurrency(txn.amount)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs tracking-[0.2em] uppercase text-[#A1A1AA] font-bold mb-1">
                        Store
                      </p>
                      <p className="text-white font-semibold">{txn.store_name}</p>
                      <p className="text-[#A1A1AA] text-sm">
                        {formatDate(txn.created_at)}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <Button
                      onClick={() => handleApprove(txn.id)}
                      data-testid={`approve-btn-${txn.id}`}
                      className="flex-1 bg-[#10B981] text-black hover:bg-[#059669] font-bold uppercase tracking-wide"
                    >
                      <Check className="w-4 h-4 mr-2" />
                      <kbd className="mr-2 px-1 bg-black bg-opacity-20 rounded text-xs">A</kbd>
                      Approve
                    </Button>
                    <Button
                      onClick={() => handleReject(txn.id)}
                      data-testid={`reject-btn-${txn.id}`}
                      className="flex-1 bg-[#EF4444] text-white hover:bg-[#DC2626] font-bold uppercase tracking-wide"
                    >
                      <X className="w-4 h-4 mr-2" />
                      <kbd className="mr-2 px-1 bg-white bg-opacity-20 rounded text-xs">R</kbd>
                      Reject
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Processed Transactions */}
        <section data-testid="processed-transactions-section" className="space-y-4">
          <p className="text-xs tracking-[0.2em] uppercase text-[#A1A1AA] font-bold">
            Recently Processed ({processedTransactions.length})
          </p>

          <div className="space-y-3">
            {processedTransactions.map((txn) => (
              <div
                key={txn.id}
                data-testid={`processed-transaction-${txn.id}`}
                className={cn(
                  "rounded-lg p-6 border",
                  txn.status === 'approved'
                    ? "border-[#10B981] bg-[#10B981] bg-opacity-5"
                    : "border-[#EF4444] bg-[#EF4444] bg-opacity-5"
                )}
              >
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                  <div>
                    <p className="text-white font-semibold">{txn.buyer_name}</p>
                    <p className="text-[#A1A1AA] text-sm font-mono">
                      {formatMobileNumber(txn.buyer_mobile)}
                    </p>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{txn.mill_name}</p>
                  </div>
                  <div>
                    <p className="text-white font-mono font-bold">
                      {formatCurrency(txn.amount)}
                    </p>
                  </div>
                  <div>
                    <p className="text-[#A1A1AA] text-sm">
                      {formatDate(txn.created_at)}
                    </p>
                  </div>
                  <div className="flex justify-end">
                    <span
                      className={cn(
                        "px-4 py-2 rounded-md text-xs font-bold uppercase tracking-wide",
                        txn.status === 'approved'
                          ? "bg-[#10B981] text-black"
                          : "bg-[#EF4444] text-white"
                      )}
                      data-testid={`status-badge-${txn.id}`}
                    >
                      {txn.status}
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
