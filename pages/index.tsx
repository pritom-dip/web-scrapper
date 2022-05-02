import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";

const Home: NextPage = () => {
    const [url, setUrl] = useState<string>("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (url) {
            setUrl(e.target.value);
        }
    };

    const handleClick = () => {
        fetch(url)
            .then(res => {
                return res.text();
            })
            .then(async html => {
                const res = await fetch("/api/hello", {
                    method: "POST",
                    body: html,
                });
                await res.json();
            })
            .catch(err => console.log(err));
    };

    const downloadImage = async () => {
        const imageUrl = "";

        const data = await fetch("/api/multiple-download", {
            method: "POST",
            body: `${imageUrl}/img/009/TNDg4NTUxNTRlZTg2MjdhOWQ4NTQ3YTcxZDI3YmQ4ZTJiMWQ3Mw.jpg`,
        });

        await data.json();
    };

    return (
        <div>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "100vh",
                }}
            >
                <input onChange={handleChange} type={"text"} />
                <button onClick={handleClick} style={{ marginTop: "10px" }}>
                    Click
                </button>
                <button onClick={downloadImage}>Download!</button>
            </div>
        </div>
    );
};

export default Home;
