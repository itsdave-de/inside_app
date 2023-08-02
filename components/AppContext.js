import React from 'react';

const AppContext = React.createContext({
  apiKey: '',
  apiSecret: '',
  url: '',
  backendState: '',
  setApiData: () => {},
});

export default AppContext;