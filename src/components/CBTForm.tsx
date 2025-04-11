import React, { useEffect } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useCBTStore, Emotion, CBTRecord } from '../store/cbtStore';
import { EmotionSelect } from './EmotionSelect';
import { motion } from 'framer-motion';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { MapPin, Brain, Heart, Activity } from 'lucide-react';

const formSchema = z.object({
    situation: z.string().optional(),
    thought: z.string().optional(),
    emotions: z.array(z.any()).optional(),
    action: z.string().optional(),
});

interface CBTFormProps {
    editMode?: boolean;
    recordToEdit?: CBTRecord;
    onEditComplete?: () => void;
}

export const CBTForm: React.FC<CBTFormProps> = ({
    editMode = false,
    recordToEdit = null,
    onEditComplete = () => { }
}) => {
    const { addRecord, updateRecord } = useCBTStore();

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
            onEditComplete();
        } else {
            // Add new record
            addRecord({
                time: new Date().toISOString(),
                ...recordData
            });

            // Reset form if not in edit mode
            if (!editMode) {
                form.reset({
                    situation: '',
                    thought: '',
                    emotions: [],
                    action: '',
                });
            }
        }
    };

    const formFieldVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: (custom: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.3,
                delay: custom * 0.1,
                type: "spring",
                stiffness: 100
            }
        })
    };

    return (
        <div className={`bg-background ${!editMode ? 'border-minimal rounded-md p-3' : 'p-0'}`}>
            <Form {...form}>
                <form  onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
                    <motion.div
                        variants={formFieldVariants}
                        initial="hidden"
                        animate="visible"
                        custom={1}
                    >
                        <FormField
                            control={form.control}
                            name="situation"
                            render={({ field }) => (
                                <FormItem className="space-y-1.5">
                                    <FormLabel className="text-xs flex items-center gap-1.5 mb-1">
                                        <MapPin className="h-3.5 w-3.5 text-emerald-600" />
                                        <span>Situation</span>
                                    </FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Where were you? What happened?"
                                            rows={2}
                                            className="resize-none min-h-[50px] text-xs border border-input p-2 focus-visible:border-primary focus-visible:ring-0 focus-visible:ring-offset-0"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>
                            )}
                        />
                    </motion.div>

                    <motion.div
                        variants={formFieldVariants}
                        initial="hidden"
                        animate="visible"
                        custom={2}
                    >
                        <FormField
                            control={form.control}
                            name="thought"
                            render={({ field }) => (
                                <FormItem className="space-y-1.5">
                                    <FormLabel className="text-xs flex items-center gap-1.5 mb-1">
                                        <Brain className="h-3.5 w-3.5 text-blue-600" />
                                        <span>Thought</span>
                                    </FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="What was going through your mind?"
                                            rows={2}
                                            className="resize-none min-h-[50px] text-xs border border-input p-2 focus-visible:border-primary focus-visible:ring-0 focus-visible:ring-offset-0"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>
                            )}
                        />
                    </motion.div>

                    <motion.div
                        variants={formFieldVariants}
                        initial="hidden"
                        animate="visible"
                        custom={3}
                    >
                        <FormField
                            control={form.control}
                            name="emotions"
                            render={({ field }) => (
                                <FormItem className="space-y-1.5">
                                    <FormLabel className="text-xs flex items-center gap-1.5 mb-1">
                                        <Heart className="h-3.5 w-3.5 text-rose-500" />
                                        <span>Emotions</span>
                                    </FormLabel>
                                    <FormControl>
                                        <EmotionSelect
                                            value={field.value || []}
                                            onChange={field.onChange}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>
                            )}
                        />
                    </motion.div>

                    <motion.div
                        variants={formFieldVariants}
                        initial="hidden"
                        animate="visible"
                        custom={4}
                    >
                        <FormField
                            control={form.control}
                            name="action"
                            render={({ field }) => (
                                <FormItem className="space-y-1.5">
                                    <FormLabel className="text-xs flex items-center gap-1.5 mb-1">
                                        <Activity className="h-3.5 w-3.5 text-amber-500" />
                                        <span>Action</span>
                                    </FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="What did you do or what can you do?"
                                            rows={2}
                                            className="resize-none min-h-[50px] text-xs border border-input p-2 focus-visible:border-primary focus-visible:ring-0 focus-visible:ring-offset-0"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>
                            )}
                        />
                    </motion.div>

                    <div className="pt-1">
                        <Button
                            type="submit"
                            className="w-full bg-wise-forest-green hover:bg-wise-forest-green/90 text-white h-8 text-xs"
                            size="sm"
                        >
                            {editMode ? "Update Record" : "Save Record"}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
};
