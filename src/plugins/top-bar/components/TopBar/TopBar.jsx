import PropTypes from 'prop-types';
import React from 'react';

const TopBar = ({ getComponent }) => {
  const Logo = getComponent('TopBarLogo');
  const FileMenu = getComponent('TopBarFileMenu', true);
  const EditMenu = getComponent('TopBarEditMenu', true);
  const OpenAPI3GenerateServerMenu = getComponent('TopBarOpenAPI3GenerateServerMenu', true);
  const OpenAPI3GenerateClientMenu = getComponent('TopBarOpenAPI3GenerateClientMenu', true);
  const OpenAPI2GenerateServerMenu = getComponent('TopBarOpenAPI2GenerateServerMenu', true);
  const OpenAPI2GenerateClientMenu = getComponent('TopBarOpenAPI2GenerateClientMenu', true);
  const AboutMenu = getComponent('TopBarAboutMenu', true);

  return (
    <div className="swagger-editor__top-bar">
      <div className="swagger-editor__top-bar-wrapper">
        <Logo />
        <FileMenu />
        <EditMenu />
        <OpenAPI3GenerateServerMenu />
        <OpenAPI3GenerateClientMenu />
        <OpenAPI2GenerateServerMenu />
        <OpenAPI2GenerateClientMenu />
        <AboutMenu />
        {/* <div
            className={classNames('dd-menu dd-menu-right', { long: true })}
            style={{
              position: 'absolute',
              right: 0,
              width: '50%',
              maxWidth: 'none',
            }}
          >
            <div className="input-group" style={{ width: '97%' }}>
              eslint-disable-next-line jsx-a11y/label-has-associated-control
              <select onChange={handleUrlFieldChange}>
                {history.size === 0 ? (
                  <option>No History</option>
                ) : (
                  Array.from(history.entries()).map(([key, value]) => (
                    <option value={value} key={key}>
                      {key}
                    </option>
                  ))
                )}
              </select>
              <input
                id="input-import-url-top-bar"
                type="text"
                className="form-control"
                placeholder="Enter the URL to import from"
                value={url}
                style={{
                  width: '100%',
                  background: '#FFFFFF 0% 0% no-repeat padding-box',
                  border: '1px solid #B6BECB',
                  borderRadius: '4px',
                  fontSize: '0.8rem',
                  color: '#758491',
                  lineHeight: '1.5',
                  padding: '0.375rem 0.75rem',
                  opacity: 1,
                }}
                onChange={handleUrlFieldChange}
              />
            </div>
          </div> */}
      </div>
    </div>
  );
};

TopBar.propTypes = {
  getComponent: PropTypes.func.isRequired,
  editorActions: PropTypes.shape({
    importUrl: PropTypes.func.isRequired,
    setContent: PropTypes.func.isRequired,
  }).isRequired,
};

export default TopBar;
