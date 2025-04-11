import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Toaster } from '@/components/ui/sonner';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { Brain, Calendar, Download, FileUp, Pencil, Search, ThumbsUp, Trash2 } from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'sonner';
import { CBTRecord, useCBTStore } from '../store/cbtStore';
import { exportToCSV, importAndAddRecords } from '../utils/csvUtils';
import { getEmotionBgColor, getEmotionData, getEmotionTextColor } from '../utils/emotionUtils';
import { CBTForm } from './CBTForm';

export const CBTTable: React.FC = () => {
    const { records, deleteRecord } = useCBTStore();
    const [globalFilter, setGlobalFilter] = useState('');
    const [editingRecord, setEditingRecord] = useState<CBTRecord | null>(null);
    const [showEditDialog, setShowEditDialog] = useState(false);
    const [showDeleteAlert, setShowDeleteAlert] = useState(false);
    const [recordToDelete, setRecordToDelete] = useState<string | null>(null);
    const [page, setPage] = useState(0);
    const rowsPerPage = 10;

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

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleString();
    };

    // Filtering function
    const filteredRecords = records.filter(record => {
        if (!globalFilter) return true;
        const searchLower = globalFilter.toLowerCase();
        return (
            record.situation.toLowerCase().includes(searchLower) ||
            record.thought.toLowerCase().includes(searchLower) ||
            record.action.toLowerCase().includes(searchLower) ||
            record.emotions.some(e => e.name.toLowerCase().includes(searchLower))
        );
    });

    // Pagination
    const paginatedRecords = filteredRecords.slice(page * rowsPerPage, (page + 1) * rowsPerPage);
    const pageCount = Math.ceil(filteredRecords.length / rowsPerPage);

    // File upload handler
    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            try {
                await importAndAddRecords(e.target.files[0]);
                toast.success("Records imported successfully");
                e.target.value = "";
            } catch (error) {
                toast.error("Failed to import records");
            }
        }
    };

    const handleExport = () => {
        if (records.length > 0) {
            exportToCSV(records);
            toast.success("Records exported successfully");
        } else {
            toast.warning("There are no records to export");
        }
    };

    // Custom styled emotion badge
    const CustomEmotionBadge = ({ emotion }: { emotion: any }) => {
        const emotionData = getEmotionData(emotion);
        const bgColor = emotionData.bgColor || getEmotionBgColor(emotion);
        const textColor = emotionData.textColor || getEmotionTextColor(emotion);

        return (
            <div
                className="inline-flex items-center rounded-md px-1.5 py-0.5 text-xs font-normal"
                style={{
                    backgroundColor: bgColor,
                    color: textColor
                }}
            >
                <span className="mr-1">{emotionData.emoji}</span>
                <span>{emotion.name}</span>
            </div>
        );
    };

    const EmotionBadges = ({ record }: { record: CBTRecord }) => {
        if (!record || !record.emotions || !Array.isArray(record.emotions) || record.emotions.length === 0) {
            return <div>-</div>;
        }

        return (
            <div className="flex flex-wrap gap-1">
                {record.emotions.slice(0, 2).map(emotion => (
                    emotion && (
                        <motion.div
                            key={emotion.id}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.2 }}
                        >
                            <CustomEmotionBadge emotion={emotion} />
                        </motion.div>
                    )
                ))}
                {record.emotions.length > 2 && (
                    <div className="inline-flex items-center rounded-md px-1.5 py-0.5 text-xs font-normal bg-muted text-muted-foreground">
                        +{record.emotions.length - 2}
                    </div>
                )}
            </div>
        );
    };

    const EmptyState = () => (
        <motion.div
            className="flex flex-col items-center justify-center p-6 text-center border-t"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            <div className="rounded-full bg-muted w-10 h-10 flex items-center justify-center mb-2">
                <Search className="h-5 w-5 text-muted-foreground" />
            </div>
            <h3 className="font-medium text-base">No records found</h3>
            <p className="text-muted-foreground text-sm mt-1">Add a new record using the form</p>
        </motion.div>
    );

    // Card view for mobile
    const MobileCardView = ({ record }: { record: CBTRecord }) => (
        <motion.div
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="border-minimal p-3 mb-2 rounded-md"
        >
            <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-1 text-xs text-foreground/70">
                    <Calendar className="h-3 w-3" />
                    <span>{formatDate(record.time)}</span>
                </div>
                <div className="flex gap-1">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(record)}
                        className="h-6 w-6"
                    >
                        <Pencil className="h-3 w-3" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => confirmDelete(record.id)}
                        className="h-6 w-6 text-destructive hover:text-destructive/90"
                    >
                        <Trash2 className="h-3 w-3" />
                    </Button>
                </div>
            </div>

            <div className="mb-1.5">
                <div className="text-xs text-muted-foreground mb-0.5">Situation</div>
                <div className="text-xs">{record.situation}</div>
            </div>

            <div className="mb-1.5">
                <div className="text-xs text-muted-foreground mb-0.5 flex items-center gap-1">
                    <Brain className="h-3 w-3" />
                    <span>Thought</span>
                </div>
                <div className="text-xs">{record.thought}</div>
            </div>

            <div className="mb-1.5">
                <div className="text-xs text-muted-foreground mb-0.5">Emotions</div>
                <EmotionBadges record={record} />
            </div>

            <div>
                <div className="text-xs text-muted-foreground mb-0.5 flex items-center gap-1">
                    <ThumbsUp className="h-3 w-3" />
                    <span>Action</span>
                </div>
                <div className="text-xs">{record.action}</div>
            </div>
        </motion.div>
    );

    return (
        <>
            <Toaster position="bottom-right" />
            <div className="border-minimal rounded-md bg-background">
                <div className="p-3 px-4 flex flex-col sm:flex-row items-center justify-between gap-2 border-b">
                    <div className="relative flex-1 w-full max-w-full sm:max-w-sm">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
                        <Input
                            type="search"
                            placeholder="Search records..."
                            className="pl-8 h-8 text-sm"
                            value={globalFilter}
                            onChange={(e) => setGlobalFilter(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-2 w-full sm:w-auto mt-2 sm:mt-0">
                        <div className="relative flex-1 sm:flex-none">
                            <Input
                                type="file"
                                id="file-upload"
                                accept=".csv"
                                onChange={handleFileChange}
                                className="hidden"
                            />
                            <Button
                                variant="outline"
                                size="sm"
                                className="h-8 text-xs gap-1 border-border/60 w-full sm:w-auto"
                                onClick={() => document.getElementById('file-upload')?.click()}
                            >
                                <FileUp className="h-3.5 w-3.5" />
                                Import
                            </Button>
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            className="h-8 text-xs gap-1 border-border/60 flex-1 sm:flex-none"
                            onClick={handleExport}
                        >
                            <Download className="h-3.5 w-3.5" />
                            Export
                        </Button>
                    </div>
                </div>
                <div className="p-0">
                    {filteredRecords.length > 0 ? (
                        <>
                            {/* Desktop Table View */}
                            <div className="hidden sm:block">
                                <div className="rounded-none">
                                    <Table>
                                        <TableHeader>
                                            <TableRow className="border-b border-border/60 hover:bg-transparent">
                                                <TableHead className="w-[150px] py-2 text-xs font-medium">Time</TableHead>
                                                <TableHead className="py-2 text-xs font-medium">Situation</TableHead>
                                                <TableHead className="py-2 text-xs font-medium">Thought</TableHead>
                                                <TableHead className="w-[150px] py-2 text-xs font-medium">Emotions</TableHead>
                                                <TableHead className="py-2 text-xs font-medium">Action</TableHead>
                                                <TableHead className="w-[70px] text-right py-2 text-xs font-medium">Actions</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {paginatedRecords.map((record) => (
                                                <TableRow key={record.id} className="border-b border-border/40">
                                                    <TableCell className="py-2 text-xs font-medium text-foreground/80">
                                                        {formatDate(record.time)}
                                                    </TableCell>
                                                    <TableCell className="py-2 text-xs">
                                                        {record.situation}
                                                    </TableCell>
                                                    <TableCell className="py-2 text-xs">
                                                        {record.thought}
                                                    </TableCell>
                                                    <TableCell className="py-2">
                                                        <EmotionBadges record={record} />
                                                    </TableCell>
                                                    <TableCell className="py-2 text-xs">
                                                        {record.action}
                                                    </TableCell>
                                                    <TableCell className="py-2 text-right">
                                                        <div className="flex justify-end gap-0">
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                onClick={() => handleEdit(record)}
                                                                className="h-7 w-7"
                                                            >
                                                                <Pencil className="h-3.5 w-3.5" />
                                                            </Button>
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                onClick={() => confirmDelete(record.id)}
                                                                className="h-7 w-7 text-destructive hover:text-destructive/90"
                                                            >
                                                                <Trash2 className="h-3.5 w-3.5" />
                                                            </Button>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                            </div>

                            {/* Mobile Card View */}
                            <div className="sm:hidden px-3 py-2">
                                <AnimatePresence>
                                    {paginatedRecords.map((record) => (
                                        <MobileCardView key={record.id} record={record} />
                                    ))}
                                </AnimatePresence>
                            </div>

                            {/* Pagination */}
                            {pageCount > 1 && (
                                <div className="flex items-center justify-end space-x-2 py-3 px-4 border-t border-border/40">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="h-7 text-xs border-border/60"
                                        onClick={() => setPage(Math.max(0, page - 1))}
                                        disabled={page === 0}
                                    >
                                        Previous
                                    </Button>
                                    <div className="text-xs text-muted-foreground">
                                        Page {page + 1} of {pageCount}
                                    </div>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="h-7 text-xs border-border/60"
                                        onClick={() => setPage(Math.min(pageCount - 1, page + 1))}
                                        disabled={page === pageCount - 1}
                                    >
                                        Next
                                    </Button>
                                </div>
                            )}
                        </>
                    ) : (
                        <EmptyState />
                    )}
                </div>
            </div>

            <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
                <DialogContent className="sm:max-w-[600px] border-minimal">
                    {editingRecord && (
                        <CBTForm
                            editMode={true}
                            recordToEdit={editingRecord}
                            onEditComplete={() => setShowEditDialog(false)}
                        />
                    )}
                </DialogContent>
            </Dialog>

            <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
                <AlertDialogContent className="border-minimal">
                    <AlertDialogHeader className="space-y-1">
                        <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
                        <AlertDialogDescription className="text-sm">
                            Are you sure you want to delete this record? This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel className="h-8 text-xs">Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            className="h-8 text-xs bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};
