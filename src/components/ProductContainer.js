import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ProductCard from './ProductCard';

const styles = theme => ({
	root: {
		flexGrow: 1,
	},
	demo: {
		height: 240,
	},
	paper: {
		padding: theme.spacing.unit * 2,
		height: '100%',
		color: theme.palette.text.secondary,
	},
	control: {
		padding: theme.spacing.unit * 2,
	},
});

class ProductContainer extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
        const { classes, hoc, products } = this.props; 
		return (
			<Grid style={{marginLeft: 25, marginTop: 80 }} container className={classes.root}>
				<Grid item xs={12}>
					<Grid
						container
						spacing={16}
						className={classes.demo}
						alignItems={"flex-start"}
						direction={"row"}
						justify={"flex-start"}
                        spacing={32}
					>
                        {products.map((product, index) => {
                            let Item = hoc(ProductCard);
                            return (
                                <Grid key={index} item>
                                    <Item
									key={index}
									name={product.bilesenAdi} 
									id={product.bilesenID}
									category={product.kategoriAdi}
									brand={product.markaAdi}
									/>
                                </Grid>
                            );
                        })}
					</Grid>
				</Grid>
			</Grid>
		);
	}
}

export default withStyles(styles)(ProductContainer);