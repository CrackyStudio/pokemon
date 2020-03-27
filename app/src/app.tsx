import React, { useEffect } from 'react';

import Home from 'screens/home';
import InternalError from 'components/internalError';
import Loader from 'components/loader';
import { useStateValue } from 'hooks/provider';
import { isFullFilled } from 'services/files';
import 'styles/app/main.css';

const App: React.FC = () => {
  const [{ isConfigured }, dispatch] = useStateValue() as Array<any>;
  const neededValues: string[] = [];

  useEffect(() => {
    if (isConfigured === undefined) {
      if (isFullFilled(neededValues)) {
        dispatch({ key: 'isConfigured', value: true });
      } else {
        dispatch({ key: 'isConfigured', value: false });
      }
    }
  }, [isConfigured, neededValues, dispatch]);

  return (
    <div className="App">
      {isConfigured && <Home />}
      {isConfigured === false && <InternalError />}
      {isConfigured === undefined && <Loader />}
    </div>
  );
};

export default App;
