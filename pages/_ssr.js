/**
 * This is custom made to abstract the required SSR extensions to the component
 */

export function withSSR() {
  return function adapter(ScreenComponent) {
    // eslint-disable-next-line no-param-reassign
    ScreenComponent.getInitialProps = function getInitialProps({ query }) {
      return query;
    };
    return ScreenComponent;
  };
}
