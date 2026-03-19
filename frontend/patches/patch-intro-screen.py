path = 'components/feasibility-test/ui/IntroScreen.tsx'
with open(path) as f:
    content = f.read()

content = content.replace(
    '  onConfirmDisc1: () => void',
    '  onConfirmDisc1: (timestamp: string) => void'
)
content = content.replace(
    '  onConfirmDisc2: () => void',
    '  onConfirmDisc2: (timestamp: string) => void'
)
content = content.replace(
    'onClick={onConfirmDisc1}',
    'onClick={() => onConfirmDisc1(new Date().toISOString())}'
)
content = content.replace(
    'onClick={onConfirmDisc2}',
    'onClick={() => onConfirmDisc2(new Date().toISOString())}'
)

with open(path, 'w') as f:
    f.write(content)
print("Done.")
