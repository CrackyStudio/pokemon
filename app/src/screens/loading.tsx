import React from 'react';

import Loader from 'components/loader';
import 'styles/screens/loading.scss';

const Loading: React.FC = () => {
  return (
    <div className="loading-container">
      <p>Please wait</p>
      <Loader />
      <p>Loading game</p>
    </div>
  );
};

export default Loading;
