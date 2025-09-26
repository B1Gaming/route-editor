import {useContext} from 'react';

import {BaseContext} from '@context/base/BaseContext.tsx';

export default function useBase() {
  const context = useContext(BaseContext);
  if (!context) {
    throw new Error('useBase must be used within BaseProvider');
  }

  return context;
}
