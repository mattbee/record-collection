import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useEffect, useState} from 'react';
import { useRouter } from 'next/router'

import { useForm } from "react-hook-form";
import axios from 'axios';
import RecordForm from '../components/RecordForm';

function AddRecord() {
  const router = useRouter()

  const [conditions, setConditions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { register, handleSubmit } = useForm();
  axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';

  const fetchData = async () => {
    await axios.get('http://localhost:3000/conditions')
      .then(res => {
        setError(false);
        setConditions(res.data.data);
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

  const onSubmit = data => {
    console.log(data, { ...data} );
    axios.post('http://localhost:3000/records', {
      data: {
        ...data
      }
    })
    .then(function (response) {
      console.log(response);
      router.push('/')
    })
    .catch(function (error) {
      console.log(error);
    });
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Greg's record collection</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Add record
        </h1>

        <RecordForm onSubmit={handleSubmit(onSubmit)} register={register}  buttonText='Add record' conditions={conditions} />

      </main>
    </div>
  )
}

export default AddRecord;
