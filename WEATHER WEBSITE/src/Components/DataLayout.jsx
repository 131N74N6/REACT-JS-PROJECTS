import { Fragment } from "react";
import { Col, Container, Row } from "react-bootstrap";
import weatherIcon from "../Data/weatherIcon";
import "./DataLayout.css";

export default function DataLayout(props) {
    return (
        <Fragment>
            <Container fluid className="current-loc-info p-4">
                <Container> 
                    <Row className="weather-status gap-3">
                        <Col className="current-card p-4" lg={3} md={12} sm={12}>
                            <div>Sea Level : {props.apiData1?.main.sea_level || "-"}</div>
                            <div>Humidity : {props.apiData1?.main.humidity || "-"}</div>
                            <div>Latitude : {props.apiData1?.coord.lat || "-"}</div>
                            <div>Longitude : {props.apiData1?.coord.lon || "-"}</div>
                            <div>Wind Speed: {props.apiData1?.wind?.speed || "-"}</div>
                        </Col>
                        <Col className="current-card p-4" lg={3} md={12} sm={12}>
                            <div>Temperature: {Math.round(props.apiData1?.main?.temp - 273.15) || "-"} &deg;C</div>
                            <div>Feels Like: {Math.round(props.apiData1?.main?.feels_like - 273.15) || "-"} &deg;C</div>
                            <div>Min Temperature: {Math.round(props.apiData1?.main?.temp_min - 273.15) || "-"} &deg;C</div>
                            <div>Max Temperature: {Math.round(props.apiData1?.main?.temp_max - 273.15) || "-"} &deg;C</div>
                            <div>Timezone: {props.apiData1?.timezone || "-"}</div>
                        </Col>
                        <Col className="current-card p-4 text-center" lg={3} md={12} sm={12}>
                            <div>Location: {props.apiData1?.name}</div>
                            <div className="weather-icon">
                                {weatherIcon(
                                    props.apiData1?.weather[0].id, 
                                    props.apiData1?.weather[0].icon
                                )}
                            </div>
                            <div className="weather-desc">{props.apiData1?.weather[0].description}</div>
                        </Col>
                    </Row>
                    <div className="p-3 text-center fw-bold title">Weather Forecast</div>
                    <Row className="current-wrap gap-3">
                        {props.apiData2?.list?.slice(0,6).map((forecast, index) => (
                            <Col key={`current-location-forecast-${index}`} className="forecast-card p-4" 
                            lg={3} md={12} sm={12}>
                                <div className="weather-icon text-center">
                                    {weatherIcon(forecast?.weather[0]?.id, forecast?.weather[0]?.icon)}
                                </div>
                                <div>Temperature: {Math.round(forecast?.main?.temp - 273.15) || "-"} &deg;C</div>
                                <div>Feels Like: {Math.round(forecast?.main?.feels_like - 273.15) || "-"} &deg;C</div>
                                <div>Humidity: {forecast?.main?.humidity || "-"}</div>
                                <div>Pressure: {forecast?.main?.pressure || "-"}</div>
                                <div>Sea Level: {forecast?.main?.sea_level || "-"}</div>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </Container>
        </Fragment>
    )
}
