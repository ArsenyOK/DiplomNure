import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
  Alert
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../../store/actions/authActions';
import { clearErrors } from '../../store/actions/errorActions';
import { isModal, deIsRegisterModal } from '../../store/reducers/authReducer';
import style from './RegisterModal.module.css';
import './RegisterModal.css';

class RegisterModal extends Component {
  state = {
    modal: false,
    name: '',
    email: '',
    password: '',
    msg: null
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  };

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;
    if (error !== prevProps.error) {
      // Check for register error
      if (error.id === 'REGISTER_FAIL') {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }

    // If authenticated, close modal
    if (this.state.modal) {
      if (isAuthenticated) {
        this.toggle();
      }
    }
  }

  toggle = () => {
    // Clear errors
    this.props.clearErrors();
    this.setState({
      modal: !this.state.modal
    });

    this.props.deIsRegisterModal();
  };

  onFalse = () => {
    this.setState({
      modal: false
    });
    this.props.isModal();
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const { name, email, password } = this.state;

    // Create user object
    const newUser = {
      name,
      email,
      password
    };

    // Attempt to register
    this.props.register(newUser);
  };

  render() {
    return (
      <div>
        <NavLink onClick={this.toggle} href='#'>
          Регистрация
        </NavLink>

    
        <Modal isOpen={this.state.modal || this.props.isRegisterModal}  toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Регистрация</ModalHeader>
          <ModalBody>
            {this.state.msg ? (
              <Alert color='danger'>{this.state.msg}</Alert>
            ) : null}
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for='name'>Имя</Label>
                <Input
                  type='text'
                  name='name'
                  id='name'
                  placeholder='Имя пользователя'
                  className='mb-3'
                  onChange={this.onChange}
                />

                <Label for='email'>Email</Label>
                <Input
                  type='email'
                  name='email'
                  id='email'
                  placeholder='Email'
                  className='mb-3'
                  onChange={this.onChange}
                />

                <Label for='password'>Пароль</Label>
                <Input
                  type='password'
                  name='password'
                  id='password'
                  placeholder='Пароль'
                  className='mb-3'
                  onChange={this.onChange}
                />

                <Button color='dark' style={{ marginTop: '2rem' }} block>
                  Зарегистрироваться
                </Button>
                <div className={style.activeModal}>
                  <p>Уже зарегистрированы?</p>
                  <p className={style.enter} onClick={this.onFalse}>Войти</p>
                </div>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
  isRegisterModal: state.auth.isRegisterModal,
  isModal: state.auth.isModal
});

export default connect(
  mapStateToProps,
  { register, clearErrors, isModal, deIsRegisterModal }
)(RegisterModal);
