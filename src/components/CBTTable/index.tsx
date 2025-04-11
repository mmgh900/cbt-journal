import { Toaster } from '@/components/ui/sonner';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import { CBTRecord, useCBTStore } from '../../store/cbtStore';
import { DeleteConfirmDialog } from './DeleteConfirmDialog';
import { DesktopTableView } from './DesktopTableView';
import { EditRecordDialog } from './EditRecordDialog';
import { EmptyState } from './EmptyState';
import { ForAgainstDialog } from './ForAgainstDialog';
import { MobileTableView } from './MobileTableView';
import { Pagination } from './Pagination';
import { TableHeader } from './TableHeader';

export const CBTTable: React.FC = () => {
  const { records, deleteRecord } = useCBTStore();
  const [globalFilter, setGlobalFilter] = useState('');
  const [editingRecord, setEditingRecord] = useState<CBTRecord | null>(null);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;
  const [showForAgainstModal, setShowForAgainstModal] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<CBTRecord | null>(null);
  const [sortBy, setSortBy] = useState<string>('time-desc');

  const confirmDelete = (id: string) => {
    setRecordToDelete(id);
    setShowDeleteAlert(true);
  };

  const handleDelete = () => {
    if (recordToDelete) {
      deleteRecord(recordToDelete);
      toast.success("Record deleted successfully");
      setShowDeleteAlert(false);
    }
  };

  const handleEdit = (record: CBTRecord) => {
    setEditingRecord({ ...record });
    setShowEditDialog(true);
  };

  const handleForAgainst = (record: CBTRecord) => {
    setCurrentRecord({ ...record });
    setShowForAgainstModal(true);
  };

  // Sorting and filtering function
  const sortedRecords = useMemo(() => {
    const filtered = records.filter(record => {
      if (!globalFilter) return true;
      const searchLower = globalFilter.toLowerCase();
      return (
        record.situation.toLowerCase().includes(searchLower) ||
        record.thought.toLowerCase().includes(searchLower) ||
        record.action.toLowerCase().includes(searchLower) ||
        record.emotions.some(e => e.name.toLowerCase().includes(searchLower))
      );
    });

    return [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'alpha-asc':
          return a.thought.localeCompare(b.thought);
        case 'alpha-desc':
          return b.thought.localeCompare(a.thought);
        case 'time-asc':
          return new Date(a.time).getTime() - new Date(b.time).getTime();
        case 'time-desc':
          return new Date(b.time).getTime() - new Date(a.time).getTime();
        case 'emotions-asc':
          return a.emotions.length - b.emotions.length;
        case 'emotions-desc':
          return b.emotions.length - a.emotions.length;
        default:
          return new Date(b.time).getTime() - new Date(a.time).getTime();
      }
    });
  }, [records, globalFilter, sortBy]);

  // Pagination with sorted records
  const paginatedRecords = sortedRecords.slice(page * rowsPerPage, (page + 1) * rowsPerPage);
  const pageCount = Math.ceil(sortedRecords.length / rowsPerPage);

  return (
    <>
      <Toaster position="bottom-right" />
      <div className="border-minimal rounded-md bg-background">
        <TableHeader
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
          sortBy={sortBy}
          setSortBy={setSortBy}
          records={records}
        />

        <div className="p-0">
          {sortedRecords.length > 0 ? (
            <>
              {/* Desktop Table View */}
              <DesktopTableView
                paginatedRecords={paginatedRecords}
                onEdit={handleEdit}
                onDelete={confirmDelete}
                onForAgainst={handleForAgainst}
              />

              {/* Mobile Card View */}
              <MobileTableView
                paginatedRecords={paginatedRecords}
                onEdit={handleEdit}
                onDelete={confirmDelete}
                onForAgainst={handleForAgainst}
              />

              {/* Pagination */}
              <Pagination
                page={page}
                setPage={setPage}
                pageCount={pageCount}
              />
            </>
          ) : (
            <EmptyState />
          )}
        </div>
      </div>

      {/* Edit Dialog */}
      <EditRecordDialog
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        recordToEdit={editingRecord}
      />

      {/* ForAgainst Dialog */}
      <ForAgainstDialog
        open={showForAgainstModal}
        onOpenChange={setShowForAgainstModal}
        record={currentRecord}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmDialog
        open={showDeleteAlert}
        onOpenChange={setShowDeleteAlert}
        onConfirm={handleDelete}
      />
    </>
  );
};
