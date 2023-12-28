import { Input, Modal, Select, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { getDepartments, patchEmployee } from '../../utils/fetchClient';
import { prepareDeprtments } from '../../helpers/prepareDepartments';
import { Employee, PreparedDeps } from '../../types/types';

type Props = {
  onCloseClick: () => void;
  employee: Employee | null;
  onUpdateEmployee: (updatedEmployee: Employee) => void;
};

export const UpdateModal: React.FC<Props> = ({
  onCloseClick,
  employee,
  onUpdateEmployee,
}) => {
  if (!employee) {
    return null;
  }

  const [confirmLoading, setConfirmLoading] = useState(false);
  const [departments, setDepartments] = useState<PreparedDeps[]>([]);
  const [formData, setFormData] = useState({
    name: employee.name,
    surname: employee.surname,
    email: employee.email,
    department: employee.department,
  });
  const [badEmailMessage, setBadEmailMessage] = useState(false);

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

  const handleSave = () => {
    setBadEmailMessage(false);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setBadEmailMessage(true);
      return;
    }

    setConfirmLoading(true);
    patchEmployee({
      department: formData.department,
      email: formData.email,
      id: employee._id,
    })
      .then((res) => {
        onUpdateEmployee(res);
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
      title='You can change data here'
      onOk={handleSave}
      open
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
    >
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
