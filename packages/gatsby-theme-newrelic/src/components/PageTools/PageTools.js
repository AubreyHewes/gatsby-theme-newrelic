import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import Section from './Section';
import Title from './Title';

const PageTools = ({ className, children }) => {
  return (
    <aside
      data-swiftype-index={false}
      className={className}
      css={css`
        display: flex;
        flex-direction: column;
        border: 1px solid var(--divider-color);
        border-radius: 0.25rem;
      `}
    >
      {children}
    </aside>
  );
};

PageTools.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

PageTools.Section = Section;
PageTools.Title = Title;

export default PageTools;
