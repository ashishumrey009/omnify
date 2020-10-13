import React, { useState } from "react";
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

const ResponsiveLayout = () => {
  const [currentDate, setNewDate] = useState(null);
  const [finaldate, setFinaldate] = useState(null);
  const [ids, setIds] = useState([]);
  const onChange = (event, data) => {
    console.log(data.value);
    var isoDate = new Date(data.value).toUTCString();
    console.log(isoDate)
    let temp = isoDate.split(' ');
    temp.pop()
    temp=temp.join(' ')
    // console.log(temp.join(' '),isoDate)
    setNewDate(temp);
    var dateyear = isoDate.split("T")[0];
    var totalTime = isoDate.split("T")[1].split("Z")[0].split(".")[0];
    var dateFinal = [dateyear + " " + totalTime];
    setFinaldate(dateFinal);
  };
  const handleSubmit = () => {
    let payload = {
      data: {
        user_ids: ids,
        reservation_datetime: currentDate,
      },
    };
    console.log(payload);
    axios
      .post("http://127.0.0.1:5000/checkVaild", payload)
      .then((res) => alert(JSON.stringify(res.data)));
  };
  const handleChange = (event) => {
    let uid = event.target.value;
    let uArr = uid.split(",").map((i) => Number(i));
    uArr = uArr.filter((i) => i != 0);
    setIds(uArr);
  };
 
  return (
    <div>
      <Header
        as="h1"
        content="Reservation validator"
        style={style.h1}
        textAlign="center"
      />

      <Container text textAlign="center">
        <Segment.Group>
          <Segment>
            <Form>
              <Form.Group>
                <Form.Input placeholder="user id" onChange={handleChange} />
                <SemanticDatepicker onChange={onChange} />

                <Form.Button content="Check" onClick={handleSubmit} />
              </Form.Group>
            </Form>
          </Segment>
        </Segment.Group>
      </Container>
    </div>
  );
};

export default ResponsiveLayout;
