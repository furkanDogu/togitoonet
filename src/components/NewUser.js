import React from 'react';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import PersonIcon from '@material-ui/icons/Person';
import GridMat from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { getCandidatesAndUsers, addNewUser } from '../actions/userActions';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import { giveSupplierIconColor } from '../util/colors';
import PasswordModal from '../components/PasswordModal';
import ErrorModal from '../components/ErrorModal';

class NewUser extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            searchKey: '',
            selectedIndex: -1,
            chosenEmployeeID: '',
            isPasswordModalOpen: false,
            isErrorModalOpen: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleListItemClick = this.handleListItemClick.bind(this);
        this.handlePasswordModal = this.handlePasswordModal.bind(this);
        this.handlePasswordOkayClick = this.handlePasswordOkayClick.bind(this);
        this.handleAddClicked = this.handleAddClicked.bind(this);
        this.handleErrorModal = this.handleErrorModal.bind(this);
    }

    componentDidMount() {
        this.props.getCandidatesAndUsers();
    }
    handleErrorModal() {
        this.setState(state => ({ isErrorModalOpen: !state.isErrorModalOpen}));
    }
    handleAddClicked() {
        if (this.state.chosenEmployeeID) {
            this.handlePasswordModal();
        } else {
            this.handleErrorModal();
        }
    }
    handlePasswordOkayClick(password) {
        this.props.addNewUser({ password, employeeID: this.state.chosenEmployeeID });
    }
    handlePasswordModal() {
        this.setState((state) =>({ isPasswordModalOpen: !state.isPasswordModalOpen }));
    }
    handleListItemClick(event, selectedIndex, chosenEmployeeID) {
        this.setState({ selectedIndex, chosenEmployeeID });
    }

    // this function will render all of the candidates in list items.
    // List items will also be clickable. Whenever user clicks one of them it will set the state with candidate id.
    renderCandidates(candidates) {
        return candidates.map((item, index) => (
            <ListItem
                key={index}
                button
                selected={this.state.selectedIndex === index + 1}
                onClick={event => this.handleListItemClick(event, index + 1, item.personelID)}
            >
                <GridMat container direction={'row'} alignItems={'center'} justify={'center'}>
                    <GridMat item xs={1}>
                        <ListItemIcon style={giveSupplierIconColor(this.state.selectedIndex, index +1)}>
                            <PersonIcon />
                        </ListItemIcon>
                    </GridMat>
                    <GridMat item xs={1}>
                        <ListItemText primary={item.personelID} />
                    </GridMat>
                    <GridMat item xs={3}>
                        <ListItemText primary={item.personelAdi} />
                    </GridMat>
                    <GridMat item xs={2}>
                        <ListItemText primary={item.departmanAdi} />
                    </GridMat>
                    <GridMat item xs={2}>
                        <ListItemText primary={item.unvanAdi} />
                    </GridMat>
                    <GridMat item xs={3}>
                        <ListItemText primary={item.email} />
                    </GridMat>
                    
                </GridMat>
            </ListItem>
        ));
    }
    // this method will render given users in a list item.
    // each user will have its own list item. 
    renderUsers(users) {
        return users.map((item, index) => (
            <ListItem
                key={index}
            >
                <GridMat container direction={'row'} alignItems={'center'} justify={'center'}>
                    <GridMat item xs={2}>
                        <ListItemIcon>
                            <PersonIcon />
                        </ListItemIcon>
                    </GridMat>
                    <GridMat item xs={7}>
                        <ListItemText primary={item.email} />
                    </GridMat>
                    <GridMat item xs={3}>
                        <ListItemText primary={item.rolAdi} />
                    </GridMat>
                </GridMat>
            </ListItem>
        ));
    }
    // handles any coming input from search bar
    handleChange({ target }) {
        this.setState({ [target.name]: target.value });
    }
    // whenever user enters an input to the search bar, we need to shape the input to make clean search in our candidate list
    compressSearchKey(item) {
        let searchKeyNew = this.state.searchKey.replace(/ +/, "");
        let itemInfo = item.personelAdi + item.unvanAdi + item.departmanAdi;
        itemInfo = itemInfo.replace(/ +/, "");
        return itemInfo.toLowerCase().includes(searchKeyNew.toLowerCase());
    }
    renderSearchBar() {
        return (
            <div style={{ flexGrow: 1, marginTop: 10 }}>
                <Paper style={{ marginBottom: 5, height: 40 }}>
                    <GridMat container>
                        <GridMat item xs={1} >
                            <SearchIcon />
                        </GridMat>
                        <GridMat item xs={11}>
                            <InputBase
                                fullWidth
                                placeholder="İsim giriniz..." 
                                value={this.state.searchKey} 
                                onChange={this.handleChange} 
                                name="searchKey"
                                />
                        </GridMat>
                    </GridMat>
                </Paper>  
            </div>
        );
    }
    render() {
        const { headerStyle } = styles;
        return (
            <React.Fragment>
                <Grid style={{ marginTop: 80 }}>
                    <Row>
                        <Col xs={8}>
                        <span style={headerStyle}>Personeller</span>
                        {this.renderSearchBar()}
                            <Paper style={{ height: 400, overflow: 'auto' }}>
                                <List>
                                    {this.renderCandidates(this.props.candidates.filter((item) => this.compressSearchKey(item)))}
                                </List>
                            </Paper>
                        </Col>
                        <Col xs={4}>
                            <span style={headerStyle}>Kullanıcılar</span>
                            <Paper style={{ height: 445, overflow: 'auto', marginTop: 10 }}>
                                <List>
                                    {this.renderUsers(this.props.users)}
                                </List>
                            </Paper>
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{ marginTop: 10 }}xs={6}><Button bsStyle="success" onClick={this.handleAddClicked}>Kullanıcıyı ekle</Button></Col>
                    </Row>
                </Grid>
                <PasswordModal
                    isOpen={this.state.isPasswordModalOpen}
                    onClose={this.handlePasswordModal}
                    onOkay={this.handlePasswordOkayClick}
                />
                <ErrorModal 
                    text={'Lütfen önce kullanıcı olarak ekleyeceğiniz personeli seçin'}
                    isOpen={this.state.isErrorModalOpen}
                    onClose={this.handleErrorModal}
                    header={'Personel Seçimi'}
                />
            </React.Fragment>
        );
    }
}
const styles = {
    headerStyle: {
        color: '#2196f3',
        fontSize: 20
    }
};
const mapStateToProps = state => ({
    users: state.userReducer.users,
    candidates: state.userReducer.candidates
});
const mapDispatchToProps = {
    getCandidatesAndUsers,
    addNewUser
};
export default connect(mapStateToProps, mapDispatchToProps)(NewUser);