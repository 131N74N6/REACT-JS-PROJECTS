import { memo } from "react";

function UpdateFields({ 
    isUpdateOpen, name, handleName, 
    age, handleAge, 
    address, handleAddress, 
    gender, handleGender, refr, 
    handleImage, profile, 
    handlePreview, edit, close 
}) {
    return (
        <form className={`register-form ${isUpdateOpen === true ? "active" : ""}`}>
            <input placeholder="your name..." type="text" id="set-name" value={name} 
            onChange={handleName} name="name"/>
            <input placeholder="your age..." type="text" id="set-age" value={age} 
            onChange={handleAge} name="age"/>
            <input placeholder="your address..." type="text" id="set-address" value={address} 
            onChange={handleAddress} name="address"/>
            <input placeholder="your gender..." type="text" id="set-gender" value={gender} 
            onChange={handleGender} name="gender"/>
            <input type="file" id="set-image" onChange={handleImage} ref={refr} name="image"/>
            <div className="file-preview">
                {profile ?
                    <img src={profile} onClick={handlePreview} /> :
                    <div className="symbol" onClick={handlePreview}>Tap here to upload your image</div>
                }
            </div>
            <div className="submit-cancel">
                <button type="submit" onClick={edit}>Change</button>
                <button type="button" onClick={close}>Cancel</button>
            </div>
        </form>
    )
}

export default memo(UpdateFields);
