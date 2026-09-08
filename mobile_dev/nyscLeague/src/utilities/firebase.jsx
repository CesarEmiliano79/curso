import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, set } from 'firebase/database';
import { useObject } from "react-firebase-hooks/database";
import { useMemo } from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { useAuthState as useFirebaseAuthState } from 'react-firebase-hooks/auth';
import { validateMessage, validateRegistration } from './validators.js';

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
export const auth = getAuth(firebase);

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

    return Object.entries(gamesData).map(([gameId, gameData]) => ({
      ...gameData,
      id: gameId,  // ← Esto preserva el ID único de cada juego
      team1: teamsData[gameData.idT1] || { id: gameData.idT1, name: gameData.idT1 },
      team2: teamsData[gameData.idT2] || { id: gameData.idT2, name: gameData.idT2 },
      location: locationsData[gameData.idLo] || { id: gameData.idLo, name: gameData.idLo },
    }));
  }, [snapshot, teamsSnapshot, locationsSnapshot]);
 
  return [games, loading, error];
};

// ===== Hook para un juego específico =====
export const useGame = (gameId) => {
  const [snapshot, loading, error] = useObject(ref(database, `games/${gameId}`));
  const [teamsSnapshot] = useObject(ref(database, 'teams'));
  const [locationsSnapshot] = useObject(ref(database, 'location'));
 
  const game = useMemo(() => {
    if (!snapshot) return null;
 
    const gameData = snapshot.val();
    if (!gameData) return null;
 
    const teamsData = teamsSnapshot?.val() || {};
    const locationsData = locationsSnapshot?.val() || {};
 
    return {
      ...gameData,
      id: gameId,
      team1: teamsData[gameData.idT1] || { id: gameData.idT1, name: gameData.idT1 },
      team2: teamsData[gameData.idT2] || { id: gameData.idT2, name: gameData.idT2 },
      location: locationsData[gameData.idLo] || { id: gameData.idLo, name: gameData.idLo },
    };
  }, [snapshot, teamsSnapshot, locationsSnapshot, gameId]);
 
  return [game, loading, error];
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

// ===== Hooks para Mensajes / Comentarios de un juego =====
// Los comentarios se guardan en la rama: messages/{gameId}/{messageId}
export const useMessages = (gameId) => {
  const [snapshot, loading, error] = useObject(
    gameId ? ref(database, `messages/${gameId}`) : null
  );

  const messages = useMemo(() => {
    if (!snapshot) return [];
    const data = snapshot.val();
    if (!data) return [];

    // Convertimos el objeto de Firebase en un arreglo, conservando el id (key) de cada mensaje
    return Object.entries(data)
      .map(([id, msg]) => ({ ...msg, id })) // el id de Firebase siempre gana
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)); // más reciente primero
  }, [snapshot]);

  return [messages, loading, error];
};

// Guarda un nuevo comentario en messages/{gameId}
export const addMessage = async (gameId, message) => {
  const fullMessage = {
    ...message,
    gameId,
    timestamp: message.timestamp || new Date().toISOString(),
  }

  const { valid, errors } = validateMessage(fullMessage)
  if (!valid) {
    throw new Error(`Invalid message data: ${errors.join(', ')}`)
  }

  try {
    const messagesRef = ref(database, `messages/${gameId}`);
    const newMessageRef = push(messagesRef); // genera un id único
    await set(newMessageRef, fullMessage);
    return newMessageRef.key;
  } catch (error) {
    console.error('Error al guardar el comentario en Firebase:', error);
    throw error;
  }
};

// ===== Hooks para Registrations (inscripción de jugadores) =====
// Las inscripciones se guardan en la rama: registrations/{registrationId}
export const useRegistrations = () => {
  const [snapshot, loading, error] = useObject(ref(database, 'registrations'));

  const registrations = useMemo(() => {
    if (!snapshot) return [];
    const data = snapshot.val();
    if (!data) return [];

    return Object.entries(data)
      .map(([id, reg]) => ({ ...reg, id }))
      .sort((a, b) => new Date(b.submitted_at) - new Date(a.submitted_at)); // más reciente primero
  }, [snapshot]);

  return [registrations, loading, error];
};

export const useRegistration = (registrationId) => {
  const [snapshot, loading, error] = useObject(
    registrationId ? ref(database, `registrations/${registrationId}`) : null
  );

  const registration = useMemo(() => {
    if (!snapshot) return null;
    const data = snapshot.val();
    if (!data) return null;
    return { ...data, id: registrationId };
  }, [snapshot, registrationId]);

  return [registration, loading, error];
};

// Guarda una nueva inscripción de jugador en registrations/{id}
export const addRegistration = async (registrationData) => {
  const { valid, errors } = validateRegistration(registrationData)
  if (!valid) {
    throw new Error(`Invalid registration data: ${errors.join(', ')}`)
  }

  try {
    const registrationsRef = ref(database, 'registrations');
    const newRegistrationRef = push(registrationsRef); // genera un id único
    await set(newRegistrationRef, {
      ...registrationData,
      submitted_at: new Date().toISOString(),
    });
    return newRegistrationRef.key;
  } catch (error) {
    console.error('Error al guardar la inscripción en Firebase:', error);
    throw error;
  }
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

// ===== Auth Hooks y funciones =====
export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.error('Error signing in with Google:', error);
    throw error;
  }
};

export const firebaseSignOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};

// Hook para obtener el estado del usuario autenticado
export const useAuthState = () => {
  return useFirebaseAuthState(auth);
};