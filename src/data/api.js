// Structured endpoint descriptors. Previously these were free-text strings
// like "POST /predict — description" parsed with split(' — '), which broke
// silently on typos. Keep as objects.
export const inferenceEndpoints = [
  {
    id: 'predict',
    method: 'POST',
    path: '/predict',
    description: 'Single-sample resistance landscape',
  },
  {
    id: 'predict-batch',
    method: 'POST',
    path: '/predict/batch',
    description: 'Batched inference with trace IDs',
  },
  {
    id: 'predict-trajectory',
    method: 'POST',
    path: '/predict/trajectory',
    description: 'Temporal trajectories + state accuracy',
  },
  {
    id: 'targets',
    method: 'GET',
    path: '/targets/{sample_id}',
    description: 'Top intervention targets',
  },
  {
    id: 'landscape',
    method: 'GET',
    path: '/landscape/{sample_id}',
    description: 'Visualization-ready payload',
  },
  {
    id: 'health',
    method: 'GET',
    path: '/health',
    description: 'Model readiness, device, version',
  },
];
