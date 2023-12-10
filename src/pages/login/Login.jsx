import { useEffect, useState } from "react";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";
import { authStore } from "../../stores/authStore";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [tabToShow, setTabToShow] = useState('login')
  const navigate = useNavigate()
  const { user } = authStore(store => store)
  useEffect(() => {
    if (user.uid !== '' && user.uid !== null) navigate('/cuenta', { replace: true })
  }, [user, navigate])
  return (
    <main>
      <section className="delimiter">
        {tabToShow === 'login' ? <LoginForm setTabToShow={setTabToShow} /> : <RegisterForm setTabToShow={setTabToShow} />}
      </section>
    </main>
  );
}
