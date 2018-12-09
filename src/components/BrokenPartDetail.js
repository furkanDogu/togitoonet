import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

export default ({ isOpen, onClose, product }) => {
	const { header, subHeader, spanStyle } = styles;
	return (
		<Modal
			style={{ marginTop: 70 }}
			show={isOpen}
			onHide={() => onClose()}
			container={this}
			aria-labelledby="contained-modal-title"
		>
			<Modal.Body style={{ fontSize: 20 }}>
				<Grid container spacing={8} alignItems={'center'} direction={'row'} justify={'space-between'}>
					<Grid item>
						<h3 style={header}>Arızalı Ürün Bilgileri</h3>
					</Grid>
					<Grid item>
						<h3>{product ? 'B-' + product.bilesenID : null}</h3>
					</Grid>
				</Grid>
				<Divider />
                <Grid container spacing={8} alignItems={'center'} direction={'row'}>
					<Grid item xs={4}>
						<h4 style={subHeader}>Model:  </h4>
					</Grid>
					<Grid item xs={8} style={{ overflow: 'hidden', 'wordBreak': 'break-all'}}>
						<span style={spanStyle}>{product ? product.bilesenAdi : null}</span>
					</Grid>
				</Grid>
                <Grid container spacing={8} alignItems={'center'} direction={'row'}>
					<Grid item xs={4}>
                        <h4 style={subHeader}>Marka: </h4>
					</Grid>
					<Grid item xs={8} style={{ overflow: 'hidden', 'wordBreak': 'break-all'}}>
						<span style={spanStyle}>{product ? product.markaAdi : null}</span>
					</Grid>
				</Grid>
                <Grid container spacing={8} alignItems={'center'} direction={'row'}>
					<Grid item xs={4}>
                    <h4 style={subHeader}>Kategori: </h4>
					</Grid>
					<Grid item xs={8} style={{ overflow: 'hidden', 'wordBreak': 'break-all'}}>
						<span style={spanStyle}>{product ? product.kategoriAdi : null}</span>
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
						<h4 style={subHeader}>Satın Alma Tarihi: </h4>
					</Grid>
					<Grid item xs={8}>
						<span style={spanStyle}>{product ? product.satinAlmaTarihi : null}</span>
					</Grid>
				</Grid>
                <Grid container spacing={8} alignItems={'center'} direction={'row'}>
					<Grid item xs={4}>
						<h4 style={subHeader}>Arıza Tarihi: </h4>
					</Grid>
					<Grid item xs={8}>
						<span style={spanStyle}>{product ? product.arizaTarihi : null}</span>
					</Grid>
				</Grid>
                <Grid container spacing={8} alignItems={'center'} direction={'row'}>
					<Grid item xs={4}>
                    <h4 style={subHeader}>En son kullanan kişi: </h4>
					</Grid>
					<Grid item xs={8} style={{ overflow: 'hidden', 'wordBreak': 'break-all'}}>
						<span style={spanStyle}>{product ? product.personelAdi : null}</span>
					</Grid>
				</Grid>
                <Grid container spacing={8} alignItems={'center'} direction={'row'}>
					<Grid item xs={4}>
						<h4 style={subHeader}>Arıza Açıklaması: </h4>
					</Grid>
					<Grid item xs={8} style={{ overflow: 'hidden', 'wordBreak': 'break-all'}}>
						<span style={spanStyle}>{product ? product.aciklama : null}</span>
					</Grid>
				</Grid>
                <Grid container spacing={8} alignItems={'center'} direction={'row'} justify={'space-between'}>
					<Grid item>
						<h3 style={header}>Tedarikçi Bilgileri</h3>
					</Grid>
				</Grid>
				<Divider />
                <Grid container spacing={8} alignItems={'center'} direction={'row'}>
					<Grid item xs={4}>
                    <h4 style={subHeader}>Tedarikçi Adı: </h4>
					</Grid>
					<Grid item xs={8} style={{ overflow: 'hidden', 'wordBreak': 'break-all'}}>
						<span style={spanStyle}>{product ? product.tedarikciAdi : null}</span>
					</Grid>
				</Grid>
                <Grid container spacing={8} alignItems={'center'} direction={'row'}>
					<Grid item xs={4}>
                    <h4 style={subHeader}>İl: </h4>
					</Grid>
					<Grid item xs={8} style={{ overflow: 'hidden', 'wordBreak': 'break-all'}}>
						<span style={spanStyle}>{product ? product.ilAdi : null}</span>
					</Grid>
				</Grid>
                <Grid container spacing={8} alignItems={'center'} direction={'row'}>
					<Grid item xs={4}>
                        <h4 style={subHeader}>İlçe: </h4>
					</Grid>
					<Grid item xs={8} style={{ overflow: 'hidden', 'wordBreak': 'break-all'}}>
						<span style={spanStyle}>{product ? product.ilceAdi : null}</span>
					</Grid>
				</Grid>
                <Grid container spacing={8} alignItems={'center'} direction={'row'}>
					<Grid item xs={4}>
                    <h4 style={subHeader}>Tel No: </h4>
					</Grid>
					<Grid item xs={8} style={{ overflow: 'hidden', 'wordBreak': 'break-all'}}>
						<span style={spanStyle}>{product ? product.telNo : null}</span>
					</Grid>
				</Grid>
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={() => onClose()}>Kapat</Button>
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
    spanStyle: {
        fontWeight: '400'
    }
};
