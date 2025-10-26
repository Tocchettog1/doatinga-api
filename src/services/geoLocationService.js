import axios from "axios";
import AppError from "../utils/AppError.js"

export default async function getAddressByCep(cep, number) {
    const cleanedCep = cep.replace(/\D/g, '');

    if (cleanedCep.length !== 8) {
        throw new AppError('Formato de CEP inválido. Deve conter 8 dígitos.', 406);
    }

    const viaCepUrl = `https://viacep.com.br/ws/${cleanedCep}/json/`
    let viaCepResponse;

    try {
        viaCepResponse = await axios(viaCepUrl)
    } catch (error) {
        throw new AppError("Falha ao buscar o cep.", 500);
    }

    if (viaCepResponse.data.erro) {
        throw new Error("CEP inválido ou não encontrado", 404);
    }

    let { logradouro, bairro, localidade, uf } = viaCepResponse.data;

    number ? logradouro = `${logradouro}, ${number}` : logradouro;

    const queryString = `${logradouro}, ${bairro}, ${localidade}, ${uf}, Brasil`;
    const nominatimUrl = "https://nominatim.openstreetmap.org/search";
    let nominatimResponse;

    try {
        nominatimResponse = await axios.get(nominatimUrl, {
            params: { q: queryString, format: 'json', limit: 1, addressdetails: 1 },
            headers: {
                'User-Agent': 'DoaTingaApp/1.0 (miguelpereira.dev@gmail.com)'
            }
        });
    } catch (error) {
        console.error("Erro de rede ao chamar Nominatim:", error.message);
        throw new Error('Falha ao se comunicar com o serviço de geolocalização.');

    }

    if (nominatimResponse.data && nominatimResponse.data.length > 0) {
        const result = nominatimResponse.data[0];

        const formattedAddress = {
            cep: cleanedCep,
            street: logradouro,
            neighborhood: bairro,
            city: localidade,
            state: uf,
            latitude: parseFloat(result.lat),
            longitude: parseFloat(result.lon),
        };

        return formattedAddress;

    } else {
        throw new Error('Endereço encontrado, mas falha ao obter coordenadas de geolocalização.');
    }
};