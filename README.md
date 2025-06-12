# NSMBW Route Editor

A tool to help with New Super Mario Bros. Wii RouteInfo file editing.

## Introduction

This webapp was made to help with the process of editing the RouteInfo of New Super Mario Bros.
Wii's world maps. While the original RouteInfo files are just plain CSV files, a lot of the
technicalities come from hardcoded strings not many people are aware of. This tool helps with making
this process more user-friendly while preventing errors from happening while editing instead of
figuring out said errors during playtesting. It is available
under https://b1gaming.github.io/route-creator

## Route Documentation

For more information regarding routes, you can read the respective pages on
the [Horizon Wiki](https://horizon.miraheze.org/wiki/Main_Page) or look at the info panel on the
homepage of this tool.

- [Editing the Original Maps](https://horizon.miraheze.org/wiki/Editing_the_Original_Maps)
- [World Map Data](https://horizon.miraheze.org/wiki/World_Map_Data)

## Roadmap / TODO List

- Improve user error handling
- Improve visuals
- Save route to local storage for later use instead of discarding data after every reload
- Make functionality more user-friendly
- Improve performance and reduce file size
    - will probably be done by migrating to [Svelte](https://svelte.dev/)
