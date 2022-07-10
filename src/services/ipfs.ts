import { PostContent } from "../interfaces/post";
import { ipfsURI, pinataIpfsURI } from "../utils/constants";
import axios from "axios";
import FormData from "form-data";
import { AuthorizationHeader } from "./pinata";

export const fetchPostContent = async (hash: string) => {
  const response = await axios.get<PostContent>(getUrl(hash));
  return response.data;
};

export const getUrl = (hash: string) => {
  return `${ipfsURI}/${hash}`;
};

export const upload = async (file: File | string) => {
  let data;
  const config: {
    url: string;
    data: any;
    headers: { [header: string]: string };
  } = {
    url: "",
    data: "",
    headers: { ...AuthorizationHeader },
  };

  if (typeof file === "string") {
    data = {
      pinataOptions: {
        cidVersion: 1,
      },
      pinataContent: file,
    };
    config.url = `${pinataIpfsURI}/pinJSONToIPFS`;
    config.data = data;
    config.headers["Content-Type"] = "application/json";
  } else {
    data = new FormData();
    data.append("file", file);
    data.append("pinataOptions", '{"cidVersion": 1}');
    config.url = `${pinataIpfsURI}/pinFileToIPFS`;
    config.data = data;
  }

  const res = await axios.post<{
    IpfsHash: string;
    PinSize: number;
    Timestamp: string;
  }>(config.url, config.data, { headers: config.headers });
  return res.data.IpfsHash;
};

export const update = async (file: File | string, oldCid: string) => {
  const [cid] = await Promise.all([upload(file), unpin(oldCid)]);
  return cid;
};

export const pin = async (cid: string) => {
  await axios.post(
    `${pinataIpfsURI}/pinByHash`,
    { hashToPin: cid },
    { headers: { ...AuthorizationHeader } }
  );
};

export const unpin = async (cid: string) => {
  await axios.delete(`${pinataIpfsURI}/unpin/${cid}`, {
    headers: { ...AuthorizationHeader },
  });
};
