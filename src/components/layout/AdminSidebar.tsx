import Link from "next/link";
import { LayoutDashboard, FileText, Globe, File, Mail, Plus } from "lucide-react";

export function AdminSidebar() {
  return (
    <aside className="fixed left-0 top-0 h-full w-[280px] bg-primary-container text-on-primary-container flex flex-col py-6 px-4 shadow-sm z-50">
      <div className="mb-10 px-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-on-primary rounded-lg flex items-center justify-center overflow-hidden">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWg4vXGf--BIRzli6uaoL7eMvoj6u0nyqgKMopCTCGZztbIreQS_e-d21kzSKV_VDD6Rvc2oo7H55utQpabApQXALs7cu5R403R9cNOBtQnxxqQME95h2f9w2FZ18XBgIZpKOFHT2UX2PiBqkbGvJoiy0MZjmQ7KR9ajdDOJWp8Ox6NP7n0QousSJ9cvkKhrYfGUJ6of9h5KutA8mJJDVfMSy6489IZKStBTVxHLFIU_WgyO494zHhkfnLXV74RRkP0JCugv3EFjcc" 
              alt="PUP University Logo" 
              className="w-8 h-8"
            />
          </div>
          <div>
            <h1 className="font-headline-lg text-[20px] font-bold text-on-primary leading-tight">
              PUP Exchange
            </h1>
            <p className="font-label-md text-on-primary/70">
              Student Portal
            </p>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-1">
        <Link 
          href="/admin/dashboard"
          className="flex items-center gap-3 border-l-4 border-secondary bg-white/10 text-on-primary font-bold py-3 px-4 transition-transform scale-[0.99]"
        >
          <LayoutDashboard className="h-5 w-5" />
          <span className="font-label-md">Dashboard</span>
        </Link>
        <Link 
          href="#"
          className="flex items-center gap-3 text-on-primary/70 hover:text-on-primary hover:bg-white/5 py-3 px-4 transition-all duration-200"
        >
          <FileText className="h-5 w-5" />
          <span className="font-label-md">Applications</span>
        </Link>
        <Link 
          href="#"
          className="flex items-center gap-3 text-on-primary/70 hover:text-on-primary hover:bg-white/5 py-3 px-4 transition-all duration-200"
        >
          <Globe className="h-5 w-5" />
          <span className="font-label-md">Exchange Programs</span>
        </Link>
        <Link 
          href="#"
          className="flex items-center gap-3 text-on-primary/70 hover:text-on-primary hover:bg-white/5 py-3 px-4 transition-all duration-200"
        >
          <File className="h-5 w-5" />
          <span className="font-label-md">Documents</span>
        </Link>
        <Link 
          href="#"
          className="flex items-center gap-3 text-on-primary/70 hover:text-on-primary hover:bg-white/5 py-3 px-4 transition-all duration-200"
        >
          <Mail className="h-5 w-5" />
          <span className="font-label-md">Messages</span>
        </Link>
      </nav>

      <div className="mt-auto px-4">
        <button className="w-full bg-secondary text-on-secondary font-label-md py-3 rounded-lg hover:brightness-110 transition-all flex items-center justify-center gap-2">
          <Plus className="h-5 w-5" />
          Start Application
        </button>
      </div>
    </aside>
  );
}
