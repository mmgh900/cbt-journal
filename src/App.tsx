// PrimeReact imports
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.min.css';

// Our components
import { CBTForm } from './components/CBTForm';
import { CBTTable } from './components/CBTTable';
import { Navbar } from './components/Navbar';
import { ThemeWrapper } from './components/ThemeWrapper';

function App() {
    return (
        <ThemeWrapper>
            <div className="flex flex-col min-h-screen ">
                <Navbar />

                <div className="flex-grow p-3">
                    <div className="w-full">
                        {/* Mobile Layout - Stack form and table */}
                        <div className="block lg:hidden space-y-3">
                            <CBTForm />
                            <CBTTable />
                        </div>

                        {/* Desktop Layout - Table on left, Form on right */}
                        <div className="hidden lg:flex w-full gap-3">
                            <div className="w-3/4">
                                <CBTTable />
                            </div>
                            <div className="w-1/4">
                                <div className="sticky top-4">
                                    <CBTForm />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ThemeWrapper>
    );
}

export default App;
