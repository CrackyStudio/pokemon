import React from 'react';

import Loader from 'components/loader';
import 'styles/screens/loading.scss';

const Loading: React.FC = () => {
  return (
    <div className="loading-container">
      <Loader />
      <p>Please wait while game is loading</p>
    </div>
  );
};

export default Loading;
