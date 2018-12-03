import React from 'react';
import { FormGroup, FormControl, Form, ControlLabel, Col, Button, ButtonToolbar } from 'react-bootstrap';
import { connect } from 'react-redux';
import { styles } from '../styles/LoginFormStyles';
import AppBar from './AppBar';
import ErrorModal from './ErrorModal';
import { fetchUserInfo,  
    hideLoginErrorModal
} from '../actions/userActions';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange({ target }) {
        this.setState({ [target.name]: target.value });
    }
    handleSubmit(event) {
        event.preventDefault();
        this.props.fetchUserInfo({
            email: this.state.email,
            password: this.state.password
        });
    }
    render() {
        return (
            <div>
                <AppBar />
                <div style={styles.container}>
                <Form style={styles.loginForm} onSubmit={this.handleSubmit} horizontal>
                            <FormGroup controlId="formHorizontalEmail">
                                <Col style={styles.fontStyle}componentClass={ControlLabel} sm={3}>
                                E-posta
                                </Col>
                                <Col sm={9}>
                                    <FormControl
                                    className="form-control"
                                    type="text" 
                                    name="email"
                                    value={this.state.email}
                                    placeholder="E-postanızı buraya yazın" 
                                    onChange={this.handleChange}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup controlId="formHorizontalPassword">
                                <Col style={styles.fontStyle} componentClass={ControlLabel} sm={3}>
                                Şifre
                                </Col>
                                <Col sm={9}>
                                    <FormControl
                                    className="form-control"
                                    type="password" 
                                    name="password" 
                                    placeholder="Şifrenizi buraya yazın" 
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Col smOffset={3} sm={10}>
                                <ButtonToolbar>
                                    <Button bsStyle="primary" type="submit" >Giriş Yap</Button>
                                </ButtonToolbar>
                                </Col>
                            </FormGroup>
                        </Form>
                </div> 
                <ErrorModal 
                    text="Hatalı giriş yaptınız lütfen tekrar deneyin"
                    isOpen={this.props.isLoginFailed}
                    onClose={this.props.hideLoginErrorModal}
                />  
            </div>
        );
    }
}
const mapDispatchToProps = {
    fetchUserInfo,
    hideLoginErrorModal
}
const mapStateToProps = state => {
    return {
        token: state.userReducer.token,
        isLoginFailed: state.userReducer.isLoginFailed
    };
};

  
export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);