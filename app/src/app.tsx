import React, { useEffect } from 'react';
import { isEmpty } from 'lodash';

import Home from 'screens/home';
import InternalError from 'components/internalError';
import Loader from 'components/loader';
import { useStateValue } from 'hooks/provider';
import 'styles/app.scss';

const App: React.FC = () => {
  const [{ isConfigured }, dispatch] = useStateValue() as Array<any>;
  const envValues: string[] = ['TEMP'];

  useEffect(() => {
    if (isConfigured === undefined) {
      const missingValues = envValues.filter((v: string): boolean => !process.env[`REACT_APP_${v}`]);
      if (isEmpty(missingValues)) {
        dispatch({ key: 'isConfigured', value: true });
      } else {
        dispatch({ key: 'isConfigured', value: false });
      }
    }
  }, [isConfigured, envValues, dispatch]);

  return (
    <div className="App">
      {isConfigured && <Home />}
      {isConfigured === false && (
        <InternalError errorMessage="Some environment value(s) are missing in your .env file" />
      )}
      {isConfigured === undefined && <Loader />}
    </div>
  );
};

export default App;
