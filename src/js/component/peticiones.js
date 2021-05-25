import React, { useState, useEffect } from "react";
import "../../styles/peticiones.scss";

function Form() {
	const [oneTask, setOneTask] = useState("");
	const [tasks, setTasks] = useState([]);
	const [vuelta, setVuelta] = useState([]);

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
					alert(
						"El método GET se ha realizado correctamente!, comprueba que se han impreso correctamente las tareas en nuestra página y, continúa con el paso 5."
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
					alert(
						"El método PUT se ha realizado correctamente!, compruébalo en Insomnia y continúa con el Paso 4."
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
					alert(
						"El método DELETE se ha realizado correctamente!, comprueba en Insomnia que se han borrado todas las tareas."
					);
				}
			})
			.catch(error => {
				console.log(error);
			});
	};
	let respuestaGet = false;

	const postTasks = () => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/otrousuario", {
			method: "POST",
			body: JSON.stringify([]),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(response => {
				respuestaGet = response.ok;
				return response.json(); // (regresa una promesa) will try to parse the result as json as return a promise that you can .then for results
			})
			.then(body => {
				if (respuestaGet) {
					alert(
						"El método POST se ha realizado correctamente!, compruébalo en Insomnia y continúa con el siguiente Paso."
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
							src="http://assets.stickpng.com/images/580b57fbd9996e24bc43be03.png"
							height="200px"
							width="150px"
							className="justify-content-center"
						/>
						<img
							id="imagen"
							src="https://images.vexels.com/media/users/3/188435/isolated/preview/29bf95474ecfaf55d611ab99b337457e-lindo-robot-muerto-cortado-negro-by-vexels.png"
							height="200px"
							width="150px"
							className="justify-content-center"
						/>
					</div>
				</div>
				<div className="col-md-4 back mt-5">
					<p>
						<strong>AVISOS</strong>
					</p>
					{/* {respuestaGet ? Alert : ""} */}
				</div>
			</div>

			<div className="row">
				<div className="col-lg-3 back mt-2 mb-5 mr-2">
					<h3 id="tarea pt-2">Tareas </h3>
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
						<button
							id="boton"
							className="btn btn-dark"
							onClick={() => handleClick()}>
							<strong>addTasks</strong>
						</button>
						<br></br>
						<br></br>
						<button
							id="botonFecth"
							className="btn btn-warning"
							onClick={() => postTasks()}>
							<strong>method / POST</strong>
						</button>
						<br></br>
						<br></br>
						<button
							id="botonFecth"
							className="btn btn-success"
							onClick={() => updateTasks()}>
							<strong>method / PUT</strong>
						</button>
						<br></br>
						<br></br>
						<button
							id="botonFecth"
							className="btn btn-primary"
							onClick={() => getTasks()}>
							<strong>method / GET</strong>
						</button>
						<br></br>
						<br></br>
						<button
							id="botonFecth"
							className="btn btn-danger mb-3"
							onClick={() => deleteTasks()}>
							<strong>method / DELETE</strong>
						</button>
					</div>
				</div>
				<div className="col-lg-4 back mt-2 mb-5 mr-2">
					<p>
						<strong> Instrucciones:</strong>{" "}
					</p>
					<p>
						<strong>Primer paso: </strong> pulsa Method/POST, este
						método es solo para la creación, pasará un arreglo vacío
						en el cuerpo a la API porque aún no hay tareas.{" "}
						<strong>Comprobar en Insomnia.</strong>
					</p>
					<p>
						<strong>Segundo paso: </strong> escribe una o varias
						tareas y pulsa el botón AddTasks, las tareas se
						incluirán en un nuevo arreglo.{" "}
					</p>
					<p>
						<strong>Tercer paso: </strong> pulsa Method/PUT, este
						paso realiza un Fecth, se comunica con la API
						actualizándola con las nuevas tareas del nuevo arreglo.{" "}
						<strong>Comprobar en Insomnia.</strong>
					</p>
					<p>
						<strong>Cuarto paso: </strong> pulsa Method/GET, este
						paso realiza un Fecth, se comunica con la API solo para
						obtener la info de la API, nos traerá a nuestra página
						las tareas almacenadas en la API.{" "}
						<strong>Comprobar en Insomnia.</strong>
					</p>
					<p>
						<strong>Quinto paso: </strong> pulsar Method/DELETE,
						este paso realiza un Fecth, se comunica con la API para
						borrar todas las tareas.{" "}
						<strong>Comprobar en Insomnia.</strong>
					</p>
				</div>
				<div className="col-lg-4 back mt-2 mb-5">
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
										<td scope="row">
											<input type="checkbox" />
										</td>
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
