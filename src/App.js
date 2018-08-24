import React, { Component } from 'react'
import { Link } from 'react-router'

// Styles
import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

class App extends Component {
  render() {
    const Header = () => (
      <span>
        <li className="pure-menu-item">
          <Link to="/borrow" className="pure-menu-link">Borrow</Link>
        </li>

        <li className="pure-menu-item">
          <Link to="/lend" className="pure-menu-link">Lend</Link>    
        </li>
        <li className="pure-menu-item">
          <Link to="/about" className="pure-menu-link">About</Link>    
        </li>
      </span>
    )

    return (
      <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal">
          <ul className="pure-menu-list navbar-right">
            <Header />
          </ul>
          <Link to="/" className="pure-menu-heading pure-menu-link">deCapital</Link>
        </nav>

        {this.props.children}
      </div>
    );
  }
}

export default App
