import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";
import { Auth } from 'aws-amplify';

export default function Home() {
  const { data: session } = useSession();
  console.log({ session })
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loadingState, setLoadingState] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoadingState(true);
    console.log({ username, password })
    setLoadingState(false);
  }

  const handleSignUp = async () => {
    try {
      const res = await Auth.signUp({
        username: "test",
        password: "12345678",
        attributes: {
          email: "test@test.com",
          name: "Test Test"
        }
      })
      console.log({ res })
    } catch (err) {
      console.error({ err });
    }
  }

  // if (loading) {
  //   return null;
  // }

  if (session) {
    return (
      <>
        Signed in as {session.user.email}<br />
        <button onClick={() => signOut()}>Sign Out</button>
      </>
    )
  }

  return (
    <>
      <div>
        <input type="text" onChange={(e) => setUsername(e.target.value)} placeholder="Username" value={username} />
      </div>
      <div>
        <input type="text" onChange={(e) => setPassword(e.target.value)} placeholder="Password" value={password} />
      </div>
      <button onClick={handleSignUp}>Check User</button>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  )
}
