# ── Patch 1: Add selection props to WizardScreen's ResultsDisplay call ──

path = 'components/feasibility-test/ui/WizardScreen.tsx'
with open(path) as f:
    content = f.read()

content = content.replace(
"          <ResultsDisplay\n            results={results}\n            weightCt={parseFloat(stoneInfo.weightCt) || 0}\n            stoneInfo={stoneInfo}\n            onStartOver={handleStartOver}\n            onRequestQuote={handleRequestQuote}\n          />",
"          <ResultsDisplay\n            results={results}\n            weightCt={parseFloat(stoneInfo.weightCt) || 0}\n            stoneInfo={stoneInfo}\n            positiveSelections={Array.from(positiveChecked)}\n            limitingSelections={Array.from(limitingChecked)}\n            structuralSelections={Array.from(structuralChecked)}\n            correctableSelections={correctableSelections as Record<string, string | null>}\n            onStartOver={handleStartOver}\n            onRequestQuote={handleRequestQuote}\n          />"
)

with open(path, 'w') as f:
    f.write(content)
print("WizardScreen.tsx patched.")

# ── Patch 2: Add selection props to ResultsDisplay interface + savePayload ──

path2 = 'components/feasibility-test/ui/ResultsDisplay.tsx'
with open(path2) as f:
    content = f.read()

# Add props to interface

content = content.replace(
"interface ResultsDisplayProps {\n  results:        ScoreBreakdown\n  weightCt:       number\n  stoneInfo:      StoneInfo\n  onStartOver:    () => void\n  onRequestQuote: () => void\n}",
"interface ResultsDisplayProps {\n  results:               ScoreBreakdown\n  weightCt:              number\n  stoneInfo:             StoneInfo\n  positiveSelections:    string[]\n  limitingSelections:    string[]\n  structuralSelections:  string[]\n  correctableSelections: Record<string, string | null>\n  onStartOver:           () => void\n  onRequestQuote:        () => void\n}"
)

# Update function signature

content = content.replace(
"export default function ResultsDisplay({ results, weightCt, stoneInfo, onStartOver, onRequestQuote }: ResultsDisplayProps) {",
"export default function ResultsDisplay({ results, weightCt, stoneInfo, positiveSelections, limitingSelections, structuralSelections, correctableSelections, onStartOver, onRequestQuote }: ResultsDisplayProps) {"
)

# Update savePayload to use real selections

content = content.replace(
"  const savePayload = {\n    stoneInfo,\n    positiveSelections:    [],\n    limitingSelections:    [],\n    structuralSelections:  [],\n    correctableSelections: {},\n    results,\n  }",
"  const savePayload = {\n    stoneInfo,\n    positiveSelections,\n    limitingSelections,\n    structuralSelections,\n    correctableSelections,\n    results,\n  }"
)

# Fix print CSS — force light background and dark text for PDF

old_print = """        @media print {
body * { visibility: hidden; }
.ccg-results, .ccg-results * { visibility: visible; }
.ccg-results {
position: fixed; inset: 0;
padding: 40px 48px;
background: #0c0a09 !important;
color: #e7e5e4 !important;
display: flex; flex-direction: column; gap: 24px;
}
.ccg-no-print { display: none !important; }
* { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
}"""

new_print = """        @media print {
body { background: white !important; }
body * { visibility: hidden; color: #111 !important; }
.ccg-results, .ccg-results * { visibility: visible; }
.ccg-results {
position: fixed; inset: 0;
padding: 40px 48px;
background: white !important;
color: #111 !important;
display: flex; flex-direction: column; gap: 24px;
}
.ccg-no-print { display: none !important; }
* { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
}"""

content = content.replace(old_print, new_print)

with open(path2, 'w') as f:
    f.write(content)
print("ResultsDisplay.tsx patched.")