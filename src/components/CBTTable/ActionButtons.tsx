import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Pencil, Scale, Trash2 } from 'lucide-react';
import { memo } from 'react';
import { CBTRecord } from '../../store/cbtStore';

interface ActionButtonsProps {
    record: CBTRecord;
    onEdit: (record: CBTRecord) => void;
    onDelete: (id: string) => void;
    onForAgainst: (record: CBTRecord) => void;
    compact?: boolean;
}

export const ActionButtons = memo(({
    record,
    onEdit,
    onDelete,
    onForAgainst,
    compact = false
}: ActionButtonsProps) => {
    const buttonSize = compact ? "h-6 w-6" : "h-7 w-7";
    const iconSize = compact ? "" : "h-3.5 w-3.5";

    return (
        <motion.div
            className={`flex ${compact ? 'gap-1' : 'justify-end gap-0'}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
        >
            <Button
                variant="ghost"
                size="icon"
                onClick={() => onForAgainst(record)}
                className={` text-muted-foreground hover:text-foreground`}
                title="Evidence For/Against"
            >
                <Scale className={iconSize} />
            </Button>
            <Button
                variant="ghost"
                size="icon"
                onClick={() => onEdit(record)}
                className={` text-muted-foreground hover:text-foreground`}
            >
                <Pencil className={iconSize} />
            </Button>
            <Button
                variant="ghost"
                size="icon"
                onClick={() => onDelete(record.id)}
                className={` text-destructive/70 hover:text-destructive`}
            >
                <Trash2 className={iconSize} />
            </Button>
        </motion.div>
    );
});
