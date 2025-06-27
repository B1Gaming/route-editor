import '@components/view/Homepage.css';

import clsx from 'clsx';
import { type ChangeEvent, type DragEvent, type FC, useState } from 'react';

import type { Settings, Views } from '@model/common';

import Button from '@components/common/Button';
import Icon from '@components/common/Icon';
import InfoModal from '@components/common/InfoModal';
import Modal from '@components/common/Modal';
import Switch from '@components/common/Switch';
import useBase from '@context/base/useBase.ts';
import titleLogo from '@img/logo.svg';
import { makePoints, makeRoutes, toUnicode } from '@utils/utils';

const Homepage: FC = () => {
  const {
    setCsvString,
    setPoints,
    setRoutes,
    setSettings,
    setSettingsOpen,
    settings,
    settingsOpen,
    setView
  } = useBase();

  const [uploadError, setUploadError] = useState(false);
  const [infoModalOpen, setInfoModalOpen] = useState(false);
  const [uploadText, setUploadText] = useState('Upload a file');
  const [uploadClass, setUploadClass] = useState('');

  const handleFile = (file: File | null) => {
    if (file) {
      setUploadError(false);
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          if (e.target?.result != null && typeof e.target.result === 'object') {
            const tempCsvString = toUnicode(new Uint8Array(e.target.result));

            if (tempCsvString.split('\r\n')[0].split(',').length >= 7) {
              const points = makePoints(tempCsvString);
              setView('point');
              setPoints(points);
            } else if (tempCsvString.split('\n')[0].split(',').length === 3) {
              const routes = makeRoutes(tempCsvString);
              setView('route');
              setRoutes(routes);
            }
            setCsvString(tempCsvString);
          }
        } catch (e) {
          console.log(e);
          setUploadError(true); // Spawn snackbar instead
        }
      };
      const extension = file.name.split('.').pop();
      if (extension?.toLowerCase() !== 'csv') {
        setUploadError(true); // Spawn snackbar instead
        return;
      }
      reader.readAsArrayBuffer(file);
    }
  };

  const handleDragAndDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    if (e.dataTransfer.items) {
      [...e.dataTransfer.items].forEach((item) => {
        if (item.kind === 'file' && item.getAsFile() != null) {
          handleFile(item.getAsFile());
        }
      });
    }
  };

  const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files) {
      handleFile(e.target.files[0]);
    }
  };

  const switchView = (viewName: Views) => {
    setView(viewName);
  };

  const updateSettings = (data: Settings) => {
    let key: keyof Settings;
    let settingsStr = '';
    for (key in data) {
      settingsStr += Number(data[key]);
    }

    setSettings(data);
    const oneYearFuture = new Date();
    oneYearFuture.setFullYear(oneYearFuture.getFullYear() + 1);
    oneYearFuture.setFullYear(new Date().getFullYear() + 1);
    document.cookie = `settings=${parseInt(settingsStr)};expires=${oneYearFuture.toUTCString()}`;
  };

  return <div className={'Homepage'}>
    {infoModalOpen && <InfoModal closeFunction={() => setInfoModalOpen(false)}/>}
    {settingsOpen && (
      <Modal className={'settings-modal'} onBackdropClick={() => setSettingsOpen(false)}>
        <Icon onClick={() => setSettingsOpen(false)} type={'close'}/>
        <h1>Settings</h1>
        <div className={'settings-body'}>
          <fieldset>
            <legend>Design</legend>
            <Switch
              active={settings.darkMode}
              onClick={() => updateSettings({ ...settings, darkMode: !settings.darkMode })}
            >
              Dark Mode
            </Switch>
          </fieldset>
        </div>
        <div className={'settings-footer'}>
          <Button onClick={() => setSettingsOpen(false)}>Close</Button>
        </div>
      </Modal>
    )}
    <div className={'header'}>
      <img alt={'NSMBW Route Creator'} className={'title-logo'} src={titleLogo}/>
      <p>A tool to help with creating RouteInfo Files for New Super Mario Bros. Wii</p>
    </div>
    <div className={'homepage-content'}>
      {uploadError &&
        <div>The provided file is not a valid New Super Mario Bros. Wii RouteInfo CSV
          file</div>}
      <label
        className={clsx('upload-dialog', uploadClass)}
        htmlFor={'file-upload'}
        onDragEnter={(e) => {
          e.preventDefault();
          setUploadClass('on-drag');
          setUploadText('Drop file here');
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          setUploadClass('');
          setUploadText('Upload a file');
        }}
        onDropCapture={handleDragAndDrop}
      >
        {uploadText}
        <input accept={'text/csv'} id={'file-upload'} onChange={handleUpload} type={'file'}/>
      </label>
      <div className={'alternative-actions'}>
        <p className={'alternatives-text'}>or open a new</p>
        <Button icon={'radio_button_checked'}
          onClick={() => switchView('point')}>
          Point Editor
        </Button>
        <p className={'or-text'}>or</p>
        <Button icon={'polyline'}
          onClick={() => switchView('route')}>
          Route Editor
        </Button>
      </div>
    </div>
    <Button className={'page-info-button'} onClick={() => setInfoModalOpen(true)}>
      <Icon type={'info'}/>
    </Button>
    <Button className={'settings-button'} onClick={() => setSettingsOpen(true)}>
      <Icon type={'settings'}/>
    </Button>
  </div>;
};

export default Homepage;
