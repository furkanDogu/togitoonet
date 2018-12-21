import React from 'react';
import { Grid, Row, Col, Button, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import GridMat from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PersonIcon from '@material-ui/icons/Person';
import { getRegisteredByUser, getEmployeesIncPassive } from '../actions/userActions';

// This component helps us get registeration reports based on employee.
class UserReport extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			searchKey: '',
			selectedIndex: -1,
			personelID: '',
			personelAdi: '',
			isPersonelActive: 'notSetYet'
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleListItemClick = this.handleListItemClick.bind(this);
	}
	// when component is created on the screen, get all the employees from store.
	componentDidMount() {
		this.props.getEmployeesIncPassive();
	}
	// whenever component gets new components that are registered to a employee, this function is called
	// it checks if the employee is still employed in compony or not.
	componentDidUpdate(prevProps) {
		if (this.props.registeredProductsByUser !== prevProps.registeredProductsByUser) {
			if (this.props.registeredProductsByUser.length > 0) {
				this.setState({ isPersonelActive: this.props.registeredProductsByUser[0].personelDurumu });
			}
		}
	}
	// with every click on employees list, this function is triggered and it sets employee info to the state.
	// finally, it gets registered items to the employee.
	handleListItemClick(event, index, item) {
		this.setState({ selectedIndex: index });
		this.setState({ personelAdi: item.personelAdi });
		this.setState({ personelID: item.personelID }, () => {
			this.props.getRegisteredByUser(this.state.personelID);
		});
	}
	// handles any coming input to the search bar
	handleChange({ target }) {
		this.setState({ [target.name]: target.value });
	}
	// shows all users in list items
	renderUsers(users) {
		return users.map((item, index) => (
			<ListItem
				key={index}
				button
				selected={this.state.selectedIndex === index + 1}
				onClick={event => this.handleListItemClick(event, index + 1, item)}
			>
				<GridMat container direction={'row'} alignItems={'center'} justify={'center'}>
					<GridMat item xs={1}>
						<ListItemIcon>
							<PersonIcon />
						</ListItemIcon>
					</GridMat>
					<GridMat item xs={1}>
						<ListItemText primary={item.personelID} />
					</GridMat>
					<GridMat item xs={4}>
						<ListItemText primary={item.personelAdi} />
					</GridMat>
					<GridMat item xs={4}>
						<ListItemText primary={item.departmanAdi} />
					</GridMat>
					<GridMat item xs={2}>
						<ListItemText primary={item.unvanAdi} />
					</GridMat>
				</GridMat>
			</ListItem>
		));
	}
	// if current user is chief, we are supposed to only show employees that are working in chief's department
	// so this method just checks the role and if it's chief, gives the proper employees to show.
	// if current user is not chief, it returns all employees (which means current user is either admin or sales)
	giveValidUsers(employees) {
		if (this.props.role === 'chief') {
			return employees.filter(employee => {
				if (this.props.departmanID === employee.departmanID) return true;
			});
		} else {
			// give all amployee's
			return employees;
		}
	}
	// this method renders registeration info on the screen.
	// it basically returns tr items with registeration info.
	// this function will be used in <table> tag.
	renderData() {
		const { colItem } = styles;
		if (this.state.personelID) {
			if (this.props.registeredProductsByUser) {
				return this.props.registeredProductsByUser.map((item, index) => {
					console.log(item);
					return (
						<tr key={index}>
							<td style={colItem}>{item.personelID}</td>
							<td style={colItem}>{item.urunID}</td>
							<td style={colItem}>{item.urunAdi}</td>
							<td style={colItem}>{item.kategoriAdi}</td>
							<td style={colItem}>{item.zimmetTarihi}</td>
							<td style={colItem}>{item.zimmetKaldirmaTarihi ? item.zimmetKaldirmaTarihi : '-'}</td>
							<td style={colItem}>{item.Durum}</td>
							<td style={colItem}>{item.Sure}</td>
						</tr>
					);
				});
			}
		}
	}
	// prints the table
	printTable() {
		var divToPrint = document.getElementById('tbl');
		var newWin = window.open('');
		newWin.document.write(divToPrint.outerHTML);
		newWin.print();
		newWin.close();
	}
	renderSearchBar() {
		return (
			<div style={{ flexGrow: 1, marginTop: 10 }}>
				<Paper style={{ marginBottom: 5, height: 40 }}>
					<GridMat container>
						<GridMat item xs={1}>
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
		const { colItem, textStyle } = styles;
		return (
			<Grid style={{ marginTop: 80 }}>
				
				<Row>
					<Col xs={12}>
						<span style={{ fontSize: 15, fontWeight: '400' }}>Aşağıda bulunan listeden bir personel seçerek ilgili raporu görüntüleyebilirsiniz.</span>
						{this.renderSearchBar()}
						<Paper style={{ height: 300, overflow: 'auto' }}>
							<List>{this.renderUsers(this.giveValidUsers(this.props.employeesIncPassive.filter((item) => {
                if(item.personelAdi.toLowerCase().includes(this.state.searchKey.toLowerCase())) {
                    return true;
                }
            })))}</List>
						</Paper>
					</Col>
				</Row>
				<Row>
					<div id="tbl">
						<Col xs={10}>
							
							{this.state.personelAdi ? (
								<div style={{ marginTop: 40, marginBottom: 10 }}>
									<span style={textStyle}>Personel: </span>
									<span style={textStyle}>{this.state.personelAdi}</span>
									<span style={{ marginLeft: 10 }}>{this.state.isPersonelActive !== 'notSetYet' ? this.state.isPersonelActive === 'Aktif' ? '(Aktif olarak çalışıyor)' : '(Eski çalışan)' : null}</span>
								</div>
							) : null}
						</Col>
						<Col xs={2}>
							{this.state.personelAdi ? (
								<div style={{ marginTop: 40, marginBottom: 10 }}>
									<span style={textStyle}>Kişi Zimmet Dökümü</span>
								</div>
							) : null}
						</Col>
						<Table>
							<tbody>
								{this.state.personelID ? (
									<tr>
										<th style={colItem}>Personel ID</th>
										<th style={colItem}>Ürün ID</th>
										<th style={colItem}>Ürün Adı</th>
										<th style={colItem}>Kategori Adı</th>
										<th style={colItem}>Zimmet Tarihi</th>
										<th style={colItem}>Zimmet Kaldırma Tarihi</th>
										<th style={colItem}>Durum</th>
										<th style={colItem}>Süre</th>
									</tr>
								) : null}
								{this.renderData()}
							</tbody>
						</Table>
					</div>
					{this.state.personelAdi ? (<Button onClick={() => this.printTable()}>Yazdır</Button>) : null}
				</Row>
			</Grid>
		);
	}
}
const mapStateToProps = state => ({
	employeesIncPassive: state.userReducer.employeesIncPassive,
	departmanID: state.userReducer.departmanID,
	role: state.userReducer.role,
	registeredProductsByUser: state.userReducer.registeredProductsByUser,
});
const styles = {
	colItem: {
		padding: 15,
		border: '1px solid black',
		borderCollapse: 'collapse',
		cellPadding: 0,
	},
	textStyle: {
		fontSize: 15,
		fontWeight: '500',
	},
};
const mapDispatchToProps = {
	getRegisteredByUser,
	getEmployeesIncPassive,
};


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(UserReport);
