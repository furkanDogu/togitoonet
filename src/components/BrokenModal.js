import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import { FormGroup, Radio } from 'react-bootstrap';
import ErrorModal from './ErrorModal';

export default class BrokenModal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
            chosen: null, // will be hold chosen all in one pc component
            desc: '', // error description for broken part
            errorModalOpen: false,
            errorMessage: '' 
		};
		this.handleChange = this.handleChange.bind(this);
        this.handleBrokenClick = this.handleBrokenClick.bind(this);
        this.handleErrorModal = this.handleErrorModal.bind(this);
    }
    // just responsible for showing or hiding the error modal
    handleErrorModal() {
        this.setState(state => ({ errorModalOpen: !state.errorModalOpen }));
    }
    // this function will handle inputs that are coming from radio buttons and text area.
    // it will differantiate actions by given parameter name
    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
    };
	handleBrokenClick(product) {
        if (product.Tip === 'Bileşen') {
           
            // check if description is empty
            // if it's not , call the function to add item to broken part list
            // it it is empty then show the error modal.
            if (this.state.desc) {
                this.props.onBroken(this.state.desc);
            } else {
                this.setState({ errorMessage: "Lütfen açıklama alanını doldurun" }, () => {
                    this.handleErrorModal();
                });
            }
        } else {
            // check if any all in one pc component is chosen 
            // if not show error modal 
            // else check if desc is empy
            // if not show error modal 
            // if passes 2 tests then call the function to add item to broken part list

            if (this.state.chosen) {
                if (this.state.desc) {
                    this.props.onBroken(this.state.desc,this.state.chosen);
                } else {
                    this.setState({ errorMessage: "Lütfen açıklama alanını doldurun" }, () => {
                        this.handleErrorModal();
                    });
                }
            } else {
                this.setState({ errorMessage: "Lütfen arızalı olan hazır pc parçasını seçin" }, () => {
                    this.handleErrorModal();
                });
            }

        }
    }
    // if we are showing all in one pc, we need to show its components with this render method.
	renderPcComponents(pcComponents) {
		const { component, subHeader } = styles;
		if (pcComponents) {
			return (
				<FormGroup onChange={this.handleChange('chosen')}>
					{pcComponents.map((comp, index) => {
						return (
							<div key={index} style={component}>
								<Grid container spacing={8} alignItems={'center'} direction={'row'}>
									<Grid item xs={4}>
										<h4 style={subHeader}>Model: </h4>
									</Grid>
									<Grid item xs={8}>
										<h4>{comp.bilesenAdi}</h4>
									</Grid>
								</Grid>
								<Grid container spacing={8} alignItems={'center'} direction={'row'}>
									<Grid item xs={4}>
										<h4 style={subHeader}>Kategori: </h4>
									</Grid>
									<Grid item xs={7}>
										<h4>{comp.kategoriAdi}</h4>
									</Grid>
									<Grid item xs={1}>
										<Radio name="radioGroup" value={comp.zimmetID} />
									</Grid>
								</Grid>
								<Grid container spacing={8} alignItems={'center'} direction={'row'}>
									<Grid item xs={4}>
										<h4 style={subHeader}>Marka: </h4>
									</Grid>
									<Grid item xs={8}>
										<h4>{comp.markaAdi}</h4>
									</Grid>
								</Grid>
							</div>
						);
					})}
				</FormGroup>
			);
		}
	}
    // since all in one pc and basic component has different attributes for names, we need to determine which one to render
	renderProductName(product) {
		if (product.Tip === 'Bileşen') {
			return product.bilesenAdi;
		} else {
			return product.pcAdi;
		}
	}
    // we need to add prefix for ID depending on product type 
	modifyID(product) {
		if (product) {
			return product.Tip === 'Bileşen' ? 'B-' + product.bilesenID : 'P-' + product.pcID;
		}
		return null;
    }
    // main context that will show information about the product
	renderContext(product, pcComponents) {
		const { header, subHeader } = styles;
		if (product) {
			return (
				<div>
					<Grid container spacing={8} alignItems={'center'} direction={'row'} justify={'space-between'}>
						<Grid item>
							<h3 style={header}>Arızalı Ürün</h3>
						</Grid>
						<Grid item>
							<h3>{this.modifyID(product)}</h3>
						</Grid>
					</Grid>
					<Divider />
					<Grid container spacing={8} alignItems={'center'} direction={'row'}>
						<Grid item xs={4}>
							<h4 style={subHeader}>Model: </h4>
						</Grid>
						<Grid item xs={8}>
							<h4>{this.renderProductName(product)}</h4>
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
							<h4 style={subHeader}>Ürünün Zimmetlendiği Personel: </h4>
						</Grid>
						<Grid item xs={8}>
							<h4>{product.personelAdi}</h4>
						</Grid>
					</Grid>
					<Grid container spacing={8} alignItems={'center'} direction={'row'}>
						<Grid item xs={4}>
							<h4 style={subHeader}>Ürünün Zimmetlendiği Departman: </h4>
						</Grid>
						<Grid item xs={8}>
							<h4>{product.departmanAdi}</h4>
						</Grid>
					</Grid>
					<Grid container spacing={8} alignItems={'center'} direction={'row'}>
						<Grid item xs={4}>
							<h4 style={subHeader}>Zimmet Tarihi: </h4>
						</Grid>
						<Grid item xs={8}>
							<h4>{product.zimmetTarihi}</h4>
						</Grid>
					</Grid>
					{product ? (
						product.Tip === 'Hazir PC' ? (
							<Grid
								container
								spacing={8}
								alignItems={'center'}
								direction={'row'}
								justify={'space-between'}
							>
								<Grid item>
									<h3 style={header}>Arızalı Parçayı Seçin</h3>
								</Grid>
							</Grid>
						) : null
					) : null}
					{product ? (product.Tip === 'Hazir PC' ? this.renderPcComponents(pcComponents) : null) : null}
					<Grid container>
						<TextField
							fullWidth
							rows="4"
                            onChange={this.handleChange('desc')}
                            value={this.state.desc}
							label="Arıza tutanağı"
							placeholder="Bu ürün .... sebepten dolayı ..."
							multiline
							margin="normal"
							variant="outlined"
						/>
					</Grid>
				</div>
			);
		}
	}
	render() {
		const { isOpen, onClose, pcComponents, product } = this.props;
		return (
			<div className="modal-container">
				<Modal
					style={{ marginTop: 70 }}
					show={isOpen}
					onHide={() => onClose()}
					container={this}
					aria-labelledby="contained-modal-title"
				>
					{' '}
					<Modal.Body>{this.renderContext(product, pcComponents)}</Modal.Body>
					<Modal.Footer>
						<Button bsStyle="danger" onClick={() => this.handleBrokenClick(product)}>
							Arızalıya Çıkar
						</Button>
						<Button onClick={() => onClose()}>Kapat</Button>
					</Modal.Footer>
				</Modal>
                <ErrorModal
                    text={this.state.errorMessage}
                    isOpen={this.state.errorModalOpen}
                    onClose={this.handleErrorModal} 
                    header="Geçersiz Giriş"
                    renderOkayButton={false}
                />
			</div>
		);
	}
}
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
		padding: 5,
	},
};
