import React, { useEffect, forwardRef, useImperativeHandle } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { useCBTStore, Emotion, CBTRecord } from '../store/cbtStore';
import { EmotionSelect } from './EmotionSelect';
import { motion, AnimatePresence } from 'framer-motion';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { MapPin, Brain, Heart, Activity } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const formSchema = z.object({
    situation: z.string().optional(),
    thought: z.string().optional(),
    emotions: z.array(z.any()).optional(),
    action: z.string().optional(),
});

interface CBTFormProps {
    editMode?: boolean;
    recordToEdit?: CBTRecord | null;
    onEditComplete?: () => void;
    currentStep?: number;
    totalSteps?: number;
}

export const CBTForm = forwardRef<HTMLFormElement, CBTFormProps>(({
    editMode = false,
    recordToEdit = null,
    onEditComplete = () => { },
    currentStep = 1,
    totalSteps = 4
}, ref) => {
    const { addRecord, updateRecord } = useCBTStore();
    const { t } = useTranslation();

    // Initialize form with react-hook-form
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            situation: recordToEdit?.situation || '',
            thought: recordToEdit?.thought || '',
            emotions: recordToEdit?.emotions || [],
            action: recordToEdit?.action || '',
        },
    });

    // Form reference for external submit
    const formRefInternal = React.useRef<HTMLFormElement>(null);

    // Forward the ref to parent component
    useImperativeHandle(ref, () => formRefInternal.current as HTMLFormElement);

    // Load record data if in edit mode
    useEffect(() => {
        if (editMode && recordToEdit) {
            form.reset({
                situation: recordToEdit.situation,
                thought: recordToEdit.thought,
                emotions: recordToEdit.emotions,
                action: recordToEdit.action,
            });
        }
    }, [editMode, recordToEdit, form]);

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        // Ensure default values for required fields in CBTRecord
        const recordData = {
            situation: '',
            thought: '',
            emotions: [] as Emotion[],
            action: '',
            ...Object.fromEntries(
                Object.entries(values).filter(([key, value]) => {
                    if (Array.isArray(value)) return value.length > 0;
                    return value && value.trim() !== '';
                })
            )
        };

        if (editMode && recordToEdit) {
            // Update existing record
            updateRecord({
                id: recordToEdit.id,
                time: recordToEdit.time || new Date().toISOString(),
                ...recordData
            });
        } else {
            // Add new record
            addRecord({
                time: new Date().toISOString(),
                ...recordData
            });
        }

        // Call onEditComplete callback
        onEditComplete();
    };

    // Animation variants
    const headerVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    const formFieldVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.5,
                type: "spring",
                stiffness: 200,
                damping: 20
            }
        },
        exit: {
            opacity: 0,
            scale: 0.95,
            x: 20,
            transition: {
                duration: 0.3
            }
        }
    };

    // Get step data based on current step
    const getStepData = () => {
        switch (currentStep) {
            case 1:
                return {
                    title: t('situation'),
                    description: t('situationDescription'),
                    icon: <MapPin size={24} className="text-emerald-600" />,
                    field: 'situation',
                    placeholder: t('situationPlaceholder')
                };
            case 2:
                return {
                    title: t('thoughts'),
                    description: t('thoughtsDescription'),
                    icon: <Brain size={24} className="text-blue-600" />,
                    field: 'thought',
                    placeholder: t('thoughtsPlaceholder')
                };
            case 3:
                return {
                    title: t('emotions'),
                    description: t('emotionsDescription'),
                    icon: <Heart size={24} className="text-rose-500" />,
                    field: 'emotions'
                };
            case 4:
                return {
                    title: t('behaviours'),
                    description: t('behavioursDescription'),
                    icon: <Activity size={24} className="text-amber-500" />,
                    field: 'action',
                    placeholder: t('behavioursPlaceholder')
                };
            default:
                return {
                    title: '',
                    description: '',
                    icon: null,
                    field: ''
                };
        }
    };

    const stepData = getStepData();

    return (
        <div className="bg-background w-full">
            <Form {...form}>
                <form ref={formRefInternal} onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6 w-full">
                    <motion.div
                        className="mb-6"
                        variants={headerVariants}
                        initial="hidden"
                        animate="visible"
                        key={`header-${currentStep}`}
                    >
                        <div className="flex items-center gap-3 mb-3">
                            {stepData.icon}
                            <h2 className="text-xl font-medium">{stepData.title}</h2>
                        </div>
                        <p className="text-base text-muted-foreground">
                            {stepData.description}
                        </p>
                    </motion.div>

                    <AnimatePresence mode="wait">
                        {/* Step 1: Situation */}
                        {currentStep === 1 && (
                            <motion.div
                                key="situation"
                                variants={formFieldVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className="w-full"
                            >
                                <FormField
                                    control={form.control}
                                    name="situation"
                                    render={({ field }) => (
                                        <FormItem className="space-y-2 w-full">
                                            <FormControl>
                                                <Textarea
                                                    placeholder={t('situationPlaceholder')}
                                                    rows={8}
                                                    className="resize-none min-h-[200px] text-base w-full border border-input rounded-md p-4 focus-visible:ring-1 focus-visible:ring-primary"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage className="text-sm" />
                                        </FormItem>
                                    )}
                                />
                            </motion.div>
                        )}

                        {/* Step 2: Thoughts */}
                        {currentStep === 2 && (
                            <motion.div
                                key="thought"
                                variants={formFieldVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className="w-full"
                            >
                                <FormField
                                    control={form.control}
                                    name="thought"
                                    render={({ field }) => (
                                        <FormItem className="space-y-2 w-full">
                                            <FormControl>
                                                <Textarea
                                                    placeholder={t('thoughtsPlaceholder')}
                                                    rows={8}
                                                    className="resize-none min-h-[200px] text-base w-full border border-input rounded-md p-4 focus-visible:ring-1 focus-visible:ring-primary"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage className="text-sm" />
                                        </FormItem>
                                    )}
                                />
                            </motion.div>
                        )}

                        {/* Step 3: Emotions */}
                        {currentStep === 3 && (
                            <motion.div
                                key="emotions"
                                variants={formFieldVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className="w-full"
                            >
                                <FormField
                                    control={form.control}
                                    name="emotions"
                                    render={({ field }) => (
                                        <FormItem className="space-y-2 w-full">
                                            <FormControl>
                                                <div className="border border-input rounded-md p-4">
                                                    <EmotionSelect
                                                        value={field.value || []}
                                                        onChange={field.onChange}
                                                    />
                                                </div>
                                            </FormControl>
                                            <FormMessage className="text-sm" />
                                        </FormItem>
                                    )}
                                />
                            </motion.div>
                        )}

                        {/* Step 4: Behaviours */}
                        {currentStep === 4 && (
                            <motion.div
                                key="action"
                                variants={formFieldVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className="w-full"
                            >
                                <FormField
                                    control={form.control}
                                    name="action"
                                    render={({ field }) => (
                                        <FormItem className="space-y-2 w-full">
                                            <FormControl>
                                                <Textarea
                                                    placeholder={t('behavioursPlaceholder')}
                                                    rows={8}
                                                    className="resize-none min-h-[200px] text-base w-full border border-input rounded-md p-4 focus-visible:ring-1 focus-visible:ring-primary"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage className="text-sm" />
                                        </FormItem>
                                    )}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </form>
            </Form>
        </div>
    );
});
