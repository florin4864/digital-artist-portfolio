import './Main.css';
import { Title } from './Title.js';
import { Thumbnail } from './Thumbnail.js';
import { ClientLink } from './ClientLink.js';
import { Description } from './Description.js';
import { useContext } from 'react';
import { AllMessagesContext, IsLoggedContext } from '../../../imports/globals.js';
import API from '../../../imports/api.js';



export const Item = ({item, isReverse, onClickEdit, onClickDelete}) => {
    const _allMessages = useContext(AllMessagesContext);
    const _isLogged = useContext(IsLoggedContext);

    const _onClickDelete = () => {
        API.Items.delete({
            params: {
                title: item.title
            },
            allMessages: _allMessages
        });
        onClickDelete();
    };



    return (
        <div className={'item ' + (item.isPrivate ? 'private' : '') + (isReverse ? ' reverse' : '')}>
            <div className={'container'}>
                <Thumbnail item={item} />
                <div className='details'>
                    <div className='header'>
                        <span className='title-link-group'>
                            <Title item={item} />
                            <ClientLink item={item} />
                        </span>
                        { _isLogged.get() ? (
                            <span className='buttons'>
                                <button
                                    onClick={() => {onClickEdit()}}
                                >Edit</button>
                                <button
                                    onClick={() => {_onClickDelete()}}
                                >Delete</button>
                            </span>
                        ) : (
                            <></>
                        )}
                    </div>
                    <div className='body'>
                        <Description item={item} />
                    </div>
                </div>
            </div>
        </div>
    );
};
