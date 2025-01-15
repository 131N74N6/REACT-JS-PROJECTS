import { useState } from "react";
import { evaluate } from "mathjs";
import "./App.css";

const buttonComponent = ['0','1','2','3','4','5','6','7','8','9','C','+','-','*','/','(',')','.','^']

export default function BasicCalculator() {
    const [handleDisplay, setHandleDisplay] = useState("");


    function handleInput(event) {
        setHandleDisplay(event.target.value);
    }

    function operationButton(value) {
        if (value === "C") {
            setHandleDisplay("");
        }
        else {
            setHandleDisplay((prev) => prev + value);
        }
    }

    function executor(event) {
        event.preventDefault();
        try {
            const result = evaluate(handleDisplay);
            setHandleDisplay(String(result));
        }
        catch (error) {
            setHandleDisplay(error);
        }
    }

    return (
        <div className="calculator-wrap">
            <div className="calculator-body">
                <form title="basic-calculator" name="basic-calculator">
                    <input type="text" id="display-result" value={handleDisplay} onChange={handleInput}/>
                    <div className="calculator-btn">
                        {buttonComponent.map((buttons, index) => (
                            <button key={`calculator-button-${index}`} 
                            type="button" onClick={() => operationButton(buttons)}>
                                {buttons}
                            </button>
                        ))}
                        <button type="submit" onClick={executor}>=</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
