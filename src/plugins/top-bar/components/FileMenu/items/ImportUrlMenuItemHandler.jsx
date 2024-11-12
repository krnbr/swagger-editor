import React, { useState, useImperativeHandle, useRef, forwardRef, useContext } from 'react';
import PropTypes from 'prop-types';
import YAML from 'js-yaml';

import { SwaggerContext } from '../../../../../context/SwaggerContext.jsx';

const ImportUrlMenuItemHandler = forwardRef(({ getComponent, editorActions }, ref) => {
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
  const alertDialogMessage = useRef('');
  const [url, setUrl] = useState('');
  const ConfirmDialog = getComponent('ConfirmDialog', true);
  const AlertDialog = getComponent('AlertDialog', true);
  const swaggerContext = useContext(SwaggerContext);

  const handleConfirmDialogClose = async (result) => {
    if (result) {
      const fsa = await editorActions.importUrl(url);

      if (fsa.error) {
        alertDialogMessage.current = fsa.meta.errorMessage;
        setIsConfirmDialogOpen(false);
        setIsAlertDialogOpen(true);
      } else {
        const contentObject = YAML.load(fsa.payload);
        swaggerContext.saveHistoryToLocalStorage(
          `${contentObject.info.title} - version -> ${contentObject.info.version}`,
          url
        );
        editorActions.setContent(fsa.payload, 'import-url');
        setUrl('');
        alertDialogMessage.current = '';
        setIsConfirmDialogOpen(false);
      }
    } else {
      alertDialogMessage.current = '';
      setIsConfirmDialogOpen(false);
    }
  };

  const handleAlertDialogClose = () => {
    setIsAlertDialogOpen(false);
  };

  const handleUrlFieldChange = (event) => {
    setUrl(event.target.value);
  };

  useImperativeHandle(ref, () => ({
    openModal() {
      setIsConfirmDialogOpen(true);
    },
  }));

  return (
    <>
      <AlertDialog
        isOpen={isAlertDialogOpen}
        title="Uh oh, an error has occurred"
        onClose={handleAlertDialogClose}
      >
        {alertDialogMessage.current}
      </AlertDialog>
      <ConfirmDialog
        isOpen={isConfirmDialogOpen}
        title="Import URL"
        onClose={handleConfirmDialogClose}
      >
        <div className="input-group">
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label htmlFor="input-import-url" aria-labelledby="input-import-url">
            Enter the URL to import from
          </label>
          <input
            id="input-import-url"
            type="text"
            className="form-control"
            placeholder="type url here"
            value={url}
            onChange={handleUrlFieldChange}
          />
        </div>
      </ConfirmDialog>
    </>
  );
});

ImportUrlMenuItemHandler.propTypes = {
  getComponent: PropTypes.func.isRequired,
  editorActions: PropTypes.shape({
    importUrl: PropTypes.func.isRequired,
    setContent: PropTypes.func.isRequired,
  }).isRequired,
};

export default ImportUrlMenuItemHandler;
