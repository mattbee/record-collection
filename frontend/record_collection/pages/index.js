import Head from 'next/head'
import Link from 'next/link';
import styles from '../styles/Home.module.css'
import { useEffect, useState} from 'react';
import axios from 'axios';

function Home() {
  const [records, setRecords] = useState([]);
  const [searchString, setSearchString] = useState();
  const [searchResults, setSearchResults] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [pageMeta, setPageMeta] = useState(1);
  const fetchData = async () => {
    await axios.get('http://localhost:3000/records')
      .then(res => {
        setError(false);
        setPageMeta(res.data.meta)
        setRecords(prevState => [...prevState, ...res.data.data]);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const doSearch = (event) => {
    setSearchString(event.target.value);

    if(event.target.value < 3) {
      setSearchResults(undefined);
      console.log(searchResults)
    } else {
      if(event.target.value.length > 2) {
        axios.get(`http://localhost:3000/search/${searchString}`)
          .then(res => {
            setError(false);
            setSearchResults(res.data.data);
          });
      }
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Greg's record collection</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Greg's record collection
        </h1>

        <div className="nav">
          <ul>
          <li><Link href='/'>Home</Link></li>
          <li><Link href='/add'>Add Record</Link></li>
          </ul>
        </div>

        <div className={styles.search}>
          <label htmlFor="search">Search</label>
          <input name="search" onChange={doSearch} defaultValue={searchString} />
        </div>

        {searchResults && <ul>
          {searchResults.map((result, key) => (
            <li key={key}>{result.attributes.title}</li>
          ))}
        </ul>}

        {!error && loading && <div>Loading data...</div>}
        {error && <div>There was an error.</div>}
        <div>
          {!error && records && (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Record</th>
                  <th>Artist</th>
                  <th>Released</th>
                  <th>Condition</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
                {records.map((record, key) => (
                  <tr key={key}>
                    <td>{record.attributes.title}</td>
                    <td>{record.attributes.artist}</td>
                    <td>{record.attributes.release_year}</td>
                    <td>{record.attributes.condition}</td>
                    <td><Link href={`edit/${record.id}`}>Edit</Link></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <div>
          <p>{pageMeta.total} results</p>
          <p>{pageMeta.pages} pages</p>
        </div>
      </main>
    </div>
  )
}

export default Home;
