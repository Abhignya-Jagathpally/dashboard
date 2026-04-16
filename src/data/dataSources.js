// Data sources surfaced in the "Data & Credential Access" section.
// Locked sources open the LockModal when clicked or Enter/Space is pressed.
export const dataSources = [
  { id: 'ccle-prot', name: 'CCLE Proteomics', type: 'Bulk', access: 'Public', size: '1.2 GB' },
  { id: 'ccle-epi', name: 'CCLE Epigenomics', type: 'Bulk', access: 'Public', size: '2.5 GB' },
  { id: 'string-ppi', name: 'STRING PPI v12', type: 'Network', access: 'Public', size: '400 MB' },
  { id: 'gdsc', name: 'GDSC Drug Sensitivity', type: 'Drug Screen', access: 'Public', size: '150 MB' },
  { id: 'ctrpv2', name: 'CTRPv2', type: 'Drug Screen', access: 'Registered', size: '300 MB', locked: true },
  { id: 'gse124310', name: 'GSE124310 scRNA-seq', type: 'Single-cell', access: 'Public', size: '5 GB' },
  { id: 'gse271107', name: 'GSE271107 scRNA-seq', type: 'Single-cell', access: 'Public', size: '8 GB' },
  { id: 'mmrf', name: 'MMRF CoMMpass', type: 'Clinical', access: 'IRB Controlled', size: '50+ GB', locked: true },
];
