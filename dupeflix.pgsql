--
-- PostgreSQL database dump
--

-- Dumped from database version 16rc1
-- Dumped by pg_dump version 16rc1

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
-- Name: dupeflix; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE dupeflix WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';


ALTER DATABASE dupeflix OWNER TO postgres;

\connect dupeflix

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
-- Name: trigger_set_timestamp(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.trigger_set_timestamp() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
NEW.updated_at=now();
RETURN NEW;
END;
$$;


ALTER FUNCTION public.trigger_set_timestamp() OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: list; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.list (
    id bigint NOT NULL,
    title character varying(50) NOT NULL,
    type character varying(50),
    genre text,
    content integer[]
);


ALTER TABLE public.list OWNER TO postgres;

--
-- Name: list_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.list_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.list_id_seq OWNER TO postgres;

--
-- Name: list_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.list_id_seq OWNED BY public.list.id;


--
-- Name: movies; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.movies (
    id bigint NOT NULL,
    title character varying(50) NOT NULL,
    description text,
    img text,
    imgtitle text,
    imgsm text,
    trailer text,
    video text,
    year text,
    agelimit integer,
    movielength time without time zone,
    genre text,
    isseries boolean DEFAULT false
);


ALTER TABLE public.movies OWNER TO postgres;

--
-- Name: movies_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.movies_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.movies_id_seq OWNER TO postgres;

--
-- Name: movies_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.movies_id_seq OWNED BY public.movies.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id bigint NOT NULL,
    username character varying(50) NOT NULL,
    email character varying(50) NOT NULL,
    password text NOT NULL,
    profilepic character varying(50) DEFAULT ' '::character varying,
    isadmin boolean DEFAULT false,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: list id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.list ALTER COLUMN id SET DEFAULT nextval('public.list_id_seq'::regclass);


--
-- Name: movies id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movies ALTER COLUMN id SET DEFAULT nextval('public.movies_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: list; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.list (id, title, type, genre, content) FROM stdin;
29	Classic Sci-Fi Films	movie	Sci-Fi	{97,92,89,88,82,75,73,71,70,68}
31	Summer Action Flix	movie	Action	{126,123,120,117,113,108,107,104,101,98}
28	Popular Sci-Fi films	movie	Sci-Fi	{94,93,90,87,85,80,74,72,69,44}
30	Our Sci-Fi Picks	movie	Sci-Fi	{96,95,91,86,84,83,81,79,78,76}
32	Popular Action Films	movie	Action	{125,121,118,114,111,109,106,103,102,99}
34	Trending Action Movies	movie	Action	{127,124,122,119,116,115,112,110,106,100}
\.


--
-- Data for Name: movies; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.movies (id, title, description, img, imgtitle, imgsm, trailer, video, year, agelimit, movielength, genre, isseries) FROM stdin;
98	The Lord of the Rings: The Fellowship of the Ring	The future of civilization rests in the fate of the One Ring, which has been lost for centuries. Powerful forces are unrelenting in their search for it. But fate has placed it in the hands of a young Hobbit named Frodo Baggins, who inherits the Ring and steps into legend.	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/lordfellowshipbig.jpg	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/lordfellowshiptitle.png	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/lordfellowshipsmall.jpg	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/lordfellowshiptrailer.mp4	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/lordfellowshipvideo.mp4	2001	13	02:58:43	Action	f
76	Star Wars: Episode II - Attack of the Clones	Ten years after the invasion of Naboo, the Galactic Republic is facing a Separatist movement and the former queen and now Senator Padme Amidala travels to Coruscant to vote on a project to create an army to help the Jedi to protect the Republic.	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/starwarsclonebig.jpg	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/starwarsclonetitle.png	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/starwarsclonesmall.jpg	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/starwarstrailer.mp4	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/starwarsvideo.mp4	2002	13	02:01:05	Sci-Fi	f
85	The Matrix	Thomas A. Anderson is a man living two lives. By day he is an average computer programmer and by night a hacker known as Neo. Neo has always questioned his reality, but the truth is far beyond his imagination.	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/matrixbig.png	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/matrixtitle.png	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/matrixsmalls.png	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/matrixtrailer.mp4	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/matrixvideo.mp4	1999	18	02:16:05	Sci-Fi	f
86	The Matrix Reloaded	In this second adventure, Neo and the rebel leaders estimate that they have 72 hours until Zion falls under siege to the Machine Army. Only a matter of hours separates the last human enclave on Earth from 250,000 Sentinels programmed to destroy mankind.	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/matrixreloadbig.jpg	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/matrixreloadtitle.png	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/matrixreloadsmall.jpeg	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/matrixtrailer.mp4	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/matrixvideo.mp4	2003	18	02:18:05	Sci-Fi	f
88	The Matrix Resurrections	Return to a world of two realities: one, everyday life; the other, what lies behind it. To find out if his reality is a construct, to truly know himself, Mr. Anderson will have to choose to follow the white rabbit once more.	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/matrixresbig.jpg	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/matrixrestitle.png	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/matrixressmall.jpg	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/matrixtrailer.mp4	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/matrixvideo.mp4	2021	18	02:28:05	Sci-Fi	f
113	Captain America: Civil War	A possible cure for superheroes deeply divides courageous Captain America and arrogant Tony Stark. Factions of superheroes divide themselves in to Team Captain America and Team Stark. Black Widow and Hawekye must choose sides.	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/captainamerica3big.jpg	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/captainamerica3title.webp	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/captainamerica3small.png	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/captainamerica1trailer.mp4	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/captainamerica1video.mp4	2016	13	02:27:33	Action	f
87	The Matrix Revolutions	In this explosive final chapter of the Matrix trilogy, Neo, Morpheus and Trinity battle to defend Zion, the last real-world city, against the onslaught of the machines that have enslaved the human race.	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/matrixrevolutionbig.png	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/matrixrevolutiontitle.png	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/matrixrevolutionsmall.jpg	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/matrixtrailer.mp4	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/matrixvideo.mp4	2003	18	02:01:05	Sci-Fi	f
35	Kill Bill10	Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a Wookiee and two droids to save the galaxy from the Empire's world-destroying battle station, while also attempting to rescue Princess Leia from the mysterious Darth Vader. WHERE id=72;\n	https://images.pexels.com/photos/6899260/pexels-photo-6899260.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500	https://occ-0-1432-1433.1.nflxso.net/dnm/api/v6/LmEnxtiAuzezXBjYXPuDgfZ4zZQ/AAAABUZdeG1DrMstq-YKHZ-dA-cx2uQN_YbCYx7RABDk0y7F8ZK6nzgCz4bp5qJVgMizPbVpIvXrd4xMBQAuNe0xmuW2WjoeGMDn1cFO.webp?r=df1	https://occ-0-1723-92.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABU7D36jL6KiLG1xI8Xg_cZK-hYQj1L8yRxbQuB0rcLCnAk8AhEK5EM83QI71bRHUm0qOYxonD88gaThgDaPu7NuUfRg.jpg?r=4ee	https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=139&oauth2_token_id=57447761	https://i.imgur.com/jyfbAZJ.mp4	1999	16	00:59:21	Sci-Fi	t
74	Star Wars: Episode VI - Return of the Jedi	The original trilogy concludes with a climactic resolution to the ongoing conflict between the Rebel Alliance and the tyrannical Galactic Empire. As the Rebellion gains momentum, the fate of key characters hangs in the balance.	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/starwarsreturnofjedibig.jpg	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/starwarsreturnofjedititle.png	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/starwarsreturnofjedismall.jpg	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/starwarstrailer.mp4	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/starwarsvideo.mp4	1983	13	02:33:23	Sci-Fi	f
73	Star Wars: Episode V - The Empire Strikes Back	The legendary saga continues as the Rebel Alliance faces increasing challenges from the powerful Galactic Empire. Luke Skywalker, Han Solo, and Princess Leia Organa find themselves confronting new trials that test their courage, friendships, and beliefs.	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/starwarsempirestrikebig.jpg	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/starwarsempirestrikelogo.png	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/starwarsempirestrikesmall.jpg	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/starwarstrailer.mp4	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/starwarsvideo.mp4	1980	13	01:45:03	Sci-Fi	f
72	Star Wars: Episode IV - A New Hope	Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a Wookiee and two droids to save the galaxy from the Empire's world-destroying battle station, while also attempting to rescue Princess Leia from the mysterious Darth Vader.	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/starwarsnewhopebig.jpg	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/starwarsnewhopetitle.png	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/starwarsnewhopesmall.jpg	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/starwarstrailer.mp4	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/starwarsvideo.mp4	1977	13	02:13:03	Sci-Fi	f
71	Interstellar	In Earth's future, a global crop blight and second Dust Bowl are slowly rendering the planet uninhabitable. Professor Brand (Michael Caine), a brilliant NASA physicist, is working on plans to save mankind by transporting Earth's population to a new home via a wormhole.	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/interstellarbig.png	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/interstellarlogo.png	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/interstellarsmall.jpg	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/interstellartrailer.mp4	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/interstellarvideo.mp4	2014	13	02:21:15	Sci-Fi	f
69	Star Trek Into Darkness	When the USS Enterprise crew is called back home, they find an unstoppable force of terror from within their own organization has detonated the fleet and everything it stands for, leaving our world in a state of crisis.	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/startrekintodarkbig.jpg	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/Star_Trek_Into_Darkness_Logo.png	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/startrekintodarksmall.jpg	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/startrektrailer.mp4	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/startrekvideo.mp4	2013	13	02:21:15	Sci-Fi	f
44	The Martian	During a manned mission to Mars, Astronaut Mark Watney is presumed dead after a fierce storm and left behind by his crew. But Watney has survived and finds himself stranded and alone on the hostile planet.	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/martianbig.jpg	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/1280px-The-martian-logo.svg.png	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/martiansmall.webp	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/martiantrailer.mp4	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/martianvideo.mp4	2015	16	02:21:15	Sci-Fi	t
89	Back to the Future	In this 1980s sci-fi classic, small-town California teen Marty McFly (Michael J. Fox) is thrown back into the '50s when an experiment by his eccentric scientist friend Doc Brown (Christopher Lloyd) goes awry.	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/backtofuturebig.png	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/backtofuturetitle.png	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/backtofuturesmall.png	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/backtofuturetrailer.mp4	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/backtofuturevideo.mp4	1985	13	01:56:05	Sci-Fi	f
90	Back to the Future Part II	Marty McFly has only just gotten back from the past, when he is once again picked up by Dr. Emmett Brown and sent through time to the future. Marty's job in the future is to pose as his own son to prevent him from being thrown in prison.	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/backtofuture2big.png	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/backtofuture2title.png	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/backtofuture2small.webp	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/backtofuturetrailer.mp4	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/backtofuturevideo.mp4	1989	13	01:48:34	Sci-Fi	f
106	The Dark Knight Rises	Despite his tarnished reputation after the events of The Dark Knight (2008), in which he took the rap for Dent's crimes, Batman feels compelled to intervene to assist the city and its Police force, which is struggling to cope with Bane's plans to destroy the city.	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/batman3big.png	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/batman3title.png	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/batman3small.png	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/batmantrailer.mp4	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/batmanvideo.mp4	2012	13	02:44:33	Action	f
121	The Expendables	Barney Ross leads the "Expendables", a band of highly skilled mercenaries including knife enthusiast Lee Christmas, martial arts expert Yin Yang, heavy weapons specialist Hale Caesar, demolitionist Toll Road and loose-cannon sniper Gunner Jensen.	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/expendables1big.png	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/theexpendables1title.png	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/expendables1small.jpg	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/expendablestrailer.mp4	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/expendablesvideo.mp4	2010	18	01:43:17	Action	f
91	Back to the Future Part III	Stranded in 1955, Marty McFly learns about the death of Doc Brown in 1885 and must travel back in time to save him. With no fuel readily available for the DeLorean, the two must figure how to escape the Old West before Emmett is murdered.	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/backtofuture3big.png	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/backtofuture3title.png	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/backtofuture3small.jpg	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/backtofuturetrailer.mp4	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/backtofuturevideo.mp4	1999	13	01:58:34	Sci-Fi	f
107	John Wick: Chapter 4	John Wick uncovers a path to defeating The High Table. But before he can earn his freedom, Wick must face off against a new enemy with powerful alliances across the globe and forces that turn old friends into foes.	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/johnwick4big.png	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/johnwick4title.webp	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/johnwick4small.jpg	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/johnwicktrailer.mp4	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/johnwickvideo.mp4	2023	18	02:49:33	Action	f
114	Thor	The reckless Thor (Chris Hemsworth), son of Odin (Sir Anthony Hopkins), challenges his brother Loki's (Tom Hiddleston's) claim to the throne of Asgard. To teach him humility, Odin casts the young warrior down to Earth to live amongst humans.	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/thor1big.jpg	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/thor1title.png	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/thor1small.jpg	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/thortrailer.mp4	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/thorvideo.mp4	2011	13	01:55:33	Action	f
99	The Lord of the Rings: The Two Towers	Sauron's forces increase. His allies grow. The Ringwraiths return in an even more frightening form. Saruman's army of Uruk-hai is ready to launch an assault against Aragorn and the people of Rohan. Yet, the Fellowship is broken and Boromir is dead.	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/lordtwotowerbig.jpg	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/lordtwotitle.png	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/lordtwotowersmall.jpg	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/lordfellowshiptrailer.mp4	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/lordfellowshipvideo.mp4	2002	13	02:59:43	Action	f
122	The Expendables 2	Mr. Church reunites the Expendables for what should be an easy paycheck, but when one of their men is murdered on the job, their quest for revenge puts them deep in enemy territory and up against an unexpected threat.	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/expendables2big.png	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/expendables2title.png	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/expendables2small.jpg	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/expendablestrailer.mp4	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/expendablesvideo.mp4	2012	18	01:43:23	Action	f
127	Guardians of the Galaxy Vol. 3	Still reeling from the loss of Gamora, Peter Quill rallies his team to defend the universe and one of their own - a mission that could mean the end of the Guardians if not successful.	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/guardians3big.png	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/guardians3title.png	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/guardians3small.png	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/guardianstrailer.mp4	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/guardiansvideo.mp4	2023	13	02:30:25	Action	f
92	The Terminator	A human soldier is sent from 2029 to 1984 to stop an almost indestructible cyborg killing machine, sent from the same year, which has been programmed to execute a young woman whose unborn son is the key to humanity's future salvation.	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/terminatorbig.png	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/terminatortitle.png	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/terminatorsmall.jpg	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/terminatortrailer.mp4	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/terminatorvideo.mp4	1984	18	01:47:34	Sci-Fi	f
123	The Expendables 3	Barney augments his team with new blood for a personal battle: to take down Conrad Stonebanks, the Expendables co-founder and notorious arms trader who is hell bent on wiping out Barney and every single one of his associates.	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/expendables3big.png	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/expendables3title.png	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/expendables3small.jpg	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/expendablestrailer.mp4	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/expendablesvideo.mp4	2014	18	02:06:23	Action	f
100	The Lord of the Rings: The Return of the King	The final confrontation between the forces of good and evil fighting for control of the future of Middle-earth. Frodo and Sam reach Mordor in their quest to destroy the One Ring, while Aragorn leads the forces of good against Sauron's evil army at the stone city of Minas Tirith.	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/lordreturnbig.jpg	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/lordreturntitle.png	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/lordreturnsmall.jpg	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/lordfellowshiptrailer.mp4	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/lordfellowshipvideo.mp4	2003	13	03:21:43	Action	f
108	Iron Man	Tony Stark. Genius, billionaire, playboy, philanthropist. Son of legendary inventor and weapons contractor Howard Stark. When Tony Stark is assigned to give a weapons presentation to an Iraqi unit led by Lt. Col. James Rhodes, he's given a ride on enemy lines.	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/ironman1big.png	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/ironman1title.webp	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/ironman1small.webp	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/ironmantrailer.mp4	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/ironmanvideo.mp4	2008	13	02:06:33	Action	f
115	Thor: The Dark World	Thousands of years ago, a race of beings known as Dark Elves tried to send the universe into darkness by using a weapon known as the Aether. Warriors from Asgard stopped them, but their leader Malekith (Christopher Eccleston) escaped to wait for another opportunity.	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/thor2big.jpg	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/thor2title.png	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/thor2small.png	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/thortrailer.mp4	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/thorvideo.mp4	2013	13	01:52:33	Action	f
93	Terminator 2: Judgment Day	Over ten years have passed since the first machine called The Terminator tried to kill Sarah Connor and her unborn son, John. The man who will become the future leader of the human resistance against the Machines is now a healthy young boy.	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/terminator2big.png	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/terminator2title.png	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/terminator2small.jpg	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/terminatortrailer.mp4	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/terminatorvideo.mp4	1991	18	02:17:34	Sci-Fi	f
101	John Wick	With the untimely death of his beloved wife still bitter in his mouth, John Wick, the expert former assassin, receives one final gift from her--a precious keepsake to help John find a new meaning in life now that she is gone.	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/johnwick1big.jpg	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/johnwick1title.png	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/johnwick1small.jpg	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/johnwicktrailer.mp4	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/johnwickvideo.mp4	2014	18	01:41:33	Action	f
109	Iron Man 2	With the world now aware of his dual life as the armored superhero Iron Man, billionaire inventor Tony Stark faces pressure from the government, the press, and the public to share his technology with the military.	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/ironman2big.png	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/ironman2title.png	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/ironman2small.jpg	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/ironmantrailer.mp4	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/ironmanvideo.mp4	2010	13	02:04:33	Action	f
116	Thor: Ragnarok	Imprisoned on the other side of the universe, the mighty Thor (Chris Hemsworth) finds himself in a deadly gladiatorial contest that puts him against The Incredible Hulk (Mark Ruffalo), his former ally and fellow Avenger.	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/thor3big.jpg	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/thor3title.png	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/thor3small.jpg	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/thortrailer.mp4	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/thorvideo.mp4	2017	13	02:10:33	Action	f
124	Expend4bles	The Expendables are sent to Libya to prevent mercenary Suarto Rahmat from stealing nuclear warheads for a mysterious terrorist named Ocelot. The team is led by Barney Ross and formed by members Lee Christmas, Toll Road, and Gunner Jensen, with new members Easy Day and Galan.	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/expendables4big.png	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/expendables4title.webp	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/expendables4small.jpg	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/expendablestrailer.mp4	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/expendablesvideo.mp4	2023	18	01:43:23	Action	f
102	John Wick: Chapter 2	Bound by an inescapable blood debt to the Italian crime lord, Santino D'Antonio, and with his precious 1969 Mustang stolen, John Wick--the taciturn and pitiless assassin who thirsts for seclusion--is forced to visit Italy to honour his promise.	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/johnwick2big.jpg	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/johnwick2title.png	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/johnwick2small.jpg	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/johnwicktrailer.mp4	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/johnwickvideo.mp4	2017	18	02:02:33	Action	f
70	Star Trek Beyond	A surprise attack in outer space forces the Enterprise to crash-land on a mysterious world. The assault came from Krall (Idris Elba), a lizard-like dictator who derives his energy by sucking the life out of his victims.	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/startrekbeyondbig.jpg	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/starktrekbeyondlogo.png	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/startrekbeyondsmall.jpg	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/startrektrailer.mp4	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/startrekvideo.mp4	2016	13	01:54:36	Sci-Fi	f
110	Iron Man 3	Marvel's "Iron Man 3" pits brash-but-brilliant industrialist Tony Stark/Iron Man against an enemy whose reach knows no bounds. When Stark finds his personal world destroyed at his enemy's hands, he embarks on a harrowing quest to find those responsible.	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/ironman3big.jpg	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/ironman3title.png	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/ironman3small.jpg	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/ironmantrailer.mp4	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/ironmanvideo.mp4	2013	13	02:10:33	Action	f
117	Thor: Love and Thunder	The last worshiper of God Rapu, Gorr, crosses the desert with his daughter that dies of thirsty and starvation. He reaches an oasis and sees Rapu that mistreats Gorr. The powerful Necrosword chooses Gorr that beheads Rapu and he promises to kill all the gods.	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/thor4big.jpg	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/thor4title.png	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/thor4small.jpg	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/thortrailer.mp4	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/thorvideo.mp4	2022	13	01:58:33	Action	f
94	Terminator 3: Rise of the Machines	Living off-grid--ten long and challenging years after the encounter with the liquid-metal killer in Terminator 2: Judgment Day (1991)--the resilient survivor and now-23-year-old vagabond, John Connor, knows that these are dark and uncertain times.	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/terminator3big.png	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/terminator3title.png	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/terminator3small.jpg	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/terminatortrailer.mp4	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/terminatorvideo.mp4	2003	18	01:49:34	Sci-Fi	f
125	Guardians of the Galaxy	Scarred for life after surviving a life-altering close encounter of the fourth kind, Peter Quill, aka Star-Lord, now leads a dangerous life as an intergalactic outlaw. And bent on striking it rich, Quill steals the Orb: an alien stone of immense power.	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/guardians1big.png	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/guardians1title.png	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/guardians1small.jpg	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/guardianstrailer.mp4	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/guardiansvideo.mp4	2014	13	02:01:25	Action	f
95	Terminator Salvation	In 2018, a mysterious new weapon in the war against the machines, half-human and half-machine, comes to John Connor on the eve of a resistance attack on Skynet. But whose side is he on, and can he be trusted?	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/terminator4big.png	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/terminator4title.png	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/terminator4small.jpg	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/terminatortrailer.mp4	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/terminatorvideo.mp4	2009	13	01:55:34	Sci-Fi	f
103	John Wick: Chapter 3 - Parabellum	In this third installment of the adrenaline-fueled action franchise, skilled assassin John Wick (Keanu Reeves) returns with a $14 million price tag on his head and an army of bounty-hunting killers on his trail.	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/johnwick3big.jpg	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/johnwick3title.png	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/johnwick3small.jpg	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/johnwicktrailer.mp4	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/johnwickvideo.mp4	2019	18	02:10:33	Action	f
118	Spider-Man	Based on Marvel Comics' superhero character, this is a story of Peter Parker who is a nerdy high-schooler. He was orphaned as a child, bullied by jocks, and can't confess his crush for his stunning neighborhood girl Mary Jane Watson.	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/spiderman1big.jpg	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/spiderman1title.png	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/spiderman1small.jpg	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/spidermantrailer.mp4	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/spidermanvideo.mp4	2002	13	02:01:33	Action	f
78	Star Wars: Episode III - Revenge of the Sith	Discover the true power of the dark side in Star Wars:Episode III-Revenge of the Sith. Years after the onset of the Clone Wars;the noble Jedi Knights lead a massive clone army into a galaxy-wide battle against the Separatists.	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/starwarsrevengebig.jpg	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/starwarsrevengtitle.jpg	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/starwarsrevengesmall.jpg	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/starwarstrailer.mp4	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/starwarsvideo.mp4	2005	13	02:26:05	Sci-Fi	f
68	Star Trek	On the day of James T. Kirk's birth, his father dies on his damaged starship in a last stand against a Romulan mining vessel looking for Ambassador Spock, who in this time, has grown on Vulcan disdained by his neighbors for his half-human heritage.	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/startrekbig.jpg	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/startreklogo.png	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/startreksmall.jpg	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/startrektrailer.mp4	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/startrekvideo.mp4	2009	13	02:01:15	Sci-Fi	f
96	Terminator Genisys	It is 2029. Since 1997 humans have been engaged in a life-or-death struggle with the robots of Skynet. One of the leaders of the human forces is John Connor. He sends Kyle Reese back to 1984 to protect his mother, Sarah Connor.	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/terminator5big.png	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/terminator5title.png	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/terminator5small.png	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/terminatortrailer.mp4	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/terminatorvideo.mp4	2015	13	02:06:34	Sci-Fi	f
104	Batman Begins	As a child, a young Bruce Wayne witnesses the death of his parents at the hands of a crazed criminal. As an adult, Bruce travels the world seeking the means to fight injustice. He lives amongst the boroughs of criminals and thieves in central Asia.	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/batman1big.jpg	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/batman1title.png	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/batman1small.jpeg	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/batmantrailer.mp4	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/batmanvideo.mp4	2005	13	02:20:33	Action	f
111	Captain America: The First Avenger	Steve Rogers, a rejected military soldier, transforms into Captain America after taking a dose of a "Super-Soldier serum". But being Captain America comes at a price as he attempts to take down a warmonger and a terrorist organization.	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/captainamerica1big.jpg	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/captainamerica1title.png	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/captainamerica1small.jpg	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/captainamerica1trailer.mp4	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/captainamerica1video.mp4	2011	13	02:04:33	Action	f
119	Spider-Man 2	After defeating The Green Goblin, Peter Parkers life finally seems to be going well. But things get even harder when he needs to learn to balance his life as Peter Parker with his work & his college and the life of Spider Man fighting crime.	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/spiderman2big.jpg	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/spiderman2title.png	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/spiderman2small.jpg	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/spidermantrailer.mp4	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/spidermanvideo.mp4	2004	13	02:07:43	Action	f
126	Guardians of the Galaxy Vol. 2	After saving Xandar from Ronan's wrath, the Guardians are now recognized as heroes. Now the team must help their leader, Star Lord, uncover the truth behind his true heritage. Along the way, old foes turn to allies and betrayal is blooming.	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/guardians2big.png	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/guardians2title.png	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/guardians2small.jpg	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/guardianstrailer.mp4	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/guardiansvideo.mp4	2017	13	02:16:25	Action	f
83	Star Wars: Episode IX - The Rise of Skywalker	The galaxy is at a crossroads in the final installment of the Skywalker saga. The First Order, now under the shadow of the resurrected Emperor Palpatine, is closing in on the Resistance, and the stakes have never been higher.	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/starwarsrisebig.png	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/starwarsrisetitle.png	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/starwarsrisesmall.jpg	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/starwarstrailer.mp4	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/starwarsvideo.mp4	2019	13	02:21:05	Sci-Fi	f
75	Star Wars: Episode I - The Phantom Menace	Jedi knights Qui-Gon Jinn and Obi-Wan Kenobi find themselves embroiled in a galactic trade dispute that hides a more sinister agenda. During their mission, they encounter a young slave named Anakin Skywalker on the desert planet of Tatooine.	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/starwarsphantombig.jpg	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/starwarsphantomtitle.png	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/starwarsphantomsmall.jpg	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/starwarstrailer.mp4	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/starwarsvideo.mp4	1999	13	02:11:23	Sci-Fi	f
84	Solo: A Star Wars Story	With the emerging demand of hyperfuel and other resources, Han Solo finds himself in the middle of a heist alongside other criminals, where they meet the likes of Chewbacca and Lando Calrissian in an adventurous situation exposing the criminal underworld.	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/starwarssolobig.png	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/starwarssolotitle.png	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/starwarssolosmall.jpg	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/starwarstrailer.mp4	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/starwarsvideo.mp4	2018	13	02:15:05	Sci-Fi	f
82	Star Wars: Episode VIII - The Last Jedi	Jedi Master-in-hiding Luke Skywalker unwillingly attempts to guide young hopeful Rey in the ways of the force, while Leia, former princess turned general, attempts to lead what is left of the Resistance away from the ruthless tyrannical grip of the First Order.	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/starwarslastjedibig.png	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/starwarslastjedititle.png	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/starwarslastjedismall.jpg	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/starwarstrailer.mp4	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/starwarsvideo.mp4	2017	13	02:32:05	Sci-Fi	f
81	Star Wars: Episode VII - The Force Awakens	30 years ago the Empire was defeated and now a new threat, the First Order has risen from the ashes of the Empire. A scavenger called Rey has come into contact with a droid that contains a map to the legendary Luke Skywalker, who has vanished.	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/starwarsforcebig.jpg	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/starwarsforcetitle.png	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/starwarsforcesmall.png	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/starwarstrailer.mp4	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/starwarsvideo.mp4	2015	13	02:18:05	Sci-Fi	f
80	Rogue One: A Star Wars Story	All looks lost for the Rebellion against the Empire as they learn of the existence of a new super weapon, the Death Star. Once a possible weakness in its construction is uncovered, the Rebel Alliance must set out on a desperate mission to steal the plans for the Death Star.	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/starwarsroguebig.jpg	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/starwarsroguetitle.png	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/starwarsroguesmall.jpg	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/starwarstrailer.mp4	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/starwarsvideo.mp4	2016	13	02:13:05	Sci-Fi	f
79	District 9	In 1982, a massive star ship bearing a bedraggled alien population, nicknamed "The Prawns," appeared over Johannesburg, South Africa. Twenty-eight years later, the initial welcome by the human population has faded.	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/district9big.jpg	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/District_9_Logo.png	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/district9small.jpg	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/District9trailer.mp4	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/District9video.mp4	2009	18	01:52:05	Sci-Fi	f
97	Terminator: Dark Fate	A young female Mexican worker, Dani Ramos, is hunted down by a virtually indestructible terminator from the future called a REV-9. However, she is protected by an enhanced human named Grace who is also from the future.	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/terminator6big.png	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/terminator6title.png	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/terminator6small.jpg	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/terminatortrailer.mp4	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/terminatorvideo.mp4	2019	18	02:08:43	Sci-Fi	f
105	The Dark Knight	Gotham's new District Attorney has been elected. His name is Harvey Dent, and he has a radical new agenda that threatens to take down Gotham's organized crime underworld once and for all with an iron fist.	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/batman2big.jpg	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/batman2title.png	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/batman2small.png	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/batmantrailer.mp4	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/batmanvideo.mp4	2008	13	02:32:33	Action	f
112	Captain America: The Winter Soldier	As Steve Rogers struggles to embrace his role in the modern world, he teams up with a fellow Avenger and S.H.I.E.L.D agent, Black Widow, to battle a new threat from history: an assassin known as the Winter Soldier.	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/captainamerica2big.jpg	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/captainamerica2title.png	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/captainamerica2small.jpg	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/captainamerica1trailer.mp4	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/captainamerica1video.mp4	2014	13	02:16:33	Action	f
120	Spider-Man 3	Peter Parker has finally managed to piece together the once-broken parts of his life, maintaining a balance between his relationship with Mary-Jane and his responsibility as Spider-Man. But more challenges arise for our young hero.	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/spiderman3big.jpg	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/spiderman3title.png	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/spiderman3small.jpg	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/spidermantrailer.mp4	https://andrewwonbucket.s3.us-east-2.amazonaws.com/uploads/spidermanvideo.mp4	2007	13	02:19:43	Action	f
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, username, email, password, profilepic, isadmin, created_at, updated_at) FROM stdin;
7	account7	account7@gmail.com	U2FsdGVkX1+3+LnUL9anBe7qOL/ELgC3jmcdDm0uCdA=	 	f	2023-09-30 22:39:40.431295	2023-09-30 22:39:40.431295
8	account8	account8@gmail.com	U2FsdGVkX19T4Y8+5el1tbIYAE39klFlZXIVsgrpNzI=	 	f	2023-09-30 22:39:45.739543	2023-09-30 22:39:45.739543
9	adminAccnt	adminAccnt@gmail.com	U2FsdGVkX18l6BVgXm9QupIUp83LXjHwWdcxJDHnAXg=	 	t	2023-09-30 22:40:04.292034	2023-09-30 22:40:04.292034
1	test2	account1@gmail.com	U2FsdGVkX19Hy7fwEHygJ9W8Ee7jQSJ7V7Sbuj9nem4=	 	f	2023-09-30 22:38:51.498032	2023-09-30 22:38:51.498032
2	account2TS	account2@gmail.com	U2FsdGVkX18n+rU3/35fN2CtCVVDRb+s1nYfPux2ORk=	 	f	2021-09-25 22:30:30.9432	2023-09-30 23:21:40.556664
3	account3	account3@gmail.com	U2FsdGVkX18xQ/KdLrQM8bnlilwgWzyR5XLpr7/ORdc=	 	f	2023-06-24 22:39:20.974506	2023-09-30 23:28:43.193745
4	account4	account4@gmail.com	U2FsdGVkX1+0ck0GuCsrdD31TyzzvSPO6ZuUbAlSxSQ=	 	f	2023-02-24 22:35:20.4506	2023-09-30 23:37:32.103536
5	account5	account5@gmail.com	U2FsdGVkX19U+QQi9zQ2TvWmhW+ivIE2++Fl89BNC4E=	 	f	2023-02-21 16:35:20.4506	2023-09-30 23:37:44.579596
6	account6	account6@gmail.com	U2FsdGVkX18Q8McTOKNwbEmHvdR79DZ6O8yG4h26Y3A=	 	f	2022-08-30 12:35:20.4506	2023-09-30 23:38:03.940602
10	test	test	U2FsdGVkX1/FXqWHJ0nsMvjM/cCwS9hhqMEx5Hmmv8c=	 	f	2023-10-01 12:41:02.386681	2023-10-01 12:41:02.386681
12	test222	test222	U2FsdGVkX19PxldX1i0VVSnFHt4w6qOKtzDLUAeSwqg=	 	f	2023-10-27 22:10:55.444646	2023-10-27 22:10:55.444646
16	test2221234	whyisthistefdasfasdfst	U2FsdGVkX18fE2IOtkxAk+YyQrvz7wEVPO6v+KWFdUI=	 	f	2023-10-27 22:15:37.654324	2023-10-27 22:15:37.654324
17	imdead	pleasework@email	U2FsdGVkX188KhDsHIlZbijdcZPEBAdZm7iPdFvQWNw=	 	f	2023-10-27 22:16:08.296993	2023-10-27 22:16:08.296993
18	testUser	testUser@gmail.com	U2FsdGVkX1/zIT4jyXAPptbvmrZgG8zMUZbN27Yum4A=	 	f	2025-09-21 12:15:50.035853	2025-09-21 12:15:50.035853
\.


--
-- Name: list_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.list_id_seq', 34, true);


--
-- Name: movies_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.movies_id_seq', 127, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 18, true);


--
-- Name: list list_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.list
    ADD CONSTRAINT list_pkey PRIMARY KEY (id);


--
-- Name: list list_title_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.list
    ADD CONSTRAINT list_title_key UNIQUE (title);


--
-- Name: movies movies_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movies
    ADD CONSTRAINT movies_pkey PRIMARY KEY (id);


--
-- Name: movies movies_title_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movies
    ADD CONSTRAINT movies_title_key UNIQUE (title);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: users set_timestamp; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER set_timestamp BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION public.trigger_set_timestamp();


--
-- PostgreSQL database dump complete
--

