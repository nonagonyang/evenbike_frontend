import { useState } from "react";
function FromToForm({ getDockOptions }) {
  /**input should be coordinates in JSON format
   * SenateHouse: {"lat":51.521,"lng":-0.1287} */
  /** LSE: {"lat":51.5084,"lng":-0.11669} */
  const [formData, setFormData] = useState({});
  const handleSubmit = (evt) => {
    evt.preventDefault();
    //given from and to geo_coordinates generate two lists of dock options
    getDockOptions(formData["from"], formData["to"]);
  };

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((fData) => ({
      ...fData,
      [name]: value,
    }));
  };

  return (
    <>
      <h2>FromToFrom Component</h2>
      <form onChange={handleChange} onSubmit={handleSubmit}>
        <label htmlFor="from">From:</label>
        <input
          type="text"
          name="from"
          placeholder="type departure location"
        ></input>
        <label htmlFor="to">To:</label>
        <input
          type="text"
          name="to"
          placeholder="type destination location"
        ></input>
        <button>Get Docks </button>
      </form>
      <h2>From: {formData.from} </h2>
      <h2>To: {formData.to} </h2>
    </>
  );
}

export default FromToForm;
