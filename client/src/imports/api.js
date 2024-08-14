import UrlUtils from './utils/url-utils-v1.1';



export const API = (() => {
    ///// Declaration /////
    let pub = {};



    const _send = async ({
        request,
        allMessages,
        withLoadingEffect = true
    }) => {
        if (withLoadingEffect) {
            // isLoading.set(true);
        }

        // Temp solution
        if (! allMessages) {
            allMessages = {
                add: () => {}
            };
        }

        let rsp;
        try {
            rsp = await fetch(request);
        } catch (e) {
            if (e.name !== 'AbortError') {
                allMessages.add("Server encountered a problem and can't respond", 'error');
                console.info('REASON: ', e);
                console.info('REQUEST: ', request);
            }
            return null;
        } finally {
            if (withLoadingEffect) {
                // isLoading.set(false);
            }
        }

        if (rsp.status >= 400 && rsp.status < 600) {
            allMessages.add(`Bad response from server (error code: ${rsp.status})`, 'error');
            return null;
        }

        const rsp_1 = await rsp.text();
        if (! rsp_1) {
            return null;
        }

        const rsp_2 = JSON.parse(rsp_1);
        if (! rsp_2) {
            return rsp_2;
        }

        if (rsp_2.message) {
            allMessages.add(rsp_2.message.text, rsp_2.message.category);
            return null;
        } else {
            return rsp_2;
        }
    };



    pub.Auth = {
        logout: () => {
            UrlUtils.redirect('api/auth/logout');
        },
        login: ({
            body = {
                email: '',
                password: ''
            },
            allMessages,
            withLoadingEffect = true
        }) => {
            return _send({
                request: new Request('/api/auth/login', {
                    method: 'POST',
                    mode: 'same-origin',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8',
                    },
                    body: JSON.stringify(body)
                }),
                allMessages: allMessages,
                withLoadingEffect: withLoadingEffect
            });
        },
        register: ({
            body = {
                email: '',
                password: '',
                'repeat-password': ''
            },
            allMessages,
            withLoadingEffect = true
        }) => {
            return _send({
                request: new Request('/api/auth/register', {
                    method: 'POST',
                    mode: 'same-origin',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8',
                    },
                    body: JSON.stringify(body)
                }),
                allMessages: allMessages,
                withLoadingEffect: withLoadingEffect
            });
        },
        isLogged: ({
            allMessages,
            withLoadingEffect = true
        }) => {
            return _send({
                request: new Request('/api/auth/is-logged', {
                    method: 'GET',
                    mode: 'same-origin',
                    credentials: 'same-origin'
                }),
                allMessages: allMessages,
                withLoadingEffect: withLoadingEffect
            });
        },
        isSetupComplete: ({
            allMessages,
            withLoadingEffect = true
        }) => {
            return _send({
                request: new Request('/api/auth/is-setup-complete', {
                    method: 'GET',
                    mode: 'same-origin',
                    credentials: 'same-origin'
                }),
                allMessages: allMessages,
                withLoadingEffect: withLoadingEffect
            });
        },
    };



    pub.Items = {
        get: ({
            params = {
                title: ''
            },
            allMessages,
            withLoadingEffect = true
        }) => {
            return _send({
                request: new Request(`api/items/${UrlUtils.strongEncodeURIComponent(params.title)}`, {
                    method: 'GET',
                    mode: 'same-origin',
                    credentials: 'same-origin'
                }),
                allMessages: allMessages,
                withLoadingEffect: withLoadingEffect
            });
        },
        getAll: ({
            allMessages,
            withLoadingEffect = true
        }) => {
            return _send({
                request: new Request('/api/items', {
                    method: 'GET',
                    mode: 'same-origin',
                    credentials: 'same-origin'
                }),
                allMessages: allMessages,
                withLoadingEffect: withLoadingEffect
            });
        },
        create: ({
            body,
            allMessages,
            withLoadingEffect = true
        }) => {
            return _send({
                request: new Request('/api/items', {
                    method: 'POST',
                    mode: 'same-origin',
                    credentials: 'same-origin',
                    body: body
                }),
                allMessages: allMessages,
                withLoadingEffect: withLoadingEffect
            });
        },
        update: ({
            params = {
                title: ''
            },
            body = {
                title: '',
                description: '',
                clientLink: '',
                isPrivate: true
            },
            allMessages,
            withLoadingEffect = true
        }) => {
            return _send({
                request: new Request(`api/items/${UrlUtils.strongEncodeURIComponent(params.title)}`, {
                    method: 'PUT', // PATCH
                    mode: 'same-origin',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8',
                    },
                    body: JSON.stringify(body)
                }),
                allMessages: allMessages,
                withLoadingEffect: withLoadingEffect
            });
        },
        delete: ({
            params = {
                title: ''
            },
            allMessages,
            withLoadingEffect = true
        }) => {
            return _send({
                request: new Request(`api/items/${UrlUtils.strongEncodeURIComponent(params.title)}`, {
                    method: 'DELETE',
                    mode: 'same-origin',
                    credentials: 'same-origin'
                }),
                allMessages: allMessages,
                withLoadingEffect: withLoadingEffect
            });
        }
    };



    ///// Init /////



    return pub;
})();



export default API;
