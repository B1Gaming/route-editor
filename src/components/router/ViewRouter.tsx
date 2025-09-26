import '@components/App.css';
import clsx from 'clsx';

import Homepage from '@components/view/Homepage';
import PointEditor from '@components/view/PointEditor';
import RouteEditor from '@components/view/RouteEditor';
import useBase from '@context/base/useBase.ts';

export default function ViewRouter() {
  const {settings, view} = useBase();

  let content = null;
  switch (view) {
    case 'home': {
      content = <Homepage/>;
      break;
    }
    case 'point': {
      content = <PointEditor/>;
      break;
    }
    case 'route': {
      content = <RouteEditor/>;
      break;
    }
  }

  return <main className={clsx({dark: settings.darkMode})}>
    {content}
  </main>;
}