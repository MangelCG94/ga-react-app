import Tarea from './Tarea';

export default function TareaList({tareas, toggleTarea, handleEditItem}) {
    return (
        tareas.map( tarea => {
            return <Tarea key={tarea.id} toggleTarea={toggleTarea} 
                handleEditItem={handleEditItem} tarea={tarea} />
        })
    )
}
