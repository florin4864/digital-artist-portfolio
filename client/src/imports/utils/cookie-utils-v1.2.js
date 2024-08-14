export const CookieUtils = (() => {
    ///// Declaration /////
    let pub = {};



    pub.add = (name, value, attrs) => {
        let cookie = `${name}=${value}`;
        if (attrs) {
            cookie = `${cookie}; ${attrs}`;
        }
        document.cookie = cookie;
    };



    // Source: https://www.quirksmode.org/js/cookies.html
    pub.get = (name) => {
        const nameEQ = `${name}=`;
        const ca = document.cookie.split(';');
        for(let i=0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1, c.length);
            }
            if (c.indexOf(nameEQ) === 0) {
                return c.substring(nameEQ.length, c.length);
            }
        }
        return null;
    };



    pub.remove = (name) => {
        // NOTES:
        //  - 'SameSite=...' must be set in order to please firefox
        pub.add(name, '', 'Max-Age=0; SameSite=Strict');
    };



    ///// Init /////



    return pub;
})();



export default CookieUtils;
