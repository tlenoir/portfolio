import React from 'react';

export function useLocalStorage(localStorageKey, initialVAlue) {
    const [value, setValue] = React.useState(
        localStorage.getItem(localStorageKey) || initialVAlue
    );

    React.useEffect(() => {
        localStorage.setItem(localStorageKey, value);
    }, [value]);

    return [value, setValue];
};