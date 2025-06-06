import { useContext } from 'react';

import { BaseContext } from '@context/base/BaseContext.tsx';

const useBase = () => {
  const context = useContext(BaseContext);
  if (!context) {
    throw new Error('useBase must be used within BaseProvider');
  }
  // console.log(context);

  return context;
};

export default useBase;
