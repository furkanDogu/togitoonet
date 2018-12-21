import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Button } from 'react-bootstrap';
import Grid from '@material-ui/core/Grid';


const styles = {
	card: {
		minWidth: 275,
	},
	typo: {
		marginBottom: 4
	},	
};

// if product is unregistered product : stockAmount will be shown
// if product is registered product: registerationDate and registeredPerson will be shown
// if product is broken product: errorDate will be shown
const renderSpecialProp = (stockAmount, registerationDate, registeredPerson, styles, errorDate) => {
	if (stockAmount && !registerationDate && !errorDate) {
		return <Typography variant="subheading" className={styles.typo}>Stok Miktarı: {stockAmount}</Typography>;
	} else if (registerationDate) {
		return (
			<div>
			<Grid container wrap="nowrap" alignItems={'center'} style={{ width: 280, whiteSpace: 'nowrap', marginBottom: 5 }} direction={'row'} justify={'space-between'}>
					<Grid item xs={6}>
						<span style={{ fontSize: 15, fontWeight: '500' }}>Zimmet Tarihi: </span>
					</Grid>
					<Grid item xs={8} style={{ textOverflow: 'ellipsis', overflow: 'hidden'}}>
						<span style={{ fontSize: 15 }}>{registerationDate}</span>
					</Grid>
			</Grid>
			<Grid container wrap="nowrap" alignItems={'center'} style={{ width: 280, whiteSpace: 'nowrap', marginBottom: 5 }} direction={'row'} justify={'space-between'}>
					<Grid item xs={6} style={{ marginRight: 15 }}>
						<span style={{ fontSize: 15, fontWeight: '500' }}>Zimmetlenen Kişi: </span>
					</Grid>
					<Grid item xs={8} style={{ textOverflow: 'ellipsis', overflow: 'hidden'}}>
						<span style={{ fontSize: 15 }}>{registeredPerson}</span>
					</Grid>
				</Grid>
			
			</div>
		);
	} else if (errorDate) {
		return <Typography variant="subheading" className={styles.typo}>ArızaTarihi: {errorDate}</Typography>; 
	} else return null;
}

// This component is the most reusable component of our system. It is able to show all kinds of components.
// Basically, according to the given properties it will shape itself.
function ProductCard(props) {
	const { classes, name, buttons, id, category, brand, stockAmount, registerationDate, registeredPerson, registerationID, errorDate, errorID } = props;

	return (
		<Card className={classes.card}>
			<CardContent>
				<Grid container wrap="nowrap" alignItems={'center'} style={{ width: 200, whiteSpace: 'nowrap', marginBottom: 5 }} direction={'row'} justify={'space-between'}>
					<Grid item xs={8} style={{ textOverflow: 'ellipsis', overflow: 'hidden'}}>
						<span style={{ fontSize: 20 }}>{name}</span>
					</Grid>
					<Grid item xs={4} style={{ 'flexBasis': 'auto' }}>
						{id}
					</Grid>
				</Grid>
				<Grid container wrap="nowrap" alignItems={'center'} style={{ width: 200, whiteSpace: 'nowrap', marginBottom: 5 }} direction={'row'} >
					<Grid item xs={8} style={{ textOverflow: 'ellipsis', overflow: 'hidden'}}>
						<span style={{ fontSize: 15 }}>{category}</span>
					</Grid>
				</Grid>
				<Grid container wrap="nowrap" alignItems={'center'} style={{ width: 200, whiteSpace: 'nowrap', marginBottom: 5	 }} direction={'row'} >
					<Grid item xs={4} style={{ textOverflow: 'ellipsis', overflow: 'hidden'}}>
						<span style={{ fontSize: 15, fontWeight: '500' }}>Marka:</span>
					</Grid>
					<Grid item xs={8} style={{ textOverflow: 'ellipsis', overflow: 'hidden'}}>
						<span style={{ fontSize: 15 }}>{brand}</span>
					</Grid>
				</Grid>
				{renderSpecialProp(stockAmount, registerationDate, registeredPerson, classes, errorDate )}
				
			</CardContent>
			<CardActions>
				{buttons.map((button, index) => (
					<Button bsStyle={button.bsStyle} onClick={() => button.onClick(id, registerationID, registeredPerson, errorID)} key={index}>
						{button.text}
					</Button>
				))}
			</CardActions>
		</Card>
	);
}

ProductCard.propTypes = {
	classes: PropTypes.object.isRequired,
	name: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
	category: PropTypes.string.isRequired,
	brand: PropTypes.string.isRequired
};



export default withStyles(styles)(ProductCard);
