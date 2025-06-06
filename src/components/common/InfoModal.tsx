import '@components/common/InfoModal.css';

import { type FC, useState } from 'react';

import changelog from '@base/changelog.ts';
import Button from '@components/common/Button';
import Icon from '@components/common/Icon';
import Modal from '@components/common/Modal';

type ContentTab = 'about' | 'points' | 'routes';

interface InfoModalProps {
  closeFunction: () => void;
}

const InfoModal: FC<InfoModalProps> = ({ closeFunction }) => {
  const [contentTab, setContentTab] = useState<ContentTab>('about');

  const renderList = (list: string[]) => <ul>{list.map((entry) => <li>{entry}</li>)}</ul>;

  let contentWindow;
  switch (contentTab) {
    case 'points': {
      contentWindow = <>
        <h1>About Points</h1>
        <p>
          A point defines a spot on the world map, the player can stand on or move across. Multiple
          points make up a route connecting two levels. A point <b>must</b> follow the following
          convention or it will not work properly: <code>Xyyy</code>.
        </p>
        <p>There are three different types of points</p>
        <ul>
          <li>
            <b>Fxyz</b>: Points that can have flags set which can limit the players' and camera's
            actions. <code>x</code> and <code>z</code> can be any number. <code>y</code> can also be
            any number. However, it can also be used to indicate ambush points if it is set to
            either <code>a</code>, <code>b</code> or <code>c</code>.
          </li>
          <li><b>Kxxx</b>: Points the players can pass through. They cannot have flags
            set. <code>xxx</code> can be any 3-digit number. However, it is recommended to set them
            up in chronological order and that each set of K-points between two levels always takes
            up a multiple of 10 available numbers. They usually start at <code>K011</code>
            <br/>Example: A route from 1-1 to 1-2 needs one K-point, which would then be
            named <code>K011</code>. The next K-point, that would come after 1-2 for instance,
            should then be named <code>K021</code> for ease of organisation.
          </li>
          <li>
            <b>Wxyz</b>: Points that act as levels the players must play through in order to
            progress. The player will always stop on these points. <code>x</code> is the world
            number, <code>y</code> can be used to indicate a special level like a tower, castle or
            ghost house and <code>z</code> is a generic level number ranging from 0 to 9. Common
            examples are
            <ul>
              <li><code>W101</code></li>
              <li><code>W2T0</code></li>
              <li><code>W3G0</code></li>
            </ul>
          </li>
        </ul>
        <p>
          For more information, visit the <a
          href={'https://horizon.miraheze.org/wiki/World_Map_Data'} target={'_blank'}>
          World Map Data
        </a> page on the Horizon wiki
        </p>
      </>;
      break;
    }
    case 'routes': {
      contentWindow = <>
        <h1>About Routes</h1>
        <p>A route is an invisible straight line connecting two points.</p>
        <p>The player can traverse a route in many different ways. This includes:</p>
        <ul>
          <li>Walking</li>
          <li>Jumping</li>
          <li>Climbing</li>
          <li>and a few other ways...</li>
        </ul>
        <p>
          For a full list, visit the <a
          href={'https://horizon.miraheze.org/wiki/Editing_the_Original_Maps#Editing_Route_Animations'}
          target={'_blank'}>
          Editing the Original Maps -&gt; Editing Route Animations
        </a> page on the Horizon wiki.
        </p>
      </>;
      break;
    }
    case 'about':
    default: {
      contentWindow = <>
        <h1>About this page</h1>
        <p>
          This page was created by B1 Gaming to help with creating RouteInfo files for New Super
          Mario Bros. Wii. It provides all the necessary functions required to make valid RouteInfo
          CSV files for both points and routes.
        </p>
        <p>
          For more information, check out the <a
          href={'https://horizon.miraheze.org/wiki/Editing_the_Original_Maps'} target={'_blank'}>
          Editing the Original Maps
        </a> page on the Horizon wiki.
        </p>
        <hr/>
        <h2>Credits</h2>
        <ul>
          <li>
            The <a href={'https://discord.gg/Quvaj2Ufhb'} target={'_blank'}>
            Horizon Discord Server
          </a>
          </li>
        </ul>
        <hr/>
        <h2>Changelog</h2>
        <p>
          {changelog.map((entry) => <div>
            <h3>{entry.version}</h3>
            {!!entry.additions.length && <>
              <h4>Additions</h4>
              {renderList(entry.additions)}
            </>}
            {!!entry.removals.length && <>
              <h4>Removals</h4>
              {renderList(entry.removals)}
            </>}
            {!!entry.bugfixes.length && <>
              <h4>Bugfixes</h4>
              {renderList(entry.bugfixes)}
            </>}
          </div>)}
        </p>
      </>;
      break;
    }
  }

  const renderButton = (tab: ContentTab) => {
    return <Button onClick={() => setContentTab(tab)} outlined={tab !== contentTab}>
      {tab}
    </Button>;
  };

  const tabs: ContentTab[] = ['about', 'points', 'routes'];

  return <Modal className={'InfoModal'} noPadding onBackdropClick={closeFunction}>
    <div className={'tab-list'}>{tabs.map((tab) => renderButton(tab))}</div>
    <Icon onClick={closeFunction} type={'close'}/>
    <div className={'content'}>{contentWindow}</div>
  </Modal>;
};

export default InfoModal;
