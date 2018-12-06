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
	bullet: {
		display: 'inline-block',
		margin: '0 2px',
		transform: 'scale(0.8)',
	},
	title: {
		fontSize: 14,
	},
	pos: {
		marginBottom: 12,
	},
	typo: {
		marginBottom: 4
	}
};
const renderSpecialProp = (stockAmount, registerationDate, registeredPerson, styles ) => {
	if (stockAmount) {
		return <Typography variant="subheading" className={styles.typo}>Stok Miktarı: {stockAmount}</Typography>;
	} else if (registerationDate) {
		return (
			<div>
				<Typography variant="subheading" className={styles.typo}>Zimmet Tarihi: {registerationDate}</Typography>
				<Typography variant="subheading" className={styles.typo}>Zimmetlenen Kişi: {registeredPerson}</Typography>
			</div>
		);
	} else return null;
}
function ProductCard(props) {
	const { classes, name, buttons, id, category, brand, stockAmount, registerationDate, registeredPerson } = props;

	return (
		<Card className={classes.card}>
			<CardContent>
				<Grid container justify={'space-between'}>
					<Grid item>
						<Typography className={classes.typo} variant="h5">
								{name}
						</Typography>
					</Grid>
					<Grid item>
						<Typography variant="button" className={classes.typo}>
							{id}
						</Typography>
					</Grid>
				</Grid>
				<Typography variant="caption" className={classes.typo}>
					{category}
				</Typography>
				<Typography variant="subheading" className={classes.typo}>Marka: {brand}</Typography>
				{renderSpecialProp(stockAmount, registerationDate, registeredPerson, classes )}
				
			</CardContent>
			<CardActions>
				{buttons.map((button, index) => (
					<Button bsStyle={button.bsStyle} onClick={() => button.onClick(id)} key={index}>
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
