import React from 'react';

export const Users = ({ _id, name, surname, DPI, phone, email, balance, role }) => {
  const roleClass = role === 'ADMIN' ? 'badge text-bg-success' : 'badge text-bg-primary';

  return (
    <>
      <td>{name}</td>
      <td>{surname}</td>
      <td>{DPI}</td>
      <td>{phone}</td>
      <td>{email}</td>
      <td>Q{balance}.00</td>
      <td>
      <span className={roleClass}>{role}</span>
        </td>
    </>
  );
};