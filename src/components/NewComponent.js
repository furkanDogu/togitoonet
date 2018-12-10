import React from 'react';
import { Grid, Row, Col, FormControl, Button } from 'react-bootstrap';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import MatGrid from '@material-ui/core/Grid';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';

class NewComponent extends React.Component {
	constructor(prop) {
		super(prop);
		this.state = {
			selectedSupplierIndex: -1,
			searchKey: '',
		};
	}
	renderBrandOptions() {}
	renderSearchBar() {
		return (
			<Grid style={{ marginBottom: 20 }}>
				<Row>
					<Col xs={1} style={{ padding: 0 }}>
						<SearchIcon />
					</Col>
					<Col xs={8} style={{ padding: 0 }}>
						<InputBase
							fullWidth
							placeholder="İsim giriniz..."
							value={this.state.searchKey}
							onChange={() => console.log('input giriliyor')}
							name="searchKey"
						/>
					</Col>

					<Col xs={3} style={{ paddingLeft: '1%', paddingRight: 0 }}>
						<Button bsStyle="success" style={{ width: '100%', height: 40 }}>
							Yeni Ekle
						</Button>
					</Col>
				</Row>
			</Grid>
		);
	}
	renderSuppliers(items) {
		return items.map((item, index) => (
			<ListItem
				key={index}
				button
				selected={this.state.selectedSupplierIndex === index + 1}
				onClick={event => console.log('tıklandı')}
			>
				<MatGrid container direction={'row'} alignItems={'center'} justify={'center'}>
					<MatGrid item xs={1}>
						<ListItemIcon>
							<LocalShippingIcon />
						</ListItemIcon>
					</MatGrid>
					<MatGrid item xs={4}>
						<ListItemText primary={item.tedarikciAdi} />
					</MatGrid>
					<MatGrid item xs={3}>
						<ListItemText primary={item.ilAdi} />
					</MatGrid>
					<MatGrid item xs={2}>
						<ListItemText primary={item.ilceAdi} />
					</MatGrid>
					<MatGrid item xs={2}>
						<ListItemText primary={item.telNo} />
					</MatGrid>
				</MatGrid>
			</ListItem>
		));
	}
	render() {
		const { fontStyle, rowStyle } = styles;
		return (
			<Grid>
				<form style={{ marginTop: 100 }}>
					<Row style={rowStyle}>
						<Col>
							<span style={fontStyle}>Bileşen Modeli: </span>
						</Col>
					</Row>
					<Row style={rowStyle}>
						<Col>
							<FormControl style={{ height: 40 }} type="text" />
						</Col>
					</Row>
					<Row style={rowStyle}>
						<Col>
							<span style={fontStyle}>Marka: </span>
						</Col>
					</Row>
					<Row style={rowStyle}>
						<Col xs={9} style={{ padding: 0 }}>
							<FormControl style={{ height: 40 }} componentClass="select" />
						</Col>
						<Col xs={3} style={{ paddingLeft: '1%', paddingRight: 0 }}>
							<Button bsStyle="success" style={{ width: '100%', height: 40 }}>
								Yeni Ekle
							</Button>
						</Col>
					</Row>
					<Row style={rowStyle}>
						<Col>
							<span style={fontStyle}>Kategori: </span>
						</Col>
					</Row>
					<Row style={rowStyle}>
						<Col xs={9} style={{ padding: 0 }}>
							<FormControl style={{ height: 40 }} componentClass="select" />
						</Col>
						<Col xs={3} style={{ paddingLeft: '1%', paddingRight: 0 }}>
							<Button bsStyle="success" style={{ width: '99%', height: 40 }}>
								Yeni Ekle
							</Button>
						</Col>
					</Row>
					<Row style={rowStyle}>
						<Col>
							<span style={fontStyle}>Satın Alınan Adet: </span>
						</Col>
					</Row>
					<Row style={rowStyle}>
						<Col>
							<FormControl style={{ height: 40 }} type="number" />
						</Col>
					</Row>
					<Row style={rowStyle}>
						<Col>
							<span style={fontStyle}>Fiyat: </span>
						</Col>
					</Row>
					<Row style={rowStyle}>
						<Col>
							<FormControl style={{ height: 40 }} type="number" min="1" step="0.01" />
						</Col>
					</Row>
					<Row style={rowStyle}>
						<Col>
							{this.renderSearchBar()}
							<Paper style={{ height: 350, overflow: 'auto' }}>
								<List>{this.renderSuppliers(items)}</List>
							</Paper>
						</Col>
					</Row>
				</form>
			</Grid>
		);
	}
}
const items = [
	{
		tedarikciAdi: 'anan',
		telNo: 2535255,
		ilAdi: 'İzmir',
		ilceAdi: 'Bornova',
	},
	{
		tedarikciAdi: 'anan',
		telNo: 2535255,
		ilAdi: 'İzmir',
		ilceAdi: 'Bornova',
	},
	{
		tedarikciAdi: 'anan',
		telNo: 2535255,
		ilAdi: 'İzmir',
		ilceAdi: 'Bornova',
	},
	{
		tedarikciAdi: 'anan',
		telNo: 2535255,
		ilAdi: 'İzmir',
		ilceAdi: 'Bornova',
	},
	{
		tedarikciAdi: 'anan',
		telNo: 2535255,
		ilAdi: 'İzmir',
		ilceAdi: 'Bornova',
	},
];
const styles = {
	fontStyle: {
		fontSize: 23,
		color: '#2196f3',
	},
	rowStyle: {
		marginBottom: 20,
	},
};
export default NewComponent;
