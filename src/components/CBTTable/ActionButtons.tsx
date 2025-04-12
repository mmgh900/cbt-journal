import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Pencil, Scale, Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { CBTRecord } from '../../store/cbtStore';

interface ActionButtonsProps {
    record: CBTRecord;
    onEdit: (record: CBTRecord) => void;
    onDelete: (id: string) => void;
    onForAgainst: (record: CBTRecord) => void;
    compact?: boolean;
}

export const ActionButtons = memo(function ActionButtons({
    record,
    onEdit,
    onDelete,
    onForAgainst,
    compact = false
}: ActionButtonsProps) {
    const { t } = useTranslation();
    const iconSize = compact ? 14 : 16;

    return (
        <div className="flex items-center gap-1">
            <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <Button
                    onClick={() => onEdit(record)}
                    size={compact ? "sm" : "default"}
                    variant="ghost"
                    className="h-7 rounded-md px-2"
                    title={t('edit')}
                >
                    <Pencil size={iconSize} />
                </Button>
            </motion.div>

            <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <Button
                    onClick={() => onDelete(record.id)}
                    size={compact ? "sm" : "default"}
                    variant="ghost"
                    className="h-7 rounded-md px-2 text-destructive"
                    title={t('delete')}
                >
                    <Trash2 size={iconSize} />
                </Button>
            </motion.div>

            <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <Button
                    onClick={() => onForAgainst(record)}
                    size={compact ? "sm" : "default"}
                    variant="ghost"
                    className="h-7 rounded-md px-2"
                    title={t('alternativeThoughts')}
                >
                    <Scale size={iconSize} />
                </Button>
            </motion.div>
        </div>
    );
});
