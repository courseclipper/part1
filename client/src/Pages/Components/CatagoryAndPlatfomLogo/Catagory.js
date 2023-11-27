/* eslint-disable no-unused-vars */
import React, { useEffect, useCallback, useState } from 'react';
import '../CatagoryAndPlatfomLogo/Catagory.css';
import Axios from 'axios';
import Button from '@mui/material/Button';
import { Divider } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { useCategory } from '../../../context/CategoryContext';
import { usePlatform } from '../../../context/PlatFormContext';
import Navbar from '../../Navbar';
import { useNavigate } from 'react-router';

function Catagory() {
	const [isAddCatagoryOpen, setIsAddCatagoryOpen] = useState(false);
	const handleOpenAddCatagory = () => setIsAddCatagoryOpen(true);
	const handleCloseAddCatagory = () => setIsAddCatagoryOpen(false);
	const navigate = useNavigate();
	const [isCatagoryDelete, setCatagoryDelete] = useState(false);
	const handleOpenCatagoryDelete = () => setCatagoryDelete(true);
	const handleCloseCatagoryDelete = () => setCatagoryDelete(false);

	const [isPlatformOpen, setIsPlatformOpen] = useState(false);
	const handleOpenAddPlatformLogo = () => setIsPlatformOpen(true);
	const handleCloseAddPlatformLogo = () => setIsPlatformOpen(false);

	const [isLogoDeleteOpen, setIsLogoDeleteOpen] = useState(false);
	const handleOpenDeleteLogo = () => setIsLogoDeleteOpen(true);
	const handleCloseDeleteLogo = () => setIsLogoDeleteOpen(false);

	const [category, setCategory] = useState([]);
	const { addCat, deleteCat, Categories } = useCategory();

	const [platform, setPlatform] = useState([]);
	const { addplatform, deleteplatform, Platforms } = usePlatform();

	const [platformName, setplatformName] = useState('');
	const [platformUrl, setplatformUrl] = useState('');

	const OnDeleteCatHandler = async (event, cat) => {
		event.preventDefault();
		try {
			const response = await axios.delete(
				`https://course-clipper.onrender.com/category/delete/${cat.name}`
			);
			if (response.statusText === 'OK') {
				deleteCat(cat);
				window.location.reload();
			}
		} catch (err) {
			console.log(err);
		}
	};
	const navReview = () => {
		navigate('/admin');
	};
	const AddCategoryHandler = async (e) => {
		e.preventDefault();
		try {
			const data = {
				category: category,
			};
			const requestOptions = {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(data),
			};
			console.log(requestOptions);
			const response = await axios.get(
				'https://course-clipper.onrender.com/category',
				requestOptions
			);
			const data_res = await response.json();
			console.log(data_res);
			if (response.ok) {
				console.log(1);
				addCat(category, data_res._id);
				handleCloseAddCatagory();
			} else {
				console.log(2);
				console.log('CANT SENT CATEGORY');
			}
		} catch (err) {
			console.log(err);
		}
	};

	const PlatformAddHandler = async (e) => {
		e.preventDefault();
		try {
			const data_platform = {
				name: platformName,
				url: platformUrl,
			};
			console.log(data_platform);
			const response = await axios.post(
				'https://course-clipper.onrender.com/platform',
				data_platform
			);
			if (response.statusText == 'OK') {
				addplatform(
					data_platform.name,
					data_platform.url,
					response.data.Platform._id
				);
				handleCloseAddPlatformLogo();
				window.location.reload();
			}
		} catch (err) {
			console.log(err);
		}
	};

	const PlatformDeleteHandler = async (e, name_plat) => {
		e.preventDefault();
		try {
			const response_del = await axios.delete(
				`https://course-clipper.onrender.com/platform/${name_plat}`
			);
			if (response_del.statusText == 'OK') {
				deleteplatform(name_plat);
				window.location.reload();
			}
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		axios
			.get('https://course-clipper.onrender.com/category')
			.then((response) => {
				setCategory(response.data.Categories);
			})
			.catch((error) => {
				console.log(error);
			});

		axios
			.get('https://course-clipper.onrender.com/platform')
			.then((response) => {
				console.log(response.data.Platforms);
				setPlatform(response.data.Platforms);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	const handleCloseCategory = (event) => {
		event.preventDefault();
	};

	return (
		<>
			<Navbar />
			<div className="main-catag">
				<div className="cata-logo">
					<div className="catagory">
						<div className="cata-btn">
							<Button onClick={handleOpenAddCatagory} variant="contained">
								Add Category
							</Button>
						</div>

						<Divider style={{ marginTop: '5px' }}></Divider>

						<div>
							<ul>
								{category?.map((data, id) => {
									return (
										<div>
											<div className="categoryNamesMine">
												<li key={id} className="listNamesMine">
													{data.name}
												</li>

												<DeleteIcon
													onClick={(e) => OnDeleteCatHandler(e, data)}
													className="del-cata"
													style={{
														color: 'red',
														fontSize: '1.35rem',
														borderRadius: '5px',
														marginLeft: '10px',
														verticalAlign: 'bottom',
													}}
												/>
											</div>
											<Divider style={{ marginTop: '5px' }}></Divider>
										</div>
									);
								})}
							</ul>
						</div>
					</div>
				</div>

				<div className="logo-logo">
					<div className="logo row">
						<div className="col-6">
							<div className="cata-btn">
								<Button
									onClick={() => {
										handleOpenAddPlatformLogo();
									}}
									variant="contained"
								>
									Add Platform Logo
								</Button>
							</div>
						</div>
						<div className="col-6">
							<div className="cata-btn">
								<Button onClick={navReview} variant="contained">
									Edit Review
								</Button>
							</div>
						</div>
						<Divider style={{ marginTop: '5px' }}></Divider>

						<div className="cata-list">
							{platform?.map((plat, id) => (
								<div className="log-div" key={id}>
									<img src={plat.url} alt="platform-logo" />
									<DeleteIcon
										onClick={(e) => {
											PlatformDeleteHandler(e, plat.name);
										}}
										className="del-cata"
										style={{
											color: 'red',
											fontSize: '1.35rem',
											borderRadius: '5px',
											marginLeft: '10px',
											verticalAlign: 'bottom',
										}}
									/>
									<span>{plat.name}</span>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>

			{/* add catagory dialog */}
			<Dialog
				open={isAddCatagoryOpen}
				onClose={handleCloseAddCatagory}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box
					className="dialog-box-ad"
					style={{ width: '380px', height: '200px', paddingTop: '25px' }}
				>
					<div className="main-div-dialog-ad">
						<Typography
							style={{
								marginBottom: '25px',
								fontSize: '1.3rem',
								textAlign: 'center',
							}}
						>
							Do you want to add a catagory ?
						</Typography>
						<input
							type="text"
							placeholder="Enter Catagory"
							style={{
								width: '300px',
								margin: 'auto',
								height: '40px',
								borderRadius: '5px',
								fontSize: '18px',
								paddingLeft: '5px',
								border: '1px solid rgb(184, 180, 180)',
							}}
							// onChange={(e) => setCategory(e.target.value)}
						/>
						<div style={{ textAlign: 'center', marginTop: '20px' }}>
							<Button
								onClick={handleCloseAddCatagory}
								variant="outlined"
								sx={{
									backgroundColor: '#ffff',
									color: 'black',
									width: '50px',
									marginRight: '20px',
								}}
							>
								Cancel
							</Button>
							<Button
								onClick={AddCategoryHandler}
								variant="contained"
								sx={{ backgroundColor: '#0bb980', width: '50px' }}
							>
								Add
							</Button>
						</div>
					</div>
				</Box>
			</Dialog>

			{/* delete catagory */}
			<Dialog
				open={isCatagoryDelete}
				onClose={handleCloseCatagoryDelete}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box
					className="dialog-box-ad"
					style={{ width: '380px', height: '160px', paddingTop: '25px' }}
				>
					<div className="main-div-dialog-ad">
						<Typography
							style={{
								marginBottom: '25px',
								fontSize: '1.3rem',
								textAlign: 'center',
							}}
						>
							Are you sure, you want to delete the catagory?
						</Typography>
						<div style={{ textAlign: 'center' }}>
							<Button
								onClick={handleCloseCatagoryDelete}
								variant="outlined"
								sx={{
									backgroundColor: '#ffff',
									color: 'black',
									width: '50px',
									marginRight: '20px',
								}}
							>
								Cancel
							</Button>
							<Button
								onClick={() => {
									handleCloseCatagoryDelete();
								}}
								variant="contained"
								sx={{ backgroundColor: 'red', width: '50px' }}
							>
								Delete
							</Button>
						</div>
					</div>
				</Box>
			</Dialog>

			{/* add platform logo */}
			<Dialog
				open={isPlatformOpen}
				onClose={handleCloseAddPlatformLogo}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box
					className="dialog-box-ad"
					style={{ width: '380px', height: '250px', paddingTop: '25px' }}
				>
					<div className="main-div-dialog-ad">
						<Typography
							style={{
								marginBottom: '25px',
								fontSize: '1.3rem',
								textAlign: 'center',
							}}
						>
							Enter Platform logo's Url
							<input
								type="text"
								placeholder="Enter platform name... ex-udemy,pluralsight..."
								style={{
									width: '300px',
									margin: 'auto',
									height: '40px',
									borderRadius: '5px',
									paddingLeft: '5px',
									border: '1px solid rgb(184, 180, 180)',
									marginTop: '20px',
								}}
								onChange={(e) => {
									setplatformName(e.target.value);
								}}
							/>
							<input
								type="text"
								placeholder="Enter Logo's Url"
								style={{
									width: '300px',
									margin: 'auto',
									height: '40px',
									borderRadius: '5px',
									paddingLeft: '5px',
									border: '1px solid rgb(184, 180, 180)',
									marginTop: '20px',
								}}
								onChange={(e) => {
									setplatformUrl(e.target.value);
								}}
							/>
						</Typography>
						<div style={{ textAlign: 'center' }}>
							<Button
								onClick={handleCloseAddPlatformLogo}
								variant="outlined"
								sx={{
									backgroundColor: '#ffff',
									color: 'black',
									width: '50px',
									marginRight: '20px',
								}}
							>
								Cancel
							</Button>
							<Button
								onClick={PlatformAddHandler}
								variant="contained"
								sx={{ backgroundColor: 'red', width: '50px' }}
							>
								Add
							</Button>
						</div>
					</div>
				</Box>
			</Dialog>

			{/* delete logo */}
			<Dialog
				open={isLogoDeleteOpen}
				onClose={handleCloseDeleteLogo}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box
					className="dialog-box-ad"
					style={{ width: '380px', height: '160px', paddingTop: '25px' }}
				>
					<div className="main-div-dialog-ad">
						<Typography
							style={{
								marginBottom: '25px',
								fontSize: '1.3rem',
								textAlign: 'center',
							}}
						>
							Are you sure, you want to delete the logo ?
						</Typography>
						<div style={{ textAlign: 'center' }}>
							<Button
								onClick={handleCloseDeleteLogo}
								variant="outlined"
								sx={{
									backgroundColor: '#ffff',
									color: 'black',
									width: '50px',
									marginRight: '20px',
								}}
							>
								Cancel
							</Button>
							<Button
								onClick={() => {
									handleCloseDeleteLogo();
								}}
								variant="contained"
								sx={{ backgroundColor: 'red', width: '50px' }}
							>
								Delete
							</Button>
						</div>
					</div>
				</Box>
			</Dialog>
		</>
	);
}

export default Catagory;
