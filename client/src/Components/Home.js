import React from 'react';
import Carousel from 'react-bootstrap/Carousel';


const Home = ({user}) => {
  console.log(user)
  return(<div>
        <h1>Welcome {user.name}!</h1>
        <div className="carouselHome">
        <Carousel>  
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
      alt="First slide" style={{width: 700, height: 600}}
    />
     <Carousel.Caption>
    <div>
      <h3>Here you will find your dream home! </h3>
      </div>  
      </Carousel.Caption> 
    
  </Carousel.Item>

  <Carousel.Item>
    <img
      className="d-block w-100"
      src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
      alt="Third slide"  style={{width: 700, height: 600}}
    />
    <Carousel.Caption>
    <h3>Here you will find your dream home! </h3>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="https://images.unsplash.com/photo-1513584684374-8bab748fbf90?ixlib=rb-1.2.1&auto=format&fit=crop&w=1046&q=80"
      alt="Third slide" style={{width: 700, height: 600}}
    />

    <Carousel.Caption>
    <h3>Here you will find your dream home! </h3>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>
</div>
<div className="contact"> 
  <h6><em>Follow us:</em>
<a href="http://www.facebook.com"><i class="fab fa-facebook"></i></a>

<a href="http://www.twitter.com"><i class="fab fa-twitter-square"></i></a>
</h6>
  
</div>
</div>

    
  )
}
export default Home;