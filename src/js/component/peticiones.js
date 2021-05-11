import React, { useState, useEffect } from "react"; //Main React.js library
import "../../styles/peticiones.scss";

function Form() {
	const [oneTask, setOneTask] = useState("");
	const [tasks, setTasks] = useState([]);
	console.log(tasks);
	useEffect(() => {
		alert("Introduce en la lista las tareas a realizar, gracias.");
	}, []);

	const handleClick = () => {
		// console.log(oneTask);
		let newArray = tasks;

		newArray.push(oneTask);
		setTasks(newArray);
		setOneTask("");
	};
	const hacerFetch = () => {
		fetch(
			"http://assets.breatheco.de/apis/fake/todos/user/usuariocualquiera",
			{
				method: "POST",
				body: JSON.stringify(tasks),
				headers: {
					"Content-Type": "application/json"
				}
			}
		)
			.then(resp => {
				console.log(resp.ok); // Será true (verdad) si la respuesta es exitosa.
				console.log(resp.status); // el código de estado = 200 o código = 400 etc.
				console.log(resp.text()); // Intentará devolver el resultado exacto como cadena (string)
				console.log("perfect");
				return resp.json(); // (regresa una promesa) will try to parse the result as json as return a promise that you can .then for results
			})
			.then(data => {
				//Aquí es donde debe comenzar tu código después de que finalice la búsqueda
				console.log(data); //esto imprimirá en la consola el objeto exacto recibido del servidor
			})
			.catch(error => {
				//manejo de errores
				console.log(error);
			});
	};

	const DeleteItems = indexItem => {
		setTasks(allTasks =>
			allTasks.filter(
				(elementoActualQueEstaSiendoProcesado, index) =>
					index !== indexItem
			)
		);
	};
	return (
		<div className="container">
			<div className="row">
				<div className="col-lg-4">
					<h1 id="usuario">Usuario: XJML-5</h1>
				</div>
				<div className="col-lg-4">
					<h3 id="contador"> {tasks.length} </h3>
				</div>

				<div className="col-lg-4"></div>
			</div>

			<div className="row">
				<div className="col-lg-4">
					<h3 id="tarea">Tareas </h3>
					<div className="col-md-12">
						<input
							placeholder="introduce datos"
							className="form-control"
							type="text"
							value={oneTask}
							onChange={event => {
								setOneTask(event.target.value);
							}}
						/>
					</div>
					<br></br>
					<div className="col-md-3">
						{/* {" "} */}
						<button
							id="boton"
							className="btn btn-dark"
							onClick={() => handleClick()}>
							addTasks
						</button>
						<br></br>
						<br></br>
						<button
							id="botonFecth"
							className="btn btn-danger"
							onClick={() => hacerFetch()}>
							hacer fecth
						</button>
					</div>
				</div>
				<div className="col-lg-4">
					<img
						id="imagen"
						src="https://focaclipart.files.wordpress.com/2015/02/robot_vector_bn.png"
					/>
				</div>
				<div className="col-lg-4">
					<table id="tabla" className="table table-striped ">
						<thead>
							<tr>
								<th scope="col-md-12"></th>
							</tr>
						</thead>

						<tbody>
							<tr>
								{tasks.map((task, index) => (
									<tr key={index}>
										<td scope="row">
											<input type="checkbox" />
										</td>
										<td>{task}</td>
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
