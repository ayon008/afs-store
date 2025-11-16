// hooks/useEditMode.js
'use client';
import { usePathname } from 'next/navigation';

export default function useEditMode() {
  const pathname = usePathname();
  return pathname?.startsWith('/edit');
}
