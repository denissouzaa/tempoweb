import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import NavComponent from '../../components/nav'

import api from '../../services/api'

const apiParams = {
    key: "18b2ee8e1f19d5c929651890aec86896"
}

export default function Home() {

    const [location, setLocation] = useState(false)
    const [weatherDados, setWeather] = useState(false)

    let urlClima = `https://openweathermap.org/img/wn/${weatherDados?.weather?.[0].icon}@2x.png`

    let getWeather = async (lat, long) => {
        let res = await api.get(`/weather`, {
            params: {
                lat: lat,
                lon: long,
                appid: apiParams.key,
                lang: 'pt_br',
                units: 'metric'
            }
        })
        setWeather(res.data)

    }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            getWeather(position.coords.latitude, position.coords.longitude)
            setLocation(true)
        })
        // async function fetchData() {
        //     const request = await api.get(`/weather?q=Ilhabela&appid=${apiParams.key}&lang=pt_br&units=metric`)
        //     setDadosApi(request.data)
        //     return request
        // }
        // fetchData()
    }, [])
    return (
        <>
            <header>
                <NavComponent />
            </header>
            <main main className="bgExpand">
                <Container>
                    <div className="mt-4">
                        <div className="borderCaixaCupom bgWhite p-3 d-flex flex-row border border-1">
                            <div className="w-100 p-5">
                                <div>Hoje</div>
                                <div className="mt-3">25.86°C</div>
                                <div className="mt-3">Nebulosidade</div>
                            </div>
                            <div className="w-100 p-5 text-end">
                                <div>Quinta</div>
                                <div><img alt="Clima Status" src={urlClima} width="70px" /></div>
                            </div>
                        </div>
                    </div>

                    {location === true && (
                        <div className="mt-4">
                            <div className="borderCaixaCupom bgWhite p-3 d-flex flex-column border border-1 align-items-center">
                                <div>Previsão do Tempo para Ilhabela</div>

                                <div><img alt="Clima Status" src={urlClima} /></div>
                                <div className="mt-2 fs-1">{weatherDados?.main?.temp}°C</div>
                                <div className="mt-2">{weatherDados?.weather?.[0]?.description}</div>
                                <div className="mt-2">Sensação {Math.round(weatherDados?.main?.feels_like)}°</div>

                            </div>
                        </div>
                    )}
                    {location === false && (
                        <p>Pesquisa de cidade</p>
                    )}

                </Container>
            </main>
            <footer className="footer">
                <Container>
                    Footer
                </Container>
            </footer>
        </>
    )
}