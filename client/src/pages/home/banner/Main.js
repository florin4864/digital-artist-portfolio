import './Main.css';



export const Banner = () => {
    return (
        <div className='banner'>
            <div className='container'>
                <h1 className='title'>Welcome</h1>
                <h3 className='sub-title'>I'm a digital artist</h3>
                <p className='text'>
                    I'm always trying to bring real value and define problems with my designs.
                    <br />
                    Welcome to my protfolio.
                </p>
                <section className='social'>
                    <span>
                        <img src='/public/static/images/icons/facebook.svg'></img>
                        <a>Facebook</a>
                    </span>
                    <span>
                        <img src='/public/static/images/icons/linkedin.svg'></img>
                        <a>LinkedIn</a>
                    </span>
                </section>
            </div>
        </div>
    );
};
