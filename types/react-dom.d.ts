// Minimal types for the one react-dom API used here (createPortal), so the
// project doesn't need an extra @types package. Remove this file if
// @types/react-dom is added to devDependencies.
declare module 'react-dom' {
  import type { ReactNode, ReactPortal } from 'react';
  export function createPortal(
    children: ReactNode,
    container: Element | DocumentFragment,
    key?: string | null
  ): ReactPortal;
}
