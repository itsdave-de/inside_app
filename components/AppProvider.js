import React, {useState, useEffect} from 'react';
import AppContext from './AppContext';
import {getSettings} from '../database/getSettings';

const AppProvider = ({children}) => {
  const [apiData, setApiData] = useState({
    apiKey: '',
    apiSecret: '',
    url: '',
  });

  useEffect(() => {
    const loadSettings = async () => {
      const settings = await getSettings();
      setApiData({
        apiKey: settings.apiKey,
        apiSecret: settings.apiSecret,
        url: settings.url,
      });
    };

    loadSettings();
  }, []);

  return (
    <AppContext.Provider value={{...apiData, setApiData}}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
