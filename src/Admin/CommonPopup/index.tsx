import React from 'react';
import axios from 'axios';

interface CommonPopupProps {
  message: string;
  onClose: () => void;
}

const CommonPopup: React.FC<CommonPopupProps> = ({ message, onClose }) => {
  return (
    <main>
      <div className="container">
        <div className="row">
          <div className="col-lg-6 offset-lg-3">
            <div className="card">
              <div className="card-body">
                <h1 className={message.includes('Error') ? 'text-warning' : 'text-success'}>
                  {message}
                </h1>
                <button onClick={onClose} className="btn btn-secondary mt-3">Close</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CommonPopup;
