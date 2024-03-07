import React from 'react'
import { emptyRequest, getRequest, postRequest } from '../constants/requests'
import { useHttp } from './useHttp'
import { useApp } from './useApp'
import { Modal } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { useNavigate } from "react-router-dom";

const AuthContext = React.createContext()
const empty = emptyRequest()

export function AuthProvider (props) {
  const { token, setToken } = useApp()
  const [email, setEmail] = React.useState("");
  const [sessionRequest, setSessionRequest] = React.useState(empty)
  const [userRequest, setUserRequest] = React.useState(empty)
  const [session, sessionLoading] = useHttp(sessionRequest)
  const [userResponse, userResponseLoading, userError] = useHttp(userRequest)
  const navigate = useNavigate();

  const signIn = React.useCallback(async (correo, password) => {
    try {
      if (correo !== '' && password !== '') {
        setEmail(correo);
        const req = postRequest('iniciar-sesion', {
          correo: correo,
          clave: password,
        })
        setSessionRequest({ ...req })
      }
    } catch (e) {
      console.log(e)
    }
  }, [])

  const signOut = React.useCallback(async () => {
    try {
      Modal.confirm({
        title: 'Atención',
        icon: <ExclamationCircleOutlined/>,
        content: '¿Estás seguro de que deseas cerrar sesión?',
        okText: 'Cerrar sesión',
        cancelText: 'Cancelar',
        onOk: async () => {
          setToken(null)
          setSessionRequest(empty)
          localStorage.clear()
          setUserRequest(empty)
          navigate("/");
        },
      })
    } catch (e) {
      console.error(e)
    }
  }, [navigate, setToken])

  const memData = React.useMemo(() => {
    return {
      email,
      session: session,
      sessionLoading: sessionLoading,
      user: userResponse?.resultado[0],
      userLoading: userResponseLoading,
      userError: userError,
      signIn,
      signOut,
    }
  }, [email, 
    session, 
    sessionLoading, 
    userResponse?.resultado, 
    userResponseLoading, 
    userError, 
    signIn, 
    signOut
  ])

  React.useEffect(() => {
    if (session && !sessionLoading) {
      if (session?.detalle) {
        setToken(session?.detalle?.token)
      }
    }
  }, [session, sessionLoading, setToken])

  React.useEffect(() => {
    if (token) {
      const agendaReq = getRequest('perfil?expand=permisos,estatusPermiso')
      setUserRequest(() => agendaReq)
    } else {
      setUserRequest(empty)
    }
  }, [token])

  return <AuthContext.Provider value={memData} {...props} />
}

export function useAuth () {
  const context = React.useContext(AuthContext)
  if (!context) {
    // eslint-disable-next-line no-throw-literal
    throw 'error: auth context not defined.'
  }
  return context
}