import React, { Component } from 'react'
import { UncontrolledCarousel,Container,Row,Col } from 'reactstrap'
import styled from 'styled-components'
const items = [
    {
        src: 'https://axisspace.com/images/carousels/homepage/Axis-Office-Space-01.jpg'
    },
    {
        src: 'https://media4.s-nbcnews.com/i/MSNBC/Components/Video/201710/b_fc_4Coworking_171102.jpg'
    },
    {
        src: 'https://www.vitra.com/en-us/_storage/asset/1617833/storage/v_parallax_1920x1080/29887117.jpg'

    }
]
const Title = styled.div`
    font-size: 5vw;
    top: 10vw;
    display: flex;
    width: 100%;
    position: absolute;
    justify-content: center;
    color: rgb(238,128,126,0.8);
`
class Home extends Component {
    render() {
        return (<div>
            <UncontrolledCarousel pause="false" items={items} />
            <Title>CU COWORKING-SPACE</Title>
            <Container style={{color:'rgb(238,128,126)',textAlign:'center',marginTop:'50px'}}>
                <Row>
                    <Col style={{fontSize:'3vw'}}>
                    A place to work together
                    </Col>
                </Row>
                <Row style={{fontSize:'1.5vw'}}>
                    <Col>About us</Col>
                    <Col>Teamwork</Col>
                    <Col>Privileges</Col>
                </Row>
            </Container>
        </div>);
    }
}

export default Home;