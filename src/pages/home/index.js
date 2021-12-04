import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import NavComponent from '../../components/nav'

import api from '../../services/api'
import LocalizaIcon from '../../assets/localiza.png';


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
                setLocation(true)
            })
            .catch((error) => {
                setError(true)
                setLocation(false)
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
                                    className="form-control searchForm"
                                    type="text"
                                    placeholder="Insira a cidade desejada"
                                    onChange={(event) => setdadosSearch(event.target.value)}
                                    required
                                />
                                <input className="btn btn-success ms-2" type="submit" value="Pesquisar" />
                            </form>
                        </div>
                        {location === true && (
                            <div className="mt-3">
                                <div className="borderCaixaCupom bgDarkCard p-3 d-flex flex-row">
                                    <div className="w-100 ps-5 pe-5 pt-3 pb-3">
                                        <div className="text-center">
                                            <div><img alt="Clima Status" src={urlClima} width="80" /></div>
                                            <h1>{weatherDados?.main?.temp}°C</h1>
                                            <div>{weatherDados?.weather?.[0]?.description.charAt(0).toUpperCase()}{weatherDados?.weather?.[0]?.description.slice(1)}</div>
                                            <div className="mt-3"><img className="me-1" alt="Localização Icon" src={LocalizaIcon} width="17px" />{weatherDados?.name}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex mt-2">
                                    <div className="w-100 borderCaixaCupom bgDarkCard p-3 me-1 d-flex align-items-center justify-content-center text-center">
                                        <div><b>{weatherDados?.wind?.speed} km/h</b><br />Vel. vento</div>
                                    </div>
                                    <div className="w-100 borderCaixaCupom bgDarkCard p-3 ms-1 d-flex align-items-center justify-content-center text-center">
                                        <div><b>{weatherDados?.main?.humidity}%</b><br />Úmidade</div>
                                    </div>
                                </div>
                            </div>
                        )}
                        {error === true && (
                            <div className="borderCaixaCupom bgDarkCard p-3 mt-3 text-center">
                                <div>Cidade não encontrada, tente novamente!</div>
                            </div>
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