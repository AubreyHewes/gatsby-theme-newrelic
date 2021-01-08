import React from 'react';
import { css } from '@emotion/core';
import SkewedContainer from '../components/SkewedContainer';
import GlobalHeader from '../components/GlobalHeader';
import GlobalFooter from '../components/GlobalFooter';
import Link from '../components/Link';

const NotFoundPage = () => {
  return (
    <>
      <GlobalHeader />
      <div
        css={css`
          display: grid;
          grid-template-rows: 1fr auto;
          grid-template-areas:
            'content'
            'footer';
          min-height: 100vh;
        `}
      >
        <div
          css={css`
            display: flex;
            flex-direction: column;
            justify-content: center;
            text-align: center;
            grid-area: content;
          `}
        >
          <SkewedContainer
            css={css`
              font-size: 1.125rem;
              padding: 8rem 0;
            `}
          >
            <h1
              css={css`
                font-family: var(--secondary-font-family);
                font-size: 9rem;
                font-weight: normal;
                line-height: 1;
              `}
            >
              404
            </h1>
            <p>
              The URL you entered may be broken, or the page has been removed.{' '}
              <Link to="/">Go back to the home page</Link>.
            </p>
          </SkewedContainer>
        </div>
        <GlobalFooter />
      </div>
    </>
  );
};

export default NotFoundPage;
