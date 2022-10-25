import React, { Component, Fragment } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Container,
  Button
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RegisterModal from '../Register/RegisterModal';
import LoginModal from '../Login/LoginModal';
import Logout from '../Logout/Logout';
import { NavLink } from 'react-router-dom';
import style from './NavBar.module.css';
import logo from './../../images/logo-2.png';
import icon from './../../images/icon1.png';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

class AppNavbar extends Component {
  state = {
    isOpen: false
  };

  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <Fragment>
        <div className={style.fragment}>
          <NavItem>
            <NavLink activeClassName={style.active} exact to="/">Главная</NavLink>
          </NavItem>
          <NavItem className={style.nameUser}>
            <NavLink activeClassName={style.active} exact to="/user">
              {/* <img className={style.icon} src={icon} /> */}
              <AccountCircleIcon className={style.icon} />
              {user ? `${user.name}` : ''}</NavLink>
          </NavItem>
          <NavItem>
            <NavLink activeClassName={style.active} to="/recipes">Рецепты</NavLink>
          </NavItem>
          <NavItem className={style.boxAdd}>
            <NavLink className={style.btnAdd} activeClassName={style.active} to="/addrecipe">Добавить рецепт</NavLink>
          </NavItem>
          <NavItem>
            <Logout />
          </NavItem>
        </div>
      </Fragment>
    );

    const guestLinks = (
      <Fragment>
        <div className={style.guestContainer}>
          <NavItem>
            <NavLink activeClassName={style.active} exact to="/">Главная</NavLink>
          </NavItem>
          <NavItem>
            <NavLink activeClassName={style.active} to="/recipes">Рецепты</NavLink>
          </NavItem>
          <NavItem>
            <RegisterModal />
          </NavItem>
          <NavItem>
            <LoginModal />
          </NavItem>
        </div>
      </Fragment>
    );

    return (
      <div id={style.header}>
        <Navbar color='dark' dark expand='sm' className=''>
          <Container>
            <NavbarBrand>
              <NavLink className="text-white" to="/">
                <img className={style.logo} src={logo} alt="logo" />
              </NavLink>
            </NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className='ml-auto' navbar>
                {isAuthenticated ? authLinks : guestLinks}
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
        <div className={style.categoryContainer}>
          <ul>
            <li>
              <NavLink to="/category/Первые блюда">Первые блюда</NavLink>
            </li>
            <li>
              <NavLink to="/category/Вторые блюда">Вторые блюда</NavLink>
            </li>
            <li>
              <NavLink to="/category/Салаты">Салаты</NavLink>
            </li>
            <li>
              <NavLink to="/category/Закуски">Закуски</NavLink>
            </li>
            <li>
              <NavLink to="/category/Десерты">Десерты</NavLink>
            </li>
            <li>
              <NavLink to="/category/Выпечка">Выпечка</NavLink>
            </li>
            <li>
              <NavLink to="/category/Соусы">Соусы</NavLink>
            </li>
            <li>
              <NavLink to="/recipes">Все рецепты</NavLink>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  null
)(AppNavbar);
