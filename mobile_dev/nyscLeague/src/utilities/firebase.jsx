import { initializeApp } from "firebase/app";
import { getDatabase, ref } from 'firebase/database';
import { useObject } from "react-firebase-hooks/database";
import { useMemo } from 'react';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
export const database = getDatabase(firebase);

// ===== Hooks básicos genéricos =====
export const useData = (path, transform) => {
  const [snapshot, loading, error] = useObject(ref(database, path));
  let data;
  if (snapshot) {
    const value = snapshot.val();
    data = !loading && !error && transform ? transform(value) : value;
  }
  return [data, loading, error];
};

// ===== Hooks para Teams =====
export const useTeams = () => {
  const [snapshot, loading, error] = useObject(ref(database, 'teams'));
  
  const teams = useMemo(() => {
    if (!snapshot) return null;
    const data = snapshot.val();
    return data ? Object.values(data) : [];
  }, [snapshot]);

  return [teams, loading, error];
};

export const useTeam = (teamId) => {
  const [snapshot, loading, error] = useObject(ref(database, `teams/${teamId}`));
  
  const team = useMemo(() => {
    if (!snapshot) return null;
    return snapshot.val();
  }, [snapshot]);

  return [team, loading, error];
};

// ===== Hooks para Locations =====
export const useLocations = () => {
  const [snapshot, loading, error] = useObject(ref(database, 'location'));
  
  const locations = useMemo(() => {
    if (!snapshot) return null;
    const data = snapshot.val();
    return data ? Object.values(data) : [];
  }, [snapshot]);

  return [locations, loading, error];
};

export const useLocation = (locationId) => {
  const [snapshot, loading, error] = useObject(ref(database, `location/${locationId}`));
  
  const location = useMemo(() => {
    if (!snapshot) return null;
    return snapshot.val();
  }, [snapshot]);

  return [location, loading, error];
};

// ===== Hooks para Games =====
export const useGames = () => {
  const [snapshot, loading, error] = useObject(ref(database, 'games'));
  const [teamsSnapshot] = useObject(ref(database, 'teams'));
  const [locationsSnapshot] = useObject(ref(database, 'location'));

  const games = useMemo(() => {
    if (!snapshot) return null;
    
    const gamesData = snapshot.val();
    const teamsData = teamsSnapshot?.val() || {};
    const locationsData = locationsSnapshot?.val() || {};

    if (!gamesData) return [];

    return Object.values(gamesData).map(game => ({
      ...game,
      team1: teamsData[game.idT1] || { id: game.idT1, name: game.idT1 },
      team2: teamsData[game.idT2] || { id: game.idT2, name: game.idT2 },
      location: locationsData[game.idLo] || { id: game.idLo, name: game.idLo },
    }));
  }, [snapshot, teamsSnapshot, locationsSnapshot]);

  return [games, loading, error];
};

// ===== Hooks para Games por mes =====
export const useGamesByMonth = (month, year) => {
  const [allGames, loading, error] = useGames();

  const games = useMemo(() => {
    if (!allGames) return null;

    return allGames.filter(game => {
      const [gameYear, gameMonth, gameDay] = game.date.split('-').map(Number);
      const gameDate = new Date(gameYear, gameMonth - 1, gameDay);
      
      return gameDate.getMonth() === month && gameDate.getFullYear() === year;
    });
  }, [allGames, month, year]);

  return [games, loading, error];
};

// ===== Utilidad: Convertir juegos a formato para ScheduleTable =====
export const transformGameToTableRow = (game) => {
  // Parsear la fecha correctamente (YYYY-MM-DD) sin timezone issues
  const [year, month, day] = game.date.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  
  return {
    date: date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric' 
    }),
    teams: `${game.team1.name} vs. ${game.team2.name}`,
    location: game.location.name,
    time: game.time,
  };
};