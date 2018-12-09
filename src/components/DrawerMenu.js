import React from 'react';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import AuthButton from './AuthButton';
import List from '@material-ui/core/List';
import PersonIcon from '@material-ui/icons/Person';
import ComputerIcon from '@material-ui/icons/Computer';
import Hidden from '@material-ui/core/Hidden';
import { withRouter } from 'react-router-dom';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import MemoryIcon from '@material-ui/icons/Memory';
import DesktopMacIcon from '@material-ui/icons/DesktopMac';
import InsertChartIcon from '@material-ui/icons/InsertChart';
import PeopleIcon from '@material-ui/icons/People';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

class DrawerMenu extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			productsOptionOpen: false,
			addProductOptionOpen: false,
			reportsOptionOpen: false,
		};
		this.handleProductsOption = this.handleProductsOption.bind(this);
		this.handleAddProductOption = this.handleAddProductOption.bind(this);
		this.handleReportsOption = this.handleReportsOption.bind(this);
	}
	handleProductsOption() {
		this.setState(state => ({ productsOptionOpen: !state.productsOptionOpen }));
	}
	handleAddProductOption() {
		this.setState(state => ({ addProductOptionOpen: !state.addProductOptionOpen }));
	}
	handleReportsOption() {
		this.setState(state => ({ reportsOptionOpen: !state.reportsOptionOpen }));
	}

	render() {
		const { role } = this.props;
		const { productsOptionOpen, addProductOptionOpen, reportsOptionOpen } = this.state;
		return (
			<div>
				<Hidden xsDown>
					<Divider style={{ marginTop: 80 }} />
				</Hidden>
				<List>
					{role !== 'chief' ? (
						<div>
							<ListItem button key={'Urunler'} onClick={this.handleProductsOption}>
								<ListItemIcon>
									<ComputerIcon />
								</ListItemIcon>
								<ListItemText>Ürünler</ListItemText>
								{productsOptionOpen ? <ExpandLess /> : <ExpandMore />}
							</ListItem>
							<Collapse in={productsOptionOpen} timeout="auto" unmountOnExit>
								<List component="div" disablePadding>
									<ListItem
										button
										style={{ paddingLeft: 35 }}
										onClick={() => this.props.history.push('/unregisteredProducts')}
									>
										<ListItemIcon>
											<LockOpenIcon />
										</ListItemIcon>
										<ListItemText inset primary="Zimmetsiz" />
									</ListItem>
									<ListItem
										button
										style={{ paddingLeft: 35 }}
										onClick={() => this.props.history.push('/registeredProducts')}
									>
										<ListItemIcon>
											<LockIcon />
										</ListItemIcon>
										<ListItemText inset primary="Zimmetli" />
									</ListItem>
									<ListItem 
										button 
										style={{ paddingLeft: 35 }}
										onClick={() => this.props.history.push('/brokenProducts')}
									>
										<ListItemIcon>
											<DeleteIcon />
										</ListItemIcon>
										<ListItemText inset primary="Arızalı" />
									</ListItem>
								</List>
							</Collapse>
							<ListItem button key={'YeniUrun'} onClick={this.handleAddProductOption}>
								<ListItemIcon>
									<AddIcon />
								</ListItemIcon>
								<ListItemText>Yeni ürün</ListItemText>
								{addProductOptionOpen ? <ExpandLess /> : <ExpandMore />}
							</ListItem>
							<Collapse in={addProductOptionOpen} timeout="auto" unmountOnExit>
								<List component="div" disablePadding>
									<ListItem button style={{ paddingLeft: 35 }}>
										<ListItemIcon>
											<MemoryIcon />
										</ListItemIcon>
										<ListItemText inset primary="Bileşen" />
									</ListItem>
									<ListItem button style={{ paddingLeft: 35 }}>
										<ListItemIcon>
											<DesktopMacIcon />
										</ListItemIcon>
										<ListItemText inset primary="Hazır PC" />
									</ListItem>
								</List>
							</Collapse>
						</div>
					) : null}
				</List>
				<Divider />
				<ListItem button key={'Raporlar'} onClick={this.handleReportsOption}>
					<ListItemIcon>
						<InsertChartIcon />
					</ListItemIcon>
					<ListItemText>Raporlar</ListItemText>
					{reportsOptionOpen ? <ExpandLess /> : <ExpandMore />}
				</ListItem>
				<Collapse in={reportsOptionOpen} timeout="auto" unmountOnExit>
					<List component="div" disablePadding>
						<ListItem button style={{ paddingLeft: 35 }}>
							<ListItemIcon>
								<PersonIcon />
							</ListItemIcon>
							<ListItemText inset primary="Kişi Bazlı" />
						</ListItem>
						<ListItem button style={{ paddingLeft: 35 }}>
							<ListItemIcon>
								<PeopleIcon />
							</ListItemIcon>
							<ListItemText inset primary="Bölüm Bazlı" />
						</ListItem>
					</List>
				</Collapse>
				<List>
					{role === 'admin' ? (
						<ListItem button key={'Kullanıcılar'} onClick={() => this.props.history.push('/a')}>
							<ListItemIcon>
								<PersonAddIcon />
							</ListItemIcon>
							<ListItemText>Kullanıcı Ekle</ListItemText>
						</ListItem>
					) : null}
					<AuthButton text="Çıkış" />
				</List>
			</div>
		);
	}
}

export default withRouter(DrawerMenu);
