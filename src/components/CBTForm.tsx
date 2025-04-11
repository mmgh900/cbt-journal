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
  onEditComplete = () => {}
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
    <div className={`bg-background ${!editMode ? 'border-minimal rounded-md p-4' : 'p-0'}`}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                <FormItem className="space-y-2">
                  <FormLabel className="text-sm flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-emerald-600" />
                    <span>Situation</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Where were you? What happened?"
                      rows={2}
                      className="resize-none min-h-[60px] text-sm border-dashed focus-visible:border-solid"
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
                <FormItem className="space-y-2">
                  <FormLabel className="text-sm flex items-center gap-2">
                    <Brain className="h-4 w-4 text-blue-600" />
                    <span>Thought</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="What was going through your mind?"
                      rows={2}
                      className="resize-none min-h-[60px] text-sm border-dashed focus-visible:border-solid"
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
                <FormItem className="space-y-2">
                  <FormLabel className="text-sm flex items-center gap-2">
                    <Heart className="h-4 w-4 text-rose-500" />
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
                <FormItem className="space-y-2">
                  <FormLabel className="text-sm flex items-center gap-2">
                    <Activity className="h-4 w-4 text-amber-500" />
                    <span>Action</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="What did you do or what can you do?"
                      rows={2}
                      className="resize-none min-h-[60px] text-sm border-dashed focus-visible:border-solid"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </motion.div>

          <div className="pt-2">
            <Button
              type="submit"
              className="w-full bg-wise-forest-green hover:bg-wise-forest-green/90 text-white"
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
