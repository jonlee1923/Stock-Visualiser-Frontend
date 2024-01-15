import Dashboard from "@/components/Dashboard";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";

export default function Home() {
            // bg-gradient-to-r from-slate-500 to-slate-300

    return (
        <main className="flex-col min-h-screen min-w-screen">
            <div><Toaster/></div>
            <Navbar />
            <Dashboard />
        </main>
    );
}
