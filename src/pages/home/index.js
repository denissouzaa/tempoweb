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
    const [dadosSearch, setdadosSearch] = useState()
    const [error, setError] = useState();

    let urlClima = `https://openweathermap.org/img/wn/${weatherDados?.weather?.[0].icon}@2x.png`

    let getWeather = async (lat, long) => {
        await api.get(`/weather`, {
            params: {
                lat: lat,
                lon: long,
                appid: apiParams.key,
                lang: 'pt_br',
                units: 'metric'
            }
        })
        .then((res) => {
            setWeather(res.data)
        })
        .catch((error) => {
            setError(true)
            console.log("nao achou nada")
        })

    }

    async function newSearch(e) {
        await api.get(`/weather`, {
            params: {
                q: e,
                appid: apiParams.key,
                lang: 'pt_br',
                units: 'metric'
            }
        })
            .then((res) => {
                setWeather(res.data)
                setError(false)
            })
            .catch((error) => {
                setError(true)
            })
    }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            getWeather(position.coords.latitude, position.coords.longitude)
            setLocation(true)
        })
    }, [])

    return (
        <>
            <header>
                <NavComponent />
            </header>
            <main main className="bgDark">
                <Container className="col-md-7 mx-auto">
                    <div className="">
                        <div className="borderCaixaCupom bgDarkCard p-3 mt-3">
                            <form className="d-flex" onSubmit={e => { e.preventDefault(); newSearch(dadosSearch) }}>
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="Insira a cidade desejada"
                                    onChange={(event) => setdadosSearch(event.target.value)}
                                    required
                                />
                                <input className="btn btn-dark ms-2" type="submit" value="Pesquisar" />
                            </form>
                        </div>

                        {location === true && (
                            <div className="mt-3">
                                <div className="borderCaixaCupom bgDarkCard p-3 d-flex flex-row">
                                    <div className="w-100 ps-5 pe-5 pt-3 pb-3">
                                        <div className="text-center">
                                            <div><img alt="Clima Status" src={urlClima} width="70" /></div>
                                            <div className="fs-3">{weatherDados?.main?.temp}°C</div>
                                            <div>{weatherDados?.weather?.[0]?.description.charAt(0).toUpperCase()}{weatherDados?.weather?.[0]?.description.slice(1)}</div>
                                            <div className="mt-3">{weatherDados?.name}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex mt-2">
                                    <div className="w-100 borderCaixaCupom bgDarkCard p-3 me-1 d-flex align-items-center justify-content-center text-center">
                                        <div>{weatherDados?.wind?.speed} km/h<br />Vel. vento</div>
                                    </div>
                                    <div className="w-100 borderCaixaCupom bgDarkCard p-3 ms-1 d-flex align-items-center justify-content-center text-center">
                                        <div>{weatherDados?.main?.humidity}%<br />Úmidade</div>
                                    </div>
                                </div>
                            </div>
                        )}
                        {location === false || error === true && (
                            <p>Carregando...</p>
                        )}
                    </div>


                </Container>
            </main>
            <footer className="footer">
                <Container className="col-md-7 mx-auto">
                    <div className="ms-1">Desenvolvido por Denis Souza - <a href="https://www.linkedin.com/in/denis-souzaa/" target="_blank" rel="noreferrer">LinkedIn</a>.</div>
                </Container>
            </footer>
        </>
    )
}