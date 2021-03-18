import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useEffect, useState} from 'react';
import { useRouter } from 'next/router'

import { useForm } from "react-hook-form";
import axios from 'axios';

function AddRecord() {
  const router = useRouter()

  const { register, handleSubmit, watch, errors } = useForm();
  axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';
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

  useEffect(() => {
    //fetchData();
  }, []);

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

        <form onSubmit={handleSubmit(onSubmit)}>
        <div className="formRow">
            <label htmlFor="record">Record title</label>
            <input type="text" name="attributes[title]" ref={register({ required: true })} />
          </div>
          <div className="formRow">
            <label htmlFor="record">Year of release</label>
            <input type="text" name="attributes[release_year]" ref={register({ required: true })} />
          </div>
          <div className="formRow">
            <label htmlFor="record">Artist</label>
            <input type="text" name="attributes[artist_attributes][name]" ref={register} />
          </div>

          <div className="formRow">
            <label htmlFor="record">Condition</label>
            <select name="attributes[condition_id]" ref={register}>
              <option value="1">Brand New</option>
              <option value="2">Nearly New</option>
            </select>
          </div>
          <div className="formRow">
            <input type="submit" value="Add record" />
          </div>
        </form>

      </main>
    </div>
  )
}

export default AddRecord;
