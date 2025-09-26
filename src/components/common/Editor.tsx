import '@components/common/Editor.css';

import clsx from 'clsx';
import {type Dispatch, type ReactNode, type SetStateAction, useState} from 'react';

import type {Verifiable} from '@model/common';

import Button from '@components/common/Button';
import Icon from '@components/common/Icon';
import Modal from '@components/common/Modal';
import useBase from '@context/base/useBase.ts';
import useSnackbar from '@context/snackbar/useSnackbar.ts';

interface DownloadParameters {
  download: string;
  href: string;
}

interface EditorProps<T extends Verifiable> {
  /**
   * A callback function that will be executed before the currently selected value gets updated
   */
  beforeUpdateCallback?: () => string;
  children: ReactNode;
  /**
   * The file name and data used for the file download
   */
  downloadParameters: DownloadParameters;
  /**
   * A `new` filler value used for creating new entries
   */
  filler: T;
  /**
   * The function to update the entry that is currently being edited
   */
  setValue: Dispatch<SetStateAction<T>>;
  /**
   * The function to update all entries
   */
  setValues: Dispatch<SetStateAction<T[]>>;
  /**
   * The name of the entry object. This is only really used for the `className` prop of the editor
   * so its only valuable purpose is styling
   */
  type: string;
  /**
   * The singular entry that is currently being edited
   */
  value: T;
  /**
   * The list of all entries
   */
  values: T[];
}

/**
 * The component that holds the basic functionality of a CRUD editor. The children of this object define, what will be editable in the `data-editor` section of the editor window.
 */
