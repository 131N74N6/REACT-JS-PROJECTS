export default function InputField({ type, placeholder, length, id, onChange, name, value }) {
    return (
        <div>
            <input 
                type={type} 
                name={name} 
                placeholder={placeholder} 
                maxLength={length} 
                id={id} 
                value={value}
                onChange={onChange} 
            />
        </div>
    )
}
