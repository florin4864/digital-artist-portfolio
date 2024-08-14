import { useContext, useEffect } from 'react';
import './App.css';
import { Auth } from './pages/auth/Main.js';
import { Home } from './pages/home/Main.js';
// import Loading from './Loading.js';
import { MessageContainer } from './message-container/Main.js';
import API from './imports/api.js';
import { IsLoggedContext, IsAuthDisplayedContext, AllMessagesContext } from './imports/globals.js';
import { useStateHandler } from './imports/other.js';



export const App = () => {
    const _allMessages = useContext(AllMessagesContext);
    const _isLogged = useStateHandler({initialValue: false});
    const _isAuthDisplayed = useStateHandler({initialValue: false});

    useEffect(() => {
        // TODO:
        //  - Find a way to send `allMessages` to `isLogged()`
        const rsp = API.Auth.isLogged({allMessages: _allMessages})
            .then((rsp) => {
                _isLogged.set(rsp);
            });
    }, []);

    return (
        <MessageContainer>
            <IsLoggedContext.Provider value={_isLogged}>
                <IsAuthDisplayedContext.Provider value={_isAuthDisplayed}>
                    { _isAuthDisplayed.get() ? <Auth /> : <Home /> }
                    {/* <Loading /> */}
                </IsAuthDisplayedContext.Provider>
            </IsLoggedContext.Provider>
        </MessageContainer>
    );
}
