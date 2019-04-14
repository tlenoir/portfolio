import React, { useState } from 'react';
import { Modal } from 'react-overlays';

const backdropStyle = (bgcolor) => {
    return {
        position: 'fixed',
        zIndex: 1040,
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: bgcolor,
        opacity: 0.5
    }
};

const modalStyle = function () {
    // we use some psuedo random coords so nested modals
    // don't sit right on top of each other.
    let top = 50;
    let left = 50;

    return {
        position: 'fixed',
        width: 400,
        zIndex: 1040,
        top: top + '%',
        left: left + '%',
        transform: `translate(-${left}%, -${top}%)`,
        border: '1px solid #e5e5e5',
        backgroundColor: 'white',
        boxShadow: '0 5px 15px rgba(0,0,0,.5)',
        padding: 20
    };
};

function ModalExample(data) {
    console.log(data);
    const [showModal, setState] = useState(true);

    const renderBackdrop = () => {
        return <div style={backdropStyle('#A52A2A')} />;
    };
    const close = () => {
        setState({ showModal: false });
    };
    return (
        <div className="modal-example">
            <Modal
                onHide={close}
                style={modalStyle()}
                aria-labelledby="modal-label"
                show={showModal}
                renderBackdrop={renderBackdrop}
            >
                <div>
                    <h4 id="modal-label">{data.title}</h4>
                    <p>
                        {data.overview}
                    </p>
                </div>
            </Modal>
        </div>
    );
}
export default ModalExample;