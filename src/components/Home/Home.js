import homeImage from './home.jpeg';

function Home() {

    return (
        <div>
        <br/>
        <div className="row">
          <div className='col-2'></div>
        <div className="col-4">
              <br/>
              <br/>
              <br/>
               <h1>WELCOME TO DIGITAL HRMS</h1> 
               <hr/>
               <br/>
               <h4>Here you can see , register and remove  Employee details </h4>
               <br/>
               <h4>Please login to explore further</h4>
            </div>
          <div className="col-4">
            <br/>
            <br/>
            <br/>
          <img src={homeImage} alt="home"  style={{ width: '500px', height: '300px' }}/>
            </div>
            </div>
            </div>
    )
    }

  export default Home;