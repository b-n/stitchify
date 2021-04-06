# Stitchify

Select an image, get a DMC stitch guide for cross stitching.

https://b-n.github.io/stitchify

## Development

This is a zero installs repo, so you should be able to just `yarn run start` and have a running
environment, even without `yarn install`

### Updating DMC Colors

Styles for the colors are generated using `yarn run generate:dmcStyles` which overwrites the file
in `src/styles/dmc.css`. This should be checked into the repo

### Production Build

`yarn build` will create a production build in `build/`

## CI

Builds are automated and built using github actions to keep the above link up to date
