import React, { useState, useRef, useEffect } from 'react'; //llamamos a las funciones que vamos
															// a utilizar
import TareaList from './components/TareaList';	//llamamos al componente que nos rellena
												// la lista de tareas que queremos
import {v4 as uuidv4} from 'uuid';	//crea id's randomizadas

const LOCAL_STORAGE_KEY = 'tareasApp.tareas'; //nombre de la variable en el local storage

function App() {
	const [tareas, setTarea] = useState([]);	//tareas: estado actual
												//setTarea: funcion que añade datos al estado
												//useState: un "React hook", su funcion es añadir un
												// estado variable a un componente, el parametro
												// a recibir es el valor inicial, en este caso
												// un array vacio
	const tareaNameRef = useRef();				//todo: explain useRef: "React hook" como que guarda el valor del tag

	useEffect( () => {							//todo useRef: "React hook"
		const tareasAlmacenadas = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));	//guarda los datos del
												// localStorage, que son recibidos en formato JSON, y el parse es
												//  porque es necesario para los arrays (no se puede usar arrays sin).
		if (tareasAlmacenadas) {				//"Si hay algo guardado de antes
			setTarea(tareasAlmacenadas);		// añadelo en el estado"
		}
	}, []);										//El valor inicial, un array vacio

	useEffect( () => {
		localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tareas))	//setItem: funcion js pura,
												// stringify se necesita porque localStorage solo acepta strings 
	}, [tareas]);								//El valor inicial, un array con las tareas

	function toggleTarea(id) {					// funcion que cambia el estado de la tarea (completada o no)
		const newTareas = [...tareas];
		const tarea = newTareas.find(tarea => tarea.id === id);
		tarea.isComplete = !tarea.isComplete;

		setTarea(newTareas);
	}

	function handleEditItem(id) {
		const misTareas = [...tareas]
		const tarea = misTareas.find(task => task.id === id)
		tarea.name = tareaNameRef.current.value
		setTarea(misTareas)
	}
	
	function handleAddItem(e) {
		const name = tareaNameRef.current.value;

		if(name === '') {
			return ;
		}
		setTarea(prevTareas => {
			return [...prevTareas, {id: uuidv4(),name: name, isComplete: false}];
		});
		tareaNameRef.current.value = null;
	}

	function handleClearItems() {
		const newTareas = tareas.filter(tarea => !tarea.isComplete)
		setTarea(newTareas)
	}

	return (
		<>
			<h1>Lista de tareas:</h1>
			<TareaList  tareas={tareas} toggleTarea={toggleTarea} handleEditItem={handleEditItem}/>
			<input ref={tareaNameRef} type="text" />
			<button onClick={handleAddItem}>Agregar Item</button>
			<button onClick={handleClearItems}>Limpiar Completos</button>
			<div>{tareas.filter(tarea => tarea.isComplete).length} tareas realizadas</div>
			<div>{tareas.filter(tarea => !tarea.isComplete).length} tareas por hacer</div>
		</>
	);
}

export default App;
