import { useEffect, useState, useRef } from "react";

function Dialog1({ modal, closeModal }) {
  return (
    <dialog ref={modal} id="myDialog">
      {/* <form method="dialog"> */}
      <h2>Dialog</h2>
      <p>This is HTML dialog</p>
      <button onClick={closeModal}>OK!</button>
      {/* </form> */}
    </dialog>
  );
}

function Dialog2({ isOpen, onClose }) {
  const modal = useRef(null);

  useEffect(() => {
    if (isOpen) modal.current.showModal();
    else modal.current.close();
  }, [isOpen]);

  return (
    <dialog ref={modal} id="myDialog">
      <h2>Dialog</h2>
      <p>This is HTML dialog</p>
      <button onClick={onClose}>OK!</button>
    </dialog>
  );
}

function App() {
  const [isOpen, setIsOpen] = useState(false);
  // const modal = useRef(null);

  // function openModal() {
  //   modal.current.showModal();
  // }
  // function closeModal() {
  //   modal.current.close();
  // }

  return (
    // <div>
    //   <button onClick={openModal}>열기</button>
    //   <Dialog1 closeModal={closeModal} modal={modal} />
    // </div>
    <div>
      <button onClick={() => setIsOpen(true)}>열기</button>
      <Dialog2 isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}

export default App;
