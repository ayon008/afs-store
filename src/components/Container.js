// components/Container.js

import { theme } from "../theme";

export default function Container({ children, className = "" }) {
  return (
    <div className={`${theme.paddingHorizontal} ${className}`}>
      {children}
    </div>
  );
}