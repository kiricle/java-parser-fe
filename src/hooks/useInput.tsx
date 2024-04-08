import { useState, ChangeEvent } from 'react';

export const useInput = () => {
    const [value, setValue] = useState('');

    function onChange(e: ChangeEvent<HTMLInputElement>) {
        setValue((prev) => e.target.value);
    }

    return { value, setValue, onChange };
};
