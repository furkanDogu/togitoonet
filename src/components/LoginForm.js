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
            password: '',
            isInputInvalid: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.hideInvalidErrorModal = this.hideInvalidErrorModal.bind(this);
    }
    handleChange({ target }) {
        this.setState({ [target.name]: target.value });
    }
    handleSubmit(event) {
        event.preventDefault();
        
        const regex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
        if (this.state.email.length > 200 || !regex.test(this.state.email) || this.state.password.length > 100) {
            this.setState({ isInputInvalid: true, email: '', password: '' });
        } else {
            this.props.fetchUserInfo({
                email: this.state.email,
                password: this.state.password
            });
        }
    }
    hideInvalidErrorModal() {
        this.setState({ isInputInvalid: false });
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
                    header={"Hatalı Giriş"}
                />
                <ErrorModal
                    text="Lütfen geçerli e posta ve şifre giriniz"
                    isOpen={this.state.isInputInvalid}
                    onClose={this.hideInvalidErrorModal} 
                    header="Geçersiz Giriş"
                    
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