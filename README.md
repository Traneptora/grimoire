# Grimoire

Grimoire is a mobile-friendly 5e spellbook that organizes spell lists by class and level.

See the latest compiled build here: [http://ephe.github.io/grimoire/](http://ephe.github.io/grimoire/)

## Changelog
* 3/2/16: Pushed a new build with the most recent batch of bugfixes.
* 2/22/16: Oops, have been merging typo fixes periodically. Merging in some more!
* 12/17/15: Merged in more typo fixes, and spells from Sword Coast Adventurer's Guide.
* 12/1/15: Merged in more typo fixes, and the rest of the spells from the Elemental Evil Player's Companion.
* 11/1/15: Merged in typo fixes, and some spells added from the Elemental Evil Player's Companion.
* 10/19/15: Fixed Arcane Gate and Antilife Shell, and integrated [Jets.js](http://nexts.github.io/Jets.js/) into the main and class pages.
* 8/8/15: Merged the rest of the spells in, started adding links to spell references, and pushed a new build. Thanks everyone!
* 6/8/15: Merged pull requests and pushed a new build.
* 5/29/15: Merged pull requests and pushed a new build. Thanks, y'all!
* 5/1/15: Many belated spell additions, thanks to @jayrab, @zetsevs, and @LukasCaller. Also table styles for web, though no real mobile support yet.
* 1/1/15: Merged in several level 3 and level 4 spells, thanks to @jayrab, @zetsevs, and @LukasCaller.
* 12/31/14: Added Cleric level 2 spells from the starter kit, merged in some bard spells from jayrab.
* 9/30/14: Added rest of Wizard level 1 spells.
* 9/26/14: Added Sorcerer and Warlock cantrips, and Ranger, Sorcerer and Warlock level 1 spells. Also Remove Curse and the level 3 category. Spell level links on spell pages now go to the level subsection in the full spell list (home) instead of a broken subpage.
* 9/25/14: Added Druid cantrips and Druid and Paladin level 1 spells.
* Added all Bard cantrips and level 1 spells.
* Added Wizard cantrips and level 1 from the starter kit.
* Added all Cleric cantrips and level 1 spells.

## To Do
* Create another layout for the spell level tag pages (e.g. cantrip, level1). Also figure out what to do with those pages.
* Find a real home for class specializations (e.g. cleric's domains)
* Clean up header and navigation scheme.
* Figure out mobile styles for tables. Also /fistshake at whoever decided tables in spell lists were a good idea.

## Structure
Spells can be found inside `_posts/`. Each spell gets its own post, written and stored as a [Markdown](http://daringfireball.net/projects/markdown/basics) file. The date is arbitrary and never displayed, but still necessary for [Jekyll](http://jekyllrb.com) to process the posts properly.

If you'd like to help fill out the rest of the spells from the PHB, for each new spell you make:

1. Make a new post inside `_posts/` for each new spell, and copy the formatting from another spell.
2. Submit a pull request for the spell(s) when you're finished, and that's it! Thank you so much. :)

## Build Instructions
I've edited _config.yml for my own build purposes, but if you've got [Jekyll](http://jekyllrb.com) set up locally, the following should create the build from your friendly command line terminal:
`jekyll serve -Vw --no-watch --baseurl ""`

## Thanks

Cleric and wizard spells from the Starter Kit were seeded from [this Reddit post](http://www.reddit.com/r/DnD/comments/2a7wau/5e_cleric_and_wizard_spells_sorted_by_level/).

Thanks to @sethxd for suggesting [Jets.js](http://nexts.github.io/Jets.js/), a CSS search engine that plays nicely with Jekyll.
