import glob, ast

SPELLS_DIRECTORY = "../_posts/*.markdown"
IGNORE_FILE = "spells.ignore"

def get_spell_list():
    with open(IGNORE_FILE) as f:
        ignore_files = ast.literal_eval(f.read())

    spell_files = glob.glob(SPELLS_DIRECTORY)
    spell_files = spell_files[:10]
    spell_files = [f for f in spell_files if f not in ignore_files]
    return spell_files

def parse_spell_file(spell_file):
    lines = spell_file.split('\n')
    s = ""

    school_level = lines[8].lower()
    if 'cantrip' in school_level:
        s += "level: Cantrip"
    elif '1st-level' in school_level:
        s += "level: 1st_level_spell"
    elif '2nd-level' in school_level:
        s += "level: 2nd_level_spell"
    elif '3rd-level' in school_level:
        s += "level: 3rd_level_spell"
    elif '4th-level' in school_level:
        s += "level: 4th_level_spell"
    elif '5th-level' in school_level:
        s += "level: 5th_level_spell"
    elif '6th-level' in school_level:
        s += "level: 6th_level_spell"
    elif '7th-level' in school_level:
        s += "level: 7th_level_spell"
    elif '8th-level' in school_level:
        s += "level: 8th_level_spell"
    elif '9th-level' in school_level:
        s += "level: 9th_level_spell"
    s += "\n"

    if 'abjuration' in school_level:
        s += "school: abjuration_school"
    elif 'conjuration' in school_level:
        s += "school: conjuration_school"
    elif 'divination' in school_level:
        s += "school: divination_school"
    elif 'enchantment' in school_level:
        s += "school: enchantment_school"
    elif 'evocation' in school_level:
        s += "school: evocation_school"
    elif 'illusion' in school_level:
        s += "school: illusion_school"
    elif 'necromancy' in school_level:
        s += "school: necromancy_school"
    elif 'transmutation' in school_level:
        s += "school: transmutation_school"
    s += "\n"

    s += "ritual_spell: " + ("ritual_spell" if "ritual" in school_level else "'0'") + '\n'

    s += "casting_time: '" + lines[10][18:] + "'\n"

    s += "range: '" + lines[12][11:] + "'\n"

    components_split = lines[14].split('(')
    components = components_split[0]
    materials = components_split[1].strip(')') if len(components_split) > 1 else "''"
    s += "verbal_component: " + ("verbal_component" if 'V' in components else "'0'") + "\n"
    s += "somatic_component: " + ("somatic_component" if 'S' in components else "'0'") + "\n"
    s += "material_component: " + ("material_component" if 'M' in components else "'0'") + "\n"
    s += "material_desc: " + materials + "\n"
    s += "expensive_material_component: " + \
         ("expensive_material_component" if 'gp' in materials else "'0'") + "\n"
    s += "material_component_consumed: " + \
         ("material_component_consumed" if 'consume' in materials else "'0'") + "\n"

    s += "duration: '" + lines[16][14:] + "'\n"
    s += "concentration_spell: " + \
         ("concentration_spell" if 'Concentration' in lines[16] else "'0'") + "\n"

    print lines
    return s

spell_list = get_spell_list()

print "Press Enter to start. Press Ctrl+C at any time to exit."
try:
    for s in spell_list:
        print ""
        with open(s) as f:
            print(parse_spell_file(f.read()))
        raw_input()
except KeyboardInterrupt:
    pass

