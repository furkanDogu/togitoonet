import React from 'react';
import { Modal, Button } from 'react-bootstrap';

export default ({ isOpen, onClose, product }) => {
	return (
		<Modal
			style={{ marginTop: 70 }}
			show={isOpen}
			onHide={onClose}
			aria-labelledby="contained-modal-title-lg"
		>
			<Modal.Header closeButton>
				<Modal.Title style={{ fontSize: 25 }} id="contained-modal-title-lg">{product ? "#"+product.bilesenID : null}</Modal.Title>
			</Modal.Header>
            
			<Modal.Body style={{ fontSize: 20 }}>
                <h4>Bileşen Modeli: {product ? product.bilesenAdi : null}</h4>
                <h4>Satın Alınma Tarihi: {product ? product.satinAlmaTarihi : null}</h4>
                <h4>Satın Alınan Adet {product ? product.satinAlinanAdet : null}</h4>
                <h4>Stok Miktarı: {product ? product.stokMiktari : null}</h4>
                <h4>Fiyat: {product ? product.fiyat +"₺" : null}</h4>
                <h4>Kategori Adı: {product ? product.kategoriAdi : null}</h4>
                <h4>Marka Adı: {product ? product.markaAdi : null}</h4>
                <h4>Tedarikçi Adı: {product ? product.tedarikciAdi : null}</h4>
                <h4>İlçe Adı: {product ? product.ilceAdi : null}</h4>
                <h4>İl Adı: {product ? product.ilAdi : null}</h4>
                <h4>Tip: {product ? product.Tip : null}</h4>

            </Modal.Body>
			<Modal.Footer>
				<Button bsStyle="danger" onClick={onClose}>Kapat</Button>
			</Modal.Footer>
		</Modal>
	);
};
