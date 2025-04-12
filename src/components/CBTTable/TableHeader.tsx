import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { Calendar, ChevronDown, Download, FileUp, Search, SortAsc, SortDesc } from 'lucide-react';
import { useTranslation } from 'react-i18next';
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

export const TableHeader = ({ globalFilter, setGlobalFilter, sortBy, setSortBy, records }: TableHeaderProps) => {
  const { t } = useTranslation();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sort options with translations
  const sortOptions: SortOption[] = [
    { label: t('No sorting'), value: 'none' },
    { label: t('Alphabetical'), value: 'alpha-asc', icon: <SortAsc size={14} /> },
    { label: t('Reverse alphabetical'), value: 'alpha-desc', icon: <SortDesc size={14} /> },
    { label: t('Date - Ascending'), value: 'time-asc', icon: <Calendar size={14} /> },
    { label: t('Date - Descending'), value: 'time-desc', icon: <Calendar size={14} /> },
    { label: t('Emotions - Ascending'), value: 'emotions-asc', icon: <SortAsc size={14} /> },
    { label: t('Emotions - Descending'), value: 'emotions-desc', icon: <SortDesc size={14} /> },
  ];

  // File upload handler
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      try {
        await importAndAddRecords(e.target.files[0]);
        toast.success(t("Records imported successfully"));
        e.target.value = "";
      } catch (error) {
        toast.error(t("Failed to import records"));
      }
    }
  };

  const handleExport = () => {
    if (records.length > 0) {
      exportToCSV(records);
      toast.success(t("Records exported successfully"));
    } else {
      toast.warning(t("There are no records to export"));
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
          <Search size={16} className="absolute left-2.5 top-2.5 text-muted-foreground" />
          <Input
            type="search"
            placeholder={t("Search records...")}
            className="pl-8 h-9 text-sm w-full"
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="h-9 px-3 gap-1 text-sm">
              <span>{t("Sort by")}</span>
              <ChevronDown size={16} className="text-muted-foreground" />
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
            <FileUp size={14} />
            {t("Import")}
          </Button>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="h-9 text-sm gap-1 border-border/60 flex-1 sm:flex-none"
          onClick={handleExport}
        >
          <Download size={14} />
          {t("Export")}
        </Button>
      </div>
    </motion.div>
  );
};
