import { useState } from "react";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message);
      }
      localStorage.setItem("token", data.token);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }

    // এখানে পরে API call করবে
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto" }}>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        {/* EMAIL */}
        <div>
          <label>Email</label>
          <br />
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <br />

        {/* PASSWORD */}
        <div>
          <label>Password</label>
          <br />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <br />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">{loading ? "Submiting" : "submit"}</button>
      </form>
    </div>
  );
}

export default LoginPage;
