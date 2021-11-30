import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import NavComponent from '../../components/nav' 

import api from '../../services/api'

export default function Home() {

    const [dadosApi, setDadosApi] = useState([])

    useEffect(() => {
        api.get("/weather?q=Ilhabela&appid=18b2ee8e1f19d5c929651890aec86896&lang=pt_br")
        .then(({data}) => {setDadosApi(data)})
        .catch((error) => {console.log("Algo deu errado " + error)})
    }, [])

    return (
        <>
            <header>
                <NavComponent />
            </header>
            <main main className="bgExpand">
                <Container>
                    <div className="mt-4">
                        <div className="borderCaixaCupom bgWhite p-2 d-flex flex-column border border-1 align-items-center">
                        

                            <div><img alt="Clima Status" src="https://ssl.gstatic.com/onebox/weather/64/partly_cloudy.png" /></div>
                            <div className="mt-2 fs-1">123</div>
                            <div className="mt-2 text-center">123<br/>
                                Sensação termica: 26.43°C</div>

                        </div>
                    </div>
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