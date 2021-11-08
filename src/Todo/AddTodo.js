import React, {useState} from "react";
import PropTypes from 'prop-types'

function useInputValue(defaultValue = '') {
    const [value, setValue] = useState(defaultValue)

    return {
        bind: {
            value: value,
            onChange: event => setValue(event.target.value)
        },
        clear: () => setValue(''),
        value: () => value
    }
}

function AddTodo( {onCreate} ) {
    
    const input = useInputValue('')

    function submitHandler(event) {
        event.preventDefault()

        if (input.value().trim()) {
            onCreate(input.value())
            input.clear()
        }
    }

    return (<form style = {{marginBottom : '1rem'}} onSubmit = {submitHandler}>
                <input {...input.bind}/>
                <button type = "submit">Add Todo</button>
            </form>)
} /* onChange следит за input, в onChange передаем callback, он принимает в себя event. Далее, чтобы изменить состояние value, */
  /* вызываем функцию setValue со значением event.target.value */

  AddTodo.propTypes = {
      onCreate: PropTypes.func.isRequired
  }

export default AddTodo