import React, { useRef, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { CBTForm } from '@/components/CBTForm';
import { CBTRecord } from '@/store/cbtStore';
import { useTranslation } from 'react-i18next';
import { Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguageStore } from '@/store/languageStore';
import { MotionDialog } from '@/components/ui/motion-dialog';

interface EditRecordDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    recordToEdit?: CBTRecord | null;
    mode: 'add' | 'edit';
}

export const EditRecordDialog: React.FC<EditRecordDialogProps> = ({
    open,
    onOpenChange,
    recordToEdit = null,
    mode
}) => {
    const { t } = useTranslation();
    const formRef = useRef<HTMLFormElement>(null);
    const { direction } = useLanguageStore();
    const isRtl = direction.dir === 'rtl';

    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 4;

    // Reset the form when dialog is opened
    useEffect(() => {
        if (open) {
            setCurrentStep(1);
        }
    }, [open]);

    const handleNext = () => {
        if (currentStep < totalSteps) {
            setCurrentStep(currentStep + 1);
        } else {
            handleFinalStep();
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        } else {
            onOpenChange(false);
        }
    };

    const handleFinalStep = () => {
        if (formRef.current) {
            // Trigger form submission
            const submitEvent = new Event('submit', { cancelable: true, bubbles: true });
            formRef.current.dispatchEvent(submitEvent);

            // Close dialog after submission
            onOpenChange(false);
        }
    };

    const handleStepClick = (step: number) => {
        // Prevent going beyond the current step (user must complete the form in sequence)
        if (step <= currentStep) {
            setCurrentStep(step);
        }
    };

    // Custom step animation variants
    const stepIndicatorVariants = {
        initial: { scale: 0.8, opacity: 0 },
        animate: (i: number) => ({
            scale: 1,
            opacity: 1,
            transition: { delay: i * 0.1, duration: 0.3 }
        })
    };

    const getStepTitle = (step: number) => {
        switch (step) {
            case 1: return t('situation');
            case 2: return t('thoughts');
            case 3: return t('emotions');
            case 4: return t('behaviours');
            default: return '';
        }
    };

    return (
        <MotionDialog
            open={open}
            onOpenChange={onOpenChange}
            position={isRtl ? 'left' : 'right'}
            width="third"
            showCloseButton={false}
        >
            {/* Header with back button */}
            <div className="flex items-center justify-between border-b p-4 h-16">
                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleBack}
                        className="mr-2"
                    >
                        {isRtl ? <ChevronRight size={24} /> : <ChevronLeft size={24} />}
                    </Button>
                    <h2 className="text-xl font-medium">
                        {mode === 'add' ? t('addRecord') : t('editRecord')}
                    </h2>
                </div>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onOpenChange(false)}
                >
                    <ChevronLeft size={24} className={isRtl ? 'rotate-180' : ''} />
                </Button>
            </div>

            {/* Custom Step Progress Bar */}
            <div className="relative py-5 px-4 border-b">
                <div className="flex items-center justify-between">
                    {/* Step line connecting the circles */}
                    <div className="absolute top-1/2 left-[10%] right-[10%] h-0.5 bg-muted -translate-y-1/2" />
                    <div className="absolute top-1/2 left-[10%] right-[10%] h-0.5 -translate-y-1/2 overflow-hidden">
                        <div
                            className="h-full bg-primary transition-all duration-300 ease-in-out"
                            style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
                        />
                    </div>

                    {Array.from({ length: totalSteps }).map((_, i) => {
                        const stepNum = i + 1;
                        const isActive = stepNum === currentStep;
                        const isCompleted = stepNum < currentStep;
                        const isClickable = stepNum <= currentStep;

                        return (
                            <motion.div
                                key={`step-${stepNum}`}
                                className="relative z-10 flex flex-col items-center"
                                custom={i}
                                variants={stepIndicatorVariants}
                                initial="initial"
                                animate="animate"
                            >
                                <button
                                    className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-200 ${
                                        isActive
                                            ? 'border-primary bg-primary text-primary-foreground'
                                            : isCompleted
                                                ? 'border-primary bg-primary text-primary-foreground'
                                                : 'border-muted bg-background'
                                    } ${isClickable ? 'cursor-pointer hover:ring-2 hover:ring-primary/30' : 'cursor-not-allowed opacity-50'}`}
                                    onClick={() => handleStepClick(stepNum)}
                                    disabled={!isClickable}
                                    aria-label={`Go to step ${stepNum}`}
                                >
                                    {isCompleted ? <Check size={16} /> : stepNum}
                                </button>
                                <span className={`mt-2 text-xs font-medium transition-colors ${isActive || isCompleted ? 'text-primary' : 'text-muted-foreground'}`}>
                                    {getStepTitle(stepNum)}
                                </span>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Form content */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6">
                <CBTForm
                    ref={formRef}
                    editMode={mode === 'edit'}
                    recordToEdit={recordToEdit}
                    currentStep={currentStep}
                    totalSteps={totalSteps}
                />
            </div>

            {/* Action buttons */}
            <div className="border-t p-4 flex justify-end gap-3">
                {currentStep === totalSteps ? (
                    <Button
                        onClick={handleFinalStep}
                        className="px-6 bg-emerald-700 hover:bg-emerald-800 text-emerald-50"
                    >
                        {mode === 'edit' ? t('saveChanges') : t('add')}
                    </Button>
                ) : (
                    <Button
                        onClick={handleNext}
                        className="px-6"
                    >
                        {t('next')}
                    </Button>
                )}
            </div>
        </MotionDialog>
    );
};
