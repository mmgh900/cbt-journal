import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { Calendar, ChevronDown, Download, FileUp, Search, SortAsc, SortDesc } from 'lucide-react';
import { useRef } from 'react';
import { toast } from 'sonner';
import { importAndAddRecords, exportToCSV } from '../../utils/csvUtils';
import { CBTRecord } from '../../store/cbtStore';

export type SortOption = {
  label: string;
  value: string;
  icon?: React.ReactNode;
};

interface TableHeaderProps {
  globalFilter: string;
  setGlobalFilter: (value: string) => void;
  sortBy: string;
  setSortBy: (value: string) => void;
  records: CBTRecord[];
}

export const sortOptions: SortOption[] = [
  { label: 'No sorting', value: 'none' },
  { label: 'Alphabetical', value: 'alpha-asc', icon: <SortAsc className="h-3.5 w-3.5" /> },
  { label: 'Reverse alphabetical', value: 'alpha-desc', icon: <SortDesc className="h-3.5 w-3.5" /> },
  { label: 'Date - Ascending', value: 'time-asc', icon: <Calendar className="h-3.5 w-3.5" /> },
  { label: 'Date - Descending', value: 'time-desc', icon: <Calendar className="h-3.5 w-3.5" /> },
  { label: 'Emotions - Ascending', value: 'emotions-asc', icon: <SortAsc className="h-3.5 w-3.5" /> },
  { label: 'Emotions - Descending', value: 'emotions-desc', icon: <SortDesc className="h-3.5 w-3.5" /> },
];

export const TableHeader = ({ globalFilter, setGlobalFilter, sortBy, setSortBy, records }: TableHeaderProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  return (
    <motion.div
      className="p-3 px-4 flex flex-col sm:flex-row items-center justify-between gap-3 border-b"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center gap-3 w-full">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search records..."
            className="pl-8 h-9 text-sm w-full"
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="h-9 px-3 gap-1 text-sm">
              <span>Sort by</span>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[220px]">
            <DropdownMenuRadioGroup value={sortBy} onValueChange={setSortBy}>
              {sortOptions.map((option) => (
                <DropdownMenuRadioItem key={option.value} value={option.value} className="gap-2">
                  {option.icon}
                  <span>{option.label}</span>
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex items-center gap-2 w-full sm:w-auto mt-2 sm:mt-0">
        <div className="relative flex-1 sm:flex-none">
          <input
            type="file"
            id="file-upload"
            ref={fileInputRef}
            accept=".csv"
            onChange={handleFileChange}
            className="hidden"
          />
          <Button
            variant="outline"
            size="sm"
            className="h-9 text-sm gap-1 border-border/60 w-full sm:w-auto"
            onClick={() => fileInputRef.current?.click()}
          >
            <FileUp className="h-3.5 w-3.5" />
            Import
          </Button>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="h-9 text-sm gap-1 border-border/60 flex-1 sm:flex-none"
          onClick={handleExport}
        >
          <Download className="h-3.5 w-3.5" />
          Export
        </Button>
      </div>
    </motion.div>
  );
};
