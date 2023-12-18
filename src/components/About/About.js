import aboutImage from './about.jpeg';

function About() {
  return (
    <div>
    <br/>
    <div className="row">
      <div className='col-2'></div>
   
      <div className="col-4">
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <img src={aboutImage} alt="about"/>
        </div>
        <div className="col-4">
          <br/>
          <br/>
          <br/>
           <h1>About us</h1> 
           <hr/>
           <br/>
           <h4>
           &#128392;Address</h4><div>

<strong>Calicut</strong>
<p>Second floor, Bhavans building,
Opp.Calicut books,
Near Kuthiravattom hospital,
Kozhikode, Kerala 673016</p>
</div>
<div>
<strong>Trivandrum</strong>

<p>First Floor, CRA-6,
Opposite Cosmopolitan Hospital,
Cosmo Lane, Murinjapalam,
Thiruvananthapuram-695004, Kerala</p>
</div>
<div>
<strong> Canada</strong>
 <p>
401-50 Burnhamthorpe Rd West, Mississauga, ON, L5B 3C2
Ontario,Canada</p>
</div>
<div>
<strong>USA</strong><p>
1117 S Crawford Dr Mountain House CA 95391
California, U.S.A</p> </div>

        </div>
        </div>
        </div>
)
  }

  export default About;