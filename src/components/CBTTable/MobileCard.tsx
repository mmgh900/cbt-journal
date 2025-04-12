import { motion } from 'framer-motion';
import { Brain, ThumbsUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { CBTRecord } from '../../store/cbtStore';
import { ActionButtons } from './ActionButtons';
import { DateFormatter } from './DateFormatter';
import { EmotionBadgeGroup } from './EmotionBadgeGroup';

interface MobileCardProps {
    record: CBTRecord;
    onEdit: (record: CBTRecord) => void;
    onDelete: (id: string) => void;
    onForAgainst: (record: CBTRecord) => void;
    index: number;
}

export const MobileCard = ({ record, onEdit, onDelete, onForAgainst, index }: MobileCardProps) => {
    const { t } = useTranslation();

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{
                duration: 0.3,
                delay: index * 0.05,
                ease: [0.23, 1.02, 0.34, 1]
            }}
        >
            <div className="flex justify-between items-start mb-3 ">
                <DateFormatter dateString={record.time} />
                <ActionButtons
                    record={record}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onForAgainst={onForAgainst}
                    compact
                />
            </div>

            <div className="flex flex-col gap-3">
                {/* Situation Section */}
                <div>
                    <h4 className="text-xs font-medium text-foreground/60 mb-1">{t('situation')}</h4>
                    <p className="text-sm">{record.situation}</p>
                </div>

                {/* Thought Section */}
                <div>
                    <h4 className="text-xs font-medium text-foreground/60 mb-1 flex items-center gap-1">
                        <Brain size={12} />
                        <span>{t('thoughts')}</span>
                    </h4>
                    <p className="text-sm font-medium">{record.thought}</p>
                </div>

                {/* Emotions Section */}
                <div>
                    <h4 className="text-xs font-medium text-foreground/60 mb-1">{t('emotions')}</h4>
                    <EmotionBadgeGroup
                        record={record}
                        showIntensity={true}
                        limit={3}
                    />
                </div>

                {/* Action Section */}
                <div>
                    <h4 className="text-xs font-medium text-foreground/60 mb-1 flex items-center gap-1">
                        <ThumbsUp size={12} />
                        <span>{t('behaviours')}</span>
                    </h4>
                    <p className="text-sm">{record.action}</p>
                </div>
            </div>
        </motion.div>
    );
};
