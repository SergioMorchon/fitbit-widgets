# Fitit Widgets

Create and share your fitbit widgets to be used inside Fitbit apps.

## How to use a widget in a Fitbit SDK project

From your project root folder, follow these steps:

1. Add this module to your project dependencies:
   `npm install --save fitbit-widgets`
1. Add the specific widget to your prject:
   `npx fitbit-widgets <widget-name>`, where `<widget-name>` is some of the widget folders inside this poject
1. Reference the `.gui` file added from the view where you want to use it, adding a `<link rel="import" href="<path-to-the-widget-gui-file">` element to your `.gui` `<defs>` element.
1. To use it from your `.ts` ot `.js` code, you can `import <specific-widget-functions> from 'fitbit-widgets/dist/<widget-name>'`.

And that's it!

## How to create a widget in this project

Add a folder inside `src/` with the name of the widget.
There we have different type of files:

- `index.ts` with the runtime code.
- `index.gui` file with the main UI code.
- You can add other files inside the widget folder, linking them relatively.
