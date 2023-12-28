import React, { useState } from 'react';
import { Modal } from 'antd';
import { removeEmployee } from '../../utils/fetchClient';

type Props = {
  onCloseClick: () => void;
  onDeleteEmployee: (id: string) => void;
  id: string;
};

export const DeleteModal: React.FC<Props> = ({
  onCloseClick,
  onDeleteEmployee,
  id,
}) => {
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleOk = () => {
    setConfirmLoading(true);
    removeEmployee({ id })
      .then(() => {
        onDeleteEmployee(id);
        setConfirmLoading(false);
        onCloseClick();
      })
      .catch((err) => {
        console.error(err);
        setConfirmLoading(false);
        onCloseClick();
      });
  };

  return (
    <Modal
      title='Are you shure?'
      open
      confirmLoading={confirmLoading}
      onOk={handleOk}
      onCancel={onCloseClick}
    >
      <p style={{ color: 'red' }}>
        Atention employee will be deleted from database!!!
      </p>
    </Modal>
  );
};
