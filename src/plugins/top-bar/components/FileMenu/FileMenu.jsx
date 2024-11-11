import { useCallback, useRef } from 'react';
import PropTypes from 'prop-types';

import FileMenuHandler from './FileMenuHandler.jsx';

const FileMenu = (props) => {
  const { getComponent } = props;
  const fileMenuHandler = useRef(null);
  const DropdownMenu = getComponent('DropdownMenu');
  const DropdownMenuItemDivider = getComponent('DropdownMenuItemDivider');
  const ImportUrlMenuItem = getComponent('TopBarFileMenuImportUrlMenuItem', true);
  const ImportFileMenuItem = getComponent('TopBarFileMenuImportFileMenuItem', true);
  const LoadExampleNestedMenu = getComponent('TopBarFileMenuLoadExampleNestedMenu', true);
  const LoadHistoryMenu = getComponent('TopBarLoadHistoryMenu', true);
  const SaveAsMenuItem = getComponent('TopBarFileMenuSaveAsMenuItem', true);
  /* const HISTORY_STORAGE_KEY = 'swagger-editor-next-history';

  const saveHistoryToLocalStorage = (id, url) => {
    let map = new Map();
    // eslint-disable-next-line no-use-before-define
    if (hasHistoryLocalStorage()) {
      // eslint-disable-next-line no-use-before-define
      map = new Map(JSON.parse(loadHistoryFromLocalStorage()));
    }
    map.set(id, url);
    map.forEach((item) => {
      console.log('item ', item);
    });
    return localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(Array.from(map)));
  };

  const loadHistoryFromLocalStorage = () => {
    return localStorage.getItem(HISTORY_STORAGE_KEY);
  };

  const hasHistoryLocalStorage = () => {
    return loadHistoryFromLocalStorage() !== null;
  }; */

  const ConvertAndSaveAsJSONMenuItem = getComponent(
    'TopBarFileMenuConvertAndSaveAsJSONMenuItem',
    true
  );
  const ConvertAndSaveAsYAMLMenuItem = getComponent(
    'TopBarFileMenuConvertAndSaveAsYAMLMenuItem',
    true
  );
  const DownloadResolvedJSONMenuItem = getComponent(
    'TopBarFileMenuDownloadResolvedJSONMenuItem',
    true
  );
  const DownloadResolvedYAMLMenuItem = getComponent(
    'TopBarFileMenuDownloadResolvedYAMLMenuItem',
    true
  );

  const handleUrlImportClick = useCallback((event) => {
    fileMenuHandler.current.importURL(event);
  }, []);
  const handleFileImportClick = useCallback(async (event) => {
    await fileMenuHandler.current.importFile(event);
  }, []);
  const handleSaveAsClick = useCallback(async (event) => {
    await fileMenuHandler.current.saveAs(event);
  }, []);
  const handleConvertAndSaveAsJSONClick = useCallback(async (event) => {
    await fileMenuHandler.current.convertAndSaveAsJSON(event);
  }, []);
  const handleConvertAndSaveAsYAMLClick = useCallback(async (event) => {
    await fileMenuHandler.current.convertAndSaveAsYAML(event);
  }, []);
  const handleDownloadResolvedJSONClick = useCallback(async (event) => {
    await fileMenuHandler.current.downloadResolvedJSON(event);
  }, []);
  const handleDownloadResolvedYAMLClick = useCallback(async (event) => {
    await fileMenuHandler.current.downloadResolvedYAML(event);
  }, []);

  return (
    <>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <FileMenuHandler {...props} ref={fileMenuHandler} />
      <DropdownMenu label="Specifications">
        <ImportFileMenuItem onClick={handleFileImportClick} />
        <ImportUrlMenuItem onClick={handleUrlImportClick} />
        <LoadHistoryMenu />
        <LoadExampleNestedMenu />
        <DropdownMenuItemDivider />
        <SaveAsMenuItem onClick={handleSaveAsClick} />
        <ConvertAndSaveAsJSONMenuItem onClick={handleConvertAndSaveAsJSONClick} />
        <ConvertAndSaveAsYAMLMenuItem onClick={handleConvertAndSaveAsYAMLClick} />
        <DropdownMenuItemDivider />
        <DownloadResolvedJSONMenuItem onClick={handleDownloadResolvedJSONClick} />
        <DownloadResolvedYAMLMenuItem onClick={handleDownloadResolvedYAMLClick} />
      </DropdownMenu>
    </>
  );
};

FileMenu.propTypes = {
  getComponent: PropTypes.func.isRequired,
};

export default FileMenu;
