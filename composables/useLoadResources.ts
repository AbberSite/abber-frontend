// Cache object to store loaded CSS & JS files.
const loadObject = {};

// Load large external CSS or JS resources progressively.
export default (href, isScript = false) => {
  return new Promise((resolve, reject) => {
    // Check if the code is running in the browser
    if (process.client) {
      if (loadObject[href]) {
        return resolve();
      }

      const existingResource = document.querySelector(isScript ? `script[src="${href}"]` : `link[href="${href}"]`);

      if (existingResource) {
        loadObject[href] = true;
        return resolve();
      }

      const resource = isScript ? document.createElement('script') : document.createElement('link');
      const prior = document.getElementsByTagName(isScript ? 'script' : 'link')[0];

      if (isScript) {
        resource.defer = true;
        resource.crossOrigin = 'anonymous';

        function onloadHandler(isAbort) {
          if (isAbort || !resource.readyState || /loaded|complete/.test(resource.readyState)) {
            resource.onload = null;
            resource.onreadystatechange = null;
            resource.remove();

            if (isAbort) {
              reject();
            } else {
              loadObject[href] = true;
              resolve();
            }
          }
        }

        resource.onload = onloadHandler.bind(null, false);
        resource.onreadystatechange = onloadHandler.bind(null, false);
        resource.onerror = onloadHandler.bind(null, true);
        resource.src = href;
      } else {
        resource.rel = 'stylesheet';
        resource.href = href;
        resource.crossOrigin = 'anonymous';

        resource.onload = () => {
          loadObject[href] = true;
          resolve();
        };
      }

      prior.parentNode.insertBefore(resource, prior);
    } else {
      // If not in the browser, resolve immediately
      resolve();
    }
  });
};
