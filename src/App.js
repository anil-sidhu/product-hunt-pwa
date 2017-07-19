import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Layout, Header, Content, Navigation, Drawer} from 'react-mdl';
import Router from 'react-router/HashRouter'
import Link from 'react-router/Link'
import Match from 'react-router/Match'
import Redirect from 'react-router/Redirect'
import TechProducts from './TechProducts'

function closeDrawer() {
  document.querySelector('.mdl-layout').MaterialLayout.toggleDrawer();
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Layout fixedHeader>
            <Header title='Product Hunt PWA'>
              <Navigation className='hide-on-sm'>
                <Link to='/techproducts'>Tech Products</Link>
                <Link to='/gameproducts'>Game Products</Link>
              </Navigation>
            </Header>
            <Drawer title='Product Hunt'>
              <Navigation>
                <Link to='/techproducts' onClick={closeDrawer}>Tech Products</Link>
                <Link to='/gameproducts' onClick={closeDrawer}>Game Products</Link>
              </Navigation>
            </Drawer>
            <Content>
              <Match exactly pattern='/' render={ () =>  <Redirect to='/techproducts' /> } />
              <Match exactly pattern='/techproducts' component={TechProducts} />
            </Content>
          </Layout>
        </Router>
      </div>
    );
  }
}

export default App;
