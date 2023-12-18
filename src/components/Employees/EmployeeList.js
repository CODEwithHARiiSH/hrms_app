
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EmployeeDetails from './EmployeeDetails';

function EmployeeList() {
  const [employeeList, setEmployeeList] = useState([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/employees');
      setEmployeeList(response.data);
    } catch (error) {
      console.error('Error fetching employee list:', error);
    }
  };
  
  useEffect(() => {
    fetchData();
  }, []);

  const handleEmployeeClick = (id) => {
    
    setSelectedEmployeeId(id);
  };

  return (
    <div>

        <div className="row">
          <div className='col-1'></div>
          <div className="col-3">
          <br/>
     <br/>
 
            <h2>Employee List</h2>
            <hr/>
            <ol>
              {employeeList.map((employee) => (
                <li key={employee.id} onClick={() => handleEmployeeClick(employee.id)}>
                  {employee.name}
                </li>
              ))}
            </ol>
          </div>
          <div className="col-7">
          <br/>
            {selectedEmployeeId && <EmployeeDetails empid={selectedEmployeeId} />}
          </div>
          <div className='col-1'></div>
        </div>
      </div>
    // </div>
  );
}

export default EmployeeList;
