import React, { useState, useRef, useEffect } from 'react';
import TareaList from './components/TareaList';
import {v4 as uuidv4} from 'uuid';

const LOCAL_STORAGE_KEY = 'tareasApp.tareas';

function App() {
	const [tareas, setTarea] = useState([]);
	const tareaNameRef = useRef();

	useEffect( () => {
		const tareasAlmacenadas = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
		if (tareasAlmacenadas) {
			setTarea(tareasAlmacenadas);
		}
	}, []);

	useEffect( () => {
		localStorage.setItem( LOCAL_STORAGE_KEY, JSON.stringify(tareas) )
	}, [tareas]);

	function toggleTarea(id) {
		const newTareas = [...tareas];
		const tarea = newTareas.find(tarea => tarea.id === id)
		tarea.isComplete = !tarea.isComplete;

		setTarea(newTareas);
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
			<TareaList tareas={tareas} toggleTarea={toggleTarea}/>
			<input ref={tareaNameRef} type="text" />
			<button onClick={handleAddItem}>Agregar Item</button>
			<button onClick={handleClearItems}>Limpiar Completos</button>
			<div>{tareas.filter(tarea => tarea.isComplete).length} tareas realizadas</div>
			<div>{tareas.filter(tarea => !tarea.isComplete).length} tareas por hacer</div>
		</>
	);
}

export default App;
