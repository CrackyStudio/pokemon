import React, { useEffect } from 'react';
import { isEmpty } from 'lodash';

import Home from 'screens/home';
import Loading from 'screens/loading';
import InternalError from 'components/internalError';
import { useStateValue } from 'hooks/provider';
import 'styles/app.scss';

const App: React.FC = () => {
  const [{ isConfigured }, dispatch] = useStateValue() as Array<any>;
  const envValues: string[] = ['PORT', 'DISCORD_GUILD'];

  useEffect(() => {
    if (isConfigured === undefined) {
      const missingValues = envValues.filter((v: string): boolean =>
        v === ('PORT' || 'BROWSER') ? false : !process.env[`REACT_APP_${v}`],
      );
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
        <InternalError errorMessage="Some environment value(s) are missing in your .env file. You will need to restart the app to apply changes." />
      )}
      {isConfigured === undefined && <Loading />}
    </div>
  );
};

export default App;
