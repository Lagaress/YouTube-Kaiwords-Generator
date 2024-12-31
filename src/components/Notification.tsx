"use client";

import React, { useEffect, useState } from 'react';

interface NotificationProps {
  message: string;
  duration?: number;
  onClose: () => void;
}

export default function Notification({ message, duration = 2000, onClose }: NotificationProps) {
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    const leaveTimer = setTimeout(() => {
      setIsLeaving(true);
    }, duration - 300); // Iniciamos la animación de salida 300ms antes

    const closeTimer = setTimeout(() => {
      onClose();
    }, duration);

    return () => {
      clearTimeout(leaveTimer);
      clearTimeout(closeTimer);
    };
  }, [duration, onClose]);

  return (
    <div className="fixed top-4 right-4 z-50">
      <div 
        className={`
          bg-[#ff4444] text-white px-6 py-3 rounded-lg shadow-lg
          ${isLeaving ? 'animate-fade-out' : 'animate-fade-in'}
        `}
      >
        {message}
      </div>
    </div>
  );
}

interface NotificationManagerProps {
  children: React.ReactNode;
}

// Crear un tipo global para el evento personalizado
declare global {
  interface WindowEventMap {
    'show-notification': CustomEvent<string>;
  }
}

export function NotificationManager({ children }: NotificationManagerProps) {
  const [notification, setNotification] = React.useState<string | null>(null);

  useEffect(() => {
    const handleShowNotification = (event: CustomEvent<string>) => {
      setNotification(event.detail);
    };

    window.addEventListener('show-notification', handleShowNotification);
    return () => {
      window.removeEventListener('show-notification', handleShowNotification);
    };
  }, []);

  const hideNotification = () => {
    setNotification(null);
  };

  return (
    <>
      {children}
      {notification && (
        <Notification 
          message={notification} 
          onClose={hideNotification}
        />
      )}
    </>
  );
}

// Función helper para mostrar notificaciones
export function showNotification(message: string) {
  const event = new CustomEvent('show-notification', { detail: message });
  window.dispatchEvent(event);
} 