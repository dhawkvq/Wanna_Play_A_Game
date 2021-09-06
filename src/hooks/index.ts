import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useReduxState: TypedUseSelectorHook<RootState> = useSelector;
