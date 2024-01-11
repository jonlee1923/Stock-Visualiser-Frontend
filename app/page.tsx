import Dashboard from "@/components/Dashboard";
import Navbar from "@/components/Navbar";

export default function Home() {
            // bg-gradient-to-r from-slate-500 to-slate-300

    return (
        <main className="flex-col min-h-screen min-w-screen">
            <Navbar />
            <Dashboard />
        </main>
    );
}
