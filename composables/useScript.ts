export default (src: string) =>
    new Promise((resolve, reject) => {
        var script = document.createElement('script');
        script.onload = function () {
            resolve(true)
        };
        script.onerror = () => reject({ message : 'failed to load script'})
        script.src = src;
        document.head.appendChild(script);
    });
