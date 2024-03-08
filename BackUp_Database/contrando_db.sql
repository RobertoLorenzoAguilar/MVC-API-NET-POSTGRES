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

--
-- Name: contrato_db; Type: DATABASE; Schema: -; Owner: robert
--

CREATE DATABASE contrato_db WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Spain.1252';


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
-- Name: modulo; Type: TABLE; Schema: public; Owner: robert
--

CREATE TABLE public.modulo (
    id integer NOT NULL,
    nombre character varying(100) NOT NULL,
    eliminado integer
);


ALTER TABLE public.modulo OWNER TO robert;

--
-- Name: modulo_id_seq; Type: SEQUENCE; Schema: public; Owner: robert
--

ALTER TABLE public.modulo ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.modulo_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


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

ALTER TABLE public.permiso ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.permiso_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


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

ALTER TABLE public.rol ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.rol_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


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

ALTER TABLE public.rol_permiso_modulo ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.rol_permiso_modulo_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: usuario; Type: TABLE; Schema: public; Owner: robert
--

CREATE TABLE public.usuario (
    id integer NOT NULL,
    nombre character varying(100) NOT NULL,
    correo character varying(100) NOT NULL,
    pwd character varying(50),
    rol_id integer,
    telefono character varying
);


ALTER TABLE public.usuario OWNER TO robert;

--
-- Name: usuario_id_seq; Type: SEQUENCE; Schema: public; Owner: robert
--

ALTER TABLE public.usuario ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.usuario_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Data for Name: modulo; Type: TABLE DATA; Schema: public; Owner: robert
--

COPY public.modulo (id, nombre, eliminado) FROM stdin;
2	permisos	1
3	usuarios	1
6	eeeee	0
5	new	0
10	testereeee34fff	0
9	testereeee34	0
8	testereeee	0
1	modulos	1
16	eliminar	0
11	cambiando 1	0
7	tester	0
12	otro 12	0
14	dexter	0
13	otro	0
15	OTRO P2	0
17	nuevo	0
4	roles	1
18	nuevo	1
\.


--
-- Data for Name: permiso; Type: TABLE DATA; Schema: public; Owner: robert
--

COPY public.permiso (id, nombre, descripcion) FROM stdin;
1	leer	leer modulo
2	agregar	agregar modulo
3	eliminar	eliminar modulo
4	actualizar	actualizar modulo
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
1	1	1	1
2	1	2	1
3	1	3	1
4	1	1	2
5	1	2	2
6	1	3	2
7	1	1	3
8	1	2	3
9	1	3	3
10	1	1	4
11	1	4	3
16	1	4	1
18	1	2	2
\.


--
-- Data for Name: usuario; Type: TABLE DATA; Schema: public; Owner: robert
--

COPY public.usuario (id, nombre, correo, pwd, rol_id, telefono) FROM stdin;
3	roberto	roberto@gmail.com	root	1	1234567895
19	prueba	roberto@gmail.com	root	1	6666666666
\.


--
-- Name: modulo_id_seq; Type: SEQUENCE SET; Schema: public; Owner: robert
--

SELECT pg_catalog.setval('public.modulo_id_seq', 18, true);


--
-- Name: permiso_id_seq; Type: SEQUENCE SET; Schema: public; Owner: robert
--

SELECT pg_catalog.setval('public.permiso_id_seq', 4, true);


--
-- Name: rol_id_seq; Type: SEQUENCE SET; Schema: public; Owner: robert
--

SELECT pg_catalog.setval('public.rol_id_seq', 1, true);


--
-- Name: rol_permiso_modulo_id_seq; Type: SEQUENCE SET; Schema: public; Owner: robert
--

SELECT pg_catalog.setval('public.rol_permiso_modulo_id_seq', 18, true);


--
-- Name: usuario_id_seq; Type: SEQUENCE SET; Schema: public; Owner: robert
--

SELECT pg_catalog.setval('public.usuario_id_seq', 19, true);


--
-- Name: modulo modulo_pk; Type: CONSTRAINT; Schema: public; Owner: robert
--

ALTER TABLE ONLY public.modulo
    ADD CONSTRAINT modulo_pk PRIMARY KEY (id);


--
-- Name: permiso permiso_pk; Type: CONSTRAINT; Schema: public; Owner: robert
--

ALTER TABLE ONLY public.permiso
    ADD CONSTRAINT permiso_pk PRIMARY KEY (id);


--
-- Name: rol_permiso_modulo rol_permiso_modulo_pk; Type: CONSTRAINT; Schema: public; Owner: robert
--

ALTER TABLE ONLY public.rol_permiso_modulo
    ADD CONSTRAINT rol_permiso_modulo_pk PRIMARY KEY (id);


--
-- Name: rol rol_pk; Type: CONSTRAINT; Schema: public; Owner: robert
--

ALTER TABLE ONLY public.rol
    ADD CONSTRAINT rol_pk PRIMARY KEY (id);


--
-- Name: usuario usuario_pk; Type: CONSTRAINT; Schema: public; Owner: robert
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_pk PRIMARY KEY (id);


--
-- Name: rol_permiso_modulo rol_permiso_modulo___fk_modulo; Type: FK CONSTRAINT; Schema: public; Owner: robert
--

ALTER TABLE ONLY public.rol_permiso_modulo
    ADD CONSTRAINT rol_permiso_modulo___fk_modulo FOREIGN KEY (modulo_id) REFERENCES public.modulo(id);


--
-- Name: rol_permiso_modulo rol_permiso_modulo___fk_pemiso; Type: FK CONSTRAINT; Schema: public; Owner: robert
--

ALTER TABLE ONLY public.rol_permiso_modulo
    ADD CONSTRAINT rol_permiso_modulo___fk_pemiso FOREIGN KEY (permiso_id) REFERENCES public.permiso(id);


--
-- Name: rol_permiso_modulo rol_permiso_modulo___fk_rol; Type: FK CONSTRAINT; Schema: public; Owner: robert
--

ALTER TABLE ONLY public.rol_permiso_modulo
    ADD CONSTRAINT rol_permiso_modulo___fk_rol FOREIGN KEY (rol_id) REFERENCES public.rol(id);


--
-- Name: usuario usuario___fk; Type: FK CONSTRAINT; Schema: public; Owner: robert
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario___fk FOREIGN KEY (rol_id) REFERENCES public.rol(id);


--
-- PostgreSQL database dump complete
--

