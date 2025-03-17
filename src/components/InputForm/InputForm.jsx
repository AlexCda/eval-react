import classes from './InputForm.module.css'
const InputForm = ({label, id, type, value, onChange, placeholder}) => {
    return (
        <div className={classes['form-group']}>
            <label htmlFor={id}>{label}</label>
            <input
                id={id}
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
            ></input>
        </div>
    )
}

export default InputForm;