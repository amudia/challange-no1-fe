import React, { Component } from 'react'
import { connect } from "react-redux";
import Cookie from 'js-cookie'
import Header from '../../components/Header/Header'
import Sidebar from '../../components/Sidebar/Sidebar'
import Footer from '../../components/Footer/Footer'
import Listuser from '../../pages/UserServices/Listuser'
import Content from '../../components/Content';
import { BrowserRouter as Router } from  'react-router-dom'

class Home extends Component {
  componentDidMount() {
    const token = Cookie.get("token");
    if (token) {
      this.props.history.push("/home");
    } else {
      this.props.history.push("/");
    }
  }
    render() {
        return (
            <div>
              <Router>
                  <div id="wrapper"> 
                    <Sidebar/>
                    <div id="page-wrapper" className="gray-bg dashbard-1">
                      <Header/>
                      <Content/>
                      <Footer/>
                    </div>
                  </div>
              </Router>
            </div>
                )
    }
}

export default Home;
