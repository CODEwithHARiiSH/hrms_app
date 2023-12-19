
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EmployeeDetails(empid) {
  const [employeeData, setEmployeeData] = useState(null);
  const [date, setDate] = useState('');
  const [reason, setReason] = useState('');
 
  const fetchData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/employees/${empid.empid}`);
      if (!response.status === 200) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      setEmployeeData(response.data);
    } catch (error) {
      console.error('Error fetching employee details:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [empid]);
  
  const renderForm = () =>{
    if (employeeData.leave >= employeeData.max_leave){
        return( 
        <strong> <br/>&#9888; {employeeData.fname} has taken maximum leave</strong>);
    }
    else {
return(
  <form onSubmit={handleFormSubmit}>
  
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required placeholder='date' />
          <br />
          <textarea value={reason} onChange={(e) => setReason(e.target.value)} rows="4" cols="30" required placeholder='Reason' />
          <br />
          <button type="submit" className="submit-button">Submit</button>
        </form>
);
    }
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/leaves/${empid.empid}`,
        {
          date,
          reason,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
  
      alert(response.data.message);
  
      fetchData();
      setDate('');
      setReason('');
    } catch (error) {
      console.error('Error submitting leave:', error);
    }
  };
  const handleDelete = async () => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_API_URL}/employees/${empid.empid}`);
      alert(response.data.message);
      window.location.reload();
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  const downloadVCard = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/vcard/${empid.empid}`);
      const vCardContent = await response.text();

      const blob = new Blob([vCardContent], { type: 'text/vcard' });

      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = `employee_${employeeData.fname}_vcard.vcf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading vCard:', error);
    }
  };
  
  return (
    <div className="employee-card">
      {employeeData ? (
      <div className='container'>
        <div className='row'>
          <div className='col-5'>
        <div>
          <h1>{employeeData.fname} {employeeData.lname}</h1>
          <strong>{employeeData.title}</strong>  <br/>
          <div>
            <br/>
            <strong>First name:</strong> {employeeData.fname}<br />
            <strong>Last name:</strong> {employeeData.lname}<br />
            <strong>Email:</strong> {employeeData.email}<br />
            <strong>Phone:</strong> {employeeData.phone}<br />
          </div>
          <div>
            
            <strong>Leave taken:</strong> {employeeData.leave}<br />
            <strong>Maximum leave allowed:</strong> {employeeData.max_leave}<br />
            <strong>Remaining leaves:</strong> {employeeData.max_leave - employeeData.leave}<br />
          </div>
          <br />
          <div>
          <strong>Delete Employee...? <button className="delete-button"  onClick={handleDelete}>&#x1F5D1;</button></strong>
          </div>
          
          <strong>Download visiting card<button onClick={downloadVCard}> Download</button></strong>
          <br />
          <br />
          </div>
        </div>
          {/* Leave Form */}
        <div className='col-7'>
  <br/>
  
  <h4>Add Leave</h4>
 
 {renderForm()}
        </div>
      </div>
    
        
        </div>
      ) : (
        <span>Employee data is not available , check id again</span>
      )}
    </div>
  );
}

export default EmployeeDetails;
