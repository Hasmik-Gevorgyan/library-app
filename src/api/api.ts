import { API_URL, LIMIT } from "./constants.ts";

const fetchBooks = async ({query = 'all', page = 1}) => {
    return fetch(`${API_URL}?q=${query}&fields=title,cover_i,author_name,key,first_publish_year&limit=${LIMIT}&page=${page}`, )
        .then(response => response.json())
        .then(data => data);
}

export { fetchBooks };