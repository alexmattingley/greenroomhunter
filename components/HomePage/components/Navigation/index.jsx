// NOTE: while similar to the global naviagation used for the about page, it is not the same.
// TODO: At some point I should combine this with the component level navigation
import React from 'react';
import PropTypes from 'prop-types';
import NavLogo from './NavLogo/index.jsx';
import NavLinks from './NavLinks/index.jsx';
import NavContainer from './index.styled.js';

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
    this.state = { whiteNav: false };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    if (window.pageYOffset > 0) {
      this.setState({
        whiteNav: true,
      });
    } else {
      this.setState({
        whiteNav: false,
      });
    }
  }

  render() {
    const { currentPage } = this.props;
    const { whiteNav } = this.state;
    return (
      <NavContainer whiteNav={whiteNav}>
        <NavLogo />
        <NavLinks currentPage={currentPage} whiteNav={whiteNav} />
      </NavContainer>
    );
  }
}

Navigation.propTypes = {
  currentPage: PropTypes.string.isRequired,
};


export default Navigation;
