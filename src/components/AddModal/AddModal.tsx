import { Input, Modal, Select, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { addEmployee, getDepartments } from '../../utils/fetchClient';
import { prepareDeprtments } from '../../helpers/prepareDepartments';
import { Employee, PreparedDeps } from '../../types/types';
import { verifyAddForm } from '../../helpers/verifyAddForm';

type Props = {
  onCloseClick: () => void;
  onAddEmployee: (newEmployee: Employee) => void;
};

export const AddModal: React.FC<Props> = ({ onCloseClick, onAddEmployee }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [departments, setDepartments] = useState<PreparedDeps[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    department: '',
  });
  const [badEmailMessage, setBadEmailMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  useEffect(() => {
    getDepartments()
      .then((res) => {
        setDepartments(prepareDeprtments(res));
      })
      .catch(() => {
        onCloseClick();
        console.error('Failed to fetch data');
      });
  }, []);

  const handleOk = () => {
    setBadEmailMessage(false);

    if (!verifyAddForm(formData)) {
      setErrorMessage(true);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setBadEmailMessage(true);
      return;
    }

    setConfirmLoading(true);
    addEmployee(formData)
      .then((res) => {
        onAddEmployee(res);
        setConfirmLoading(false);
        onCloseClick();
      })
      .catch((err) => {
        console.error(err);
        setConfirmLoading(false);
        onCloseClick();
      });
  };

  const handleCancel = () => {
    onCloseClick();
  };

  const handleInputChange = (key: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  return (
    <Modal
      title='Add new employee'
      onOk={handleOk}
      open
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
    >
      {errorMessage && (
        <Typography.Title level={5} style={{ color: 'red' }}>
          All fields must be fulfilled
        </Typography.Title>
      )}

      <Typography.Title level={5}>Enter Name</Typography.Title>
      <Input
        value={formData.name}
        onChange={(e) => handleInputChange('name', e.target.value)}
        placeholder='Enter Name'
      />

      <Typography.Title level={5}>Enter Surname</Typography.Title>
      <Input
        value={formData.surname}
        onChange={(e) => handleInputChange('surname', e.target.value)}
        placeholder='Enter Surname'
      />

      <Typography.Title
        level={5}
        style={badEmailMessage ? { color: 'red' } : {}}
      >
        {badEmailMessage ? 'Email adress is incorrect' : 'Enter email adress'}
      </Typography.Title>
      <Input
        value={formData.email}
        onChange={(e) => handleInputChange('email', e.target.value)}
        placeholder='Enter email adress'
        status={badEmailMessage ? 'error' : ''}
      />

      <Typography.Title level={5}>Select department</Typography.Title>
      <Select
        defaultValue='Select department'
        style={{ width: '100%' }}
        options={departments}
        value={formData.department}
        onChange={(value) => handleInputChange('department', value)}
      />
    </Modal>
  );
};
