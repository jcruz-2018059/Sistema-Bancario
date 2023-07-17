export const Users = ({ name, surname, DPI, phone, email, balance, role, movements, accountNumber, number}) => {
  const roleClass = role === 'ADMIN' ? 'badge text-bg-success' : 'badge text-bg-primary';

  return (
    <>
    {
      movements >= 0 ? (<>
        <td>{number}</td>
        <td>{name}</td>
        <td>{surname}</td>
        <td>{accountNumber}</td>
        <td>{movements}</td>
      </>
      ) : <>
        <td>{name}</td>
        <td>{surname}</td>
        <td>{DPI}</td>
        <td>{accountNumber}</td>
        <td>{phone}</td>
        <td>{email}</td>
        <td>Q{balance}.00</td>
        <td>
        <span className={roleClass}>{role}</span>
          </td>
      </>
    }
      
    </>
  );
};