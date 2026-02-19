import { Button } from "@/presentation/components/ui/Button";

interface CancelSubscriptionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export function CancelSubscriptionModal({ isOpen, onClose, onConfirm }: CancelSubscriptionModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
            <div className="bg-white dark:bg-[#151b2b] rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <div className="p-6">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 mb-4 mx-auto">
                        <span className="material-icons-outlined text-2xl">warning</span>
                    </div>
                    <h3 className="text-xl font-bold text-center text-slate-900 dark:text-white mb-2">
                        Cancel Subscription?
                    </h3>
                    <p className="text-center text-slate-500 dark:text-slate-400 mb-6">
                        Are you sure you want to cancel your subscription? You will lose access to premium features at the end of your current billing period.
                    </p>

                    <div className="flex flex-col gap-3">
                        <Button
                            variant="danger"
                            onClick={onConfirm}
                            className="w-full"
                        >
                            Yes, Cancel Subscription
                        </Button>
                        <Button
                            variant="secondary"
                            onClick={onClose}
                            className="w-full"
                        >
                            Keep My Plan
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
