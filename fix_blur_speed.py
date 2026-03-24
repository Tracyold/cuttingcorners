f = "./frontend/pages/index.tsx"
s = open(f).read()

s = s.replace(
    "const maxScroll = window.innerHeight;",
    "const maxScroll = window.innerHeight * 2.5;",
)

open(f, "w").write(s)
print("✓ Done")
