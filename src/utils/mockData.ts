
import { v4 as uuidv4 } from 'uuid';

export type User = {
  id: string;
  name: string;
  phoneNumber: string;
  email: string;
  balance: number;
  isBlocked: boolean;
  createdAt: Date;
  lastActive: Date;
};

export type Transaction = {
  id: string;
  userId: string;
  amount: number;
  type: 'deposit' | 'withdrawal' | 'transfer' | 'reward';
  status: 'completed' | 'pending' | 'failed';
  description: string;
  date: Date;
};

// Generate random users
export const generateUsers = (count: number): User[] => {
  const users: User[] = [];
  
  for (let i = 0; i < count; i++) {
    const id = uuidv4();
    const isBlocked = Math.random() > 0.9; // 10% chance of being blocked
    
    users.push({
      id,
      name: `User ${i + 1}`,
      phoneNumber: `+212${Math.floor(600000000 + Math.random() * 99999999)}`,
      email: `user${i + 1}@example.com`,
      balance: Math.floor(Math.random() * 10000) / 10,
      isBlocked,
      createdAt: new Date(Date.now() - Math.floor(Math.random() * 90) * 24 * 60 * 60 * 1000),
      lastActive: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000),
    });
  }
  
  return users;
};

// Generate random transactions for a user
export const generateTransactions = (userId: string, count: number): Transaction[] => {
  const transactions: Transaction[] = [];
  const transactionTypes: ('deposit' | 'withdrawal' | 'transfer' | 'reward')[] = ['deposit', 'withdrawal', 'transfer', 'reward'];
  const statusTypes: ('completed' | 'pending' | 'failed')[] = ['completed', 'pending', 'failed'];
  
  for (let i = 0; i < count; i++) {
    const type = transactionTypes[Math.floor(Math.random() * transactionTypes.length)];
    const status = statusTypes[Math.floor(Math.random() * statusTypes.length)];
    const amount = Math.floor(Math.random() * 1000) / 10;
    
    let description = '';
    
    switch (type) {
      case 'deposit':
        description = 'Dépôt sur compte';
        break;
      case 'withdrawal':
        description = 'Retrait depuis compte';
        break;
      case 'transfer':
        description = 'Transfert entre comptes';
        break;
      case 'reward':
        description = 'Récompense promotionnelle';
        break;
    }
    
    transactions.push({
      id: uuidv4(),
      userId,
      amount,
      type,
      status,
      description,
      date: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000),
    });
  }
  
  // Sort by date (newest first)
  return transactions.sort((a, b) => b.date.getTime() - a.date.getTime());
};

// Mock users
export const mockUsers = generateUsers(50);

// Mock function to search users by phone number
export const searchUsersByPhone = (query: string): User[] => {
  if (!query) return mockUsers.slice(0, 10); // Return first 10 users if no query
  
  return mockUsers.filter(user => 
    user.phoneNumber.includes(query)
  );
};

// Mock function to get user by ID
export const getUserById = (id: string): User | undefined => {
  return mockUsers.find(user => user.id === id);
};

// Mock function to get transactions for a user
export const getUserTransactions = (userId: string): Transaction[] => {
  return generateTransactions(userId, 20);
};

// Mock function to toggle user blocked status
export const toggleUserBlocked = (userId: string, blocked: boolean): User | undefined => {
  const userIndex = mockUsers.findIndex(user => user.id === userId);
  
  if (userIndex >= 0) {
    mockUsers[userIndex] = {
      ...mockUsers[userIndex],
      isBlocked: blocked
    };
    
    return mockUsers[userIndex];
  }
  
  return undefined;
};
