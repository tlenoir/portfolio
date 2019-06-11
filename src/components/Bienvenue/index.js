import React from 'react';

export default function Welcome() {
    return (
        <div style={{ backgroundColor: 'white', 
        position: 'absolute', 
        top: 50 + '%', left: 50 + '%', transform: 'translate(-50%, -50%)' }}
            className='d-flex justify-content-center'>
            <div style={{ width: 15 + 'rem', height: 15 + 'rem' }}
                className="spinner-border text-secondary justify-content-center"
                role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    )
}