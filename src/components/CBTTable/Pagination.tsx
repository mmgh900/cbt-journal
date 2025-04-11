import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface PaginationProps {
  page: number;
  setPage: (page: number) => void;
  pageCount: number;
}

export const Pagination = ({ page, setPage, pageCount }: PaginationProps) => {
  if (pageCount <= 1) return null;

  return (
    <motion.div
      className="flex items-center justify-between sm:justify-end space-x-2 py-3 px-4 border-t border-border/20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      <motion.div
        className="text-xs text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        Page {page + 1} of {pageCount}
      </motion.div>
      <div className="flex gap-2">
        <motion.div
          initial={{ opacity: 0, x: -5 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.25 }}
        >
          <Button
            variant="outline"
            size="sm"
            className="h-8 text-xs border-border/50"
            onClick={() => setPage(Math.max(0, page - 1))}
            disabled={page === 0}
          >
            Previous
          </Button>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 5 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Button
            variant="outline"
            size="sm"
            className="h-8 text-xs border-border/50"
            onClick={() => setPage(Math.min(pageCount - 1, page + 1))}
            disabled={page === pageCount - 1}
          >
            Next
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};
