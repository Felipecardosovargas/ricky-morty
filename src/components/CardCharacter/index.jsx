import { ContainerCard } from './styles';

export function CardCharacter({ image, name, genre, species }) {
    return (
        <ContainerCard>
            <div className="imagem">
                <img src={image} alt={name} />
            </div>
            <div className="info">
                <h3>{name}</h3>
                <ul>
                    <li>{genre === "unknown" ? "Desconhecido" : genre}</li>
                    <li>{species === "unknown" ? "Desconhecido" : species}</li>
                </ul>
            </div>
        </ContainerCard>
    );
}
