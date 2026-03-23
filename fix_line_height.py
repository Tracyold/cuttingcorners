f = "./frontend/styles/globals.css"
s = open(f).read()

s = s.replace("  line-height: 1.8;", "  line-height: 1.1;")

open(f, "w").write(s)
print("✓ Done")
