# Fitbit Widgets 🧩

[![npm version](https://badge.fury.io/js/fitbit-widgets.svg)](https://www.npmjs.com/package/fitbit-widgets)
[![CI Status](https://github.com/SergioMorchon/fitbit-widgets/workflows/CI/badge.svg)](https://github.com/SergioMorchon/fitbit-widgets/actions?query=workflow%3ACI)

Create and share your fitbit widgets to be used inside Fitbit apps.

## How to **use** a widget

## CLI users

From your project root folder, follow these steps:

1. Choose the widget you want from the list:
   `npx fitbit-widgets list`
1. Add it to your project
   `npx fitbit-widgets install <widget-name>`
1. Follow the instructions printed to start using it from your code.

## Fitbit Studio users

Go to the [releases](https://github.com/SergioMorchon/fitbit-widgets/releases) section, and download the attached **widgets.zip** file.
Peek the files you want, and upload them accordingly to your project.

## How to **create** a widget

Add a folder inside `src/` with the name of the widget.
There we have different type of files:

- `index.ts` with the runtime code.
- `index.gui` file with the main UI code.
- A `doc/` folder with:
  - A screenshot from the Fibit emulator showing the widget.
  - A `README.md` file explaining what the widget does, including the screenshot.
