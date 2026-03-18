#!/usr/bin/env python3
path = 'components/feasibility-test/ui/CorrectableRow.tsx'
with open(path, 'r') as f:
    content = f.read()

old = """const CATEGORY_ITEMS: Record<string, string[]> = {
  external:   ['light_surface_wear', 'shallow_abrasions'],
  light:      ['window', 'extinction', 'lack_luster'],
  geometry:   ['off_center_culet', 'excessive_depth', 'asymmetry'],
  structural: ['surface_reaching_inclusion', 'deep_abrasions', 'internal_fissure', 'internal_external_void', 'cleavage_plane_risk', 'girdle_chip_fissure'],
}"""

new = """const CATEGORY_ITEMS: Record<string, string[]> = {
  external:   ['light_surface_wear', 'shallow_abrasions'],
  light:      ['opaque_translucent', 'color_zoning', 'extinction', 'lack_luster', 'window'],
  geometry:   ['off_center_culet', 'excessive_depth', 'asymmetry'],
  structural: ['surface_reaching_inclusion', 'deep_abrasions', 'internal_fissure', 'internal_external_void', 'cleavage_plane_risk'],
}"""

content = content.replace(old, new)
with open(path, 'w') as f:
    f.write(content)
print("Done.")

