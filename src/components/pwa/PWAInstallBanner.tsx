import React, { useState, useEffect } from 'react';
import { X, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const PWAInstallBanner: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    console.log('PWAInstallBanner: Setting up beforeinstallprompt listener');

    const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
      console.log('PWAInstallBanner: beforeinstallprompt event fired');
      e.preventDefault();
      setDeferredPrompt(e);
      setShowBanner(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt as EventListener);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt as EventListener);
    };
  }, []);

  const handleInstallClick = async () => {
    console.log('PWAInstallBanner: Install button clicked');
    
    if (!deferredPrompt) {
      console.log('PWAInstallBanner: No deferred prompt available');
      return;
    }

    deferredPrompt.prompt();
    const choiceResult = await deferredPrompt.userChoice;
    
    console.log('PWAInstallBanner: User choice:', choiceResult.outcome);
    
    if (choiceResult.outcome === 'accepted') {
      console.log('PWAInstallBanner: User accepted the install prompt');
    } else {
      console.log('PWAInstallBanner: User dismissed the install prompt');
    }

    setDeferredPrompt(null);
    setShowBanner(false);
  };

  const handleDismiss = () => {
    console.log('PWAInstallBanner: Banner dismissed by user');
    setShowBanner(false);
  };

  if (!showBanner) {
    return null;
  }

  return (
    <div className="fixed top-16 left-0 right-0 bg-blue-600 text-white p-3 z-40 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Download className="h-5 w-5" />
          <div>
            <p className="font-medium">Install Posttrr App</p>
            <p className="text-xs text-blue-100">Get the full experience on your device</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            size="sm"
            variant="secondary"
            onClick={handleInstallClick}
            className="bg-white text-blue-600 hover:bg-gray-100"
          >
            Install
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={handleDismiss}
            className="text-white hover:bg-blue-700"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PWAInstallBanner;