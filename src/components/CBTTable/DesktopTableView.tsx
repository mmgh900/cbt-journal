import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AnimatePresence, motion } from 'framer-motion';
import { CBTRecord } from '../../store/cbtStore';
import { ActionButtons } from './ActionButtons';
import { DateFormatter, getFullDateTime } from './DateFormatter';
import { EmotionBadgeGroup } from './EmotionBadgeGroup';

interface DesktopTableViewProps {
  paginatedRecords: CBTRecord[];
  onEdit: (record: CBTRecord) => void;
  onDelete: (id: string) => void;
  onForAgainst: (record: CBTRecord) => void;
}

export const DesktopTableView = ({
  paginatedRecords,
  onEdit,
  onDelete,
  onForAgainst
}: DesktopTableViewProps) => {
  return (
    <div className="hidden sm:block">
      <div className="rounded-none">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-border/60 hover:bg-transparent">
              <TableHead className="w-[150px] py-2.5 text-xs font-medium text-foreground/70">Time</TableHead>
              <TableHead className="py-2.5 text-xs font-medium text-foreground/70">Situation</TableHead>
              <TableHead className="py-2.5 text-xs font-medium text-foreground/70">Thought</TableHead>
              <TableHead className="w-[150px] py-2.5 text-xs font-medium text-foreground/70">Emotions</TableHead>
              <TableHead className="py-2.5 text-xs font-medium text-foreground/70">Action</TableHead>
              <TableHead className="w-[70px] text-right py-2.5 text-xs font-medium text-foreground/70">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <AnimatePresence>
              {paginatedRecords.map((record, index) => (
                <motion.tr
                  key={record.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.05,
                    ease: "easeOut"
                  }}
                  className="border-b border-border/20 hover:bg-muted/30 transition-colors"
                >
                  <TableCell
                    className="py-2.5 text-xs font-medium text-foreground/80"
                    title={getFullDateTime(record.time)}
                  >
                    <DateFormatter dateString={record.time} />
                  </TableCell>
                  <TableCell className="py-2.5 text-xs">
                    {record.situation}
                  </TableCell>
                  <TableCell className="py-2.5 text-xs">
                    {record.thought}
                  </TableCell>
                  <TableCell className="py-2.5">
                    <EmotionBadgeGroup record={record} />
                  </TableCell>
                  <TableCell className="py-2.5 text-xs">
                    {record.action}
                  </TableCell>
                  <TableCell className="py-2.5 text-right">
                    <ActionButtons
                      record={record}
                      onEdit={onEdit}
                      onDelete={onDelete}
                      onForAgainst={onForAgainst}
                    />
                  </TableCell>
                </motion.tr>
              ))}
            </AnimatePresence>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
