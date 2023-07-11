import type { AuthType } from "../../types/types";

export interface LoginCardProps {
  handleModeChange: (_: AuthType) => void;
}
