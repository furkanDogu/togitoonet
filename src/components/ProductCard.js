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
	}
};
const renderSpecialProp = (stockAmount, registerationDate, registeredPerson, styles, errorDate) => {
	if (stockAmount && !registerationDate) {
		return <Typography variant="subheading" className={styles.typo}>Stok Miktarı: {stockAmount}</Typography>;
	} else if (registerationDate) {
		return (
			<div>
				<Typography variant="subheading" className={styles.typo}>Zimmet Tarihi: {registerationDate}</Typography>
				
			</div>
		);
	} else if (errorDate) {
		return <Typography variant="subheading" className={styles.typo}>ArızaTarihi: {errorDate}</Typography>;
	} else return null;
}
function ProductCard(props) {
	const { classes, name, buttons, id, category, brand, stockAmount, registerationDate, registeredPerson, registerationID, errorDate } = props;

	return (
		<Card className={classes.card}>
			<CardContent>
				<Grid container justify={'space-between'}>
					<Grid item>
						<Typography className={classes.typo} variant="h5" >
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
				{renderSpecialProp(stockAmount, registerationDate, registeredPerson, classes, errorDate )}
				
			</CardContent>
			<CardActions>
				{buttons.map((button, index) => (
					<Button bsStyle={button.bsStyle} onClick={() => button.onClick(id, registerationID, registeredPerson)} key={index}>
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
