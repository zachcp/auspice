---
title: Overview
hide_title: true
---

# Auspice: an open-source interactive tool for visualising phylogenomic data

> Please not that these docs describe the newest version of auspice (versions 1.35+).
The new APIs are in flux and we expect they will change before version 2.0 is released.
If you use these versions of auspice we would love to hear about your experiences! (Contact links at the bottom of the page).


Auspice is an interactive visualisation platform for phylogenomic and other other datasets related to evolution.
It was originally designed for nextstrain.org, which aims to aims to provide a continually-updated view of publicly available pathogen genome data.
Auspice can be used locally to view datasets, or deployed to server- or serverless-websites.
It allows easy customisation of aesthetics and functionality, and powers the visualisations on [nextstrain.org](https://nextstrain.org).


* [overview of functionality](tutorial/overview.md)
* [installation instructions](installation.md)
* [customising your auspice build](customisations/introduction.md)
* [releasing](releasing.md)
* [data formats](inputs.md).


## Running Auspice Locally

Auspice by itself is a visualisation tool for local datasets.
It runs a local server to deliver the files the the visualisation to [localhost:4000](http://localhost:4000).
After [installing](installation.md), you can access datasets in the current directory by running
```bash
auspice view
```
Please see `auspice view -h` for all available options.

The provided server (`node auspice.js view` or `auspice view`) could be used as a production server, perhaps with custom handlers provided (see [these docs](customisations/server/charonAPI.md)).

## Building Auspice Locally
> Building auspice shouldn't be necessary if you have installed it as a npm dependency.
Building auspice is necessary if you have installed it from source, or if you would like to extend it with your customisations.

From the auspice source direcory:
`node auspice.js build --verbose`

If auspice is installed globally:
`auspice build --verbose`


## License and copyright
Copyright © 2014-2018 Trevor Bedford and Richard Neher.

Source code to Nextstrain is made available under the terms of the [GNU Affero General Public License](LICENSE.txt) (AGPL). Nextstrain is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU Affero General Public License for more details.
