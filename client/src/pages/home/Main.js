import { useContext, useEffect, useRef, useState } from 'react';
import './Main.css';
import { Item } from './item/Main.js';
import API from '../../imports/api.js';
import { Navbar } from './navbar/Main.js';
import { Dialog } from './dialog/Main.js';
import { Banner } from './banner/Main.js';
import { Card } from './card/Main.js';
import { AllMessagesContext } from '../../imports/globals.js';



export const Home = () => {
    let _canUpdateItems = true;
    const _allMessages = useContext(AllMessagesContext);
    const [_allItems, _setAllItems] = useState([]);
    const _dialogRef = useRef(null);

    const _onClickEdit = (item) => {
        _dialogRef.current.onClickEditHook(item);
    };

    const _onClickCreate = () => {
        _dialogRef.current.onClickCreateHook();
    };

    const _updateItems = async ({withLoadingEffect = false}) => {
        if (_canUpdateItems === false) {
            return;
        }

        // Get all items from server
        let rsp = await API.Items.getAll({
            allMessages: _allMessages,
            withLoadingEffect: withLoadingEffect
        });
        if (! rsp) {
            return;
        }

        _setAllItems(() => rsp);
    };

    useEffect(() => {
        _updateItems({withLoadingEffect: true});
    }, []);



    return (
        <div className='home'>
            <Navbar onClickCreate={() => {_onClickCreate()}} />
            <div className='home-container'>
                <Banner />
                <Card title={'About:'}>
                    <p className='text'>Lorem ipsum dolor sit amet. Ut aspernatur doloremque eum nihil quisquamEos itaque ut debitis modi. In molestias impedit <a href='https://www.loremipzum.com' target='_blank'>Sit error aut error voluptas quo voluptatum quidem est quibusdam perferendis</a> ut nihil molestiae est molestiae quasi. </p><p>In sunt aliquam ut incidunt harum <em>Sed necessitatibus id nobis galisum</em> et quos nemo qui molestiae quasi qui animi voluptates. Ut porro voluptatibus cum rerum illo <a href='https://www.loremipzum.com' target='_blank'>Sed nemo sed eaque accusamus</a> aut debitis placeat ut aliquam nihil id enim libero. </p><p>Sed quas voluptate ex doloribus ipsa <strong>Et vero cum voluptatem temporibus in molestiae ipsa eos dicta officiis</strong> in aliquid quae. Et quas molestias <a href='https://www.loremipzum.com' target='_blank'>Sit vitae</a> non cumque aliquam est beatae excepturi.</p>
                </Card>
                <div className='items-container'>
                    {_allItems.map((item, index) => (
                        <Item
                            key={Math.random()}
                            item={item}
                            isReverse={index % 2 ? true : false}
                            onClickEdit={() => {_onClickEdit(item)}}
                            onClickDelete={() => {_updateItems({withLoadingEffect: true})}}
                        />
                    ))}
                </div>
                <Dialog
                    ref={_dialogRef}
                    onSubmit={(ev) => {
                        // NOTES:
                        //  - The server doesn't update the database fast enough
                        //  - Old items are returned if `_updateItems` doesn't wait here
                        setTimeout(() => {
                            _updateItems({withLoadingEffect: true});
                        }, 100);
                    }}
                />
            </div>
        </div>
    );
};
