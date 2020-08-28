import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";

export default (function () {
  if (!ExecutionEnvironment.canUseDOM) {
    return null;
  }

  return {
    onRouteUpdate({ location }) {
      const pathIsExcluded =
        location &&
        typeof window.plausibleExcludePaths !== `undefined` &&
        window.plausibleExcludePaths.some((rx) => rx.test(location.pathname));

      if (pathIsExcluded) return null;

      window.plausible("pageview");
    },
  };
})();
