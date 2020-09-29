import React from 'react';
import Buy from './Buy';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button'

class Saved extends React.Component {
    constructor(props){
      super(props);
        this.state = {
          favorites: []
        } 
    }

    componentDidMount(){
      let obj = this.props
      console.log(obj)
      const {favorites} = this.state;
         fetch('http://localhost:9000/savehouse', {
            method: "POST",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
          })
          .then((res) => res.json())
          .then((data) => {
            console.log(data)
            this.setState({favorites:data})
          })
          .catch((err) => {
            console.log(err)
          })
          

}
deleteClick = (e) => {
console.log('delete is working')
console.log(this.props.user)
let obj = {}
       obj.e = e
       obj.user = this.props.user
       console.log(obj)

  fetch('http://localhost:9000/deletehouse', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(obj)
})
    .then((response) => response.json())
    .then((data) => {
      console.log(data[0].id)
      const house = this.state.favorites.filter((house) => house.id !== data[0].id)
      console.log(house)
      this.setState({favorites:house})
      console.log(house)
})

}
    render(){
      const favoriteList = this.state.favorites.length ? (
        this.state.favorites.map((item)=> {
          return(
            
            <div>
              <Col xs={6} md={4}>
            <Card style={{ width: '20rem'}}>
            <Card.Img variant="top" src={item.image} style={{width: 400, height: 300, position: 'relative'}} />
            <Card.Body>
          <Card.Text>${item.price}</Card.Text>
        <Card.Text>{item.details}
        </Card.Text>
        <Card.Text>{item.address}</Card.Text>
        <Button variant = "primary" onClick={()=> this.deleteClick(item)} style={{marginBottom: '10px', color: '#f0d9f0'}}>Delete</Button>
      </Card.Body>
            </Card>
            </Col>  
            </div>
          )
        })
      ): (
        <div>
          <h4>No  saved houses</h4>
        </div>
      )
      // console.log(this.state.favorites)
return(
  <div>
      <h1>Saved houses</h1>
        <div className="housecontainer">
            {favoriteList}
        </div>
  </div>
)}
}
export default Saved