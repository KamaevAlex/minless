import React, {useContext} from 'react'
import PropTypes from 'prop-types'
import { findByLabelText } from '@testing-library/dom'
import Context from '../context'

const styles = {
    li: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '.5rem 1rem',
        border: '1px solid #ccc',
        borderRadius: '4px',
        marginBottom: '.5rem'
    },
    input: {
        marginRight: '1rem'
    }

}

 function TodoItem({todo, index, onChange}) { /* В компонент TodoItem (TodoList.js) передаем функцию onChange */
    
    const {removeTodo} = useContext(Context)              /* На выходе получаем объект, совпадающий со значением value из Context.Provider в App.js. */
                                                /* У этого объекта есть ключ removeTodo из которого мы получаем значение removeTodo */
    const classes = []
    if (todo.completed) {
        classes.push('done')
    }

    return (
        <li style={styles.li}>
            <span className = {classes.join(' ')}>
                <input 
                type="checkbox" 
                style={styles.input} 
                checked = {todo.completed}
                onChange={ ()=> onChange(todo.id) }/> {/* При событии onChange вызывается метод onChange, куда передается id нажатого todo*/}
                <strong>{index+1}</strong>
                &nbsp;
                {todo.title}
            </span>
            <button className = 'rm' onClick = {removeTodo.bind(null, todo.id)}>&times;</button>
        </li>
    )
}

TodoItem.propTypes = {
    todo: PropTypes.object.isRequired,
    index: PropTypes.number,
    onChange: PropTypes.func.isRequired
}

export default TodoItem