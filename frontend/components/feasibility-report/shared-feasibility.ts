export const precut = {
  id: 'CCG-2024-0317',
  date: 'March 7, 2026',
  analyst: 'M. Reynolds',
  clientName: 'Sample Client',
  stoneId: 'INT-0317-A',

  stone: {
    currentWeight: '4.82 ct',
    measurements: '9.4 x 7.1 x 5.8 mm',
    currentShapeStyle: 'Oval Mixed Cut — Poor Make',
    orientationReference: '12 o\'clock = longest axis, table up',
  },

  condition: {
    surfaceCondition: 'Moderate Damage',
    structuralStability: 'Mostly Stable',
    intakeNotes: 'Moderate surface abrasion across primary facets. Minor chip at girdle edge at 7 o\'clock. No through-fractures detected. Needle inclusions present in pavilion — assessed as non-threatening to structural integrity under standard cutting pressure.',
  },

  symbolLegend: [
    { symbol: '○', type: 'Internal', desc: 'Crystal inclusion' },
    { symbol: '•', type: 'Internal', desc: 'Pinpoint' },
    { symbol: '◇', type: 'Internal', desc: 'Inclusion cluster / cloud' },
    { symbol: '╱', type: 'Structural', desc: 'Fracture / feather' },
    { symbol: '≈', type: 'Structural', desc: 'Stress zone' },
    { symbol: '△', type: 'Surface', desc: 'Chip / nick' },
    { symbol: '~', type: 'Surface', desc: 'Abrasion / wear' },
    { symbol: '□', type: 'Surface', desc: 'Cavity / pit' },
    { symbol: '▭', type: 'Surface', desc: 'Girdle damage' },
    { symbol: '⊘', type: 'Structural', desc: 'Hollow / open fracture' },
  ],

  structuralTable: [
    { feature: 'Surface abrasion', location: 'Table + upper crown facets', severity: 'Moderate', view: 'C', note: 'Surface only — repolish will resolve' },
    { feature: 'Chip', location: 'Girdle, 7 o\'clock', severity: 'Minor', view: 'C', note: 'Girdle re-establishment required' },
    { feature: 'Needle inclusion cluster', location: 'Pavilion, 3 o\'clock zone', severity: 'Minor', view: 'P', note: 'Below cutting risk threshold — monitor during pavilion work' },
    { feature: 'Stress zone', location: 'Pavilion, 4–5 o\'clock', severity: 'Minor', view: 'P', note: 'Avoid direct pressure at this zone during early stages' },
  ],

  sideProfile: 'Crown height low relative to overall depth. Girdle thickness uneven — slightly thicker at 3–9 axis. No depth-threatening structural features from profile. Pavilion depth workable for corrective recut.',

  recovery: {
    low: 38,
    high: 49,
    basis: 'Minor corrective recut',
    notes: 'Weight loss driven by surface damage removal and girdle re-establishment. Needle inclusions below cutting risk threshold and not expected to affect yield.',
  },

  conditionals: [
    'No additional stress planes appear after material removal begins',
    'Needle inclusions do not extend deeper than currently visible',
    'No hidden hollow or fluid-filled fractures are exposed during pavilion work',
    'Damage removal remains limited to currently assessed boundaries',
  ],

  options: [
    { label: 'A — Minimal', desc: 'Repolish only. Remove surface abrasion, re-cut girdle edge chip. No change to cutting style or angles. Estimated yield: 80–84%.' },
    { label: 'B — Corrective', desc: 'Recut to correct make. Improve symmetry, re-establish pavilion angles for correct light return, repolish all facets. Estimated yield: 74–80%. Recommended.' },
    { label: 'C — Full Recut', desc: 'New cut style. Optimize for optical performance. Oval or cushion recommended. Maximum light return. Estimated yield: 72–76%. Longest lead time.' },
  ],

  summary: {
    assessment: 'Stone presents well for recutting. No structural threats to the cutting process identified. Primary opportunity is in correcting make to improve optical performance.',
    recommendation: 'Option B recommended as the balance of yield and optical improvement.',
  },

  analystNotes: 'Examined under 10x loupe and fiber optic lighting. Needle inclusions assessed under magnification — benign, below cutting risk threshold. Stress zone at 4–5 o\'clock pavilion noted; approach should account for this during early pavilion stages. Inclusions will remain visible under magnification post-cut. This report is an opinion only and does not guarantee outcome.',
};

