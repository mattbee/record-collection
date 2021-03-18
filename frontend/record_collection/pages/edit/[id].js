import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import { useEffect, useState} from 'react';
import { useRouter } from 'next/router'

import { useForm } from "react-hook-form";
import axios from 'axios';
import RecordForm from '../../components/RecordForm';

function EditRecord({id}) {
  const router = useRouter();
  const [record, setRecord] = useState();
  const [conditions, setConditions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { register, handleSubmit, setValue } = useForm();

  axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';

  const fetchData = async () => {
    console.log('fetch', id);

    await axios.get(`http://localhost:3000/records/${id}`)
        .then(res => {
          setError(false);
          setRecord(res.data.data);
        })
        .catch(() => {
          setError(true);
        })
        .finally(() => {
          setLoading(false);
        });
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
    setTimeout(() => {
      fetchData();
    }, 100);
  },[]);

  if(record) {
    setValue('attributes[title]', record.attributes.title)
    setValue('attributes[artist_attributes][name]', record.attributes.artist)
    setValue('attributes[condition]', record.attributes.condition)
    setValue('attributes[release_year]', record.attributes.release_year)
  }

  const onSubmit = data => {
    console.log(data, { ...data} );
    axios.patch(`http://localhost:3000/records/${id}`, {
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
          Edit record {id}
        </h1>

        <RecordForm onSubmit={handleSubmit(onSubmit)} formData={record} register={register} buttonText='Edit record' conditions={conditions} />

      </main>
    </div>
  )
}

EditRecord.getInitialProps = async ({ query }) => {
  const {id} = query

  return {id}
}


export default EditRecord;