export default function Editor<T extends Verifiable>({
  beforeUpdateCallback,
  children,
  downloadParameters,
  filler,
  setValue,
  setValues,
  type,
  value,
  values,
}: EditorProps<T>) {
  const {currentlyEditing, reset, setCurrentlyEditing} = useBase();
  const {setSnackbarData} = useSnackbar();

  const [goHomeModalShown, setGoHomeModalShown] = useState(false);

  function downloadFile() {
    const link = document.createElement('a');
    link.href = downloadParameters.href;
    link.download = downloadParameters.download;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(downloadParameters.href);
  }

  function beforeUpdate() {
    let errorMessage = '';
    const errors: string[] = [];
    if (!value.isValid()) {
      errorMessage = `Element ${value.toString()} is invalid`;
    }
    if (beforeUpdateCallback !== undefined) {
      const callbackErrors = beforeUpdateCallback();
      if (callbackErrors.length > 0) {
        errorMessage = `Element ${value.toString()} is invalid`;
        errors.push(callbackErrors);
      }
    }
    setSnackbarData({
      color: 'danger',
      message: `${errorMessage}${errors.length > 0 ? ': ' : ''}${errors.join(', ')}`,
    });
    return !errorMessage && errors.length === 0;
  }

  function beforeDownload() {
    const errors: string[] = [];
    values.filter((v) => !v.isValid()).
        forEach((v, i) => errors.push(`Element ${v.toString()} at index ${i + 1} is invalid`));
    setSnackbarData({color: 'danger', message: errors.join('\n')});
    return errors.length === 0;
  }

  /**
   * Adds a new entity to the end of the entity list.
   */
  function addValue() {
    const list = [...values];
    list.push(filler);
    setValues(list);
  }

  /**
   * Moves the entity at `index` up (if the index is > 0). If the entity being moved upwards is currently being edited, it will still be editable after being moved up in the list.
   * @param index the index of the entity that should be moved upwards
   */
  function moveUp(index: number) {
    const list: T[] = [];
    values.forEach((v, i) => {
      if (i === index - 1) {
        list.push(values[i + 1]);
        list.push(v);
        if (currentlyEditing === index) {
          setCurrentlyEditing(i);
        } else if (currentlyEditing === index - 1) {
          setCurrentlyEditing(i + 1);
        }
      } else if (i !== index) {
        list.push(v);
      }
    });
    setValues(list);
  }

  /**
   * Moves the entity at `index` down (if the index is < `values.length`). If the entity being moved downwards is currently being edited, it will still be editable after being moved down in the list.
   * @param index the index of the entity that should be moved downwards
   */
  function moveDown(index: number) {
    const list: T[] = [];
    values.forEach((v, i) => {
      if (i === index + 1) {
        list.push(v);
        list.push(values[i - 1]);
        if (currentlyEditing === index) {
          setCurrentlyEditing(i);
        } else if (currentlyEditing === index + 1) {
          setCurrentlyEditing(i - 1);
        }
      } else if (i !== index) {
        list.push(v);
      }
    });
    setValues(list);
  }

  /**
   * Removes the entity at `index` from the list. If the entity being removed is the one that is currently edited, the edits will be discarded and the `data-editor` section will return to its initial state.
   * @param index the index to remove an entity at
   */
  function remove(index: number) {
    setValues(values.filter((_v, i) => i !== index));
    if (currentlyEditing === index) {
      setCurrentlyEditing(-1);
    }
  }

  /**
   * Updates the entity at the given index.
   * @param index the index to update the entity at
   */
  function update(index?: number) {
    setValues(values.map((v, i) => (i !== index ? v : value)));
  }

  const valueIsNotEdited = currentlyEditing === -1 || (currentlyEditing >= 0 && value.equals(values[currentlyEditing]));

  return <div className={clsx('Editor', `${type}Editor`)}>
    {goHomeModalShown && (
        <Modal className={'editor-exit-modal'} onBackdropClick={() => setGoHomeModalShown(false)}>
          <div>
            Go back to the homepage?
            <br/>
            Not downloaded changes will be lost.
          </div>
          <div className={'editor-modal-buttons'}>
            <Button onClick={() => setGoHomeModalShown(false)}>No</Button>
            <Button color={'danger'} onClick={() => reset()}>
              Yes
            </Button>
          </div>
        </Modal>
    )}
    <div className={'list'}>
      {values.map((v, index) => (
          <div
              className={clsx(
                  'list-element',
                  {selected: currentlyEditing === index},
                  {disabled: !(valueIsNotEdited || index === currentlyEditing)},
              )}
              key={`${v.toString()}_${index}`}
          >
            <button
                className={'element-name'}
                disabled={!valueIsNotEdited}
                onClick={() => {
                  setCurrentlyEditing(index);
                  setValue(values[index]);
                }}
                title={!valueIsNotEdited ? 'Please update or discard your changes before editing another element' : ''}
                type={'button'}
            >
              {v.toString()}
            </button>
            <div className={'element-buttons'}>
              <button disabled={index === 0} onClick={() => moveUp(index)} type={'button'}>
                <Icon type={'keyboard_arrow_up'}/>
              </button>
              <button onClick={() => remove(index)} type={'button'}>
                <Icon type={'delete'}/>
              </button>
              <button disabled={index === values.length - 1} onClick={() => moveDown(index)}
                      type={'button'}>
                <Icon type={'keyboard_arrow_down'}/>
              </button>
            </div>
          </div>
      ))}
    </div>
    <div className={'bottom-actions'}>
      <Button
          className={'home-button'}
          onClick={() => {
            setGoHomeModalShown(true);
          }}
          title={'Homepage'}
      >
        <Icon type={'home'}/>
      </Button>
      <Button className={'new-button'} onClick={addValue}>
        New
      </Button>
      <Button
          className={'update-button'}
          color={'success'}
          disabled={valueIsNotEdited}
          onClick={() => {
            if (beforeUpdate()) {
              update(currentlyEditing);
            }
          }}
      >
        Update
      </Button>
      <Button
          className={'discard-button'}
          color={'danger'}
          disabled={valueIsNotEdited}
          onClick={() => {
            setValue(values[currentlyEditing]);
          }}
      >
        Discard
      </Button>
      <Button
          className={'download-button'}
          disabled={!values.length || !valueIsNotEdited}
          onClick={() => {
            if (beforeDownload()) {
              downloadFile();
            }
          }}
      >
        Download
      </Button>
    </div>
    <div className={'data-editor'}>{currentlyEditing >= 0 && children}</div>
  </div>;
}