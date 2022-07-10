export const shortenAddress = (address: string) => {
  const lowerCaseAddress = address.toLowerCase();
  return `${lowerCaseAddress.slice(0, 6)}...${lowerCaseAddress.slice(-4)}`;
};
