import { useState } from "react";
import ModalRegister from "../components/ModalRegister";

export default function HomePage() {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="col-12 mt-4 p-0">
      <div className="container text-center">
        <h2> Wellcome To CMU Marathon</h2>
        <div>
          <img src="/marathonrun.png" alt="Logo CMU Marathon" />
        </div>
        <button
          type="button"
          className="m-4 btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#modalregister"
          onClick={() => setShowModal(true)}
        >
          Register
        </button>
      </div>
      
      {  showModal && <ModalRegister onClose={() => setShowModal(false)} /> }
    </div>
  );
}
