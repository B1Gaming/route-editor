import '@components/App.css';

import clsx from 'clsx';
import {type FC} from 'react';

import Homepage from '@components/view/Homepage';
import PointEditor from '@components/view/PointEditor';
import RouteEditor from '@components/view/RouteEditor';
import useBase from '@context/base/useBase.ts';

const App: FC = () => {
  const {settings, view} = useBase();

  let contentWindow = null;
  switch (view) {
    case 'home': {
      contentWindow = <Homepage/>;
      break;
    }
    case 'point': {
      contentWindow = <PointEditor/>;
      break;
    }
    case 'route': {
      contentWindow = <RouteEditor/>;
      break;
    }
  }

  return <div className={clsx('App', {dark: settings.darkMode})}>
    {contentWindow}
  </div>;
};

export default App;
