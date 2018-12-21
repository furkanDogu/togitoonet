import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import MenuIcon from '@material-ui/icons/Menu';
import Business from '@material-ui/icons/Business';
import DrawerMenu from './DrawerMenu';
import ErrorModal from './ErrorModal';
import { closeFailModal, closeSuccessModal } from '../actions/userActions';


const drawerWidth = 240;
const styles = theme => ({
	root: {
		display: 'flex',
	},
	drawer: {
		[theme.breakpoints.up('sm')]: {
			width: drawerWidth,
			flexShrink: 0,
		},
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		backgroundColor: '#2196f3',
		padding: 10,
	},
	menuButton: {
		marginRight: 20,
		[theme.breakpoints.up('sm')]: {
			display: 'none',
		},
	},
	toolbar: theme.mixins.toolbar,
	drawerPaper: {
		width: drawerWidth,
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing.unit * 3,
	}
});
// This is the main component that holds all the routes and components in it.
class Dashboard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			mobileOpen: false,
			show: false,
			productsListItemOpen: false,
		};
		this.handleDrawerToggle = this.handleDrawerToggle.bind(this);
	}
	// when screen gets smalller, we need to show the hamburger menu instead of drawer
	handleDrawerToggle() {
		this.setState(state => ({ mobileOpen: !state.mobileOpen }));
	}

	render() {
		const { classes, theme, role } = this.props;

		return (
			<div className={classes.root}>
				<CssBaseline />
				<AppBar position="fixed" className={classes.appBar}>
					<Toolbar>
						<IconButton
							color="inherit"
							aria-label="Open drawer"
							onClick={this.handleDrawerToggle}
							className={classes.menuButton}
						>
							<MenuIcon />
						</IconButton>
						<Business style={{ fontSize: 30, color: 'white' }} />
						<Typography variant="h4" color="inherit" noWrap>
							Togitoonet
						</Typography>
					</Toolbar>
				</AppBar>
				<nav className={classes.drawer}>
					{/* The implementation can be swap with js to avoid SEO duplication of links. */}
					<Hidden smUp implementation="css">
						<Drawer
							container={this.props.container}
							variant="temporary"
							anchor={theme.direction === 'rtl' ? 'right' : 'left'}
							open={this.state.mobileOpen}
							onClose={this.handleDrawerToggle}
							classes={{
								paper: classes.drawerPaper,
							}}
							ModalProps={{
								keepMounted: true, // Better open performance on mobile.
							}}
						>
							<DrawerMenu role={role} />
						</Drawer>
					</Hidden>
					<Hidden xsDown implementation="css">
						<Drawer
							classes={{
								paper: classes.drawerPaper,
							}}
							variant="permanent"
							open
						>
							<DrawerMenu role={role} />
						</Drawer>
					</Hidden>
				</nav>
				<main className={classes.content}>
					<div className={classes.toolbar}>{this.props.children}</div>
				</main>
				<ErrorModal 
					text="İşleminiz başarıyla gerçekleştirildi"
					header="Başarı"
					isOpen={this.props.isSuccessModalOpen}
					onClose={this.props.closeSuccessModal}
					closeAnimation={true}
				/>
				<ErrorModal 
					text="İşlemizi gerçekleştirirken bir aksilik oluştu"
					header="Hay aksi !"
					isOpen={this.props.isFailModalOpen}
					onClose={this.props.closeFailModal}
					closeAnimation={true}
				/>
			</div>
		);
	}
}
Dashboard.propTypes = {
	classes: PropTypes.object.isRequired,
	container: PropTypes.object,
	theme: PropTypes.object.isRequired,
};
const mapDispatchToProps = {
	closeFailModal,
	closeSuccessModal
}
const mapStateToProps = state => ({
	role: state.userReducer.role,
	isFailModalOpen: state.userReducer.isFailModalOpen,
	isSuccessModalOpen: state.userReducer.isSuccessModalOpen
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(Dashboard)));
