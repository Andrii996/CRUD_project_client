import React, { useEffect, useState } from 'react';
import { Card } from '../Card/Card';
import './EmployeesList.scss';
import { getEmployees } from '../../utils/fetchClient';
import { Employee } from '../../types/types';
import { UserAddOutlined } from '@ant-design/icons';
import { AddModal } from '../AddModal/AddModal';
import { UpdateModal } from '../UpdateModal/UpdateModal';
import { DeleteModal } from '../DeleteModal/DeleteModal';
import { Spin } from 'antd';

export const EmployeesList = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);
  const [updateModalIsOpen, setUpdateModalIsOpen] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [employeeToEdit, setEmployeeToEdit] = useState<Employee | null>(null);
  const [employeeIdToDelete, setEmployeeIdToDelete] = useState('');
  const [appIsLoading, setAppIsLoading] = useState(true);

  useEffect(() => {
    getEmployees()
      .then((res) => {
        setEmployees(res);
        setAppIsLoading(false);
      })
      .catch(() => {
        console.error('Failed to fetch data');
      });
  }, []);

  const handleAddClick = () => {
    setAddModalIsOpen(true);
  };

  const handleUpdateClick = (employee: Employee) => {
    setUpdateModalIsOpen(true);
    setEmployeeToEdit(employee);
  };

  const handleDeleteClick = (id: string) => {
    setDeleteModalIsOpen(true);
    setEmployeeIdToDelete(id);
  };

  const handleCloseClick = () => {
    setAddModalIsOpen(false);
    setUpdateModalIsOpen(false);
    setDeleteModalIsOpen(false);
  };

  const handleAddEmployee = (newEmployee: Employee) => {
    setEmployees((prev) => [...prev, newEmployee]);
  };

  const handleUpdateEmployee = (updatedEmployee: Employee) => {
    setEmployees((prev) => {
      return prev.map((employee) => {
        if (employee._id === updatedEmployee._id) {
          return updatedEmployee;
        }

        return employee;
      });
    });
  };

  const handleDeleteEmployee = (employeeId: string) => {
    setEmployees((prev) =>
      prev.filter((employee) => employee._id !== employeeId)
    );
  };

  return appIsLoading ? (
    <Spin spinning fullscreen />
  ) : (
    <div className='list'>
      {employees.map((employee) => (
        <Card
          key={employee['_id']}
          employee={employee}
          onUpdateClick={handleUpdateClick}
          onDeleteClick={handleDeleteClick}
        />
      ))}

      <div className='list__add' onClick={handleAddClick}>
        <UserAddOutlined style={{ fontSize: '120px', color: 'gray' }} />
      </div>

      {deleteModalIsOpen && (
        <DeleteModal
          onDeleteEmployee={handleDeleteEmployee}
          onCloseClick={handleCloseClick}
          id={employeeIdToDelete}
        />
      )}

      {updateModalIsOpen && (
        <UpdateModal
          onCloseClick={handleCloseClick}
          employee={employeeToEdit}
          onUpdateEmployee={handleUpdateEmployee}
        />
      )}

      {addModalIsOpen && (
        <AddModal
          onCloseClick={handleCloseClick}
          onAddEmployee={handleAddEmployee}
        />
      )}
    </div>
  );
};
