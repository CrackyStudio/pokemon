import React from 'react';

import 'styles/components/internalError.css';

const InternalError = ({ errorMessage }: { errorMessage: string }) => {
  return (
    <div className="internal-error-container">
      <div className="block">
        <strong>Internal Error</strong>
        <p>{errorMessage}</p>
      </div>
    </div>
  );
};

export default InternalError;
