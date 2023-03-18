export default function Profile({ user }) {
  return (
    <div>
      <div className="form-control">
        <label htmlFor="" className="label">
          User Id
        </label>
        <input type="text" className="input input-bordered" disabled />
      </div>
    </div>
  );
}
