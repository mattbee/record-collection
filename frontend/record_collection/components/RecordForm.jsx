const RecordForm = (props) => (
  <form onSubmit={props.onSubmit}>
    <div className="formRow">
      <label htmlFor="record">Record title</label>
      <input type="text" name="attributes[title]" ref={props.register({ required: true })} />
    </div>
    <div className="formRow">
      <label htmlFor="record">Year of release</label>
      <input type="text" name="attributes[release_year]" ref={props.register({ required: true })} />
    </div>
    <div className="formRow">
      <label htmlFor="record">Artist</label>
      <input type="text" name="attributes[artist_attributes][name]" ref={props.register} />
    </div>

    <div className="formRow">
      <label htmlFor="record">Condition</label>
      <select name="attributes[condition_id]" ref={props.register}>
        {console.log(props.conditions)}
        {props.conditions.map((condition, key) => (
          <option key={key} value={condition.attributes.id}>{condition.attributes.state}</option>
        ))}
      </select>
    </div>
    <div className="formRow">
      <input type="submit" value={props.buttonText} />
    </div>
  </form>
);

export default RecordForm;
