import React, { createContext, useMemo } from 'react';
import PropTypes from 'prop-types';

export const TopBarContext = createContext({});

export const TopBarProvider = ({ children }) => {
  const HISTORY_STORAGE_KEY = 'swagger-editor-next-history';

  let map = new Map();

  const loadHistoryFromLocalStorage = () => {
    return localStorage.getItem(HISTORY_STORAGE_KEY);
  };

  const hasHistoryLocalStorage = () => {
    return loadHistoryFromLocalStorage() !== null;
  };

  if (hasHistoryLocalStorage()) {
    // eslint-disable-next-line no-use-before-define
    map = new Map(JSON.parse(loadHistoryFromLocalStorage()));
  }

  // default the history to an empty map
  const [history, setHistory] = React.useState(map);

  const saveHistoryToLocalStorage = (id, url) => {
    map = new Map();
    // eslint-disable-next-line no-use-before-define
    if (hasHistoryLocalStorage()) {
      // eslint-disable-next-line no-use-before-define
      map = new Map(JSON.parse(loadHistoryFromLocalStorage()));
    }
    map.set(id, url);
    setHistory(map);
    return localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(Array.from(map)));
  };

  const contextValue = useMemo(
    () => ({
      history,
      saveHistoryToLocalStorage,
    }),
    [history, saveHistoryToLocalStorage]
  );

  return <TopBarContext.Provider value={contextValue}>{children}</TopBarContext.Provider>;
};

TopBarProvider.propTypes = {
  children: PropTypes.node.isRequired,
  editorActions: PropTypes.shape({
    importUrl: PropTypes.func.isRequired,
    setContent: PropTypes.func.isRequired,
  }).isRequired,
};
