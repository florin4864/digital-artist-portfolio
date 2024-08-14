import { useState } from 'react';



export const useStateHandler = ({initialValue}) => {
    const [_value, _setValue] = useState(initialValue);

    return {
        get: () => {
            return _value;
        },
        set: (newValue) => {
            _setValue(() => newValue);
        }
    };
};
