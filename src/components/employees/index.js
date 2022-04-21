const Empolyees = props => {
  const {employeeLists} = props
  const {employeeId, employeeName, dateOfBirth, designation} = employeeLists
  return (
    <li>
      <p>{employeeId}</p>
      <p>{employeeName}</p>
      <p>{dateOfBirth}</p>
      <p>{designation}</p>
    </li>
  )
}

export default Empolyees
