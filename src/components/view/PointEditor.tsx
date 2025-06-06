import { type FC, useState } from 'react';

import Editor from '@components/common/Editor';
import Frame from '@components/common/Frame';
import Input from '@components/common/Input';
import Label from '@components/common/Label';
import MultiTextInput from '@components/common/MultiTextInput';
import Select from '@components/common/Select';
import useBase from '@context/base/useBase.ts';
import Point from '@entities/Point';
import { allFlags } from '@utils/routeInfoData';
import { verifyPointName } from '@utils/utils';

const PointEditor: FC = () => {
  document.title = 'NSMBW Route Editor (Points)';
  const { currentlyEditing, points, setPoints } = useBase();
  const [point, setPoint] = useState(points[0] ?? new Point());

  const verifyPointMethod = (value: string) => {
    return point.name !== value && verifyPointName(value, { levelName: true });
  };
  const verifyBoneMethod = (value: string) => /[ -~]/.test(value);

  let worldNum = '0';
  if (points.length) {
    worldNum = points.filter((p) => p.name.startsWith('W'))[0].name[1];
  }
  return <Editor
    beforeUpdateCallback={() => {
      const errors: string[] = [];
      Object.keys(allFlags)
      .filter((key) => key.match(/[A-Za-z]+[0-9]+/) && point.flags.includes(key))
      .forEach((key) => {
        const pointList = points.filter((p, i) => p.flags.includes(key) && i != currentlyEditing);
        if (pointList.length >= 1) {
          errors.push(`Duplicate unique flag: ${key} found at (${pointList[0].name})`);
        }
      });
      return errors.join('\n');
    }}
    downloadParameters={{
      download: `pointW${worldNum}.csv`,
      href: `data:text/plain;base64,${btoa(points.map((p, i) => `${i},${p.toCsvString()}`).join(''))}`
    }}
    filler={new Point()}
    setValue={setPoint}
    setValues={setPoints}
    type={'Point'}
    value={point}
    values={points}
  >
    <Frame className={'general-info'} title={'General Information'}>
      <Label>
        Name
        <Input
          onChange={(e) => {
            setPoint(new Point({ ...point, name: e.target.value }));
          }}
          value={point.name}
        />
      </Label>
    </Frame>
    <Frame className={'normal-exit'} title={'Normal Exit'}>
      <Label>
        Flags
        <Select
          multi
          onChange={(options: SelectOption[]) => {
            setPoint(new Point({ ...point, flags: options.map((o) => o.value) }));
          }}
          options={Object.keys(allFlags).map((key) => ({ label: allFlags[key], value: key }))}
          value={point.flags.map((flag) => ({ label: allFlags[flag], value: flag }))}
        />
      </Label>
      <Label>
        Unlocked Levels
        <MultiTextInput
          setParentValue={(values: string[]) => setPoint(new Point({
            ...point,
            unlockedLevels: values
          }))}
          values={point.unlockedLevels}
          verifyMethod={verifyPointMethod}
        />
      </Label>
      <Label>
        Unlocked Routes / Bones
        <MultiTextInput
          setParentValue={(values: string[]) => setPoint(new Point({
            ...point,
            unlockedRoutes: values
          }))}
          values={point.unlockedRoutes}
          verifyMethod={verifyBoneMethod}
        />
      </Label>
    </Frame>
    <Frame className={'secret-exit'} title={'Secret Exit'}>
      <Label>
        Unlocked Levels
        <MultiTextInput
          setParentValue={(values: string[]) => setPoint(new Point({
            ...point,
            unlockedLevelsSE: values
          }))}
          values={point.unlockedLevelsSE}
          verifyMethod={verifyPointMethod}
        />
      </Label>
      <Label>
        Unlocked Routes / Bones
        <MultiTextInput
          setParentValue={(values: string[]) => setPoint(new Point({
            ...point,
            unlockedRoutesSE: values
          }))}
          values={point.unlockedRoutesSE}
          verifyMethod={verifyBoneMethod}
        />
      </Label>
    </Frame>
  </Editor>;
};

export default PointEditor;
