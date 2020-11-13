import React, { useState } from 'react';
import { SAMPLE_QUERY, BASE_URL } from './constants';
import Table from './Table';

/**
 * @description Get formatted headers.
 */
const getHeaders = () => {
    const token = localStorage.getItem('token')
    const headers = new Headers()
    headers.append("authorization", token);
    headers.append("Content-Type", "application/json");
    return headers;
}

/**
 * @description Home component.
 */
const Home = () => {
    const [query, setQuery] = useState(SAMPLE_QUERY);
    const [rows, setRows] = useState([]);
    const [columns, setColumns] = useState([]);
    const [showLoader, setLoader] = useState(false)
    const handleSubmit = async (event) => {
        event.preventDefault(); //To prevent page from auto refreshing.
        if (!query || !query.length){ return alert('Enter a query troll.');}
        setLoader(true)
        const raw = JSON.stringify({ query });
        try {
            const requestOptions = {
                method: 'POST',
                headers: getHeaders(),
                body: raw,
            };
            const response = await fetch(`${BASE_URL}/query`, requestOptions);
           if (response.status !== 200) {
               const error = await response.json()
               alert(error?.message ? error?.message : "Request failed")
            } else {
                const parsedResponse = await response.json();
                const data = parsedResponse?.data?.data;
                setColumns(data?.schema?.fields);
                setRows(data?.rows);
            }
        setLoader(false)
        } catch (error) {
            alert(error.message)
        }
    }

    return (<div>
        <form onSubmit={handleSubmit}>
            <label>
                Query:
            <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="q-box"
                />
            </label>
            <br/>
            {showLoader ? <div className="loader"></div>: <input className="submit-btn" type="submit" value="Fetch" />}
        </form>
        {columns.length ? <Table columns={columns} rows={rows}/> : null}
    </div>);
}
export default Home;