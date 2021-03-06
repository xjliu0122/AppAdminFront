import React, {Component} from 'react'
import Header from '../../components/Header/Header'
import Sidebar from '../../components/Sidebar/Sidebar'
import Aside from '../../components/Aside/Aside'
import Footer from '../../components/Footer/Footer'
import Notification from '../../views/Common/Notification.jsx'
import Breadcrumbs from 'react-breadcrumbs'
import PopupConfirm from '../../views/Common/PopupConfirm.jsx'

class Full extends Component {

  render() {   
    return (
      <div className="app">
        <Notification/>
        <PopupConfirm/>
        <Header/>
        <div className="app-body">
          <Sidebar {...this.props}/>
          <main className="main">
            <Breadcrumbs
              wrapperElement="ol"
              wrapperClass="breadcrumb"
              itemClass="breadcrumb-item"
              separator=""
              routes={this.props.routes}
              params={this.props.params}/>
            <div className="container-fluid">
              {this.props.children}
            </div>
          </main>
          <Aside/>
        </div>
        <Footer/>
      </div>
    );
  }
}
export default Full