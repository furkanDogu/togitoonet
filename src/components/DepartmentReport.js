import React from 'react';
import { Grid, Row, Col, Button, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import GridMat from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PersonIcon from '@material-ui/icons/Person';
import { getRegisteredByDepartment, getDepartments } from '../actions/userActions';

class DepartmentReport extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			searchKey: '',
			selectedIndex: -1,
			departmanID: '',
			departmanAdi: '',
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleListItemClick = this.handleListItemClick.bind(this);
	}
	componentDidMount() {
		if(this.props.role === 'chief') {
			console.log('evet');
			this.setState({ departmanID: this.props.departmanID}, () => {
				this.props.getRegisteredByDepartment(this.state.departmanID);
			});
		} else {
			this.props.getDepartments();
		}
	}
	componentDidUpdate(prevProps) {

	}
	handleListItemClick(event, index, item) {
		this.setState({ selectedIndex: index });
		this.setState({ departmanAdi: item.departmanAdi });
		this.setState({ departmanID: item.departmanID }, () => {
			this.props.getRegisteredByDepartment(this.state.departmanID);
		});
	}
	handleChange({ target }) {
		this.setState({ [target.name]: target.value });
	}
	renderAll(departments) {
		return departments.map((item, index) => (
			<ListItem
				key={index}
				button
				selected={this.state.selectedIndex === index + 1}
				onClick={event => this.handleListItemClick(event, index + 1, item)}
			>
				<GridMat container direction={'row'} alignItems={'center'} justify={'center'}>
					<GridMat item xs={4}>
						<ListItemIcon>
							<PersonIcon />
						</ListItemIcon>
					</GridMat>
					<GridMat item xs={4}>
						<ListItemText primary={item.departmanID} />
					</GridMat>
					<GridMat item xs={4}>
						<ListItemText primary={item.departmanAdi} />
					</GridMat>
				</GridMat>
			</ListItem>
		));
	}
	renderData() {
		const { colItem } = styles;
		if (this.state.departmanID) {
			if (this.props.registeredProductsByDepartment) {
				return this.props.registeredProductsByDepartment.map((item, index) => {
					console.log(item);
					return (
						<tr key={index}>
							<td style={colItem}>{item.personelID}</td>
							<td style={colItem}>{item.personelAdi}</td>
							<td style={colItem}>{item.personelDurumu}</td>
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
	printTable() {
		var divToPrint = document.getElementById('tbl');
		var newWin = window.open('');
		newWin.document.write(divToPrint.outerHTML);
		newWin.print();
		newWin.close();
	}
	renderDepartments(departments) {
		if (this.props.role !== 'chief') {
		return (
			<Paper style={{ height: 300, overflow: 'auto', marginTop: 10, marginBottom: 20 }}>
				<List>{this.renderAll(departments)}</List>
			</Paper>
		);
		} 
	}
	render() {
		const { colItem, textStyle } = styles;
		return (
			<Grid style={{ marginTop: 80 }}>
				
				<Row>
					{this.props.role === 'chief' ? <div style={{ marginBottom: 10 }}><span style={{ fontSize: 15, fontWeight: '400' }}>Departmanınıza ait rapor</span></div>: null }
					<Col xs={12}>
						{this.props.role !== 'chief' ? 
						(<span style={{ fontSize: 15, fontWeight: '400' }}>Aşağıda bulunan listeden bir departman seçerek ilgili raporu görüntüleyebilirsiniz.</span>) : null}
						{this.renderDepartments(this.props.departments)}
					</Col>
				</Row>
				<Row>
					<div id="tbl">
						<Col xs={9}>
							{this.state.departmanAdi ? (
								<div style={{ marginTop: 40, marginBottom: 10 }}>
									<span style={textStyle}>Departman: </span>
									<span style={textStyle}>{this.state.departmanAdi + ' Departmanı'}</span>
								</div>
							) : null}
						</Col>
						<Col xs={3}>
							{this.state.departmanAdi ? (
								<div style={{ marginTop: 40, marginBottom: 10 }}>
									<span style={textStyle}>Departman Zimmet Raporu</span>
								</div>
							) : null}
						</Col>
						<Table>
							<tbody>
								{this.state.departmanID ? (
									<tr>
										<th style={colItem}>Personel ID</th>
										<th style={colItem}>Personel Adı</th>
										<th style={colItem}>Personel Durumu</th>
										<th style={colItem}>Ürün ID</th>
										<th style={colItem}>Ürün Adı</th>
										<th style={colItem}>Kategori Adı</th>
										<th style={colItem}>Zimmet Tarihi</th>
										<th style={colItem}>Zimmet Kaldırma Tarihi</th>
										<th style={colItem}>Zimmet Durumu</th>
										<th style={colItem}>Süre</th>
									</tr>
								) : null}
								{this.renderData()}
							</tbody>
						</Table>
					</div>
					{this.state.departmanID ? (<Button onClick={() => this.printTable()}>Yazdır</Button>) : null}
				</Row>
			</Grid>
		);
	}
}
const mapStateToProps = state => ({
	departmanID: state.userReducer.departmanID,
	departments: state.userReducer.departments,
	role: state.userReducer.role,
	registeredProductsByDepartment: state.userReducer.registeredProductsByDepartment,
});
const mapDispatchToProps = {
	getRegisteredByDepartment,
	getDepartments,
};
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

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(DepartmentReport);
