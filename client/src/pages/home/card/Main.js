import './Main.css';



export const Card = ({title, children}) => {
    return (
        <div className='card'>
            <div className='container'>
                <h1 className='title'>{title}</h1>
                {children}
            </div>
        </div>
    );
};
