--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2
-- Dumped by pg_dump version 16.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE contrato_db;
--
-- Name: contrato_db; Type: DATABASE; Schema: -; Owner: robert
--

CREATE DATABASE contrato_db WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Mexico.1252';


ALTER DATABASE contrato_db OWNER TO robert;

\connect contrato_db

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: PerfilPermisos; Type: TABLE; Schema: public; Owner: robert
--

CREATE TABLE public."PerfilPermisos" (
    id integer NOT NULL,
    nombre character varying(100),
    descripcion character varying(100)
);


ALTER TABLE public."PerfilPermisos" OWNER TO robert;

--
-- Name: modulo; Type: TABLE; Schema: public; Owner: robert
--

CREATE TABLE public.modulo (
    id integer NOT NULL,
    nombre character varying(100) NOT NULL
);


ALTER TABLE public.modulo OWNER TO robert;

--
-- Name: modulo_id_seq; Type: SEQUENCE; Schema: public; Owner: robert
--

CREATE SEQUENCE public.modulo_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.modulo_id_seq OWNER TO robert;

--
-- Name: modulo_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: robert
--

ALTER SEQUENCE public.modulo_id_seq OWNED BY public.modulo.id;


--
-- Name: permiso; Type: TABLE; Schema: public; Owner: robert
--

CREATE TABLE public.permiso (
    id integer NOT NULL,
    nombre character varying(100) NOT NULL,
    descripcion text
);


ALTER TABLE public.permiso OWNER TO robert;

--
-- Name: permiso_id_seq; Type: SEQUENCE; Schema: public; Owner: robert
--

CREATE SEQUENCE public.permiso_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.permiso_id_seq OWNER TO robert;

--
-- Name: permiso_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: robert
--

ALTER SEQUENCE public.permiso_id_seq OWNED BY public.permiso.id;


--
-- Name: rol; Type: TABLE; Schema: public; Owner: robert
--

CREATE TABLE public.rol (
    id integer NOT NULL,
    nombre character varying(100) NOT NULL
);


ALTER TABLE public.rol OWNER TO robert;

--
-- Name: rol_id_seq; Type: SEQUENCE; Schema: public; Owner: robert
--

CREATE SEQUENCE public.rol_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.rol_id_seq OWNER TO robert;

--
-- Name: rol_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: robert
--

ALTER SEQUENCE public.rol_id_seq OWNED BY public.rol.id;


--
-- Name: rol_permiso_modulo; Type: TABLE; Schema: public; Owner: robert
--

CREATE TABLE public.rol_permiso_modulo (
    id integer NOT NULL,
    rol_id integer NOT NULL,
    permiso_id integer NOT NULL,
    modulo_id integer NOT NULL
);


ALTER TABLE public.rol_permiso_modulo OWNER TO robert;

--
-- Name: rol_permiso_modulo_id_seq; Type: SEQUENCE; Schema: public; Owner: robert
--

CREATE SEQUENCE public.rol_permiso_modulo_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.rol_permiso_modulo_id_seq OWNER TO robert;

--
-- Name: rol_permiso_modulo_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: robert
--

ALTER SEQUENCE public.rol_permiso_modulo_id_seq OWNED BY public.rol_permiso_modulo.id;


--
-- Name: usuario; Type: TABLE; Schema: public; Owner: robert
--

CREATE TABLE public.usuario (
    id integer NOT NULL,
    nombre character varying(100) NOT NULL,
    correo character varying(100) NOT NULL,
    clave character varying(50)
);


ALTER TABLE public.usuario OWNER TO robert;

--
-- Name: usuario_id_seq; Type: SEQUENCE; Schema: public; Owner: robert
--

CREATE SEQUENCE public.usuario_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.usuario_id_seq OWNER TO robert;

--
-- Name: usuario_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: robert
--

ALTER SEQUENCE public.usuario_id_seq OWNED BY public.usuario.id;


--
-- Name: usuario_rol; Type: TABLE; Schema: public; Owner: robert
--

CREATE TABLE public.usuario_rol (
    id integer NOT NULL,
    usuario_id integer NOT NULL,
    rol_id integer NOT NULL
);


ALTER TABLE public.usuario_rol OWNER TO robert;

--
-- Name: usuario_rol_id_seq; Type: SEQUENCE; Schema: public; Owner: robert
--

