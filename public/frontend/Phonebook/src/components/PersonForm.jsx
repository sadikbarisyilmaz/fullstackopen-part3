export const PersonForm = ({
  handleChangeName,
  handleChangeNumber,
  handleSubmit,
}) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name: </label>
          <input onChange={handleChangeName} type="text" required />
          <br />
          <label>Number: </label>
          <input onChange={handleChangeNumber} type="number" required />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
    </div>
  );
};
