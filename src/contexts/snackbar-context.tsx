'use client';

import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';

export type SnackbarType = 'success' | 'error' | 'warning' | 'info';

export interface SnackbarMessage {
  id: string;
  type: SnackbarType;
  title: string;
  message: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface SnackbarContextType {
  showSnackbar: (message: Omit<SnackbarMessage, 'id'>) => void;
  showSuccess: (title: string, message: string, options?: Partial<SnackbarMessage>) => void;
  showError: (title: string, message: string, options?: Partial<SnackbarMessage>) => void;
  showWarning: (title: string, message: string, options?: Partial<SnackbarMessage>) => void;
  showInfo: (title: string, message: string, options?: Partial<SnackbarMessage>) => void;
  hideSnackbar: (id: string) => void;
  clearAllSnackbars: () => void;
  messages: SnackbarMessage[];
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined);

interface SnackbarProviderProps {
  children: ReactNode;
}

export const SnackbarProvider: React.FC<SnackbarProviderProps> = ({ children }) => {
  const [messages, setMessages] = useState<SnackbarMessage[]>([]);

  const showSnackbar = useCallback((message: Omit<SnackbarMessage, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newMessage: SnackbarMessage = {
      ...message,
      id,
      duration: message.duration || 5000, // Default 5 seconds
    };

    setMessages(prev => [...prev, newMessage]);

    // Auto-hide after duration
    if ((newMessage.duration ?? 0)  > 0) {
      setTimeout(() => {
        hideSnackbar(id);
      }, newMessage.duration);
    }
  }, []);

  const showSuccess = useCallback((title: string, message: string, options?: Partial<SnackbarMessage>) => {
    showSnackbar({
      type: 'success',
      title,
      message,
      ...options,
    });
  }, [showSnackbar]);

  const showError = useCallback((title: string, message: string, options?: Partial<SnackbarMessage>) => {
    showSnackbar({
      type: 'error',
      title,
      message,
      duration: options?.duration || 7000, // Errors stay longer
      ...options,
    });
  }, [showSnackbar]);

  const showWarning = useCallback((title: string, message: string, options?: Partial<SnackbarMessage>) => {
    showSnackbar({
      type: 'warning',
      title,
      message,
      ...options,
    });
  }, [showSnackbar]);

  const showInfo = useCallback((title: string, message: string, options?: Partial<SnackbarMessage>) => {
    showSnackbar({
      type: 'info',
      title,
      message,
      ...options,
    });
  }, [showSnackbar]);

  const hideSnackbar = useCallback((id: string) => {
    setMessages(prev => prev.filter(msg => msg.id !== id));
  }, []);

  const clearAllSnackbars = useCallback(() => {
    setMessages([]);
  }, []);

  const value: SnackbarContextType = {
    showSnackbar,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    hideSnackbar,
    clearAllSnackbars,
    messages,
  };

  return (
    <SnackbarContext.Provider value={value}>
      {children}
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = (): SnackbarContextType => {
  const context = useContext(SnackbarContext);
  if (context === undefined) {
    throw new Error('useSnackbar must be used within a SnackbarProvider');
  }
  return context;
};
