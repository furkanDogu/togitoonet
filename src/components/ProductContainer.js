import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ProductCard from './ProductCard';

//styles that will be used in grid
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

// This component will render product cards for the given product list but first
//it will use given hoc for attach the bussiness logic to product card
class ProductContainer extends React.Component {
	render() {
		const { classes, hoc, products } = this.props;
		return (
			<Grid style={{ marginLeft: 25, marginTop: 30 }} container className={classes.root}>
				<Grid item xs={12}>
					<Grid
						container
						spacing={16}
						className={classes.demo}
						alignItems={'flex-start'}
						direction={'row'}
						justify={'flex-start'}
					>
						{products.map((product, index) => {
							let Item = hoc(ProductCard);
							if (product['Tip'] === 'Bileşen') {
								return (
									<Grid key={index} item>
										<Item
											key={index}
											name={product.bilesenAdi}
											id={"B-"+product.bilesenID}
											category={product.kategoriAdi}
											brand={product.markaAdi}
											stockAmount={product.stokMiktari}
											registerationDate={product.zimmetTarihi}
											registeredPerson={product.personelAdi}
										/>
									</Grid>
								);
							} else {
								return (
									<Grid key={index} item>
										<Item
											key={index}
											name={product.pcAdi}
											id={"P-"+product.pcID}
											category={'Hazır PC'}
											brand={product.markaAdi}
											stockAmount={product.stokMiktari}
										/>
									</Grid>
								);
							}
						})}
					</Grid>
				</Grid>
			</Grid>
		);
	}
}

export default withStyles(styles)(ProductContainer);
