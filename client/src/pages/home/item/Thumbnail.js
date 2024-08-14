import UrlUtils from '../../../imports/utils/url-utils-v1.1'



export const Thumbnail = ({item}) => {
    return (
        <a className='thumbnail-link' href={`/api/images/${UrlUtils.strongEncodeURIComponent(item.imageName)}`} target='_blank'>
            <img className='thumbnail-image' src={`/api/images/${UrlUtils.strongEncodeURIComponent(item.imageName)}`}></img>
        </a>
    );
};
