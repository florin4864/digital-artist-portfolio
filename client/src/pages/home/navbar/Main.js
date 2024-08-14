import { useContext } from 'react';
import { IsLoggedContext, IsAuthDisplayedContext } from '../../../imports/globals';
import './Main.css';
import API from '../../../imports/api';
import UrlUtils from '../../../imports/utils/url-utils-v1.1';
import CookieUtils from '../../../imports/utils/cookie-utils-v1.2';



export const Navbar = ({onClickCreate}) => {
    const _isLogged = useContext(IsLoggedContext);
    const _isAuthDisplayed = useContext(IsAuthDisplayedContext);

    const _login = () => {
        _isAuthDisplayed.set(true);
    };

    const _logout = async () => {
        API.Auth.logout({});
        CookieUtils.remove('jwt-token');
        // Reload
        UrlUtils.redirect('/');
    };



    return (
        <div className='navbar'>
            <div className='container'>
                <a href='/'>
                    <img className='logo' src='/public/static/images/logo.svg'></img>
                </a>
                <div className='buttons'>
                    {_isLogged.get() ? (
                        <>
                            <button
                                className='create'
                                onClick={() => {onClickCreate()}}
                            ></button>
                            <button
                                className='logout'
                                onClick={() => {_logout()}}
                            ></button>
                        </>
                    ) : (
                        <button
                            className='login'
                            onClick={() => _login()}
                        ></button>
                    )}
                </div>
            </div>
        </div>
    );
};