export const postcut = {
  originalReportId: 'CCG-2024-0317',
  id: 'CCG-2024-0317-PC',
  date: 'March 21, 2026',
  analyst: 'M. Reynolds',
  clientName: 'Sample Client',
  stoneId: 'INT-0317-A',

  overview: {
    originalWeight: '4.82 ct',
    finalWeight: '3.94 ct',
    weightLoss: '0.88 ct',
    yieldPercent: '81.7%',
    originalMeasurements: '9.4 x 7.1 x 5.8 mm',
    finalMeasurements: '8.6 x 6.8 x 4.9 mm',
    originalShapeStyle: 'Oval Mixed Cut — Poor Make',
    finalShapeStyle: 'Oval Brilliant — Corrective Recut',
  },

  beforeAfter: {
    objectives: [
      'Surface damage removal',
      'Symmetry correction',
      'Optical performance improvement',
    ],
    summaryNotes: 'All primary objectives achieved within projected yield range. Stone responded well to corrective recutting. No new structural features exposed during material removal.',
  },

  changeTable: [
    { feature: 'Surface abrasion (table + crown)', action: 'Full repolish — all crown facets', result: 'Resolved' },
    { feature: 'Girdle chip, 7 o\'clock', action: 'Girdle re-establishment', result: 'Resolved' },
    { feature: 'Poor pavilion angles', action: 'Pavilion re-cut to correct angles', result: 'Resolved' },
    { feature: 'Symmetry deviation', action: 'Meet-point correction across all mains', result: 'Improved' },
    { feature: 'Needle inclusions', action: 'No action — below risk threshold', result: 'Left Intact' },
  ],

  structuralOutcome: {
    damageRemoved: 'All surface abrasion resolved across table and crown. Girdle chip at 7 o\'clock resolved through girdle re-establishment.',
    remainingFeatures: 'Needle inclusion cluster in pavilion remains. Assessed as benign — no structural risk. Visible under 10x magnification only.',
    newlyExposed: 'None. No new structural features encountered during material removal.',
    stability: 'Improved Stability',
  },

  optical: [
    { aspect: 'Brightness Change', rating: 'Significantly Improved', note: 'Strong light return across all viewing angles post-recut' },
    { aspect: 'Symmetry', rating: 'Major Improvement', note: 'Minor deviation in two star facets — within acceptable tolerance' },
    { aspect: 'Windowing', rating: 'Eliminated', note: 'Full extinction achieved at standard viewing angles' },
    { aspect: 'Overall Optical Performance', rating: 'Significantly Improved', note: 'Corrective recut achieved intended optical result' },
  ],

  weightChange: {
    original: '4.82 ct',
    final: '3.94 ct',
    removed: '0.88 ct',
    yieldPercent: '81.7%',
    category: 'High Yield (80–90%)',
  },

  finalNotes: 'Cutting completed per Option B — Corrective Recut. Stone returned in original client packaging with full documentation. Photography completed before and after. No deviations from agreed scope.',

  documentation: {
    beforePhotos: 'Yes',
    afterPhotos: 'Yes',
    plotMaps: 'Yes',
    clientApproval: 'Yes',
  },
};

export const useCases = [
  { title: 'Before You Commit', body: 'Understand what a recut will actually involve — surface damage, structural concerns, estimated yield, and options. Not guesswork.' },
  { title: 'Resale with Documentation', body: 'A stone with a formal recutting record is a more credible listing. Give a buyer the condition history and what was done to it.' },
  { title: 'Second Opinion', body: 'Independent documentation of a cutting recommendation before committing to another cutter\'s plan.' },
  { title: 'Intake Documentation', body: 'Establish clear expectations with your client before work begins. The post-cut report closes the record.' },
];

export const valueProps = [
  { n: '01', title: 'Before We Touch Your Stone', body: 'The pre-cut report documents condition, surface damage, structural concerns, and estimated yield range before any work begins.' },
  { n: '02', title: 'An Opinion, Not an Authority', body: 'These reports are analytical opinions for recutting decisions only. Not lab reports, not identifications, not valuations.' },
  { n: '03', title: 'Standalone or Bundled', body: 'Available as a standalone document for second opinions or intake use — or included with any CCG cutting service.' },
];
