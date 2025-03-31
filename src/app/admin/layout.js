
'use client';
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from '@clerk/nextjs';

export default function AdminLayout({ children }) {
  return (
    <ClerkProvider>
      <div className="p-6 text-white">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold font-serif">Admin Dashboard</h1>
          <div>
            <SignedOut>
              <SignInButton mode="modal" />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </header>
        {children}
      </div>
    </ClerkProvider>
  );
}