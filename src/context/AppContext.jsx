import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import api, { setAuthToken } from '../services/api';

const AppContext = createContext(null);

const FAVORITES_STORAGE_KEY = 'movix:favorites';
const THEME_STORAGE_KEY = 'movix:theme';
const USER_STORAGE_KEY = 'movix:user';
const TOKEN_STORAGE_KEY = 'movix:token';

const defaultLoadingState = {
  trending: false,
  search: false,
  detail: false,
  comments: false,
  auth: false,
  favorites: false,
};

const defaultErrorState = {
  trending: null,
  search: null,
  detail: null,
  comments: null,
  auth: null,
  favorites: null,
};

export const AppProvider = ({ children }) => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [comments, setComments] = useState([]);

  const [favorites, setFavorites] = useState(() => {
    const stored = localStorage.getItem(FAVORITES_STORAGE_KEY);
    if (!stored) return [];
    try {
      return JSON.parse(stored);
    } catch (_error) {
      return [];
    }
  });

  const [darkMode, setDarkMode] = useState(() => {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored) return stored === 'dark';
    return true;
  });

  const [searchTerm, setSearchTerm] = useState('');

  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem(USER_STORAGE_KEY);
    if (!stored) return null;
    try {
      return JSON.parse(stored);
    } catch (_error) {
      return null;
    }
  });

  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_STORAGE_KEY) ?? '');

  const [loading, setLoading] = useState(defaultLoadingState);
  const [errors, setErrors] = useState(defaultErrorState);

  useEffect(() => {
    if (token) {
      setAuthToken(token);
    }
  }, [token]);

  useEffect(() => {
    const classList = document.documentElement.classList;
    if (darkMode) {
      classList.add('dark');
      localStorage.setItem(THEME_STORAGE_KEY, 'dark');
    } else {
      classList.remove('dark');
      localStorage.setItem(THEME_STORAGE_KEY, 'light');
    }
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(USER_STORAGE_KEY);
    }
  }, [user]);

  useEffect(() => {
    if (token) {
      localStorage.setItem(TOKEN_STORAGE_KEY, token);
    } else {
      localStorage.removeItem(TOKEN_STORAGE_KEY);
    }
  }, [token]);

  const setLoadingState = useCallback((key, value) => {
    setLoading((prev) => ({ ...prev, [key]: value }));
  }, []);

  const setErrorState = useCallback((key, value) => {
    setErrors((prev) => ({ ...prev, [key]: value }));
  }, []);

  const normalizeMovies = useCallback((payload) => {
    if (!payload) return [];
    if (Array.isArray(payload)) return payload;
    if (Array.isArray(payload?.results)) return payload.results;
    if (Array.isArray(payload?.data?.results)) return payload.data.results;
    return [];
  }, []);

  const fetchTrendingMovies = useCallback(async () => {
    setLoadingState('trending', true);
    setErrorState('trending', null);
    try {
      const { data } = await api.get('/movies/trending');
      setTrendingMovies(normalizeMovies(data));
    } catch (error) {
      console.error('Failed to load trending movies', error);
      setErrorState('trending', 'Unable to load trending movies right now.');
    } finally {
      setLoadingState('trending', false);
    }
  }, [normalizeMovies, setErrorState, setLoadingState]);

  const fetchFavorites = useCallback(async () => {
    setLoadingState('favorites', true);
    setErrorState('favorites', null);
    try {
      const { data } = await api.get('/api/favorites');
      const normalized = normalizeMovies(data);
      if (normalized.length) {
        setFavorites(normalized);
      }
    } catch (error) {
      if (import.meta.env.DEV) {
        console.warn('Falling back to local favorites cache.', error);
      }
      setErrorState('favorites', 'Using locally saved favorites.');
    } finally {
      setLoadingState('favorites', false);
    }
  }, [normalizeMovies, setErrorState, setLoadingState]);

  const searchMovies = useCallback(
    async (query, page = 1, n = 20) => {
      if (!query?.trim()) {
        setSearchResults([]);
        return;
      }
      setLoadingState('search', true);
      setErrorState('search', null);
      try {
        const params = { q: query.trim(), page, n };
        const { data } = await api.get('/movies', { params });
        const normalized = normalizeMovies(data);
        setSearchResults((prev) => (page > 1 ? [...prev, ...normalized] : normalized));
      } catch (error) {
        console.error('Search failed', error);
        setErrorState('search', 'Unable to load search results.');
      } finally {
        setLoadingState('search', false);
      }
    },
    [normalizeMovies, setErrorState, setLoadingState],
  );

  const fetchMovieDetails = useCallback(
    async (movieId) => {
      if (!movieId) return;
      setLoadingState('detail', true);
      setErrorState('detail', null);
      try {
        const { data } = await api.get(`/movies/${movieId}`);
        setSelectedMovie(data);
        return data;
      } catch (error) {
        console.error('Failed to fetch movie details', error);
        setErrorState('detail', 'Unable to load movie details.');
        throw error;
      } finally {
        setLoadingState('detail', false);
      }
    },
    [setErrorState, setLoadingState],
  );

  const fetchComments = useCallback(
    async (movieId) => {
      if (!movieId) return;
      setLoadingState('comments', true);
      setErrorState('comments', null);
      try {
        const { data } = await api.get(`/comments/${movieId}`);
        setComments(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Failed to fetch comments', error);
        setErrorState('comments', 'Unable to load comments.');
        setComments([]);
      } finally {
        setLoadingState('comments', false);
      }
    },
    [setErrorState, setLoadingState],
  );

  const addComment = useCallback(
    async ({ movieId, text }) => {
      if (!movieId || !text?.trim()) return;
      setLoadingState('comments', true);
      setErrorState('comments', null);
      try {
        const payload = { movie_id: movieId, text: text.trim() };
        const { data } = await api.post('/comments', payload);
        setComments((prev) => [data, ...prev]);
      } catch (error) {
        console.error('Failed to post comment', error);
        setErrorState('comments', 'Unable to add comment.');
        throw error;
      } finally {
        setLoadingState('comments', false);
      }
    },
    [setErrorState, setLoadingState],
  );

  const deleteComment = useCallback(
    async (commentId) => {
      if (!commentId) return;
      setLoadingState('comments', true);
      setErrorState('comments', null);
      try {
        await api.delete(`/comments/${commentId}`);
        setComments((prev) => prev.filter((comment) => comment.id !== commentId && comment._id !== commentId));
      } catch (error) {
        console.error('Failed to delete comment', error);
        setErrorState('comments', 'Unable to delete comment.');
        throw error;
      } finally {
        setLoadingState('comments', false);
      }
    },
    [setErrorState, setLoadingState],
  );

  const persistFavorites = useCallback((nextFavorites) => {
    setFavorites(nextFavorites);
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(nextFavorites));
  }, []);

  const toggleFavorite = useCallback(
    async (movie) => {
      if (!movie) return;
      const movieId = movie.id ?? movie._id;
      if (!movieId) return;

      const exists = favorites.some((fav) => (fav.id ?? fav._id) === movieId);

      if (exists) {
        const updated = favorites.filter((fav) => (fav.id ?? fav._id) !== movieId);
        persistFavorites(updated);
        return;
      }

      const updated = [...favorites, movie];
      persistFavorites(updated);

      try {
        await api.post('/api/favorites/add', { movieId, movie });
      } catch (error) {
        console.error('Failed to sync favorite with backend', error);
        setErrorState('favorites', 'Favorite saved locally. Backend sync failed.');
      }
    },
    [favorites, persistFavorites, setErrorState],
  );

  const isFavorite = useCallback(
    (movieId) => favorites.some((movie) => (movie.id ?? movie._id) === movieId),
    [favorites],
  );

  const login = useCallback(
    async (credentials) => {
      setLoadingState('auth', true);
      setErrorState('auth', null);
      try {
        const { data } = await api.post('/auth/login', credentials);
        const { token: receivedToken, user: receivedUser } = data;
        if (receivedToken) {
          setToken(receivedToken);
          setAuthToken(receivedToken);
        }
        if (receivedUser) {
          setUser(receivedUser);
        }
        return data;
      } catch (error) {
        console.error('Login failed', error);
        const message =
          error?.response?.data?.message ?? 'Unable to log in. Please verify your credentials and try again.';
        setErrorState('auth', message);
        throw error;
      } finally {
        setLoadingState('auth', false);
      }
    },
    [setErrorState, setLoadingState],
  );

  const register = useCallback(
    async (payload) => {
      setLoadingState('auth', true);
      setErrorState('auth', null);
      try {
        const { data } = await api.post('/auth/register', payload);
        return data;
      } catch (error) {
        console.error('Registration failed', error);
        const message = error?.response?.data?.message ?? 'Unable to register right now.';
        setErrorState('auth', message);
        throw error;
      } finally {
        setLoadingState('auth', false);
      }
    },
    [setErrorState, setLoadingState],
  );

  const logout = useCallback(() => {
    setUser(null);
    setToken('');
    setAuthToken(null);
  }, []);

  useEffect(() => {
    fetchTrendingMovies();
    fetchFavorites();
  }, [fetchTrendingMovies, fetchFavorites]);

  const value = useMemo(
    () => ({
      loading,
      errors,
      trendingMovies,
      searchResults,
      selectedMovie,
      comments,
      favorites,
      darkMode,
      searchTerm,
      user,
      token,
      setSearchTerm,
      setDarkMode,
      fetchTrendingMovies,
      searchMovies,
      fetchMovieDetails,
      fetchComments,
      addComment,
      deleteComment,
      toggleFavorite,
      isFavorite,
      login,
      register,
      logout,
    }),
    [
      addComment,
      comments,
      darkMode,
      errors,
      favorites,
      fetchComments,
      fetchMovieDetails,
      fetchTrendingMovies,
      isFavorite,
      loading,
      login,
      logout,
      register,
      searchMovies,
      searchResults,
      searchTerm,
      selectedMovie,
      toggleFavorite,
      trendingMovies,
      user,
      token,
    ],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

