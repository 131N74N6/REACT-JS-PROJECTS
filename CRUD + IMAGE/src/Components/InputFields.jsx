import { memo } from "react";

function InputFields({ 
    name, changeName,
    age, changeAge,
    image, changeImage,
    preview, changePreview, 
    gender, changeGender,
    address, changeAddress,
    submitData, imageRef,
    cancelSubmit,
    isModalOpen 
}) {
    return (
        <div>
            <form className={`register-form ${isModalOpen === true ? "active" : ""}`}>
                <input placeholder="your name..." type="text" id="set-name" value={name} 
                onChange={changeName} name="name"/>
                <input placeholder="your age..." type="text" id="set-age" value={age} 
                onChange={changeAge} name="age"/>
                <input placeholder="your address..." type="text" id="set-address" 
                value={address} onChange={changeAddress} name="address"/>
                <input type="text" placeholder="your gender..." value={gender} onChange={changeGender} 
                id="set-gender" name="gender"/>
                <input type="file" id="set-image" onChange={changeImage} ref={imageRef} name="image"/>
                <div className="file-preview">
                    {image ?
                        <img src={preview} onClick={changePreview} />
                        :
                        <div className="symbol" onClick={changePreview}>Tap here to upload your image</div>
                    }
                </div>
                <div className="submit-cancel">
                    <button type="submit" onClick={submitData}>Send</button>
                    <button type="button" onClick={cancelSubmit}>Cancel</button>
                </div>
            </form>
        </div>
    )
}

export default memo(InputFields);