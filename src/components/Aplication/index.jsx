import { useEffect, useState } from "react";
import axios from "axios";

import { ContainerApp, ContentCharacters, HeaderApp, Loader } from "./styles";
import { CardCharacter } from "../CardCharacter";
import IconLoader from '../../assets/loader.gif'

export function Aplication() {

    const [characters, setCharacters] = useState([]);
    const [page, setPage] = useState(1);
    const [countPages, setCountPages] = useState("");
    const [qtdCharacters, setQtdCharacters] = useState("");
    const [isLoader, setIsLoader ] = useState(true)

    useEffect(() => {
        axios.get(`https://rickandmortyapi.com/api/character?page=${page}`)
        .then(response => {
            console.log("Dados recebidos:", response.data.results);
            setCharacters(prevCharacters => [...prevCharacters, ...response.data.results]);
            setCountPages(response.data.info.pages);
            setQtdCharacters(response.data.info.count);
            setIsLoader(false)
        })
        .catch(error => {
            console.error("Erro ao buscar personagens:", error);
        });
    }, [page]);

    return (
        <>
        {
            isLoader && (
            <Loader>
                <img src={IconLoader} alt="" />
            </Loader>
            )
        }
        <ContainerApp>
            <HeaderApp>
                <h1>Rick and Morty</h1>
                <span>N° de personagens: {qtdCharacters}</span> {/* Corrigido */}
            </HeaderApp>
            <ContentCharacters>
                <div>
                    {
                        characters.map(({image, name, gender, species}, index) => (
                            <CardCharacter 
                                key={index}
                                image={image}
                                name={name}
                                genre={gender}
                                species={species} // Corrigido
                            />
                        ))
                    }
                </div>
                {
                    (!(page === countPages)) && 
                    <button onClick={() => setPage(prevPage => prevPage + 1)}>Carregar mais</button>
                }
            </ContentCharacters>
        </ContainerApp>
        </>
    );
}
