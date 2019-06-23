import React, { useCallback, useMemo, useState, createContext, useContext } from 'react'

export default function Index() {
    return (
        <Page />
    );
};

const Context = createContext({
    addTodo: (event) => { },
    removeAll: (event) => { }
});

function Page() {
    const [todos, setTodos] = useState([]);
    const addTodo = e => {
        useCallback(() => setTodos([...todos, {}]), [todos]);
        e.preventDefault();
    };
    const removeAll = e => {
        useCallback(() => setTodos([]), []);
        e.preventDefault();
    };
    const getApi = useMemo(() => ({ addTodo, removeAll }), [todos]);


    return (
        <div>
            <Context.Provider value={getApi} >
                <Memo />
            </Context.Provider>
        </div>
    );
};

function Memo() {
    const { addTodo, removeAll } = useContext(Context);

    return (
        <>
            <p>panik</p>
            <button onClick={addTodo}
                type='button' className="btn btn-danger my-2">Add</button>
        </>
    );
};