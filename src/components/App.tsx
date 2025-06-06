import '@components/App.css';

import clsx from 'clsx';
import {type FC} from 'react';

import Homepage from '@components/page/Homepage';
import PointEditor from '@components/page/PointEditor';
import RouteEditor from '@components/page/RouteEditor';
import useBase from '@context/base/useBase.ts';

const App: FC = () => {
  const {page, settings} = useBase();

  let contentWindow = null;
  switch (page) {
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
