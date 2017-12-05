# iron-justified-gallery [![Build Status](https://travis-ci.org/Collaborne/iron-justified-gallery.svg?branch=master)](https://travis-ci.org/Collaborne/iron-justified-gallery) [![Greenkeeper badge](https://badges.greenkeeper.io/Collaborne/iron-justified-gallery.svg)](https://greenkeeper.io/)  [![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/Collaborne/iron-justified-gallery)
Polymer element that shows a pretty formatted gallery (using the Flickr justified-layout library)

## Install

~~~~
npm install iron-justified-gallery --save
~~~~

```html
<iron-justified-gallery
  images="[[images]]"
  gallery-width="500"
  row-height="150">
</iron-justified-gallery>
```

## Usage

Supported options:

| Option            | Description                                             |
| ----------------- | ------------------------------------------------------- |
| **images**        | Source of images that will be rendered in the gallery   |
| **galleryWidth**  | Width that the gallery will take                        |
| **rowHeight**     | Height of a single row in the gallery                   |

The images need to be a JavaScript array with absolute URLs:

```javascript
const array = [
  { url: "http://www.server.com/image1.png", width: 500 },
  { url: "http://www.server.com/image2.png", width: 500 },
  { url: "http://www.server.com/image3.png", width: 500 }
];
```
