import { Department } from '../types/types';

export const prepareDeprtments = (
  depsFromServer: Department[]
) => {
  return [
    ...depsFromServer.map((department) => ({
      value: department.name,
      label: department.name,
    })),
    { value: 'Not Chosen yet', label: 'Not chosen yet' },
  ];
};
