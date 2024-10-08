import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";

import ViewInsurance from "./scenes/ViewInsurance";
import ViewSpeciality from "./scenes/ViewSpeciality";
import ViewLanguage from "./scenes/ViewLanguage";
import ViewProvider from "./scenes/ViewProvider";
import ViewPractice from "./scenes/ViewPractice";





import Insuranceform from "./scenes/Insuranceform";
import LanguageForm from "./scenes/LanguageForm";
import SpecialityForm from "./scenes/SpecialityForm";
import PracticeForm from "./scenes/PracticeForm";
import ProviderForm from "./scenes/ProviderForm";


import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/viewinsurance" element={<ViewInsurance/>} />
              <Route path="/viewspeciality" element={<ViewSpeciality />} />
              <Route path="/viewlanguage" element={<ViewLanguage />} />
              <Route path="/viewprovider" element={<ViewProvider />} />
              <Route path="/viewpractice" element={<ViewPractice />} />


              
              <Route path="/insuranceform" element={<Insuranceform />} />
              <Route path="/languageform" element={<LanguageForm />} />
              <Route path="/specialityform" element={<SpecialityForm />} />
              <Route path="/practiceform" element={<PracticeForm />} />
              <Route path="/providerform" element={< ProviderForm/>} />

              

              











              {/* <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/line" element={<Line />} />
              <Route path="/faq" element={<FAQ />} /> */}
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/geography" element={<Geography />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
