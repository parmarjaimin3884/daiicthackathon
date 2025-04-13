import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Connection {
  id: string;
  name: string;
  role: string;
  company: string;
  status: 'pending' | 'accepted' | 'rejected';
  isIncoming: boolean;
}

interface Notification {
  id: string;
  type: 'connection_request' | 'connection_accepted';
  message: string;
  timestamp: string;
  read: boolean;
}

interface ConnectionContextType {
  connections: Connection[];
  notifications: Notification[];
  sendConnectionRequest: (userId: string) => void;
  acceptConnection: (userId: string) => void;
  rejectConnection: (userId: string) => void;
  markNotificationAsRead: (notificationId: string) => void;
}

const ConnectionContext = createContext<ConnectionContextType | undefined>(undefined);

export const ConnectionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [connections, setConnections] = useState<Connection[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const sendConnectionRequest = (userId: string) => {
    // In a real app, this would be an API call
    const newConnection: Connection = {
      id: userId,
      name: 'John Doe', // This would come from the API
      role: 'Senior Software Engineer',
      company: 'Tech Corp',
      status: 'pending',
      isIncoming: false
    };

    setConnections(prev => [...prev, newConnection]);

    // Add notification for the recipient
    const notification: Notification = {
      id: Date.now().toString(),
      type: 'connection_request',
      message: `${newConnection.name} wants to connect with you`,
      timestamp: new Date().toISOString(),
      read: false
    };

    setNotifications(prev => [...prev, notification]);
  };

  const acceptConnection = (userId: string) => {
    setConnections(prev =>
      prev.map(conn =>
        conn.id === userId
          ? { ...conn, status: 'accepted' }
          : conn
      )
    );

    const connection = connections.find(conn => conn.id === userId);
    if (connection) {
      const notification: Notification = {
        id: Date.now().toString(),
        type: 'connection_accepted',
        message: `${connection.name} accepted your connection request`,
        timestamp: new Date().toISOString(),
        read: false
      };

      setNotifications(prev => [...prev, notification]);
    }
  };

  const rejectConnection = (userId: string) => {
    setConnections(prev =>
      prev.map(conn =>
        conn.id === userId
          ? { ...conn, status: 'rejected' }
          : conn
      )
    );
  };

  const markNotificationAsRead = (notificationId: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === notificationId
          ? { ...notif, read: true }
          : notif
      )
    );
  };

  return (
    <ConnectionContext.Provider
      value={{
        connections,
        notifications,
        sendConnectionRequest,
        acceptConnection,
        rejectConnection,
        markNotificationAsRead
      }}
    >
      {children}
    </ConnectionContext.Provider>
  );
};

export const useConnections = () => {
  const context = useContext(ConnectionContext);
  if (context === undefined) {
    throw new Error('useConnections must be used within a ConnectionProvider');
  }
  return context;
}; 