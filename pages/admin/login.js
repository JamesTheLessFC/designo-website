import styles from "../../styles/LoginPage.module.scss";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle, faLock } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    e.stopPropagation();

    signIn("credentials", {
      username,
      password,
      callbackUrl: `${window.location.origin}/admin`,
      redirect: false,
    }).then((result) => {
      if (result.error) {
        if (result.status === 401) {
          setLoginError(
            "Your username/password combination was incorrect. Please try again."
          );
        } else if (result.status === 403) {
          setLoginError("Access Denied");
        } else {
          setLoginError(result.error);
        }
      } else {
        router.push(result.url);
      }
    });
  };

  return (
    <div className={styles.root}>
      <FontAwesomeIcon icon={faLock} className={styles.icon} />
      {loginError && (
        <p>
          <FontAwesomeIcon icon={faExclamationCircle} className={styles.icon} />
          <span>{loginError}</span>
        </p>
      )}
      <form onSubmit={handleLogin}>
        <div>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className={username === "" ? styles.empty : ""}
          />
        </div>
        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={password === "" ? styles.empty : ""}
            placeholder="Password"
          />
        </div>
        <button type="submit" disabled={username === "" || password === ""}>
          Log In
        </button>
      </form>
      <Link href="/">
        <a>Designo Home Page</a>
      </Link>
    </div>
  );
}
