import { useState, useEffect } from "react";
import { LoginForm } from "@/components/cms/LoginForm";
import { CMSDashboard } from "@/components/cms/CMSDashboard";
import { User } from "@/types";
import { getStoredData, removeFromStorage, initializeDefaultUsers } from "@/utils/localStorage";

export default function CMSPage() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize default users
    initializeDefaultUsers();
    
    // Check for existing session
    const storedUser = getStoredData<User | null>('cms_current_user', null);
    setCurrentUser(storedUser);
    setIsLoading(false);
  }, []);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    removeFromStorage('cms_current_user');
    setCurrentUser(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gmina-primary"></div>
          <p className="mt-4 text-muted-foreground">Ładowanie...</p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return <CMSDashboard currentUser={currentUser} onLogout={handleLogout} />;
}