import { Coin } from "@/interfaces";
import axios from "axios";

export const fetchData = async (alias: string) => {
  const response = await axios.get(alias);
  const data: Coin[] = response.data;
  return data;
};