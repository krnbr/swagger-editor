import { createContext, useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

// Create a Context for Swagger history
export const SwaggerContext = createContext({});

const SwaggerProvider = ({ children }) => {
  const HISTORY_STORAGE_KEY = 'swagger-editor-next-history';

  // Helper function to load history from localStorage
  const loadHistory = () => {
    try {
      const storedHistory = localStorage.getItem(HISTORY_STORAGE_KEY);
      return storedHistory ? new Map(JSON.parse(storedHistory)) : new Map();
    } catch (error) {
      console.error('Failed to load history from localStorage:', error);
      return new Map();
    }
  };

  // State to manage the history
  const [history, setHistory] = useState(loadHistory);

  // Save updated history to state and localStorage
  const saveToHistory = useCallback((id, url) => {
    setHistory((prevHistory) => {
      const updatedHistory = new Map(prevHistory);
      updatedHistory.set(id, url);
      localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(Array.from(updatedHistory)));
      return updatedHistory;
    });
  }, []);

  // Remove an entry from history
  const removeFromHistory = useCallback((id) => {
    setHistory((prevHistory) => {
      const updatedHistory = new Map(prevHistory);
      updatedHistory.delete(id);
      localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(Array.from(updatedHistory)));
      return updatedHistory;
    });
  }, []);

  // Memoized context value
  const contextValue = useMemo(
    () => ({
      history,
      saveToHistory,
      removeFromHistory,
    }),
    [history, saveToHistory, removeFromHistory]
  );

  return <SwaggerContext.Provider value={contextValue}>{children}</SwaggerContext.Provider>;
};

SwaggerProvider.propTypes = {
  children: PropTypes.node.isRequired, // Validate the 'children' prop
};

export const SwaggerHistoryPlugin = (context) => ({
  components: {
    SwaggerHistoryProvider: SwaggerProvider,
  },
  statePlugins: {
    swaggerHistory: {
      actions: {
        saveToHistory: () => (id, url) => {
          context.saveToHistory(id, url);
        },
        removeFromHistory: () => (id) => {
          context.removeFromHistory(id);
        },
      },
      selectors: {
        history: () => context.history,
      },
      reducers: {
        setState: (state, action) => ({
          ...state,
          ...action.payload,
        }),
      },
      wrapComponents: {
        App: (OriginalApp) =>
          function (props) {
            return (
              <SwaggerProvider>
                {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                <OriginalApp {...props} />
              </SwaggerProvider>
            );
          },
      },
    },
  },
});
