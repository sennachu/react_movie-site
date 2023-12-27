import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ClerkProvider, RedirectToSignIn, SignIn, SignUp, SignedIn, SignedOut } from "@clerk/clerk-react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import ProtectedPage from "./ProtectedPage";
import SearchPage from "./pages/searchPage.jsx";
import Aksiyon from "./components/Aksiyon.jsx";
import Komedi from "./components/Komedi.jsx";
import Dram from "./components/Dram.jsx";

//if (!process.env.REACT_APP_CLERK_PUBLISHABLE_KEY) {
//  throw new Error("Missing Publishable Key");
//}
const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

const root = ReactDOM.createRoot(document.getElementById("root"));

const ClerkWithRoutes = () => {
  const navigate = useNavigate();

  return (
    <ClerkProvider
      publishableKey={clerkPubKey}
      navigate={(to) => navigate(to)}
    >
      <Routes>
        <Route path="/" element={<App />} />
        <Route
          path="/sign-in/*"
          element={<SignIn redirectUrl={'/Ana_Sayfa'} routing="path" path="/sign-in" />}
        />
        <Route
          path="/sign-up/*"
          element={<SignUp redirectUrl={'/Ana_Sayfa'} routing="path" path="/sign-up" />}
        />
        <Route>
          <Route path="/search/:query" element={<SearchPage />} />
        </Route>
        <Route
          path="/Ana_Sayfa"
          element={
            <>
            <SignedIn>
              <ProtectedPage />
            </SignedIn>
             <SignedOut>
              <RedirectToSignIn />
           </SignedOut>
            </>
          }
        />
        <Route path="/Aksiyon" element={<Aksiyon redirectUrl={'/Aksiyon'} routing="path" />}/>
        <Route path="/Komedi" element={<Komedi redirectUrl={'/Komedi'} routing="path" />} />
        <Route path="/Dram" element={<Dram redirectUrl={'/Dram'} routing="path" />} />
        </Routes>
    </ClerkProvider>
  );
};

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ClerkWithRoutes />
    </BrowserRouter>
  </React.StrictMode>
);
