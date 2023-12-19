
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EmployeeDetails from './EmployeeDetails';

function EmployeeList() {
  const [employeeList, setEmployeeList] = useState([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/employees`);
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
        
              {employeeList.map((employee) => (
                <p>
                  <button key={employee.id} onClick={() => handleEmployeeClick(employee.id)} className="delete-button" > {employee.name}</button>
                </p> 
              ))}
          </div>
          <div className="col-7">
          <br/>
            {selectedEmployeeId && <EmployeeDetails empid={selectedEmployeeId} />}
          </div>
          <div className='col-1'></div>
        </div>
      </div>

  );
}

export default EmployeeList;
