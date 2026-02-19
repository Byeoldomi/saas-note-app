interface PaymentRecord {
    id: string;
    date: string;
    amount: string;
    status: string; // 'DONE' | 'CANCELED' | 'FAILED' etc.
    invoiceUrl: string;
}

interface PaymentHistoryTableProps {
    history: PaymentRecord[];
}

export function PaymentHistoryTable({ history }: PaymentHistoryTableProps) {
    const getStatusBadge = (status: string) => {
        const normalizedStatus = status === 'DONE' ? 'PAID' : status;

        let colorClass = 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-400';
        let icon = null;

        if (normalizedStatus === 'PAID') {
            colorClass = 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
            icon = 'check_circle';
        } else if (normalizedStatus === 'FAILED' || normalizedStatus === 'ABORTED') {
            colorClass = 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
            icon = 'error';
        } else if (normalizedStatus === 'CANCELED' || normalizedStatus === 'PARTIAL_CANCELED') {
            colorClass = 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400';
            icon = 'cancel';
        }

        return (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClass}`}>
                {icon && <span className="material-icons-outlined text-[14px] mr-1">{icon}</span>}
                {normalizedStatus}
            </span>
        );
    };

    return (
        <div className="bg-white dark:bg-[#151b2b] rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="p-6 border-b border-slate-200 dark:border-slate-800">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Payment History</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">View and download your invoices</p>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 font-medium">
                        <tr>
                            <th className="px-6 py-4">Date</th>
                            <th className="px-6 py-4">Amount</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-right">Invoice</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {history.map((record) => (
                            <tr key={record.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/30 transition-colors">
                                <td className="px-6 py-4 text-slate-900 dark:text-white">{record.date}</td>
                                <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{record.amount}</td>
                                <td className="px-6 py-4">
                                    {getStatusBadge(record.status)}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <a
                                        href={record.invoiceUrl}
                                        className="text-primary hover:text-blue-700 dark:hover:text-blue-400 font-medium inline-flex items-center gap-1"
                                        onClick={(e) => e.preventDefault()} // Mock link
                                    >
                                        <span className="material-icons-outlined text-lg">download</span>
                                        PDF
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {history.length === 0 && (
                <div className="p-8 text-center text-slate-500 dark:text-slate-400">
                    No payment history found.
                </div>
            )}
        </div>
    );
}
