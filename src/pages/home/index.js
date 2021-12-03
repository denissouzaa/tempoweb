import React, { useState, useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';
import NavComponent from '../../components/nav'

import api from '../../services/api'

const apiParams = {
    key: "18b2ee8e1f19d5c929651890aec86896"
}

export default function Home() {

    const [location, setLocation] = useState(false)
    const [weatherDados, setWeather] = useState(false)
    const [boxSearch, setboxSearch] = useState(true)
    const [dadosSearch, setdadosSearch] = useState()

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

    async function newSearch(e) {
        let res = await api.get(`/weather`, {
            params: {
                q: e,
                appid: apiParams.key,
                lang: 'pt_br',
                units: 'metric'
            }
        })
        setWeather(res.data)
        console.log(weatherDados)
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
                <Container className="col-md-6 mx-auto">
                    <div className="">
                        {boxSearch === true && <div>
                            <form className="mt-4 d-flex">
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="Insira a cidade desejada"
                                    onChange={(event) => setdadosSearch(event.target.value)}
                                />
                                <input className="btn btn-primary ms-2" type="button" value="Pesquisar" onClick={() => { newSearch(dadosSearch) }} />
                            </form>
                        </div>
                        }

                        {location === true && (
                            <div className="mt-4">
                                <div className="borderCaixaCupom bgDarkCard p-3 d-flex flex-row">
                                    <div className="w-100 ps-5 pe-5 pt-3 pb-3">
                                        <div className="fs-5">Hoje</div>
                                        <div className="mt-3 fs-3">{weatherDados?.main?.temp}°C</div>
                                        <div className="mt-3">{weatherDados?.name}</div>
                                    </div>
                                    <div className="w-100 ps-5 pe-5 pt-3 pb-3 text-end">
                                        <div>{weatherDados?.weather?.[0]?.description.charAt(0).toUpperCase()}{weatherDados?.weather?.[0]?.description.slice(1)}</div>
                                        <div><img alt="Clima Status" src={urlClima} width="70px" /></div>
                                    </div>
                                </div>
                            </div>
                        )}
                        {location === false && (
                            <p>Pesquisa de cidade</p>
                        )}
                    </div>


                </Container>
            </main>
            <footer className="footer">
                <Container className="col-md-6 mx-auto">
                    <div className="hr" />
                    <div className="ms-1">Desenvolvido por Denis Souza - <a href="https://www.linkedin.com/in/denis-souzaa/" target="_blank" rel="noreferrer">LinkedIn</a>.</div>
                </Container>
            </footer>
        </>
    )
}