export default function InputField({ type, placeholder, length, id, onChange, name }) {
    return (
        <div>
            <input 
                type={type} 
                name={name} 
                placeholder={placeholder} 
                maxLength={length} 
                id={id} 
                onChange={onChange} 
            />
        </div>
    )
}
