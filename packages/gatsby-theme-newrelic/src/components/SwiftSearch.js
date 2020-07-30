import React from 'react';
import SiteSearchAPIConnector from '@elastic/search-ui-site-search-connector';
import {
  SearchProvider,
  WithSearch,
  SearchBox,
  Results,
  Paging,
  PagingInfo,
} from '@elastic/react-search-ui';
import ResultView from './ResultView';
import PagingInfoView from './PagingInfoView';
import SearchInput from './SearchInput';

import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { rgba } from 'polished';
import PropTypes from 'prop-types';

// TODO: move styles to emotion/wrapper
import '@elastic/react-search-ui-views/lib/styles/styles.css';

const connector = new SiteSearchAPIConnector({
  documentType: 'page',
  engineKey: 'Ad9HfGjDw4GRkcmJjUut',
});

const configOptions = {
  apiConnector: connector,
  searchQuery: {
    result_fields: {
      title: {
        snippet: {
          size: 100,
          fallback: true,
        },
      },
      body: {
        snippet: {
          size: 400,
          fallback: true,
        },
      },
      url: {
        raw: {},
      },
    },
  },
  initialState: {
    resultsPerPage: 10,
  },
};

const SwiftSearch = ({ className }) => {
  return (
    <div className={className}>
      <SearchProvider config={configOptions}>
        <WithSearch
          mapContextToProps={({ isLoading, results, searchTerm }) => ({
            isLoading,
            results,
            searchTerm,
          })}
        >
          {({ isLoading, results, searchTerm }) => {
            const hasResults = !isLoading && results && results.length > 0;
            const hasSearched = !isLoading && searchTerm.length > 0;
            return (
              <div
                css={css`
                  display: flex;
                  flex-direction: column;
                `}
                className="App"
              >
                <SearchBox
                  searchAsYouType
                  debounceLength={500}
                  inputView={InputView}
                />
                {isLoading && <div>loading...</div>}
                {hasSearched && (
                  <>
                    <StyledPagingInfo view={PagingInfoView} />

                    {hasResults && (
                      <>
                        <StyledResults
                          resultView={ResultView}
                          titleField="title"
                          urlField="url"
                        />
                        <StyledPaging />
                      </>
                    )}
                  </>
                )}
              </div>
            );
          }}
        </WithSearch>
      </SearchProvider>
    </div>
  );
};

function InputView({ getAutocomplete, getInputProps }) {
  const inputProps = getInputProps();
  return (
    <>
      <div
        className="sui-search-box__wrapper"
        css={css`
          .sui-search-box__text-input {
            border: none;
            padding: 0;
          }
        `}
      >
        <SearchInput size={SearchInput.SIZE.LARGE} {...inputProps} />
        {getAutocomplete()}
      </div>
    </>
  );
}

SwiftSearch.propTypes = {
  className: PropTypes.string,
};

InputView.propTypes = {
  className: PropTypes.string,
  getAutocomplete: PropTypes.func,
  getInputProps: PropTypes.func,
};

const StyledPagingInfo = styled(PagingInfo)`
  margin: 1rem 0;
  color: var(--primary-text-color);
`;

const StyledPaging = styled(Paging)`
  margin-top: 1rem;
  font-size: 1rem;
  align-self: center;

  .rc-pagination-item {
    margin: 0rem 1rem;
  }
  .rc-pagination-item a {
    color: var(--link-color);
  }
  .rc-pagination-item:hover {
    background: var(--tertiary-background-color);
    a {
      color: var(--link-color);
    }
  }
  .rc-pagination-next:hover {
    background: var(--tertiary-background-color);
    a {
      color: var(--link-color);
    }
  }
  .rc-pagination-prev:hover {
    background: var(--tertiary-background-color);
    a {
      color: var(--link-color);
    }
  }
  .rc-pagination-jump-next:hover {
    background: var(--tertiary-background-color);
  }
  .rc-pagination-jump-next:hover:after {
    color: var(--link-color) !important;
  }
  .rc-pagination-jump-prev:hover {
    background: var(--tertiary-background-color);
  }
  .rc-pagination-jump-prev:hover:after {
    color: var(--link-color) !important;
  }
`;

const StyledResults = styled(Results)`
  > li {
    border: var(--border-color) solid 1px;
    background: var(--primary-background-color);
    margin: 0;
  }
  a {
    color: var(--link-color);
  }
  em {
    color: var(--link-color);
    &::after {
      background: ${rgba('#007e8a', 0.2)};
    }
  }
  .sui-result + .sui-result {
    margin-top: 0;
  }
`;

export default SwiftSearch;
