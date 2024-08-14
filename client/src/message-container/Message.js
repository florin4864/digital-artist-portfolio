import React, { useEffect } from 'react';
import './Message.css';
import { useContext } from 'react';
import { AllMessagesContext } from '../imports/globals.js';



export const Message = ({message, timeout}) => {
    const _allMessages = useContext(AllMessagesContext);

    const _remove = () => {
        _allMessages.deleteByID(message.id);
    };

    useEffect(() => {
        if (timeout) {
            const intervalId = setTimeout(() => {
                _allMessages.updateByID(message.id, {...message, isNew: false});
            }, timeout);

            return () => clearInterval(intervalId) // This will clean up when the component unmounts
        }
    }, []);

    return (
        <div className={`message ${message.type}`}>
            <div>
                <div>
                    <p className='body'>{message.text}</p>
                </div>
                <button
                    className='remove'
                    onClick={() => {_remove()}}
                >X</button>
            </div>
            <p className='footer'>{message.time}</p>
        </div>
    );
};
