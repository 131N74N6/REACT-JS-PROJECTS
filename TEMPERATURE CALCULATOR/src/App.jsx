import { useMemo, useState } from "react";
import "./App.css";

export default function App() {
    const [userInput, setUserInput] = useState("");
    const [result, setResult] = useState("");
    const [temperature, setTemperature] = useState("");
    const [converter, setConverter] = useState("");

    function inputChange(event) {
        setUserInput(parseInt(event.target.value));
    }

    function changeTemperature(event) {
        setTemperature(event.target.value);
    }

    function changeConverter(event) {
        setConverter(event.target.value);
    }

    const memoizedResult = useMemo(() => {
        return {
            celciusToFarenheit: ((9/5) * userInput) + 32,
            celciusToKelvin: (userInput+273),
            celciusToReamur: (4*userInput)/5,
            farenheitToCelcius: (5*(userInput-32))/9,
            farenheitToKelvin: ((5*(userInput-32))/9)+273,
            farenheitToReamur: (4*(userInput-32))/9,
            kelvinToCelcius: userInput-273,
            kelvinToFarenheit: ((9*(userInput-273))/5)+32,
            kelvinToReamur: (4*(userInput-273))/5,
            reamurToCelcius: (5*userInput)/4,
            reamurToFarenheit: ((9*(userInput))/4)+32,
            reamurToKelvin: ((5*(userInput))/4)+273,
            invalid: "Invalid converter"
        }
    }, [userInput, temperature, converter]);

    function calculation(event) {
        event.preventDefault();

        if (userInput !== "" && temperature !== "select temperature" && converter !== "select converter") {
            if (temperature === "Celcius") {
                if (converter === "Farenheit") {
                    setResult(memoizedResult.celciusToFarenheit);
                }
                else if (converter === "Kelvin") {
                    setResult(memoizedResult.celciusToKelvin);
                }
                else if (converter === "Reamur") {
                    setResult(memoizedResult.celciusToReamur);
                }
                else {
                    setResult(memoizedResult.invalid);
                }
            }
    
            else if (temperature === "Farenheit") {
                if (converter === "Celcius") {
                    setResult(memoizedResult.farenheitToCelcius);
                }
                else if (converter === "Kelvin") {
                    setResult(memoizedResult.farenheitToKelvin);
                }
                else if (converter === "Reamur") {
                    setResult(memoizedResult.farenheitToReamur);
                }
                else {
                    setResult(memoizedResult.invalid);
                }
            }
    
            else if (temperature === "Kelvin") {
                if (converter === "Celcius") {
                    setResult(memoizedResult.kelvinToCelcius);
                }
                else if (converter === "Farenheit") {
                    setResult(memoizedResult.kelvinToFarenheit);
                }
                else if (converter === "Reamur") {
                    setResult(memoizedResult.kelvinToReamur);
                }
                else {
                    setResult(memoizedResult.invalid);
                }
            }
    
            else if (temperature === "Reamur") {
                if (converter === "Celcius") {
                    setResult(memoizedResult.reamurToCelcius);
                }
                else if (converter === "Farenheit") {
                    setResult(memoizedResult.reamurToFarenheit);
                }
                else if (converter === "Kelvin") {
                    setResult(memoizedResult.reamurToKelvin);
                }
                else {
                    setResult(memoizedResult.invalid);
                }
            }
    
            else {
                setResult("You should choose the temperature");
            }
        }

        else {
            setResult("Please input the numbers");
        }
    }

    function reset() {
        setTemperature("");
        setConverter("");
        setResult("");
    }
    
    return (
        <div className="tempt-wrap">
            <div className="tempt-body">
                <form name="temperature-converter" title="temperature-converter">
                    <input type="text" id="temptr" placeholder="enter the temperature" onChange={inputChange}/>
                    <div className="selector">
                        <div className="selector-part-1">
                            <div>From</div>
                            <select onChange={changeTemperature}>
                                <option>select temperature</option>
                                <option value="Celcius">Celcius &deg;C</option>
                                <option value="Farenheit">Farenheit &deg;F</option>
                                <option value="Kelvin">Kelvin &deg;K</option>
                                <option value="Reamur">Reamur &deg;R</option>
                            </select>
                        </div>
                        <div className="selector-part-2">
                            <div>To</div>
                            <select onChange={changeConverter}>
                                <option>select converter</option>
                                <option value="Celcius">Celcius &deg;C</option>
                                <option value="Farenheit">Farenheit &deg;F</option>
                                <option value="Kelvin">Kelvin &deg;K</option>
                                <option value="Reamur">Reamur &deg;R</option>
                            </select>
                        </div>
                    </div>
                    <div className="controller">
                        <button type="submit" onClick={calculation}>Count</button>
                        <button type="button" onClick={reset}>Reset</button>
                    </div>
                    <div className="result">{result}</div>
                </form>
            </div>
        </div>
    )
}
