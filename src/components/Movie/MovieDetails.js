import React from 'react';
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

class ModalExampleComponent extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      showModal: false,
      data: {
        title: 'pd'
      }
    };

    this.close = () => {
      this.setState({ showModal: false });
    };

    this.open = () => {
      this.setState({ showModal: true });
    };
  }
  componentDidMount() {
    //this.setState({ data: this.props.location.state });
    console.log("match", this.props.match.params.id, "location", this.props.location.state);
  }

  renderBackdrop(props) {
    return <div {...props} style={backdropStyle('#A52A2A')} />;
  }

  render() {
    const { data } = this.state
      return(
        <div className="modal-example">
          <button onClick={this.open}>Open Modal yeah</button>
          <p>Click to get the full Modal experience!</p>

          <Modal
            onHide={this.close}
            style={modalStyle()}
            aria-labelledby="modal-label"
            show={this.state.showModal}
            renderBackdrop={this.renderBackdrop}
          >
            <div>
              <h4 id="modal-label">{data.title}</h4>
              <p>
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </p>
            </div>
          </Modal>
        </div>
      );
  }
}
export default ModalExampleComponent;