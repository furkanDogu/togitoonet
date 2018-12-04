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

function ProductCard(props) {
	const { classes, productName, buttons } = props;

	return (
		<Card className={classes.card}>
			<CardContent>
				<Grid container justify={'space-between'}>
					<Grid item>
						<Typography className={classes.typo} variant="h5">
							{productName}
						</Typography>
					</Grid>
					<Grid item>
						<Typography variant="button" className={classes.typo}>
							{"123123"}
						</Typography>
					</Grid>
				</Grid>
				<Typography variant="caption" className={classes.typo}>
					{'KATEGORİ'}
				</Typography>
				<Typography variant="subheading" className={classes.typo}>{'marka'}</Typography>
			</CardContent>
			<CardActions>
				{buttons.map((button, index) => (
					<Button bsStyle={button.bsStyle} onClick={button.onClick} key={index}>
						{button.text}
					</Button>
				))}
			</CardActions>
		</Card>
	);
}

ProductCard.propTypes = {
	classes: PropTypes.object.isRequired,
};



export default withStyles(styles)(ProductCard);
