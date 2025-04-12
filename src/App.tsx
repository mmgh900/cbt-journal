
// Our components
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CBTTable } from './components/CBTTable';
import { EditRecordDialog } from './components/CBTTable/EditRecordDialog';
import { Navbar } from './components/Navbar';
import { ThemeWrapper } from './components/ThemeWrapper';
import i18n from './lib/i18n';
import { useLanguageStore } from './store/languageStore';

function App() {
    const { language } = useLanguageStore();
    const { t } = useTranslation();
    const [showDialog, setShowDialog] = useState(false);

    // Initialize i18n with stored language on app load
    useEffect(() => {
        i18n.changeLanguage(language);
    }, [language]);

    return (
        <ThemeWrapper>
            <div className="flex flex-col min-h-screen">
                <Navbar />

                <div className="flex-grow p-3">
                    <div className="w-full">
                        <CBTTable />
                    </div>
                </div>

                {/* Floating Action Button */}
                <Button
                    className="fixed bottom-6 right-6 rounded-full h-14 w-14 p-0 shadow-lg bg-wise-forest-green hover:bg-wise-forest-green/90 text-white"
                    onClick={() => setShowDialog(true)}
                >
                    <Plus className="h-6 w-6" />
                    <span className="sr-only">{t('addEntry')}</span>
                </Button>

                {/* Add/Edit Dialog */}
                <EditRecordDialog
                    open={showDialog}
                    onOpenChange={setShowDialog}
                    recordToEdit={null}
                />
            </div>
        </ThemeWrapper>
    );
}

export default App;
