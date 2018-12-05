import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';

let Tip;
const modifyID = product => {
	if (product) {
		Tip = product.Tip;
		return product.Tip === 'Bileşen' ? 'B-' + product.bilesenID : 'P-' + product.pcID;
	}
	return null;
};
const checkIfHasProducts = pcComponents => {
	if (pcComponents && pcComponents.length > 0) {
		return true;
	}
	return false;
};
const renderProductName = (product) => {
	return Tip === 'Bileşen' ? product.bilesenAdi : product.pcAdi;
}
const renderComponents = pcComponents => {
	const { subHeader, component } = styles;
	return pcComponents.map((product, index) => (
		<div style={component}>
			<Grid container spacing={8} alignItems={'center'} direction={'row'}>
				<Grid item xs={4}>
					<h4 style={subHeader}>Model: </h4>
				</Grid>
				<Grid item xs={8}>
					<h4>{product.bilesenAdi}</h4>
				</Grid>
			</Grid>
			<Grid container spacing={8} alignItems={'center'} direction={'row'}>
				<Grid item xs={4}>
					<h4 style={subHeader}>Kategori: </h4>
				</Grid>
				<Grid item xs={8}>
					<h4>{product.kategoriAdi}</h4>
				</Grid>
			</Grid>
			<Grid container spacing={8} alignItems={'center'} direction={'row'}>
				<Grid item xs={4}>
					<h4 style={subHeader}>Marka: </h4>
				</Grid>
				<Grid item xs={8}>
					<h4>{product.markaAdi}</h4>
				</Grid>
			</Grid>
		</div>
	));
};
export default ({ isOpen, onClose, product, pcComponents }) => {
	const { header, subHeader } = styles;
	return (
		<Modal
			style={{ marginTop: 70 }}
			show={isOpen}
			onHide={() => onClose()}
			aria-labelledby="contained-modal-title-lg"
		>
			<Modal.Body style={{ fontSize: 20 }}>
				<Grid container spacing={8} alignItems={'center'} direction={'row'} justify={'space-between'}>
					<Grid item>
						<h3 style={header}>Genel Bilgiler</h3>
					</Grid>
					<Grid item>
						<h3>{modifyID(product)}</h3>
					</Grid>
				</Grid>
				<Divider />
				<Grid container spacing={8} alignItems={'center'} direction={'row'}>
					<Grid item xs={4}>
						<h4 style={subHeader}>Model: </h4>
					</Grid>
					<Grid item xs={8}>
						<h4>{product ? renderProductName(product) : null}</h4>
					</Grid>
				</Grid>
				<Grid container spacing={8} alignItems={'center'} direction={'row'}>
					<Grid item xs={4}>
						<h4 style={subHeader}>Tip:</h4>
					</Grid>
					<Grid item xs={8}>
						<h4>{product ? product.Tip : null}</h4>
					</Grid>
				</Grid>
				<Grid container spacing={8} alignItems={'center'} direction={'row'}>
					<Grid item xs={4}>
						<h4 style={subHeader}>Satın Alınma Tarihi: </h4>
					</Grid>
					<Grid item xs={8}>
						<h4>{product ? product.satinAlmaTarihi : null}</h4>
					</Grid>
				</Grid>
				<Grid container spacing={8} alignItems={'center'} direction={'row'}>
					<Grid item xs={4}>
						<h4 style={subHeader}>Satın Alınan Adet: </h4>
					</Grid>
					<Grid item xs={8}>
						<h4>{product ? product.satinAlinanAdet : null}</h4>
					</Grid>
				</Grid>
				<Grid container spacing={8} alignItems={'center'} direction={'row'}>
					<Grid item xs={4}>
						<h4 style={subHeader}>Stok Miktarı: </h4>
					</Grid>
					<Grid item xs={8}>
						<h4>{product ? product.stokMiktari : null}</h4>
					</Grid>
				</Grid>
				<Grid container spacing={8} alignItems={'center'} direction={'row'}>
					<Grid item xs={4}>
						<h4 style={subHeader}>Birim Fiyat: </h4>
					</Grid>
					<Grid item xs={8}>
						<h4>{product ? product.fiyat + '₺' : null}</h4>
					</Grid>
				</Grid>
				<Grid container spacing={8} alignItems={'center'} direction={'row'}>
					<Grid item xs={4}>
						<h4 style={subHeader}>Kategori Adı: </h4>
					</Grid>
					<Grid item xs={8}>
						<h4>{product ? product.kategoriAdi : null}</h4>
					</Grid>
				</Grid>
				<Grid container spacing={8} alignItems={'center'} direction={'row'}>
					<Grid item xs={4}>
						<h4 style={subHeader}>Marka Adı: </h4>
					</Grid>
					<Grid item xs={8}>
						<h4>{product ? product.markaAdi : null}</h4>
					</Grid>
				</Grid>
				<Grid container spacing={8} alignItems={'center'} direction={'row'}>
					<Grid item xs={4}>
						<h4 style={subHeader}>Satın Alan Personel: </h4>
					</Grid>
					<Grid item xs={8}>
						<h4>{product ? product.personelAdi : null}</h4>
					</Grid>
				</Grid>
				{Tip === 'Hazır PC' ? (
					<div>
						<Grid container spacing={8} alignItems={'center'} direction={'row'}>
							<Grid item xs={4}>
								<h4 style={subHeader}>Renk: </h4>
							</Grid>
							<Grid item xs={8}>
								<h4>{product ? product.renk : null}</h4>
							</Grid>
						</Grid>
						<h3 style={header}>Parça Bilgileri</h3>
					</div>
				) : null}
				{checkIfHasProducts(pcComponents) ? renderComponents(pcComponents) : null}
				<h3 style={header}>Tedarikçi Bilgileri</h3>
				<Divider />
				<Grid container spacing={8} alignItems={'center'} direction={'row'}>
					<Grid item xs={4}>
						<h4 style={subHeader}>Tedarikçi Adı: </h4>
					</Grid>
					<Grid item xs={8}>
						<h4>{product ? product.tedarikciAdi : null}</h4>
					</Grid>
				</Grid>
				<Grid container spacing={8} alignItems={'center'} direction={'row'}>
					<Grid item xs={4}>
						<h4 style={subHeader}>İlçe Adı: </h4>
					</Grid>
					<Grid item xs={8}>
						<h4>{product ? product.ilceAdi : null}</h4>
					</Grid>
				</Grid>
				<Grid container spacing={8} alignItems={'center'} direction={'row'}>
					<Grid item xs={4}>
						<h4 style={subHeader}>İl Adı: </h4>
					</Grid>
					<Grid item xs={8}>
						<h4>{product ? product.ilAdi : null}</h4>
					</Grid>
				</Grid>
				<Grid container spacing={8} alignItems={'center'} direction={'row'}>
					<Grid item xs={4}>
						<h4 style={subHeader}>Tedarikçi Tel no: </h4>
					</Grid>
					<Grid item xs={8}>
						<h4>{product ? product.telNo : null}</h4>
					</Grid>
				</Grid>
			</Modal.Body>
			<Modal.Footer>
				<Button bsStyle="danger" onClick={() => onClose()}>
					Kapat
				</Button>
			</Modal.Footer>
		</Modal>
	);
};
const styles = {
	header: {
		color: '#2196f3',
	},
	subHeader: {
		fontWeight: 'bold',
	},
	component: {
		border: '1px solid #2196f3',
		borderRadius: 8,
		marginBottom: 5,
		marginTop: 5,
		padding: 5
	}
};
