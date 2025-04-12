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
        <div className="sm:hidden ">
            <AnimatePresence mode="wait">
                {paginatedRecords.map((record, index) => (
                    <>
<MobileCard
                        key={record.id}
                        record={record}
                        onEdit={onEdit}
                        onDelete={onDelete}
                        onForAgainst={onForAgainst}
                        index={index}
                    />
                    <div className='h-[1px] w-full bg-neutral-200 my-3'/>
                    </>
                ))}
            </AnimatePresence>
        </div>
    );
};
