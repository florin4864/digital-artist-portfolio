export const UrlUtils = (() => {
    ///// Declaration /////
    let pub = {};



    /**
     * If only `location` is given, change url's pathname to `location` keeping the params the same.
     *
     * If `params` are given, change pathname and params.
     *
     * `http://hostname:port/pathname?params`
     */
    pub.redirect = (location, params) => {
        let url = '';

        if (location[0] === '/') {
            url = location;
        } else {
            url = `/${location}`;
        }

        if (params) {
            url = `${url}${pub.URIParams.construct(params)}`;
            window.location.href = url;
        } else {
            window.location.pathname = url;
        }
    };



    pub.URIParams = {
        /**
         * Returns a string of the following form: `?param1=value1&param2=value2`
         */
        construct: (data, strength=1) => {
            let res = [];
            for (let d in data) {
                const key = pub.strongEncodeURIComponent(d, strength);
                const val = pub.strongEncodeURIComponent(data[d], strength);
                res.push(`${key}=${val}`);
            }
            return `?${res.join('&')}`;
        },



        // Source: https://stackoverflow.com/a/20097994
        getAll: (strength=1) => {
            let vars = {};
            const parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,
                (m, key, val) => {
                    const decodedKey = pub.strongDecodeURIComponent(key, strength);
                    const decodedVal = pub.strongDecodeURIComponent(val, strength);
                    vars[decodedKey] = decodedVal;
                }
            );
            return vars;
        }



        // // Source: https://stackoverflow.com/a/487049
        // /**
        //  * Insert into URL string a parameter `key` with value `value`
        //  */
        // set: (key, value, strength=1, isReloadPage=false) => {
        //     const k = pub.strongEncodeURIComponent(key, strength);
        //     const v = pub.strongEncodeURIComponent(value, strength);
        //     let kvp = document.location.search
        //         .substr(1)
        //         .split('&')
        //         .filter((s) => {return s !== '';});

        //     if (kvp === '') {
        //         document.location.search = `?${k}=${v}`;
        //     } else {
        //         let i = kvp.length;
        //         let x;
        //         while (i--) {
        //             x = kvp[i].split('=');
        //             if (x[0] == k) {
        //                 x[1] = v;
        //                 kvp[i] = x.join('=');
        //                 break;
        //             }
        //         }
        //         if (i < 0) {
        //             kvp[kvp.length] = [k, v].join('=');
        //         }
        //         if (isReloadPage) {
        //             document.location.search = kvp.join('&');
        //         } else {
        //             history.pushState(
        //                 null,
        //                 '',
        //                 (`${window.location.pathname}?${kvp.join('&')}`)
        //             );
        //         }
        //     }
        // }
    };



    // // Sources:
    //  - https://www.ietf.org/rfc/rfc3986.txt
    //  - https://stackoverflow.com/a/16435373
    pub.strongEncodeURIComponent = (text='', strength=1) => {
        let res = encodeURIComponent(text);
        switch(strength) {
            case 2:
                res = res.replace(/\_/g, '%5F')
                    .replace(/\-/g, '%2D');
            case 1:
                res = res.replace(/\./g, '%2E')
                    .replace(/\!/g, '%21')
                    .replace(/\~/g, '%7E');
            case 0:
                res = res.replace(/\*/g, '%2A')
                    .replace(/\'/g, '%27')
                    .replace(/\(/g, '%28')
                    .replace(/\)/g, '%29');
        }
        return res;
    };



    // Sources:
    //  - https://www.ietf.org/rfc/rfc3986.txt
    //  - https://stackoverflow.com/a/16435373
    pub.strongDecodeURIComponent = (text='', strength=1) => {
        let res = text;
        switch(strength) {
            case 2:
                res = res.replace(/\%5F/g, '_')
                    .replace(/\%2D/g, '-');
            case 1:
                res = res.replace(/\%2E/g, '.')
                    .replace(/\%21/g, '!')
                    .replace(/\%7E/g, '~');
            case 0:
                res = res.replace(/\%2A/g, '*')
                    .replace(/\%27/g, "'")
                    .replace(/\%28/g, '(')
                    .replace(/\%29/g, ')');
        }
        return decodeURIComponent(res);
    };



    ///// Init /////



    return pub;
})();



export default UrlUtils;
