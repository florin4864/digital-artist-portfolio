import { useContext, useEffect, useState } from 'react';
import './Main.css';
import API from '../../imports/api.js';
import { AllMessagesContext, IsAuthDisplayedContext, IsLoggedContext } from '../../imports/globals.js';



export const Auth = () => {
    const _allMessages = useContext(AllMessagesContext);
    const _isAuthDisplayed = useContext(IsAuthDisplayedContext);
    const _isLogged = useContext(IsLoggedContext);
    const [_isSetupComplete, _setIsSetupComplete] = useState();
    const [_email, _setEmail] = useState('');
    const [_password, _setPassword] = useState('');
    const [_repeatPassword, _setRepeatPassword] = useState('');

    const _login = async () => {
        await API.Auth.login({
            body: {
                email: _email,
                password: _password
            },
            allMessages: _allMessages
        });
        if (await API.Auth.isLogged({})) {
            _allMessages.add('Successfully logged in!', 'success');
            _isAuthDisplayed.set(false);
            _isLogged.set(true);
        }
    };

    const _register = async () => {
        await API.Auth.register({
            body: {
                email: _email,
                password: _password,
                'repeat-password': _repeatPassword
            },
            allMessages: _allMessages
        });
        if (await API.Auth.isLogged({})) {
            _allMessages.add('Successfully registered and logged in!', 'success');
            _isAuthDisplayed.set(false);
            _isLogged.set(true);
        }
    };

    const _onEnterLogin = (ev) => {
        if (ev.key === "Enter") {
            _login();
        }
    };

    const _onEnterRegister = (ev) => {
        if (ev.key === "Enter") {
            _register();
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            _setIsSetupComplete(await API.Auth.isSetupComplete({allMessages: _allMessages}));
        }

        // Execute the function when component mounts
        fetchData();
    }, []);



    return (
        <>
            {_isSetupComplete === undefined ? (
                <></>
            ) : (
                <div id='wallpaper'>
                    <div className='auth'>
                        <div className='container'>
                            {_isSetupComplete ? (
                                <>
                                    <h1>Login</h1>
                                    <input
                                        type='text'
                                        placeholder='Email...'
                                        required
                                        value={_email}
                                        onInput={(ev) => {_setEmail(() => ev.target.value)}}
                                        onKeyUp={_onEnterLogin}
                                    />
                                    <input
                                        type='password'
                                        placeholder='Password...'
                                        required
                                        value={_password}
                                        onInput={(ev) => {_setPassword(() => ev.target.value)}}
                                        onKeyUp={_onEnterLogin}
                                    />
                                    <button
                                        onClick={_login}
                                    >Login</button>
                                </>
                            ) : (
                                <>
                                    <h1>Register</h1>
                                    <input
                                        type='text'
                                        placeholder='Email...'
                                        required
                                        value={_email}
                                        onInput={(ev) => {_setEmail(() => ev.target.value)}}
                                        onKeyUp={_onEnterRegister}
                                    />
                                    <input
                                        type='password'
                                        placeholder='Password...'
                                        required
                                        value={_password}
                                        onInput={(ev) => {_setPassword(() => ev.target.value)}}
                                        onKeyUp={_onEnterRegister}
                                    />
                                    <input
                                        type='password'
                                        placeholder='Repeat Password...'
                                        required
                                        value={_repeatPassword}
                                        onInput={(ev) => {_setRepeatPassword(() => ev.target.value)}}
                                        onKeyUp={_onEnterRegister}
                                    />
                                    <button
                                        onClick={_register}
                                    >Register</button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
