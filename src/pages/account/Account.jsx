import { authStore } from "../../stores/authStore";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { CopyButton } from "../../general";

export const Account = () => {
  const { user } = authStore(store => store)
  const navigate = useNavigate()
  // si el usuario no esta logueado redirigir a la pagina de inicio de sesión
  useEffect(() => {
    if (user?.uid === null || user?.uid === '') navigate('/iniciar-sesion', { replace: true })
  }, [user, navigate])
  return (
    <section className="delimiter">
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-1 md:gap-3 mb-4">
        <div>
          <span className="font-semibold">ID</span>
          <CopyButton toCopy={user.uid} />
        </div>
        <div>
          <span className="font-semibold">Nombre</span>
          <CopyButton toCopy={user.name} />
        </div>
        <div>
          <span className="font-semibold">Correo</span>
          <CopyButton toCopy={user.email} />
        </div>
      </div>
    </section>
  );
}
