import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const EmptyState = () => {
  const { t } = useTranslation();

  return (
    <motion.div
      className="flex flex-col items-center justify-center p-8 text-center border-t border-border/20"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <motion.div
        className="rounded-full bg-muted/50 w-12 h-12 flex items-center justify-center mb-3"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, duration: 0.3 }}
      >
        <Search className="h-5 w-5 text-muted-foreground" />
      </motion.div>
      <motion.h3
        className="font-medium text-base"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.3 }}
      >
        {t('noEntries')}
      </motion.h3>
      <motion.p
        className="text-muted-foreground text-sm mt-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.3 }}
      >
        {t('addEntry')}
      </motion.p>
    </motion.div>
  );
};
