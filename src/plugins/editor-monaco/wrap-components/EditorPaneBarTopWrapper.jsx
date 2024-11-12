import PropTypes from 'prop-types';
import { SyncIcon, ShareIcon, GearIcon } from '@primer/octicons-react';
/* eslint-disable react/jsx-props-no-spreading */

const EditorPaneBarTopWrapper = (Original, system) => {
  const ThemeSelection = system.getComponent('ThemeSelection', true);

  const EditorPaneBarTop = ({ renderControls, ...rest }) => {
    return (
      <Original
        {...rest}
        renderControls={(controls) =>
          renderControls(
            <>
              <ThemeSelection />
              <div className="swagger-editor__generic-padding-thin-top-bottom">
                <button type="button" className="swagger-editor__editor-pane-bar-control">
                  Fetch&nbsp;&nbsp;
                  <SyncIcon size="small" />
                </button>
              </div>
              <div className="swagger-editor__generic-padding-thin-top-bottom">
                <button type="button" className="swagger-editor__editor-pane-bar-control">
                  Save&nbsp;&nbsp;
                  <ShareIcon size="small" />
                </button>
              </div>
              <div className="swagger-editor__generic-padding-thin-top-bottom">
                <button type="button" className="swagger-editor__editor-pane-bar-control">
                  URL Settings&nbsp;&nbsp;
                  <GearIcon size="small" />
                </button>
              </div>
              {controls}
            </>
          )
        }
      />
    );
  };
  EditorPaneBarTop.propTypes = {
    renderControls: PropTypes.func,
  };
  EditorPaneBarTop.defaultProps = {
    renderControls: (controls) => controls,
  };

  return EditorPaneBarTop;
};

export default EditorPaneBarTopWrapper;
