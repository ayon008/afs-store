// ✅ TopBar or Navbar Edit Mode Link
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../context/AuthContext';

export default function TopBar() {
  const { isLoggedIn, logout, username } = useAuth();
  const pathname = usePathname();

  if (!isLoggedIn) return null;


  return (
    <div className="fixed top-0 left-0 w-full bg-black text-white text-sm z-50 flex justify-between items-center px-4 py-2 shadow-md">
      <div className="font-semibold flex items-center gap-4">
        {username} — Logged in
 
      </div>
      <button
        onClick={logout}
        className="bg-red-800 hover:bg-red-700 text-white px-3 py-1 rounded cursor-pointer" // red button
      >
        Logout
      </button>
    </div>
  );
}  
