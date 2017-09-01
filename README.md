# Hurley [![Build Status](https://travis-ci.org/feedcast/hurley.svg?branch=master)](https://travis-ci.org/feedcast/hurley)

![Dude](http://i.imgur.com/mmDOAgm.jpg)

A ReactJS based client listen podcast on all browsers.

## Setup

To install the dependencies run:

```sh
make install
```

To setup the environment run:

```sh
make setup
```

> Remember to read the [environment](#environment) section.

To run the project:

```sh
make start
```

To run the tests:

```sh
make test
```

### Environment
> Variables to configure the build

* `REACT_APP_API_HOST` - URL for [feedcast/scott](https://github.com/feedcast/scott) running instance.
* `REACT_APP_GA` - Key for Google Analytics
* `REACT_APP_DISQUS_SHORTNAME` - A shortname is the unique identifier assigned to a Disqus site
* `REACT_APP_FEEDBACK_FORM_URL` - Link to feedback form

## Support

Please [open an issue](https://github.com/feedcast/hurley/issues/new) for support.
