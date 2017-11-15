# Post Style Guidelines

Here's a list of code stylistic guidelines for post markdown pages I'd like to be able to follow for future pages on The Grimoire, and eventually get around to editing all previous entries to fit these styles.

Many of these conventions have reason, and many of them are arbitrary and have consistency.

## Capitalization

- Post markdown filenames are lowercase, even if the spell title has capital letters
- The official spell lists usually disagree with the official spell descriptions on how the spell title is capitalized. If there's a conflict, the capitalization used in the spell description is preferred. (Example: *Toll the Dead* is capitalized as such in its description, but it's listed as "Toll the dead" on the Wizard list.)
- Cantrips are capitalized as such: **Necromancy cantrip**
- 1st-level and higher spells are capitalized as such: **4th-level evocation**
- Hyperlinks and other references to spells are capitalized the same way as the spell itself.

## Punctuation Style

- Italics should use *\*asterisks\**. Do not use \_underscores\_ for italics. (This makes the markdown more human-readable.)
- Bold should use **\*\*double asterisks\*\***. Do not use \_\_double underscores\_\_ for bold text. (This makes the markdown more human-readable.)
- If an em-dash (---) and an en-dash (--) both make sense in context, use an em-dash.
- Use smart quotes (i.e. “” or ’) instead of straight quotes (i.e. "" and ') in the main post bodies. Don't do this in post headers or footers.

## Spell References

- Any reference to another spell on The Grimoire should hyperlink to that spell.
- These hyperlinks should be italicized.
- These hyperlinks should not have unnecessary alt text.
- Any reference to the titular spell should be italicized but should not hyperlink to itself.

## Tags

Tags are sorted in this order:

1. Race tags, alphabetically, if applicable.
2. Class tags, alphabetically. Class domain tags count as class tags.
3. The level tag.
4. The ritual tag, if applicable.
5. The school tag.

Example: [Speak with Animals](https://thebombzen.com/grimoire/spells/speak-with-animals): \[barbarian (totem warrior), bard, cleric (nature), druid, paladin (ancients), ranger, level1, ritual, divination\]

Example: [Darkness](https://thebombzen.com/grimoire/spells/darkness): \[elf (drow), elf (mul daya), tiefling, druid (swamp), monk (shadow), paladin (oathbreaker), sorcerer, warlock, wizard, level2, evocation\]

## Whitespace

- Do not indent paragraphs.
- Paragraphs are separated by a blank line. That's two newlines.
- Do not use more than one blank line in a row.
- Use Unix-style line endings. If you are on Windows then configure your git to commit Unix-style line endings.
- Do not have any trailing whitespace. This includes carriage returns.
- There should be exactly one newline at the end of the file.
