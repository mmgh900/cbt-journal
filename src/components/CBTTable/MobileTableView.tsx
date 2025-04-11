import { AnimatePresence } from 'framer-motion';
import { CBTRecord } from '../../store/cbtStore';
import { MobileCard } from './MobileCard';

interface MobileTableViewProps {
  paginatedRecords: CBTRecord[];
  onEdit: (record: CBTRecord) => void;
  onDelete: (id: string) => void;
  onForAgainst: (record: CBTRecord) => void;
}

export const MobileTableView = ({
  paginatedRecords,
  onEdit,
  onDelete,
  onForAgainst
}: MobileTableViewProps) => {
  return (
    <div className="sm:hidden px-3 py-2">
      <AnimatePresence mode="wait">
        {paginatedRecords.map((record, index) => (
          <MobileCard
            key={record.id}
            record={record}
            onEdit={onEdit}
            onDelete={onDelete}
            onForAgainst={onForAgainst}
            index={index}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};
