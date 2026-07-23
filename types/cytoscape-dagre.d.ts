/**
 * @file    cytoscape-dagre.d.ts
 * @brief   Type declarations for the untyped cytoscape-dagre extension.
 */

declare module 'cytoscape-dagre' {
  import type cytoscape from 'cytoscape';

  const dagre: cytoscape.Ext;
  export default dagre;
}
