# Grimoire

Grimoire is a mobile-friendly 5e spellbook that organizes spell lists by class and level.

See the latest compiled build here: [https://thebombzen.com/grimoire/](https://thebombzen.com/grimoire/)

Grimoire is forked from [ephe/grimoire](https://github.com/ephe/grimoire/), which has since been taken down (à la DMCA).

## Contributing
Feel free to open pull requests or issues on Github for any defects or suggested enhancements you may find. Alternatively, join my public discord at [https://discord.gg/C3WrZ2CAJd](https://discord.gg/C3WrZ2CAJd) and chat with me in `#general`.

If you'd like to submit a Pull Request or somehow contribute code, I recommend you read the [Style Guidelines](https://github.com/thebombzen/grimoire/blob/master/style-guidelines.md). If your submissions do not match this style I'll probably request changes rather than merge it.

## Changelog
* See the commit history. The Grimoire is "done" at this point in that all the spells from the base game have been added (as of mid-to-late 2016).

## To Do
* Find a real home for class specializations (e.g. cleric's domains). Currently, to view spells available to a tempest cleric, one must do a tag search for: cleric | cleric (tempest). This is ulgy and needs fixing.

## Structure
Spells can be found inside `_posts/`. Each spell gets its own post, written and stored as a [Markdown](https://daringfireball.net/projects/markdown/basics) file. The date is arbitrary and never displayed, but still necessary for [Jekyll](https://jekyllrb.com) to process the posts properly.

If you'd like to help fill out the rest of the spells from the PHB or another source, for each new spell you make:

1. Make a new post inside `_posts/` for each new spell, and copy the formatting from another spell.
2. Submit a pull request for the spell(s) when you're finished, and that's it! Thank you so much. :)

## Build Instructions
I've edited _config.yml for my own build purposes, but if you've got [Jekyll](https://jekyllrb.com) set up locally, the following should create the build from your friendly command line terminal:
`jekyll serve -Vw --no-watch --baseurl ""`

## Thanks

Cleric and wizard spells from the Starter Kit were seeded from [this Reddit post](https://www.reddit.com/r/DnD/comments/2a7wau/5e_cleric_and_wizard_spells_sorted_by_level/).

Thanks to [@sethxd](https://github.com/sethxd/) for suggesting [Jets.js](https://jets.js.org/), a CSS search engine that plays nicely with Jekyll.

Thanks to [@ephe](https://github.com/ephe/) for writing the original version of this thing in the first place.

Thanks to [@Eikrem63](https://github.com/Eikrem63), [@duatharben](https://github.com/duatharben), and [@MrRelik](https://github.com/MrRelik) for their work in adding spells from supplemental materials.
