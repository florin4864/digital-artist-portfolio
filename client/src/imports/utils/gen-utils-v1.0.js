export const GenUtils = {};



GenUtils.Number = (() => {
    ///// Declaration /////
    let pub = {};



    // Source: https://stackoverflow.com/a/24152886
    // Returns an integer pseudo-random number between min (included) and max (included)
    pub.randomIntFromInterval = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };



    // Source: https://stackoverflow.com/a/24152886
    // Returns a float pseudo-random number between min (included) and max (not included)
    pub.randomFloatFromInterval = (min, max) => {
        return Math.random() * (max - min) + min;
    };



    ///// Init /////



    return pub;
})();



GenUtils.String = (() => {
    ///// Declaration /////
    let pub = {};



    // Source: https://stackoverflow.com/a/12223573
    /**
     * Creates a unique id for identification purposes.
     *
     * The optional separator for grouping the generated segmants: default '-'.
     */
    pub.generateUID = (separator='-') => {
        const S4 = () => {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        };
        return (S4() + S4() + separator + S4() + separator + S4() + separator + S4() + separator + S4() + S4() + S4());
    };



    ///// Init /////



    return pub;
})();



export default GenUtils;
