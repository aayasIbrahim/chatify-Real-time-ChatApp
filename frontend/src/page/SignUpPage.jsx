import React from "react";

function SignUpPage() {
//   const [fullName, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [profilePic, setProfilePic] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);
//     try {
//       const res = await fetch("http://localhost:3000/api/auth/signup", {
//         method: "POST",
//         headers: {
//           "content-Type": "application/json",
//         },
//         body: JSON.stringify({ fullName, email, password, profilePic }),
//       });
//       const data = await res.json();
//       if (!res.ok) {
//         throw new Error(data.message);
//       }
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };
  return (
    <form className="min-h-screen flex justify-center items-center gap-5">
      {/* <div>
        <label>full name</label>
        <input
          type="text"
          value={fullName}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label>email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label>password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <label>profile pic</label>
        <input
          type="text"
          value={profilePic}
          onChange={(e) => setProfilePic(e.target.value)}
        />
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <button type="submit" disabled={loading}>
        {loading ? "Register...." : "Register"}
      </button> */}

     
      
    </form>
  );
}

export default SignUpPage;
