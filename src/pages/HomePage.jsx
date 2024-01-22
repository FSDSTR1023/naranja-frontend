import { useState } from 'react';
import Modal from "../components/Modal";

const HomePage = () => {

  const [isModalVisible, setIsModalVisible] = useState(false);
  const toggleModal = () => setIsModalVisible(!isModalVisible);

  return (
    <div className="my-10">
      <h1 className='text-orange-500'>Naranja Frontend</h1>
      <p className='read-the-docs'>Primera pagina del proyecto.</p>

      <button onClick={toggleModal}>Abrir Modal</button>
      <Modal isVisible={isModalVisible} onClose={toggleModal}>
        <p>Prueba</p>
      </Modal>
    </div>
  );
};

export default HomePage;
