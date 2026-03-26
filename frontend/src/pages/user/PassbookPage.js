import React, { useState } from 'react';
import { Receipt, TrendingUp, TrendingDown, Gift, DollarSign, FileText } from 'lucide-react';
import { UserLayout } from '@/components/Layout';
import { mockPassbookTransactions, mockUser } from '@/lib/mockData';
import { formatCurrency, formatDate } from '@/lib/utils';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function PassbookPage() {
  const [filter, setFilter] = useState('all');

  const filteredTransactions = filter === 'all'
    ? mockPassbookTransactions
    : mockPassbookTransactions.filter(txn => txn.type === filter);

  const getTransactionIcon = (type) => {
    switch (type) {
      case 'purchase':
        return <Receipt className="w-5 h-5 text-[#10B981]" />;
      case 'referral_commission':
        return <Gift className="w-5 h-5 text-[#10B981]" />;
      case 'scratch_bonus':
        return <Gift className="w-5 h-5 text-[#F59E0B]" />;
      case 'withdrawal':
        return <DollarSign className="w-5 h-5 text-[#EF4444]" />;
      default:
        return <FileText className="w-5 h-5 text-[#A1A1AA]" />;
    }
  };

  const getTransactionLabel = (type) => {
    switch (type) {
      case 'purchase':
        return 'Purchase (3%)';
      case 'referral_commission':
        return 'Referral (2%)';
      case 'scratch_bonus':
        return 'Scratch Bonus';
      case 'withdrawal':
        return 'Withdrawal';
      default:
        return 'Transaction';
    }
  };

  return (
    <UserLayout>
      <div className="max-w-6xl mx-auto p-6 md:p-12 space-y-12 fade-in">
        {/* Header */}
        <section>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter text-white mb-3">
            Transaction Passbook
          </h1>
          <p className="text-base text-[#A1A1AA] leading-relaxed">
            Complete history of your purchases, referral commissions, and withdrawals.
          </p>
        </section>

        {/* Summary Cards */}
        <section data-testid="passbook-summary-section" className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-transparent border border-[#10B981] rounded-lg p-6 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
            <div className="flex items-center gap-3 mb-3">
              <TrendingUp className="w-5 h-5 text-[#10B981]" />
              <p className="text-xs tracking-[0.2em] uppercase text-[#A1A1AA] font-bold">
                Total Earned
              </p>
            </div>
            <p className="text-3xl font-mono font-black text-[#10B981]">
              {formatCurrency(
                mockPassbookTransactions
                  .filter(t => t.points_credited > 0)
                  .reduce((sum, t) => sum + t.points_credited, 0)
              )}
            </p>
          </div>

          <div className="bg-transparent border border-[#EF4444] rounded-lg p-6">
            <div className="flex items-center gap-3 mb-3">
              <TrendingDown className="w-5 h-5 text-[#EF4444]" />
              <p className="text-xs tracking-[0.2em] uppercase text-[#A1A1AA] font-bold">
                Total Withdrawn
              </p>
            </div>
            <p className="text-3xl font-mono font-black text-[#EF4444]">
              {formatCurrency(
                mockPassbookTransactions
                  .filter(t => t.points_debited > 0)
                  .reduce((sum, t) => sum + t.points_debited, 0)
              )}
            </p>
          </div>

          <div className="bg-transparent border border-[#222222] rounded-lg p-6">
            <div className="flex items-center gap-3 mb-3">
              <FileText className="w-5 h-5 text-[#10B981]" />
              <p className="text-xs tracking-[0.2em] uppercase text-[#A1A1AA] font-bold">
                Current Balance
              </p>
            </div>
            <p className="text-3xl font-mono font-black text-white">
              {formatCurrency(mockUser.balance)}
            </p>
          </div>
        </section>

        {/* Filter */}
        <section className="flex items-center justify-between">
          <p className="text-xs tracking-[0.2em] uppercase text-[#A1A1AA] font-bold">
            Transaction History ({filteredTransactions.length})
          </p>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger
              data-testid="transaction-filter"
              className="w-48 bg-[#09090B] border border-[#222222] text-white"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#09090B] border border-[#222222] text-white">
              <SelectItem value="all" className="hover:bg-[#10B981] hover:text-black cursor-pointer">
                All Transactions
              </SelectItem>
              <SelectItem value="purchase" className="hover:bg-[#10B981] hover:text-black cursor-pointer">
                Purchases Only
              </SelectItem>
              <SelectItem value="referral_commission" className="hover:bg-[#10B981] hover:text-black cursor-pointer">
                Referral Commissions
              </SelectItem>
              <SelectItem value="scratch_bonus" className="hover:bg-[#10B981] hover:text-black cursor-pointer">
                Scratch Bonuses
              </SelectItem>
              <SelectItem value="withdrawal" className="hover:bg-[#10B981] hover:text-black cursor-pointer">
                Withdrawals
              </SelectItem>
            </SelectContent>
          </Select>
        </section>

        {/* Transactions List */}
        <section data-testid="passbook-transactions-section" className="space-y-3">
          {filteredTransactions.map((txn) => (
            <div
              key={txn.id}
              data-testid={`passbook-item-${txn.id}`}
              className={cn(
                "rounded-lg p-6 border transition-colors",
                txn.type === 'withdrawal'
                  ? "border-[#EF4444] bg-[#EF4444] bg-opacity-5 hover:border-[#EF4444]"
                  : "border-[#222222] hover:border-[#10B981]"
              )}
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                {/* Icon & Type */}
                <div className="md:col-span-2 flex items-center gap-3">
                  {getTransactionIcon(txn.type)}
                  <div>
                    <p className="text-white font-semibold text-sm">
                      {getTransactionLabel(txn.type)}
                    </p>
                    <p className="text-[#A1A1AA] text-xs font-mono">
                      {txn.bill_no}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <div className="md:col-span-3">
                  <p className="text-white font-medium text-sm mb-1">
                    {txn.description}
                  </p>
                  {txn.mill_name && (
                    <p className="text-[#A1A1AA] text-xs">{txn.mill_name}</p>
                  )}
                  {txn.referee_name && (
                    <p className="text-[#10B981] text-xs">via {txn.referee_name}</p>
                  )}
                </div>

                {/* Amount Purchased */}
                <div className="md:col-span-2">
                  <p className="text-xs tracking-[0.2em] uppercase text-[#A1A1AA] font-bold mb-1">
                    Purchase
                  </p>
                  <p className="text-white font-mono font-semibold">
                    {txn.amount_purchased > 0 ? formatCurrency(txn.amount_purchased) : '-'}
                  </p>
                </div>

                {/* Points Credited */}
                <div className="md:col-span-2">
                  <p className="text-xs tracking-[0.2em] uppercase text-[#A1A1AA] font-bold mb-1">
                    Credited
                  </p>
                  <p className={cn(
                    "font-mono font-bold",
                    txn.points_credited > 0 ? "text-[#10B981]" : "text-[#A1A1AA]"
                  )}>
                    {txn.points_credited > 0 ? `+${formatCurrency(txn.points_credited)}` : '-'}
                  </p>
                </div>

                {/* Points Debited */}
                <div className="md:col-span-2">
                  <p className="text-xs tracking-[0.2em] uppercase text-[#A1A1AA] font-bold mb-1">
                    Debited
                  </p>
                  <p className={cn(
                    "font-mono font-bold",
                    txn.points_debited > 0 ? "text-[#EF4444]" : "text-[#A1A1AA]"
                  )}>
                    {txn.points_debited > 0 ? `-${formatCurrency(txn.points_debited)}` : '-'}
                  </p>
                </div>

                {/* Date & Balance */}
                <div className="md:col-span-1 text-right">
                  <p className="text-[#A1A1AA] text-xs mb-2">
                    {formatDate(txn.date)}
                  </p>
                  <p className="text-white font-mono text-sm font-bold">
                    {formatCurrency(txn.balance_after)}
                  </p>
                  <p className="text-[#71717A] text-xs uppercase tracking-wide">
                    Balance
                  </p>
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>
    </UserLayout>
  );
}
