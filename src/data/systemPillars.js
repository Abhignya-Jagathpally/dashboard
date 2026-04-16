export const systemPillars = [
  {
    id: 'data-quality',
    title: 'Data Quality Pipeline',
    body: 'Profiling, missingness tests, batch effect detection, and MM driver coverage checks to ensure usable cohorts.',
  },
  {
    id: 'mcp',
    title: 'MCP Integration Layer',
    body: 'Connectors for PubMed, ChEMBL, ClinicalTrials.gov, and HuggingFace with rate limiting + TTL caching.',
  },
  {
    id: 'scheduler',
    title: 'Latent Compute Scheduler',
    body: 'Priority-queue orchestration for heavy jobs like ESM-2 embedding and trajectory ensembles.',
  },
  {
    id: 'orchestrator',
    title: 'Agentic Orchestrator',
    body: 'DAG execution with isolated agents, SHA256 hash chain verification, and AgentOps telemetry.',
  },
];
