import type { NextPage } from "next";
import Head from "next/head";
import { shortenAddress } from "../utils/wallet";

const About: NextPage = () => {
  return (
    <div className="flex w-full justify-center">
      <Head>
        <title>About | Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <article className="prose w-full max-w-none lg:prose-lg lg:max-w-2xl">
        <h1>About</h1>
        <p>
          This blog platform is built with the intention to showcase a way for
          users to upload content in a decentralized way.
        </p>
        <p>It &apos;s built with:</p>
        <ul>
          <li>🖥️ daisyUI + TailwindCSS</li>
          <li>✍️ Next.js</li>
          <li>⛓️ Ethers</li>
          <li>👷 Hardhat</li>
        </ul>

        <p>
          The smart contract is deployed on Mumbai on the address{" "}
          <a
            href={`https://mumbai.polygonscan.com/address/${process.env
              .NEXT_PUBLIC_CONTRACT_ADDRESS!}`}
          >
            {shortenAddress(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!)}
          </a>
          .
        </p>
        <p>
          You can check out the source code{" "}
          <a href="https://github.com/aon/web3-blog">here</a>.
        </p>
        <p>
          If you want to contact me you can find more info on my github{" "}
          <a href="https://github.com/aon">profile</a>!
        </p>
        <p>Thank you for checking out this project. Hope you liked it.</p>
      </article>
    </div>
  );
};

export default About;
