import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card';
import picture from './image/picture.jpg';
import id1 from './image/id1.jpg';
import id2 from './image/id2.jpg';
import id3 from './image/id3.jpg';
import id4 from './image/id4.jpg';
import id5 from './image/id5.jpg';
import id6 from './image/id6.jpg';
import id7 from './image/id7.jpg';
import id8 from './image/id8.jpg';
import id9 from './image/id9.jpg';

import Col from 'react-bootstrap/Col';


console.log(typeof picture)
// import image from '.Components/image';

const robots = [{
  house_id:1,
  price: 313000,
  details:'3 bd | 3 ba | 2256 Square Feet',
  address:'1005 Oak Dr, Morehead City, NC 28557',
  image: id1,
  ContactAgent: 'George Thomson',
   
  },{
  house_id:2,
  price: 400000,
  details:'1 bd | 2 ba | 1,083 Square Feet',
  address:'1055 River Rd APT 414, Edgewater, NJ 07020',
  image: id2,
  ContactAgent: 'George Thomson',
 
  }, {
    house_id:3,
    price: 399000,
    details:'2 bd | 2 ba | 920 Square Feet',
    address:'266 Lakeside Ave, Lake Hopatcong, NJ 07849',
    image: id3,
    ContactAgent: 'George Thomson',
   
  }, {
    house_id:4,
    price: 299000,
    details:'4 bd | 3 ba | 1849 Square Feet',
    address:'153 Maple Rd, West Milford, NJ 07480',
    image: id4,
    ContactAgent: 'George Thomson',
    }, {
    house_id:5,
    price: 299000,
    details:'3 bd | 3 ba | 2300 Square Feet',
    address:'6 Horizon Rd APT 2202, Fort Lee, NJ 07024',
    image: id5,
    ContactAgent: 'George Thomson',
    }, {
    house_id:6,
    price: 329000,
    details:'3 bd | 2 ba | 1452 Square Feet',
    address:'35 Ridgewood Ln, Templeton, MA 01468',
    image: id6,
    ContactAgent: 'George Thomson',
    }, {
    house_id:7,
    price: 409000,
    details:'4 bd | 3 ba | 1200 Square Feet',
    address:'40 Ridgewood Ln, Templeton, MA 01468',
    image: id7,
    ContactAgent: 'George Thomson',
    }, {
      house_id:8,
      price: 375000,
      details:'5 bd | 4 ba |2600 Square Feet',
      address:'295 Mountain View Dr, Lehighton, PA 18235',
      image: id9,
      ContactAgent: 'George Thomson'
    }, {
      house_id:9,
    price: 365000,
    details:'2 bd | 3 ba | 1600 Square Feet',
    address:'4 Opal Rd, Oak Ridge, NJ 07438',
    image: id8,
    ContactAgent: 'George Thomson'
   
        },  {
    house_id:10,
    price: 299000,
    details:'3 bd | 3 ba | 1200 Square Feet',
    address:'3 Winant St, Staten Island, NY 10303',
    image: picture,
    ContactAgent: 'George Thomson'
    
        }
    ]
class  Buy extends React.Component {
    constructor(){
        super()
        this.state = {
        robots: '',
        favorites: []
        }
    }
   onButtonClick = (favorite) => {
       console.log('It is working')
       console.log(this.props.user)
       let obj = {}
       obj.favorite = favorite
       obj.user = this.props.user
       console.log(obj)
       
       const { favorites } = this.state;
       if (!favorites.some(alreadyFavorite => alreadyFavorite.house_id == favorite.house_id)) {
        this.setState({
          favorites: [...this.state.favorites, favorite]
        });
        console.log(favorite);
    }
    fetch('http://localhost:9000/buyhouse', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(obj)
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data.message)
      if(data.message == "house has been added") {
        alert('House has been saved')
      } else {
        alert('House has been sold')
      }
    })
  }
      render(){
      const houseList = robots.map((item) => {
          return(
            <div className= "cardbox">
           <Col xs={6} md={4}>
            <Card style={{ width: '20rem'}}>
            <Card.Img variant="top" src={item.image} style={{width: 400, height: 300}} />
            <Card.Body>
          <Card.Text>${item.price}</Card.Text>
        <Card.Text>{item.details} 
        </Card.Text>
        <Card.Text>{item.address}</Card.Text>
        <Button variant="primary"onClick={()=> this.onButtonClick(item)} style={{marginBottom: '10px', color: '#f0d9f0'}}>Buy</Button>
      </Card.Body>
            </Card>
            </Col> 
            </div> 
          )
      })
     
  return (
    <div>
        <h1>Buy</h1>
        <div className= "housecontainer">
        {houseList}
        </div>
    </div>
  )
}
}
export default Buy;