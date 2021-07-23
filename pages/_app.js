import React from 'react';
import NextApp from 'next/app';
import CssBaseline from '@material-ui/core/CssBaseline';

export default class App extends NextApp {
  componentDidMount() {
    // Remove service side styles
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles && jssStyles.parentNode){
      jssStyles.parentNode.removeChild(jssStyles)
    }
  }
  render() {
    const { Component, pageProps } = this.props
    return (
      <>
        <CssBaseline />
        <Component {...pageProps} />
      </>
    )
  }
}
