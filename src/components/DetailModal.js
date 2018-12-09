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
	const { subHeader, component, gridStyle, spanStyle } = styles;
	return pcComponents.map((product, index) => (
		<div key={index} style={component}>
			<Grid container spacing={8} alignItems={'center'} direction={'row'}>
				<Grid item xs={4}>
                	<h4 style={subHeader}>Model: </h4>
				</Grid>
				<Grid item xs={8} style={gridStyle}>
					<span style={spanStyle}>{product.bilesenAdi}</span>
				</Grid>
			</Grid>
			<Grid container spacing={8} alignItems={'center'} direction={'row'}>
				<Grid item xs={4}>
					<h4 style={subHeader}>Kategori: </h4>
				</Grid>
				<Grid item xs={8} style={gridStyle}>
					<span style={spanStyle}>{product.kategoriAdi}</span>
				</Grid>
			</Grid>
			<Grid container spacing={8} alignItems={'center'} direction={'row'}>
				<Grid item xs={4}>
					<h4 style={subHeader}>Marka: </h4>
				</Grid>
				<Grid item xs={8} style={gridStyle}>
					<span style={spanStyle}>{product.markaAdi}</span>
				</Grid>
			</Grid>
		</div>
	));
};
export default ({ isOpen, onClose, product, pcComponents }) => {
	const { header, subHeader, gridStyle, spanStyle  } = styles;
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
					<Grid item xs={8} style={gridStyle}>
						<span style={spanStyle}>{product ? renderProductName(product) : null}</span>
					</Grid>
				</Grid>
				<Grid container spacing={8} alignItems={'center'} direction={'row'}>
					<Grid item xs={4}>
					<h4 style={subHeader}>Tip:</h4>
					</Grid>
					<Grid item xs={8} style={gridStyle}>
						<span style={spanStyle}>{product ? product.Tip : null}</span>
					</Grid>
				</Grid>
				<Grid container spacing={8} alignItems={'center'} direction={'row'}>
					<Grid item xs={4}>
						<h4 style={subHeader}>Satın Alınma Tarihi: </h4>
					</Grid>
					<Grid item xs={8}>
						<span style={spanStyle}>{product ? product.satinAlmaTarihi : null}</span>
					</Grid>
				</Grid>
				<Grid container spacing={8} alignItems={'center'} direction={'row'}>
					<Grid item xs={4}>
						<h4 style={subHeader}>Satın Alınan Adet: </h4>
					</Grid>
					<Grid item xs={8}>
						<span style={spanStyle}>{product ? product.satinAlinanAdet : null}</span>
					</Grid>
				</Grid>
				<Grid container spacing={8} alignItems={'center'} direction={'row'}>
					<Grid item xs={4}>
						<h4 style={subHeader}>Stok Miktarı: </h4>
					</Grid>
					<Grid item xs={8}>
						<span style={spanStyle}>{product ? product.stokMiktari : null}</span>
					</Grid>
				</Grid>
				<Grid container spacing={8} alignItems={'center'} direction={'row'}>
					<Grid item xs={4}>
						<h4 style={subHeader}>Birim Fiyat: </h4>
					</Grid>
					<Grid item xs={8}>
						<span style={spanStyle}>{product ? product.fiyat + '₺' : null}</span>
					</Grid>
				</Grid>
				<Grid container spacing={8} alignItems={'center'} direction={'row'}>
					<Grid item xs={4}>
						<h4 style={subHeader}>Kategori Adı: </h4>
					</Grid>
					<Grid item xs={8} style={gridStyle}>
						<span style={spanStyle}>{product ? product.kategoriAdi : null}</span>
					</Grid>
				</Grid>
				<Grid container spacing={8} alignItems={'center'} direction={'row'}>
					<Grid item xs={4}>
						<h4 style={subHeader}>Marka Adı: </h4>
					</Grid>
					<Grid item xs={8} style={gridStyle}>
						<span style={spanStyle}>{product ? product.markaAdi : null}</span>
					</Grid>
				</Grid>
				{product ? product.zimmetID ? null : (
					<Grid container spacing={8} alignItems={'center'} direction={'row'}>
						<Grid item xs={4}>
							<h4 style={subHeader}>Satın Alan Personel: </h4>
						</Grid>
						<Grid item xs={8} style={gridStyle}>
							<span style={spanStyle}>{product ? product.personelAdi : null}</span>
						</Grid>
					</Grid>
				) :null }
				{Tip === 'Hazır PC' ? (
					<div>
						<Grid container spacing={8} alignItems={'center'} direction={'row'}>
							<Grid item xs={4}>
								<h4 style={subHeader}>Renk: </h4>
							</Grid>
							<Grid item xs={8} style={gridStyle}>
								<span style={spanStyle}>{product ? product.renk : null}</span>
							</Grid>
						</Grid>
						<h3 style={header}>Parça Bilgileri</h3>
					</div>
				) : null}
				{checkIfHasProducts(pcComponents) ? renderComponents(pcComponents) : null}
				{product ? product.personelID ? (
					<div>
						<Grid container spacing={8} alignItems={'center'} direction={'row'} justify={'space-between'}>
							<Grid item>
								<h3 style={header}>Zimmet Bilgileri</h3>
							</Grid>
						</Grid>
						<Divider />
						<Grid container spacing={8} alignItems={'center'} direction={'row'}>
							<Grid item xs={4}>
								<h4 style={subHeader}>Zimmetlenen Kişi: </h4>
							</Grid>
							<Grid item xs={8} style={gridStyle}>
								<span style={spanStyle}>{product.personelAdi}</span>
							</Grid>
						</Grid>
						<Grid container spacing={8} alignItems={'center'} direction={'row'}>
							<Grid item xs={4}>
								<h4 style={subHeader}>Departmanı: </h4>
							</Grid>
							<Grid item xs={8} style={gridStyle}>
								<span style={spanStyle}>{product.departmanAdi}</span>
							</Grid>
						</Grid>
						<Grid container spacing={8} alignItems={'center'} direction={'row'}>
							<Grid item xs={4}>
								<h4 style={subHeader}>Zimmet Tarihi: </h4>
							</Grid>
							<Grid item xs={8}>
								<span style={spanStyle}>{product.zimmetTarihi}</span>
							</Grid>
						</Grid>
					</div>
				) :null :null}
				<h3 style={header}>Tedarikçi Bilgileri</h3>
				<Divider />
					<Grid container spacing={8} alignItems={'center'} direction={'row'}>
						<Grid item xs={4}>
								<h4 style={subHeader}>Tedarikçi Adı: </h4>
						</Grid>
						<Grid item xs={8} style={gridStyle}>
								<span style={spanStyle}>{product ? product.tedarikciAdi : null}</span>
						</Grid>
					</Grid>
					<Grid container spacing={8} alignItems={'center'} direction={'row'}>
						<Grid item xs={4}>
							<h4 style={subHeader}>İl Adı: </h4>
						</Grid>
						<Grid item xs={8} style={gridStyle}>
							<span style={spanStyle}>{product ? product.ilAdi : null}</span>
						</Grid>
					</Grid>
					<Grid container spacing={8} alignItems={'center'} direction={'row'}>
						<Grid item xs={4}>
							<h4 style={subHeader}>İlçe Adı: </h4>
						</Grid>
						<Grid item xs={8} style={gridStyle}>
							<span style={spanStyle}>{product ? product.ilceAdi : null}</span>
						</Grid>
					</Grid>
					<Grid container spacing={8} alignItems={'center'} direction={'row'}>
						<Grid item xs={4}>
							<h4 style={subHeader}>Tedarikçi Tel no: </h4>
						</Grid>
						<Grid item xs={8} style={gridStyle}>
							<span style={spanStyle}>{product ? product.telNo : null}</span>
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
	},
	gridStyle: {
		overflow: 'hidden', 
		'wordBreak': 'break-all'
	},
	spanStyle: {
        fontWeight: '400'
    }
};
