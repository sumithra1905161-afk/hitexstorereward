import React from 'react';
import { Clock, CheckCircle, XCircle, Download, ArrowLeft } from 'lucide-react';
import { UserLayout } from '@/components/Layout';
import { useLanguage } from '@/lib/LanguageContext';
import { withdrawalHistory } from '@/lib/mockDataEnhanced';
import { formatCurrency } from '@/lib/utils';
import { enhancements_en, enhancements_hi } from '@/lib/translationsEnhanced';
import { useNavigate } from 'react-router-dom';

export default function WithdrawalHistoryPage() {
  const { lang } = useLanguage();
  const te = lang === 'hi' ? enhancements_hi : enhancements_en;
  const navigate = useNavigate();

  const getStatusIcon = (status) => {
    if (status === 'completed') return <CheckCircle className="w-5 h-5 text-[#10B981]" />;
    if (status === 'failed') return <XCircle className="w-5 h-5 text-[#EF4444]" />;
    return <Clock className="w-5 h-5 text-[#F59E0B]" />;
  };

  const getStatusColor = (status) => {
    if (status === 'completed') return '#10B981';
    if (status === 'failed') return '#EF4444';
    return '#F59E0B';
  };

  return (
    <UserLayout>
      <div className="max-w-5xl mx-auto p-4 sm:p-6 md:p-12 space-y-8 fade-in">
        {/* Header */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/user')}
            className="w-10 h-10 bg-[#09090B] border border-[#222222] rounded-lg flex items-center justify-center hover:border-[#10B981] transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              {te.withdrawalHistory.title}
            </h1>
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-[#10B981]/10 border border-[#10B981] rounded-lg p-4">
          <p className="text-sm text-[#10B981] font-semibold">
            {te.withdrawalHistory.minAmount} | {te.withdrawalHistory.maxAmount}
          </p>
        </div>

        {/* Withdrawal List */}
        <div className="space-y-4">
          {withdrawalHistory.length === 0 ? (
            <div className="text-center py-20">
              <Download className="w-16 h-16 text-[#333333] mx-auto mb-4" />
              <p className="text-[#71717A] text-lg">{te.withdrawalHistory.noHistory}</p>
            </div>
          ) : (
            withdrawalHistory.map((withdrawal) => (
              <div
                key={withdrawal.id}
                className="bg-[#09090B] border border-[#222222] rounded-lg p-6 hover:border-[#10B981] transition-colors"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-start gap-4 flex-1">
                    {getStatusIcon(withdrawal.status)}
                    <div className="flex-1 min-w-0">
                      <p className="text-2xl font-mono font-black text-white mb-1">
                        {formatCurrency(withdrawal.amount)}
                      </p>
                      <p className="text-sm text-[#71717A]">
                        to {withdrawal.upi_id}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span
                      className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide"
                      style={{ 
                        backgroundColor: `${getStatusColor(withdrawal.status)}20`,
                        color: getStatusColor(withdrawal.status)
                      }}
                    >
                      {withdrawal.status}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#222222]">
                  <div>
                    <p className="text-xs tracking-[0.2em] uppercase text-[#A1A1AA] font-bold mb-1">
                      {te.withdrawalHistory.requestSubmitted}
                    </p>
                    <p className="text-sm text-white">
                      {new Date(withdrawal.requested_at).toLocaleString()}
                    </p>
                  </div>
                  {withdrawal.processed_at && (
                    <div>
                      <p className="text-xs tracking-[0.2em] uppercase text-[#A1A1AA] font-bold mb-1">
                        Processed At
                      </p>
                      <p className="text-sm text-white">
                        {new Date(withdrawal.processed_at).toLocaleString()}
                      </p>
                    </div>
                  )}
                  {withdrawal.transaction_id && (
                    <div className="sm:col-span-2">
                      <p className="text-xs tracking-[0.2em] uppercase text-[#A1A1AA] font-bold mb-1">
                        {te.withdrawalHistory.transactionId}
                      </p>
                      <p className="text-sm font-mono text-[#10B981]">
                        {withdrawal.transaction_id}
                      </p>
                    </div>
                  )}
                </div>

                {/* Processing Steps (for completed withdrawals with steps) */}
                {withdrawal.processing_steps && withdrawal.status === 'completed' && (
                  <div className="mt-6 pt-6 border-t border-[#222222]">
                    <div className="flex items-center justify-between">
                      {withdrawal.processing_steps.map((step, index) => (
                        <div key={index} className="flex-1 text-center">
                          <div className="flex items-center">
                            {index > 0 && (
                              <div className="flex-1 h-0.5 bg-[#10B981]" />
                            )}
                            <div 
                              className="w-8 h-8 rounded-full bg-[#10B981] flex items-center justify-center mx-auto"
                            >
                              <CheckCircle className="w-5 h-5 text-black" />
                            </div>
                            {index < withdrawal.processing_steps.length - 1 && (
                              <div className="flex-1 h-0.5 bg-[#10B981]" />
                            )}
                          </div>
                          <p className="text-xs text-[#71717A] mt-2 capitalize">
                            {step.step.replace('_', ' ')}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </UserLayout>
  );
}
