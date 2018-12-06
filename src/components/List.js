import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PersonIcon from '@material-ui/icons/Person';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';

class SelectedListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: -1,
            searchKey: '',
            enteredKey: false
        };
        this.handleSearchClick = this.handleSearchClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
	handleListItemClick = (event, index, personelID) => {
		this.setState({ selectedIndex: index });
		this.props.setChosenEmployee(personelID);
    };
    handleSearchClick() {
        this.setState({ enteredKey: true });
    }
    mapEmployees(employees) {
        return employees.map((item, index) => (
            <ListItem
                key={index}
                button
                selected={this.state.selectedIndex === index + 1}
                onClick={event => this.handleListItemClick(event, index + 1, item.personelID)}
            >
                <Grid container direction={'row'} alignItems={'center'} justify={'center'}>
                    <Grid item xs={1}>
                        <ListItemIcon>
                            <PersonIcon />
                        </ListItemIcon>
                    </Grid>
                    <Grid item xs={1}>
                        <ListItemText primary={item.personelID} />
                    </Grid>
                    <Grid item xs={4}>
                        <ListItemText primary={item.personelAdi} />
                    </Grid>
                    <Grid item xs={4}>
                        <ListItemText primary={item.departmanAdi} />
                    </Grid>
                    <Grid item xs={2}>
                        <ListItemText primary={item.unvanAdi} />
                    </Grid>
                </Grid>
            </ListItem>
        ));
    }
    handleChange({ target }) {
        this.setState({ [target.name]: target.value });
    }
    renderSearchBar() {
        return (
            <div style={{ flexGrow: 1 }}>
                <Paper>
                    <Grid container>
                        <Grid item xs={1} >
                            <SearchIcon />
                        </Grid>
                        <Grid item xs={11}>
                        
                            <InputBase
                                fullWidth
                                placeholder="İsim giriniz..." 
                                value={this.state.searchKey} 
                                onChange={this.handleChange} 
                                name="searchKey"
                                />
                            
                        </Grid>
                    </Grid>
                </Paper>  
            </div>
        );
    }
    renderContent() {
        const { classes, items } = this.props;
        return (
            <div className={classes.root}>
            <Paper style={{ height: 400, overflow: 'auto' }}>
                {this.renderSearchBar()}
                <List>
                {this.mapEmployees(items.filter((item) => {
                if(item.personelAdi.toLowerCase().includes(this.state.searchKey.toLocaleLowerCase())) {
                    return true;
                }
            }))}
                </List>
            </Paper>
        </div>
        );
    }
    render() {
        return this.renderContent();
	}

}
SelectedListItem.propTypes = {
	classes: PropTypes.object.isRequired,
};

const styles = theme => ({
	root: {
		width: '100%',
		maxWidth: 600,
		backgroundColor: theme.palette.background.paper,
	},
});

export default withStyles(styles)(SelectedListItem);
