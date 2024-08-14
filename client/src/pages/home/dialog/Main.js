import { forwardRef, useContext, useImperativeHandle, useState } from 'react';
import './Main.css';
import API from '../../../imports/api';
import { AllMessagesContext } from '../../../imports/globals';



export const Dialog = forwardRef(({onSubmit}, ref) => {
    const _allMessages = useContext(AllMessagesContext);
    const [_item, _setItem] = useState(null);
    const [_displayDialog, _setDisplayDialog] = useState(false);
    const [_title, _setTitle] = useState('');
    const [_imageFile, _setImageFile] = useState(null);
    const [_clientLink, _setClientLink] = useState('');
    const [_description, _setDescription] = useState('');
    const [_isPrivate, _setIsPrivate] = useState(true);

    useImperativeHandle(ref, () => ({
        onClickEditHook: (newItem) => {
            _setItem(() => newItem);
            _setTitle(() => newItem.title);
            _setClientLink(() => newItem.clientLink);
            _setDescription(() => newItem.description);
            _setIsPrivate(() => newItem.isPrivate);
            _setDisplayDialog(() => true);
        },
        onClickCreateHook: () => {
            _setItem(() => null);
            _setTitle(() => '');
            _setClientLink(() => '');
            _setDescription(() => '');
            _setIsPrivate(() => true);
            _setDisplayDialog(() => true);
        }
    }));

    const _onSubmit = async () => {
        _setDisplayDialog(() => false);
        if (_item) {
            API.Items.update({
                params: {
                    title: _item.title
                },
                body: {
                    title: _title,
                    clientLink: _clientLink,
                    description: _description,
                    isPrivate: _isPrivate
                },
                allMessages: _allMessages
            });
        } else {
            const form = new FormData();
            form.append('title', _title);
            form.append('file', _imageFile);
            form.append('clientLink', _clientLink);
            form.append('description', _description);
            form.append('isPrivate', _isPrivate);

            API.Items.create({
                body: form,
                allMessages: _allMessages
            });
        }
        onSubmit();
    };



    return (
        <>
            { _displayDialog ?
                <div className='dialog'>
                    <div className='contents'>
                        <div className='header'>
                            <button onClick={() => {_onSubmit()}}>Submit</button>
                            <button onClick={() => {_setDisplayDialog(() => false)}}>Cancel</button>
                        </div>
                        <div className='body'>
                            { _item ? (
                                <></>
                            ) : (
                                <input type='file' onInput={(ev) => _setImageFile(() => ev.target.files[0])} />
                            )}
                            <input
                                type='text'
                                placeholder='Title...'
                                value={_title}
                                onInput={(ev) => {_setTitle(() => ev.target.value)}}
                            />
                            <input
                                type='text'
                                placeholder='Client Link...'
                                value={_clientLink}
                                onInput={(ev) => {_setClientLink(() => ev.target.value)}}
                            />
                            <textarea
                                placeholder='Description...'
                                onInput={(ev) => {_setDescription(() => ev.target.value)}}
                            >{_description}</textarea>
                        </div>
                    </div>
                </div> :
                <></>
            }
        </>
    );
});