CREATE SEQUENCE public.usuario_rol_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.usuario_rol_id_seq OWNER TO robert;

--
-- Name: usuario_rol_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: robert
--

ALTER SEQUENCE public.usuario_rol_id_seq OWNED BY public.usuario_rol.id;


--
-- Name: modulo id; Type: DEFAULT; Schema: public; Owner: robert
--

ALTER TABLE ONLY public.modulo ALTER COLUMN id SET DEFAULT nextval('public.modulo_id_seq'::regclass);


--
-- Name: permiso id; Type: DEFAULT; Schema: public; Owner: robert
--

ALTER TABLE ONLY public.permiso ALTER COLUMN id SET DEFAULT nextval('public.permiso_id_seq'::regclass);


--
-- Name: rol id; Type: DEFAULT; Schema: public; Owner: robert
--

ALTER TABLE ONLY public.rol ALTER COLUMN id SET DEFAULT nextval('public.rol_id_seq'::regclass);


--
-- Name: rol_permiso_modulo id; Type: DEFAULT; Schema: public; Owner: robert
--

ALTER TABLE ONLY public.rol_permiso_modulo ALTER COLUMN id SET DEFAULT nextval('public.rol_permiso_modulo_id_seq'::regclass);


--
-- Name: usuario id; Type: DEFAULT; Schema: public; Owner: robert
--

ALTER TABLE ONLY public.usuario ALTER COLUMN id SET DEFAULT nextval('public.usuario_id_seq'::regclass);


--
-- Name: usuario_rol id; Type: DEFAULT; Schema: public; Owner: robert
--

ALTER TABLE ONLY public.usuario_rol ALTER COLUMN id SET DEFAULT nextval('public.usuario_rol_id_seq'::regclass);


--
-- Data for Name: PerfilPermisos; Type: TABLE DATA; Schema: public; Owner: robert
--

COPY public."PerfilPermisos" (id, nombre, descripcion) FROM stdin;
\.


--
-- Data for Name: modulo; Type: TABLE DATA; Schema: public; Owner: robert
--

COPY public.modulo (id, nombre) FROM stdin;
\.


--
-- Data for Name: permiso; Type: TABLE DATA; Schema: public; Owner: robert
--

COPY public.permiso (id, nombre, descripcion) FROM stdin;
\.


--
-- Data for Name: rol; Type: TABLE DATA; Schema: public; Owner: robert
--

COPY public.rol (id, nombre) FROM stdin;
\.


--
-- Data for Name: rol_permiso_modulo; Type: TABLE DATA; Schema: public; Owner: robert
--

COPY public.rol_permiso_modulo (id, rol_id, permiso_id, modulo_id) FROM stdin;
\.


--
-- Data for Name: usuario; Type: TABLE DATA; Schema: public; Owner: robert
--

COPY public.usuario (id, nombre, correo, clave) FROM stdin;
\.


--
-- Data for Name: usuario_rol; Type: TABLE DATA; Schema: public; Owner: robert
--

COPY public.usuario_rol (id, usuario_id, rol_id) FROM stdin;
\.


--
-- Name: modulo_id_seq; Type: SEQUENCE SET; Schema: public; Owner: robert
--

SELECT pg_catalog.setval('public.modulo_id_seq', 1, false);


--
-- Name: permiso_id_seq; Type: SEQUENCE SET; Schema: public; Owner: robert
--

SELECT pg_catalog.setval('public.permiso_id_seq', 1, false);


--
-- Name: rol_id_seq; Type: SEQUENCE SET; Schema: public; Owner: robert
--

SELECT pg_catalog.setval('public.rol_id_seq', 1, false);


--
-- Name: rol_permiso_modulo_id_seq; Type: SEQUENCE SET; Schema: public; Owner: robert
--

SELECT pg_catalog.setval('public.rol_permiso_modulo_id_seq', 1, false);


--
-- Name: usuario_id_seq; Type: SEQUENCE SET; Schema: public; Owner: robert
--

SELECT pg_catalog.setval('public.usuario_id_seq', 1, false);


--
-- Name: usuario_rol_id_seq; Type: SEQUENCE SET; Schema: public; Owner: robert
--

SELECT pg_catalog.setval('public.usuario_rol_id_seq', 1, false);


--
-- PostgreSQL database dump complete
--

