import React from 'react';
import NextApp from 'next/app';
import Script from 'next/script';
import CssBaseline from '@material-ui/core/CssBaseline';

export default class App extends NextApp {
  componentDidMount() {
    // Remove service side styles
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <Script strategy="beforeInteractive" src="https://unpkg.com/leaflet@1.4.0/dist/leaflet.js" />
        <Script strategy="beforeInteractive" src="https://api.windy.com/assets/map-forecast/libBoot.js" />
        <CssBaseline />
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Component {...pageProps} />
      </>
    );
  }
}
