import { Button } from "@/presentation/components/ui/Button";

interface SubscriptionStatusCardProps {
    plan: 'FREE' | 'PRO' | 'ENTERPRISE';
    status: 'ACTIVE' | 'CANCELED' | 'PAST_DUE';
    renewalDate: string;
    amount: string;
    interval: 'MONTHLY' | 'YEARLY';
    onChangePlan: () => void;
    onCancel: () => void;
}

export function SubscriptionStatusCard({
    plan,
    status,
    renewalDate,
    amount,
    interval,
    onChangePlan,
    onCancel
}: SubscriptionStatusCardProps) {
    const isPro = plan === 'PRO';

    return (
        <div className="bg-white dark:bg-[#151b2b] rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Current Subscription</h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Manage your plan details</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${status === 'ACTIVE' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                    status === 'CANCELED' ? 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400' :
                        'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                    }`}>
                    {status.replace('_', ' ')}
                </span>
            </div>

            <div className="flex items-end gap-2 mb-2">
                <span className="text-3xl font-extrabold text-slate-900 dark:text-white">{plan} Plan</span>
                <span className="text-lg text-slate-500 dark:text-slate-400 font-medium mb-1">
                    {amount}/{interval === 'MONTHLY' ? 'mo' : 'yr'}
                </span>
            </div>

            <div className="text-sm text-slate-600 dark:text-slate-300 mb-8">
                {status === 'ACTIVE' ? (
                    <>Next billing date: <span className="font-semibold">{renewalDate}</span></>
                ) : (
                    <>Expires on: <span className="font-semibold">{renewalDate}</span></>
                )}
            </div>

            <div className="flex flex-wrap gap-3">
                <Button onClick={onChangePlan}>
                    Change Plan
                </Button>
                {status === 'ACTIVE' && (
                    <Button variant="danger" onClick={onCancel}>
                        Cancel Subscription
                    </Button>
                )}
            </div>
        </div>
    );
}
