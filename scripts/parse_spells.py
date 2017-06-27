import glob, ast, re

SPELLS_DIRECTORY = "../_posts/*.m*"
IGNORE_FILE = "spells.ignore"

def get_spell_list(ignore_files):
    spell_files = glob.glob(SPELLS_DIRECTORY)
    spell_files = [f for f in spell_files if f not in ignore_files]
    return spell_files

def parse_spell_file(spell_file):
    lines = spell_file.split('\n')

    print lines[2][6:].strip(' ').strip('"')
    print
    
    s = []

    s.append("bard_spell: " + ("bard_spell" if "bard" in lines[5] else "'0'"))
    s.append("cleric_spell: " + ("cleric_spell" if "cleric" in lines[5] else "'0'"))
    s.append("druid_spell: " + ("druid_spell" if "druid" in lines[5] else "'0'"))
    s.append("paladin_spell: " + ("paladin_spell" if "paladin" in lines[5] else "'0'"))
    s.append("ranger_spell: " + ("ranger_spell" if "ranger" in lines[5] else "'0'"))
    s.append("sorcerer_spell: " + ("sorcerer_spell" if "sorcerer" in lines[5] else "'0'"))
    s.append("warlock_spell: " + ("warlock_spell" if "warlock" in lines[5] else "'0'"))
    s.append("wizard_spell: " + ("wizard_spell" if "wizard" in lines[5] else "'0'"))

    school_level = lines[8].lower()
    if 'cantrip' in school_level:
        s.append("level: cantrip")
    elif '1st-level' in school_level:
        s.append("level: 1st_level_spell")
    elif '2nd-level' in school_level:
        s.append("level: 2nd_level_spell")
    elif '3rd-level' in school_level:
        s.append("level: 3rd_level_spell")
    elif '4th-level' in school_level:
        s.append("level: 4th_level_spell")
    elif '5th-level' in school_level:
        s.append("level: 5th_level_spell")
    elif '6th-level' in school_level:
        s.append("level: 6th_level_spell")
    elif '7th-level' in school_level:
        s.append("level: 7th_level_spell")
    elif '8th-level' in school_level:
        s.append("level: 8th_level_spell")
    elif '9th-level' in school_level:
        s.append("level: 9th_level_spell")

    if 'abjuration' in school_level:
        s.append("school: abjuration_school")
    elif 'conjuration' in school_level:
        s.append("school: conjuration_school")
    elif 'divination' in school_level:
        s.append("school: divination_school")
    elif 'enchantment' in school_level:
        s.append("school: enchantment_school")
    elif 'evocation' in school_level:
        s.append("school: evocation_school")
    elif 'illusion' in school_level:
        s.append("school: illusion_school")
    elif 'necromancy' in school_level:
        s.append("school: necromancy_school")
    elif 'transmutation' in school_level:
        s.append("school: transmutation_school")

    s.append("ritual_spell: " + \
             ("ritual_spell" if "ritual" in school_level else "'0'"))

    s.append("casting_time: '" + lines[10][18:] + "'")

    s.append("range: '" + lines[12][11:] + "'")

    components_split = lines[14].split('(')
    components = components_split[0]
    materials = repr(components_split[1].strip(')')) if len(components_split) > 1 else "''"
    s.append("verbal_component: " + \
             ("verbal_component" if 'V' in components else "'0'"))
    s.append("somatic_component: " + \
             ("somatic_component" if 'S' in components else "'0'"))
    s.append("material_component: " + \
             ("material_component" if 'M' in components else "'0'"))
    s.append("material_desc: " + materials)
    s.append("expensive_material_component: " + \
             ("expensive_material_component" if 'gp' in materials else "'0'"))
    s.append("material_component_consumed: " + \
             ("material_component_consumed" if 'consume' in materials else "'0'"))

    s.append("duration: '" + lines[16][14:] + "'")
    s.append("concentration_spell: " + \
             ("concentration_spell" if 'Concentration' in lines[16] else "'0'"))

    desc = []
    at_higher_levels = "at_higher_levels: '0'"
    at_higher_levels_text = "at_higher_levels_text: ''"
    for line in lines[18:]:
        if ("level or higher" in line or
            "spell's damage increases" in line or
            "**At Higher Levels.**" in line):
            at_higher_levels = "at_higher_levels: at_higher_levels"
            text = line.replace("**At Higher Levels.** ", "")
            at_higher_levels_text = "at_higher_levels_text: {}".format(repr(text))
        else:
            desc.append(line)
    formatted_desc = repr('\n'.join(desc).strip('\n')).replace(r"\'", "'")
    formatted_desc = re.sub(r"^'", '"', re.sub(r"'$", '"', formatted_desc))
    s.append('description: {}'.format(formatted_desc))
    s.append(at_higher_levels)
    s.append(at_higher_levels_text)

    if "PHB" in lines[4]:
        s.append("sourcebook: phb")
    elif "DMG" in lines[4]:
        s.append("sourcebook: dmg")
    elif "EE" in lines[4]:
        s.append("sourcebook: ee")
    elif "SCAG" in lines[4]:
        s.append("sourcebook: scag")
    else:
        raise Exception("Unknown sourcebook: {}".format(lines[4]))
    s.append("page: '{}'".format(lines[4].split('.')[1]))

##    print lines
    return '\n'.join(s)

with open(IGNORE_FILE) as f:
    ignore_files = ast.literal_eval(f.read())

spell_list = get_spell_list(ignore_files)

print "Press Enter to start. Press Ctrl+C at any time to exit."
try:
    for s in spell_list:
        print ""
        with open(s) as f:
            print(parse_spell_file(f.read()))
        print
        ignore_files.append(s)
        with open(IGNORE_FILE, 'w') as f:
            f.write(repr(ignore_files))
        raw_input()
except KeyboardInterrupt:
    pass

