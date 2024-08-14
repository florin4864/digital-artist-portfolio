import React, { useEffect, useState } from 'react';
import './Main.css';
import { AllMessagesContext } from '../imports/globals.js';
import { Message } from './Message.js';
import { CookieUtils } from '../imports/utils/cookie-utils-v1.2.js';
import { UrlUtils } from '../imports/utils/url-utils-v1.1.js';
import { GenUtils } from '../imports/utils/gen-utils-v1.0.js';



const _useMessageListStateHandler = () => {
    const [_allItems, _setAllItems] = useState([]);

    return {
        get: () => {
            return _allItems
        },
        add: (text, type) => {
            // Normalize message type
            type = type.toLowerCase();

            if (type !== 'info'
            && type !== 'success'
            && type !== 'warning'
            && type !== 'error') {
                console.error(`Unknown message type: '${type}'`);
            }

            const newItem = {
                text,
                type,
                time: new Date().toLocaleString().split(', ')[1],
                id: GenUtils.String.generateUID('-message-'),
                isNew: true
            };

            // If the messages are bad news put them in the console as well
            switch(type) {
                case 'warning':
                    console.warn(text);
                    break;
                case 'error':
                    console.error(text);
                    break;
            }

            _setAllItems(
                (allItems) => {
                    return [...allItems, newItem];
                }
            );
        },
        updateByID: (targetID, newItem) => {
            _setAllItems(
                (allItems) => {
                    return allItems.map((item) => {
                        if (item.id === targetID) {
                            return newItem;
                        } else {
                            return item;
                        }
                    })
                }
            );
        },
        deleteByID: (targetID) => {
            _setAllItems(
                (allItems) => {
                    return allItems.filter(
                        (item) => {
                            return item.id !== targetID;
                        }
                    );
                }
            );
        },
        clear: () => {
            _setAllItems([]);
        }
    };
};



export const MessageContainer = ({children}) => {
    const _allMessages = _useMessageListStateHandler();
    const [_isContainerVisible, _setIsContainerVisible] = useState(false);

    const _addServerMessages = () => {
        // Check if there are any flash messages from the server
        const flash = CookieUtils.get('Message')

        if (flash !== null) {
            // Remove this cookie
            CookieUtils.remove('Message');

            // Parse the message of the cookie
            let msg = UrlUtils.strongDecodeURIComponent(flash);
            if (msg.endsWith('-info')) {
                _allMessages.add(
                    msg.slice(0, msg.lastIndexOf('-info')),
                    'info'
                );
            } else if (msg.endsWith('-success')) {
                _allMessages.add(
                    msg.slice(0, msg.lastIndexOf('-success')),
                    'success'
                );
            } else if (msg.endsWith('-warning')) {
                _allMessages.add(
                    msg.slice(0, msg.lastIndexOf('-warning')),
                    'warning'
                );
            } else if (msg.endsWith('-error')) {
                _allMessages.add(
                    msg.slice(0, msg.lastIndexOf('-error')),
                    'error'
                );
            } else {
                _allMessages.add(
                    "Can't understand flash message",
                    'error'
                );
            }
        }
    };

    useEffect(() => {
        _addServerMessages();
    }, []);

    return (
        <AllMessagesContext.Provider value={_allMessages}>
            {children}

            {_isContainerVisible ? (
                <div className='messages-container'>
                    <div className='messages'>
                        {_allMessages.get().map((message) => (
                            <Message
                                key={Math.random()}
                                message={message}
                                timeout={8000}
                            />
                        ))}
                    </div>
                    <div className='buttons'>
                        <button onClick={() => _allMessages.clear()}>Clear</button>
                        <span style={{ flexGrow: 1 }}></span>
                        <button onClick={() => _setIsContainerVisible(false)}>Close</button>
                    </div>
                </div>
            ) : _allMessages.get().length > 0 ? (
                <span
                    className='indicator no-select'
                    onClick={() => _setIsContainerVisible(true)}>{_allMessages.get().length}</span>
            ) : null}

            <div className='center-popups'>
                <div className='popups'>
                    {_allMessages.get().map((message) =>
                        message.isNew ? (
                            <Message
                                key={Math.random()}
                                message={message}
                                timeout={8000}
                            />
                        ) : (
                            <></>
                        )
                    )}
                </div>
            </div>
        </AllMessagesContext.Provider>
    );
};
