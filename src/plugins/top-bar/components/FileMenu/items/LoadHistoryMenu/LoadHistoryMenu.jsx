import { useContext } from 'react';
import PropTypes from 'prop-types';
import YAML from 'js-yaml';

import { TopBarContext } from '../../../TopBarContext.jsx';

const LoadHistoryMenu = (props) => {
  const { getComponent, editorActions } = props;
  const DropDownMenuNested = getComponent('DropdownMenuNested');
  const DropdownMenuItem = getComponent('DropdownMenuItem');
  const { history, saveHistoryToLocalStorage, removedFromStorage } = useContext(TopBarContext);

  return (
    <>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <DropDownMenuNested label="History">
        {history.size === 0 ? (
          <DropdownMenuItem>No History</DropdownMenuItem>
        ) : (
          Array.from(history.entries()).map(([key, value]) => (
            <DropdownMenuItem
              key={key}
              onClick={async () => {
                const fsa = await editorActions.importUrl(value);

                if (fsa.error) {
                  console.error('unable to load the url ', value);
                } else {
                  const contentObject = YAML.load(fsa.payload);
                  saveHistoryToLocalStorage(
                    `${contentObject.info.title} - version -> ${contentObject.info.version}`,
                    value
                  );
                  editorActions.setContent(fsa.payload, 'import-url');
                }
              }}
              closeId={key}
              removedFromStorage={() => removedFromStorage(key)}
            >
              {key}{' '}
            </DropdownMenuItem>
          ))
        )}
      </DropDownMenuNested>
    </>
  );
};

LoadHistoryMenu.propTypes = {
  getComponent: PropTypes.func.isRequired,
  editorActions: PropTypes.shape({
    importUrl: PropTypes.func.isRequired,
    setContent: PropTypes.func.isRequired,
  }).isRequired,
};

export default LoadHistoryMenu;
