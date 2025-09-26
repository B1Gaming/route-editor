import {useState} from 'react';

import Editor from '@components/common/Editor';
import Input from '@components/common/Input';
import Label from '@components/common/Label';
import Select from '@components/common/Select';
import useBase from '@context/base/useBase.ts';
import Route from '@entities/Route';
import {routeAnimations} from '@utils/routeInfoData';

export default function RouteEditor() {
  const {routes, setRoutes} = useBase();
  const [route, setRoute] = useState(routes[0] ?? new Route());

  let worldNum = '0';
  if (routes.length) {
    worldNum = routes.filter((r) => r.name.startsWith('RW'))[0].name[2];
  }

  return <Editor
      downloadParameters={{
        download: `routeW${worldNum}.csv`,
        href: `data:text/plain;base64,${btoa(String.fromCharCode(...routes.map((r) => r.toNumberArray()).flat(2)))}`,
      }}
      filler={new Route()}
      setValue={setRoute}
      setValues={setRoutes}
      type={'Route'}
      value={route}
      values={routes}
  >
    <fieldset>
      <legend>General Information</legend>
      <Label>
        Route Name
        <Input onChange={(e) => setRoute(new Route({...route, name: e.target.value}))}
               placeholder={'e.g. RW101W102'} value={route.name}/>
      </Label>
      <Label>
        Player Animation
        <Select
            onChange={(value) => setRoute(new Route({...route, animation: value.value}))}
            options={routeAnimations.map((anim) => ({label: anim.name, value: anim.name}))}
            value={{
              label: routeAnimations.filter((anim) => anim.name === route.animation)[0].name,
              value: route.animation,
            }}
        />
      </Label>
    </fieldset>
  </Editor>;
}