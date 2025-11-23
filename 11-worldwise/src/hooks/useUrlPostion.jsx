import { useSearchParams } from "react-router-dom";

export function useUrlPostion() {
  // eslint-disable-next-line no-unused-vars
  const [searchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  return [lat, lng];
}
