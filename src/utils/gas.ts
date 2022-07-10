import axios from "axios";
import { ethers } from "ethers";
import { GasPriority, GasStationResponse } from "../interfaces/gas";

// Function needed due to https://github.com/ethers-io/ethers.js/issues/2828
export const getGasFees = async (priority: GasPriority = "standard") => {
  let maxFeePerGas = ethers.utils.parseUnits("40", "gwei"); // fallback to 40 gwei
  let maxPriorityFeePerGas = ethers.utils.parseUnits("40", "gwei"); // fallback to 40 gwei
  try {
    const { data } = await axios.get<GasStationResponse>(
      "https://gasstation-mumbai.matic.today/v2"
    );
    const gasData = data[priority];
    maxFeePerGas = ethers.utils.parseUnits(gasData.maxFee.toFixed(2), "gwei");
    maxPriorityFeePerGas = ethers.utils.parseUnits(
      gasData.maxPriorityFee.toFixed(2),
      "gwei"
    );
  } catch (error) {
    console.log(
      `Using default gas, failed to get live gas prices: ${JSON.stringify(
        error
      )}`
    );
  }

  return { maxFeePerGas, maxPriorityFeePerGas };
};
