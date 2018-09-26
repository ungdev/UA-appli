import React from 'react'
import ReactModal from 'react-modal'

ReactModal.setAppElement('#root')

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,.75)',
    zIndex: '999'
  },
  content: {
    position: 'absolute',
    top: '10%',
    left: '50%',
    width: '300px',
    border: '0',
    bottom: 'unset',
    transform: 'translateX(-50%)',
    boxShadow: '0 4px 8px rgba(0,0,0,.12)',
    background: '#fff',
    WebkitOverflowScrolling: 'touch',
    borderRadius: '3px',
    outline: 'none',
    padding: '0',
    zIndex: '1000'
  }
}

const Modal = props => (
  <ReactModal isOpen={props.isOpen} onRequestClose={props.onClose} style={styles}>
    {props.children}
  </ReactModal>
)

export default Modal
