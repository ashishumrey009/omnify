import React, { useState,useEffect } from "react";
import axios from "axios";
import "react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css";
import SemanticDatepicker from "react-semantic-ui-datepickers";
import {
  Button,
  Container,
  Header,
  Icon,
  Segment,
  Form,
  Message,
  Dropdown,
  Menu
} from "semantic-ui-react";

const style = {
  h1: {
    marginTop: "1em",
  },
  h2: {
    margin: "4em 0em 2em",
  },
  h3: {
    marginTop: "1em",
    padding: "2em 0em",
  },
  last: {
    marginBottom: "300px",
  },
};

const PageOne = () => {
    const optionsD = [
        { key: 'd', text: 'day', value: 'day' },
        { key: 'w', text: 'week', value: 'week '},
        { key: 'm', 'text': 'month', value: 'month' },
      ]
      const optionsT = [
        { key: 'individual', text: 'individual', value: 'individual' },
        { key: 'group', text: 'group', value: 'group '},
        
      ]
      const optionsZ = [
        { key: 'UTC', text: 'UTC', value: 'UTC' },
        { key: ' America/New_York', text: ' America/New_York', value: 'America/New_York '},
        { key: 'Asia/Kolkata', 'text': 'Asia/Kolkata', value: 'Asia/Kolkata' },
      ]
  const [loading,setLoading] = useState(false)
  const[ val,setval] = useState('')
  const [dVal,setDval] =useState(null)
  const [resType,setResType] = useState(null)
  const[timeZone,setTimeZone] = useState(null)
  useEffect(() => {
    axios
    .get("http://127.0.0.1:5000/")
    .then((res) => 
    {
      let data = res.data[0]
      console.log(data)
      setval(data['n'])
      setDval(data['d'])
      setResType(data['g'])
      setTimeZone(data['tz'])
    });
  }, [])
  const handleSubmit = () => {
     setLoading(true)
    let payload = {
      data: {
        n:val,
        d:dVal,
        g:resType,
        t:timeZone
      },
    };
    console.log(payload);
    axios
      .post("http://127.0.0.1:5000/check", payload)
      .then((res) => 
      {
        setLoading(false)
        alert('Updated')
        console.log(res)
      });
  };
  const handleChange = (event) => {
    let uid = event.target.value;
    
    setval(uid)
  };
 const handleChangeD=(e, data)=>{
  setDval(data.value)
 }
 const handleChangeT=(e, data)=>{
  setTimeZone(data.value)
}
const handleChangeG=(e, data)=>{
  setResType(data.value)
}
  return (
    <div>
      <Header
        as="h1"
        content="Reservation validator"
        style={style.h1}
        textAlign="center"
      />

      <Container >
        <Segment.Group>
          <Segment>
            <Form loading={loading}>
              <Form.Group>
                <Form.Input placeholder="Number" onChange={handleChange} value={val} />
                <Dropdown placeholder='D-value' clearable options={optionsD}   onChange={handleChangeD} value={dVal} selection />
                <Dropdown placeholder ='Group-type'clearable options={optionsT} onChange={handleChangeG}  value={resType} selection />
                 <Dropdown placeholder='Time-Zone' clearable options={optionsZ} onChange={handleChangeT}  value={timeZone} selection />
                <Form.Button content="Modify" onClick={handleSubmit} />
              </Form.Group>
            </Form>
          </Segment>
        </Segment.Group>
      </Container>
    </div>
  );
};

export default PageOne;
