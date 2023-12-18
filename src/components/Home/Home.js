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
               <strong>Here you can see , register and remove  Employee details </strong>
               <br/>
               <strong>Please login to explore further</strong>
            </div>
          <div className="col-4">
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
          <img src={homeImage} alt="home"  />
            </div>
            </div>
            </div>
    )
    }

  export default Home;