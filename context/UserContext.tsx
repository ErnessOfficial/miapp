
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, WellbeingHistoryEntry, JournalEntry, PlanProgress, CycleReflections, WisdomDrop } from '../types';

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
  wellbeingHistory: WellbeingHistoryEntry[];
  addWellbeingHistoryEntry: (entry: WellbeingHistoryEntry) => void;
  journalEntries: JournalEntry[];
  addJournalEntry: (entry: JournalEntry) => void;
  updateJournalEntry: (entry: JournalEntry) => void;
  deleteJournalEntry: (entryId: string) => void;
  isEmpatheticMode: boolean;
  toggleEmpatheticMode: () => void;
  planProgress: PlanProgress | null;
  updatePlanProgress: (day: number) => void;
  resetPlan: () => void;
  currentPlan: any[] | null;
  setCurrentPlan: (plan: any[] | null) => void;
  cycleNumber: number;
  incrementCycleNumber: () => void;
  cycleReflections: CycleReflections;
  addCycleReflection: (day: number, reflection: string) => void;
  resetCycleReflections: () => void;
  wisdomDrops: WisdomDrop[];
  addWisdomDrop: (drop: WisdomDrop) => void;
  markWisdomDropAsViewed: (id: string) => void;
  showWisdomDropNotification: boolean;
  setShowWisdomDropNotification: (show: boolean) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUserState] = useState<User | null>(() => {
    try {
      const storedUser = localStorage.getItem('userSession');
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Failed to parse user session from localStorage", error);
      return null;
    }
  });

  const [wellbeingHistory, setWellbeingHistory] = useState<WellbeingHistoryEntry[]>(() => {
    try {
      const storedHistory = localStorage.getItem('wellbeingHistory');
      return storedHistory ? JSON.parse(storedHistory) : [];
    } catch (error) {
      console.error("Failed to parse wellbeing history from localStorage", error);
      return [];
    }
  });

  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>(() => {
    try {
      const storedEntries = localStorage.getItem('journalEntries');
      return storedEntries ? JSON.parse(storedEntries) : [];
    } catch (error) {
      console.error("Failed to parse journal entries from localStorage", error);
      return [];
    }
  });

  const [planProgress, setPlanProgress] = useState<PlanProgress | null>(() => {
    try {
      const storedProgress = localStorage.getItem('planProgress');
      return storedProgress ? JSON.parse(storedProgress) : { highestCompletedDay: 0 };
    } catch (error) {
      console.error("Failed to parse plan progress from localStorage", error);
      return { highestCompletedDay: 0 };
    }
  });

  const [currentPlan, setCurrentPlanState] = useState<any[] | null>(() => {
      try {
        const storedPlan = localStorage.getItem('currentPlan');
        return storedPlan ? JSON.parse(storedPlan) : null;
      } catch (error) {
        console.error("Failed to parse current plan from localStorage", error);
        return null;
      }
  });
  
  const [cycleNumber, setCycleNumber] = useState<number>(() => {
      try {
        const storedCycle = localStorage.getItem('cycleNumber');
        return storedCycle ? parseInt(storedCycle, 10) : 1;
      } catch (error) {
        console.error("Failed to parse cycle number from localStorage", error);
        return 1;
      }
  });

  const [isEmpatheticMode, setIsEmpatheticMode] = useState<boolean>(() => {
    try {
        const storedMode = localStorage.getItem('isEmpatheticMode');
        return storedMode ? JSON.parse(storedMode) : false;
    } catch (error) {
        console.error("Failed to parse empathetic mode from localStorage", error);
        return false;
    }
  });
  
  const [cycleReflections, setCycleReflections] = useState<CycleReflections>(() => {
    try {
      const stored = localStorage.getItem('cycleReflections');
      return stored ? JSON.parse(stored) : {};
    } catch (error) {
      return {};
    }
  });

  const [wisdomDrops, setWisdomDrops] = useState<WisdomDrop[]>(() => {
    try {
      const stored = localStorage.getItem('wisdomDrops');
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      return [];
    }
  });

  const [showWisdomDropNotification, setShowWisdomDropNotification] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem('showWisdomDropNotification');
      return stored ? JSON.parse(stored) : false;
    } catch (error) {
      return false;
    }
  });

  const navigate = useNavigate();

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('userSession', JSON.stringify(user));
      } else {
        localStorage.removeItem('userSession');
      }
    } catch (error) {
      console.error("Failed to save user session to localStorage", error);
    }
  }, [user]);

  const setUser = (user: User | null) => {
    setUserState(user);
  };
  
  const logout = () => {
    setUser(null);
    localStorage.clear();
    navigate('/');
  };

  const addWellbeingHistoryEntry = (entry: WellbeingHistoryEntry) => {
    setWellbeingHistory(prevHistory => {
        const updatedHistory = [entry, ...prevHistory];
        const trimmedHistory = updatedHistory.slice(0, 5);
        try {
            localStorage.setItem('wellbeingHistory', JSON.stringify(trimmedHistory));
        } catch (error) {
            console.error("Failed to save wellbeing history to localStorage", error);
        }
        return trimmedHistory;
    });
  };

  const addJournalEntry = (entry: JournalEntry) => {
    setJournalEntries(prevEntries => {
        const updatedEntries = [...prevEntries, entry];
        try {
            localStorage.setItem('journalEntries', JSON.stringify(updatedEntries));
        } catch (error) {
            console.error("Failed to save journal entries to localStorage", error);
        }
        return updatedEntries;
    });
  };

  const updateJournalEntry = (updatedEntry: JournalEntry) => {
      setJournalEntries(prevEntries => {
          const updatedEntries = prevEntries.map(entry =>
              entry.id === updatedEntry.id ? {...updatedEntry, lastModified: new Date().toISOString() } : entry
          );
          try {
              localStorage.setItem('journalEntries', JSON.stringify(updatedEntries));
          } catch (error) {
              console.error("Failed to save updated journal entries to localStorage", error);
          }
          return updatedEntries;
      });
  };

  const deleteJournalEntry = (entryId: string) => {
    setJournalEntries(prevEntries => {
      const updatedEntries = prevEntries.filter(entry => entry.id !== entryId);
      try {
        localStorage.setItem('journalEntries', JSON.stringify(updatedEntries));
      } catch (error) {
        console.error("Failed to save journal entries after deletion", error);
      }
      return updatedEntries;
    });
  };

  const toggleEmpatheticMode = () => {
      setIsEmpatheticMode(prevMode => {
          const newMode = !prevMode;
          try {
              localStorage.setItem('isEmpatheticMode', JSON.stringify(newMode));
          } catch (error) {
              console.error("Failed to save empathetic mode to localStorage", error);
          }
          return newMode;
      });
  };
  
  const updatePlanProgress = (day: number) => {
      setPlanProgress(prev => {
          const currentHighest = prev?.highestCompletedDay || 0;
          const newHighest = Math.max(currentHighest, day);
          const newProgress = { highestCompletedDay: newHighest };
          try {
              localStorage.setItem('planProgress', JSON.stringify(newProgress));
          } catch (error) {
              console.error("Failed to save plan progress to localStorage", error);
          }
          return newProgress;
      });
  };

  const resetPlan = () => {
      const newProgress = { highestCompletedDay: 0 };
      setPlanProgress(newProgress);
      try {
        localStorage.setItem('planProgress', JSON.stringify(newProgress));
      } catch (error) {
        console.error("Failed to reset plan progress in localStorage", error);
      }
  };
  
  const setCurrentPlan = (plan: any[] | null) => {
      setCurrentPlanState(plan);
      try {
          if (plan) {
              localStorage.setItem('currentPlan', JSON.stringify(plan));
          } else {
              localStorage.removeItem('currentPlan');
          }
      } catch (error) {
          console.error("Failed to save current plan to localStorage", error);
      }
  };

  const incrementCycleNumber = () => {
      setCycleNumber(prev => {
          const newCycle = prev + 1;
          try {
              localStorage.setItem('cycleNumber', newCycle.toString());
          } catch(error) {
              console.error("Failed to save cycle number to localStorage", error);
          }
          return newCycle;
      })
  };

  const addCycleReflection = (day: number, reflection: string) => {
      setCycleReflections(prev => {
          const newReflections = { ...prev, [day]: reflection };
          localStorage.setItem('cycleReflections', JSON.stringify(newReflections));
          return newReflections;
      });
  };

  const resetCycleReflections = () => {
      setCycleReflections({});
      localStorage.removeItem('cycleReflections');
  };

  const addWisdomDrop = (drop: WisdomDrop) => {
      setWisdomDrops(prev => {
          const newDrops = [drop, ...prev];
          localStorage.setItem('wisdomDrops', JSON.stringify(newDrops));
          return newDrops;
      });
  };
  
  const markWisdomDropAsViewed = (id: string) => {
    setWisdomDrops(prevDrops => {
        const newDrops = prevDrops.map(drop => 
            drop.id === id ? { ...drop, isNew: false } : drop
        );
        localStorage.setItem('wisdomDrops', JSON.stringify(newDrops));
        return newDrops;
    });
  };

  const updateShowWisdomDropNotification = (show: boolean) => {
      setShowWisdomDropNotification(show);
      localStorage.setItem('showWisdomDropNotification', JSON.stringify(show));
  };


  return (
    <UserContext.Provider value={{
      user, setUser, logout, 
      wellbeingHistory, addWellbeingHistoryEntry, 
      journalEntries, addJournalEntry, updateJournalEntry, deleteJournalEntry,
      isEmpatheticMode, toggleEmpatheticMode, 
      planProgress, updatePlanProgress, resetPlan, 
      currentPlan, setCurrentPlan, 
      cycleNumber, incrementCycleNumber,
      cycleReflections, addCycleReflection, resetCycleReflections,
      wisdomDrops, addWisdomDrop, markWisdomDropAsViewed,
      showWisdomDropNotification, setShowWisdomDropNotification: updateShowWisdomDropNotification
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
