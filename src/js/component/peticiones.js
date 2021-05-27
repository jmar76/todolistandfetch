import React, { useState, useEffect } from "react";
import "../../styles/peticiones.scss";

function Form() {
	const [oneTask, setOneTask] = useState("");
	const [tasks, setTasks] = useState([]);
	const [vuelta, setVuelta] = useState([]);
	const [avisopost, setavisoPost] = useState("");
	const [avisoput, setavisoPut] = useState("");
	const [avisoget, setavisoGet] = useState("");
	const [avisodelete, setavisoDelete] = useState("");

	const comenzar = () => {
		location.reload();
	};

	// useEffect(() => {

	// }, [comenzar()]);

	const handleClick = () => {
		let newArray = [...tasks, { label: oneTask, done: false }];

		setTasks(newArray);
		setOneTask("");
	};
	let respuestaGET = false;
	const getTasks = () => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/otrousuario", {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(response => {
				// console.log(response.ok); // Será true (verdad) si la responseuesta es exitosa.
				// console.log(response.status); // el código de estado = 200 o código = 400 etc.
				// // console.log(response.text()); // Intentará devolver el resultado exacto como cadena (string)
				// console.log("perfect");
				respuestaGET = response.ok;
				return response.json(); // (regresa una promesa) will try to parse the result as json as return a promise that you can .then for results
			})
			.then(body => {
				//Aquí es donde debe comenzar tu código después de que finalice la búsqueda
				setVuelta(body); //esto imprimirá en la consola el objeto exacto recibido del servidor
				if (respuestaGET) {
					setavisoGet(
						<div className="alert alert-primary" role="alert">
							<strong>4º Paso realizado correctamente!</strong>
						</div>
					);
				}
			})
			.catch(error => {
				//manejo de errores
				console.log(error);
			});
	};
	let respuestaPUT = false;
	const updateTasks = () => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/otrousuario", {
			method: "PUT",
			body: JSON.stringify(tasks),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(response => {
				respuestaPUT = response.ok;
				return response.json(); // (regresa una promesa) will try to parse the result as json as return a promise that you can .then for results
			})
			.then(body => {
				if (respuestaPUT) {
					setavisoPut(
						<div className="alert alert-success" role="alert">
							<strong>3º Paso realizado correctamente!</strong>
						</div>
					);
				}
			})
			.catch(error => {
				//manejo de errores
				console.log(error);
			});
	};
	let respuestaDELETE = false;
	const deleteTasks = () => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/otrousuario", {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(response => {
				respuestaDELETE = response.ok;
				return response.json(); // (regresa una promesa) will try to parse the result as json as return a promise that you can .then for results
			})
			.then(borrar => {
				if (respuestaDELETE) {
					setavisoDelete(
						<div className="alert alert-danger" role="alert">
							<strong>
								Las tareas se han eliminado correctamente en la
								API, FELICIDADES ya has terminado el proceso!,
								pulsa el botón refresh!
							</strong>
						</div>
					);
				}
			})
			.catch(error => {
				console.log(error);
			});
	};
	let respuestaPOST = false;
	const postTasks = () => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/otrousuario", {
			method: "POST",
			body: JSON.stringify([]),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(response => {
				respuestaPOST = response.ok;
				return response.json(); // (regresa una promesa) will try to parse the result as json as return a promise that you can .then for results
			})
			.then(body => {
				if (respuestaPOST) {
					setavisoPost(
						<div className="alert alert-warning" role="alert">
							<strong>1º Paso realizado correctamente!</strong>
						</div>
					);
				}
			})
			.catch(error => {
				console.log(error);
			});
	};

	const DeleteItems = indexItem => {
		setVuelta(allTasks =>
			allTasks.filter(
				(elementoActualQueEstaSiendoProcesado, index) =>
					index !== indexItem
			)
		);
	};
	return (
		<div className="container">
			<div className="row">
				<div className="col-md-3 back mt-5 mr-2">
					<p id="usuario">
						Sincronizaremos nuestra lista de tareas con una base de
						datos real, usando RESTful y API pública.{" "}
						<strong>
							Paralelamente hay que ir comprobando cada paso con
							Postman o con Insomnia, se recomienda
							encarecidamente ir probando la API para comprender
							cada paso.
						</strong>
					</p>
				</div>
				<div className="col-md-4 back mt-5 mr-2">
					<h3 id="contador">
						{" "}
						<strong>Tasks Counter:</strong> {vuelta.length}{" "}
					</h3>
					<div className="centrado">
						<img
							id="imagen"
							src="https://images.vexels.com/media/users/3/188440/isolated/preview/9bfb7eb95c20ea34b6c1c3d06a422773-lindo-robot-mega-man-cortado-negro-by-vexels.png"
							height="200px"
							width="190px"
							className="justify-content-center"
						/>
						<img
							id="imagen"
							src="https://images.vexels.com/media/users/3/188435/isolated/preview/29bf95474ecfaf55d611ab99b337457e-lindo-robot-muerto-cortado-negro-by-vexels.png"
							height="200px"
							width="190px"
							className="justify-content-center"
						/>
					</div>
				</div>
				<div className="col-md-4 back mt-5 ">
					<img
						id="imagen"
						src="http://assets.stickpng.com/thumbs/580b57fbd9996e24bc43bdfc.png"
						height="200px"
						width="220px"
						className="mt-3 pl-4 ml-5"
					/>
					<button
						// id="botonFecth"
						className="btn refresh btn-warning"
						onClick={() => comenzar()}>
						<strong className="pl-5 pr-5">Refresh!</strong>
					</button>
				</div>
			</div>

			<div className="row">
				<div className="col-lg-4 back mt-2 mb-5 mr-2">
					<p className="tarea pt-5">
						<strong> Introduce tus Tareas</strong>{" "}
					</p>
					<div className="col-md-12">
						<input
							placeholder="introduce tus tareas"
							className="form-control"
							type="text"
							value={oneTask}
							onChange={event => {
								setOneTask(event.target.value);
							}}
						/>
					</div>
					<br></br>
					<div className="col-md-4">
						<div className="column">
							<div className="contenedorBoton">
								{!avisopost ? (
									<button
										id="botonFecth"
										className="btn btn-warning"
										onClick={() => postTasks()}>
										<strong>method / POST</strong>
									</button>
								) : (
									avisopost
								)}
							</div>
							<br></br>
							<div className="contenedorBoton">
								<button
									id="boton"
									className="btn btn-dark"
									onClick={() => handleClick()}>
									<strong>addTasks</strong>
								</button>
							</div>
							<br></br>

							<div className="contenedorBoton">
								{!avisoput ? (
									<button
										id="botonFecth"
										className="btn btn-success"
										onClick={() => updateTasks()}>
										<strong>method / PUT</strong>
									</button>
								) : (
									avisoput
								)}
							</div>
							<br></br>

							<div className="contenedorBoton">
								{!avisoget ? (
									<button
										id="botonFecth"
										className="btn btn-primary"
										onClick={() => getTasks()}>
										<strong>method / GET</strong>
									</button>
								) : (
									avisoget
								)}
							</div>
							<br></br>

							<div className="contenedorBoton5">
								{!avisodelete ? (
									<button
										id="botonFecth"
										className="btn btn-danger mb-5"
										onClick={() => deleteTasks()}>
										<strong>method / DELETE</strong>
									</button>
								) : (
									avisodelete
								)}
							</div>
						</div>
					</div>
				</div>
				<div className="col-lg-4 back mt-2 mb-5 mr-2">
					<h5>
						<strong> Instrucciones:</strong>{" "}
					</h5>
					{!avisopost ? (
						<p>
							<strong className="text-primary">
								Primer paso:{" "}
							</strong>{" "}
							pulsa Method/POST, este método es solo para la
							creación, pasará un arreglo vacío en el cuerpo a la
							API porque aún no hay tareas.{" "}
							<strong>Comprobar en Insomnia.</strong>
						</p>
					) : (
						<p>
							<strong className="text-primary">
								Primer paso:{" "}
							</strong>{" "}
							pulsa Method/POST, este método es solo para la
							creación, pasará un arreglo vacío en el cuerpo a la
							API porque aún no hay tareas.{" "}
							<strong>Comprobar en Insomnia.</strong>
							<br></br>
							<br></br>
							<strong className="text-primary">
								{" "}
								Segundo paso:{" "}
							</strong>{" "}
							escribe tus tareas, las tareas se irán añadiendo en
							un nuevo arreglo, recuerda ir pulsando AddTasks para
							añadirlas.{" "}
						</p>
					)}

					{tasks.length >= 1 ? (
						<p>
							<strong className="text-primary">
								Tercer paso:{" "}
							</strong>{" "}
							una vez introducidas todas las tareas pulsa
							Method/PUT, este paso realizará un Fecth que se
							comunicará con la API actualizándola con las nuevas
							tareas introducidas.{" "}
							<strong>Comprobar en Insomnia.</strong>
						</p>
					) : (
						""
					)}
					{avisoput ? (
						<p>
							<strong className="text-primary">
								Cuarto paso:{" "}
							</strong>{" "}
							Ahora ya tenemos actualizada la API, pulsa
							Method/GET para obtener la info de la API, nos
							traerá a nuestra página las tareas almacenadas en la
							API. <strong>Comprobar en Insomnia.</strong>
						</p>
					) : (
						""
					)}
					{avisoget ? (
						<p>
							<strong className="text-primary">
								Quinto paso:{" "}
							</strong>{" "}
							pulsar Method/DELETE, este paso eliminará todas las
							tareas de la API, concluyendo el proceso!{" "}
							<strong>Comprobar en Insomnia.</strong>
						</p>
					) : (
						""
					)}
				</div>
				<div className="col-lg-3 back mt-2 mb-5">
					<table id="tabla" className="table table-striped ">
						<thead>
							<tr>
								<th scope="col-md-12"></th>
							</tr>
						</thead>

						<tbody>
							<tr>
								<h2>Tareas API</h2>
								{vuelta.map((task, index) => (
									<tr key={index}>
										{/* <td scope="row">
											<input type="checkbox" />
										</td> */}
										<td>{task.label}</td>
										<td>
											<button
												className="btn"
												onClick={() =>
													DeleteItems(index)
												}>
												<i className="fas fa-backspace" />
											</button>
										</td>
									</tr>
								))}
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			<div className="row">
				<div className="col-lg-4 bg-success">
					<div />
				</div>
				<div className="col-lg-4 bg-warning"></div>
			</div>
		</div>
	);
}
export default Form;
