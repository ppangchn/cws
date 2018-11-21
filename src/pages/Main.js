import React, { Component } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import MainRoute from '../routes/MainRoute'

class Main extends Component {
    render() {
        return (
            <div>
                <Header />
                <MainRoute />
                <Footer />
            </div>
        );
    }
}

export default Main;