import { Link } from "react-router-dom";

const MissingPage = () => {
  return (
    <article style={{ padding: "100px" }}>
      <h1>Oops!</h1>
      <p>Page Not Found</p>
      <div
        style={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-end",
        }}
      >
        <Link to="/">Visit Our Homepage</Link>
      </div>
    </article>
  );
};

export default MissingPage;
