import React, { useState, useEffect } from 'react';
// @mui
import { Container } from '@mui/material';
// components
import Page from '../components/Page';
import Markdown from '../components/Markdown';

// components
import TopSection from '../components/TopSection';

// text
import Introduce from '../texts/introduce.md';

// ----------------------------------------------------------------------

export default function Introduction() {
  const [convertText, setConvertText] = useState('')

  // Fetch Terms of Use
	useEffect(() => {
		fetch(Introduce).then(res => res.text()).then(text => setConvertText(text))
	})
  return (
    <Page title="Introduction">
      <TopSection title="Getting Started" subtitle="Introduction" description="The meteor is based on version 2.7.2(latest version)" />
      <Container maxWidth="xl">
        <Markdown children={convertText} />
      </Container>
    </Page>
  );
}
