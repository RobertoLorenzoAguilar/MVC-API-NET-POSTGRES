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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: modulo; Type: TABLE; Schema: public; Owner: robert
--

CREATE TABLE public.modulo (
    id integer NOT NULL,
    nombre character varying(100) NOT NULL
);


ALTER TABLE public.modulo OWNER TO robert;

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
-- Name: rol; Type: TABLE; Schema: public; Owner: robert
--

CREATE TABLE public.rol (
    id integer NOT NULL,
    nombre character varying(100) NOT NULL
);


ALTER TABLE public.rol OWNER TO robert;

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
-- Name: usuario; Type: TABLE; Schema: public; Owner: robert
--

CREATE TABLE public.usuario (
    id integer NOT NULL,
    nombre character varying(100) NOT NULL,
    correo character varying(100) NOT NULL,
    clave character varying(50),
    rol_id integer
);


ALTER TABLE public.usuario OWNER TO robert;

--
-- Data for Name: modulo; Type: TABLE DATA; Schema: public; Owner: robert
--

COPY public.modulo (id, nombre) FROM stdin;
1	permisos
2	modulos
\.


--
-- Data for Name: permiso; Type: TABLE DATA; Schema: public; Owner: robert
--

COPY public.permiso (id, nombre, descripcion) FROM stdin;
1	leer	leer modulo
2	agregar	agregar en modulo
3	eliminar	elimnar  en modulo
4	actualizar	actualizar en modulo
\.


--
-- Data for Name: rol; Type: TABLE DATA; Schema: public; Owner: robert
--

COPY public.rol (id, nombre) FROM stdin;
1	administrador
\.


--
-- Data for Name: rol_permiso_modulo; Type: TABLE DATA; Schema: public; Owner: robert
--

COPY public.rol_permiso_modulo (id, rol_id, permiso_id, modulo_id) FROM stdin;
1	1	4	2
1	1	2	2
1	1	1	2
1	1	3	2
\.


--
-- Data for Name: usuario; Type: TABLE DATA; Schema: public; Owner: robert
--

COPY public.usuario (id, nombre, correo, clave, rol_id) FROM stdin;
1	roberto	roberto@gmail.com	root	1
\.


--
-- Name: permiso permiso_pk; Type: CONSTRAINT; Schema: public; Owner: robert
--

ALTER TABLE ONLY public.permiso
    ADD CONSTRAINT permiso_pk PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

