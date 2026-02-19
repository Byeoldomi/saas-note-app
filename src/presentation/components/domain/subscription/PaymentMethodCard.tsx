import { Button } from "@/presentation/components/ui/Button";

interface PaymentMethodProps {
    type: 'CARD' | 'PAYPAL';
    brand?: 'VISA' | 'MASTERCARD' | 'AMEX';
    last4?: string;
    expiry?: string;
    onUpdate: () => void;
}

export function PaymentMethodCard({ type, brand, last4, expiry, onUpdate }: PaymentMethodProps) {
    return (
        <div className="bg-white dark:bg-[#151b2b] rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Payment Method</h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Update your billing information</p>
                </div>
                <Button variant="secondary" size="sm" onClick={onUpdate}>
                    Update
                </Button>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                {type === 'CARD' ? (
                    <>
                        <div className="w-12 h-8 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700 flex items-center justify-center">
                            {brand === 'VISA' && <span className="text-[10px] font-bold text-blue-800 dark:text-blue-400">VISA</span>}
                            {brand === 'MASTERCARD' && (
                                <div className="flex -space-x-1">
                                    <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                                </div>
                            )}
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-slate-900 dark:text-white">
                                {brand} ending in {last4}
                            </p>
                            <p className="text-xs text-slate-500">Expires {expiry}</p>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="w-12 h-8 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700 flex items-center justify-center">
                            <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400">PayPal</span>
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-slate-900 dark:text-white">PayPal Account</p>
                            <p className="text-xs text-slate-500">Connected</p>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
