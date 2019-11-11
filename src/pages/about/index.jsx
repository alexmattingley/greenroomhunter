import React from 'react';
import Navigation from 'pages/global/components/Navigation/index.jsx';
import {
  ContentBlock, ContentP, ContentH1, ContentH2, PageContainer, FlexContainer
} from './index.styled.js';


function About() {
  return (
    <PageContainer>
      <Navigation currentPage="About" />
      <FlexContainer>
        <ContentBlock>
          <ContentH1>About Green Room Hunter</ContentH1>
          <ContentP>
            As a surfer I am always looking at raw data about wind and waves in order
            to make an informed decision about where I will surf on any given day.
            If you take a look at the websites that are out there now that cater to surfers,
            the focus is really on the analysis of raw data and telling people what they should or
            shouldn’t think with only a little bit of access to raw data and information.
            This ultimately leads to inaccuracies in forecasting which create all sorts of problems.
          </ContentP>
          <ContentP>
            The purpose of this site is to bring pertinent raw data for surfers all
            into a single application. A given person will be able to access the site and
            see a set of data that is relevant to the location that they live in,
            and then they will eventually be able to customize that data to be
            relevant to their interests. This will allow surfers to make better decisions
            about where and when to surf.
          </ContentP>
          <ContentH2>Code stuff (NERDS!)</ContentH2>
          <ContentP>
            I originally built this site for my final project for bootcamp way back
            in 2016. I used PHP and MySQL for the backend and vanilla javascript for the front end.
            Since 2016, I&rsquo;ve changed and so have the technologies that I work with daily.
            I wanted to build a site that would be a good reflection of my technical abilities
            as well as give me an opportunity work with some technologies that I enjoy working with.
            I have alot of experience with react and I really enjoy working
            with react so I decided to use create react app to scaffold the front end.
            I have some experience with node and I want to work with node more, so I decided
            to use Nodejs for the api calls on the backend.
          </ContentP>
        </ContentBlock>
      </FlexContainer>
    </PageContainer>
  );
}

export default About;
