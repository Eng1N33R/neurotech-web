# NeuroTech

**NeuroTech** is a network traffic analysis utility powered by deep learning
with TensorFlow. With accuracy ratios of more than 85%, it's able to adapt to
any environments and network conditions.

The NeuroTech web interface is built with NodeJS, React+Redux and Express. It is designed to be run on top of the [NeuroTech NIDS](https://github.com/Eng1N33R/neurotech-nids), so make sure the NIDS is installed and running first.

### Installation

1. Run `yarn install` (recommended) or `npm install` to load all packages.
2. Run the `build` script to build the production version of the interface.
3. Run the `server` script to start Express. The interface will now be live on port 3000.