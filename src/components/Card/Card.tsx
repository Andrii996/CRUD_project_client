import React from 'react';
import { Card as AntCard } from 'antd';
import './Card.scss';
import { Employee } from '../../types/types';
import { DeleteOutlined } from '@ant-design/icons';

const { Meta } = AntCard;

type Props = {
  employee: Employee;
  onUpdateClick: (employee: Employee) => void;
  onDeleteClick: (id: string) => void;
};

export const Card: React.FC<Props> = ({
  employee,
  onUpdateClick,
  onDeleteClick,
}) => {
  const handleDeleteClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    onDeleteClick(employee._id);
  };

  return (
    <AntCard
      onClick={() => onUpdateClick(employee)}
      hoverable
      className='card'
      cover={
        <div className='card__image-container'>
          <img
            alt='employee img'
            src='https://uhs-group.com/wp-content/uploads/2020/08/person-dummy-e1553259379744.jpg'
          />
          <DeleteOutlined
            className='delete-icon'
            onClick={handleDeleteClick}
          />
        </div>
      }
    >
      <Meta
        title={employee.name + ' ' + employee.surname}
        description={employee.department === 'null' ? '' : employee.department}
      />
      <p className='card__email'>{employee.email}</p>
    </AntCard>
  );
};
