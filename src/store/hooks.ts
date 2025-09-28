import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "./store";
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector = useSelector;
