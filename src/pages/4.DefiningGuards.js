import React, { useState, useEffect } from 'react';
// @mui
import { Container } from '@mui/material';
// components
import Page from '../components/Page';
import Markdown from '../components/Markdown';

// components
import TopSection from '../components/TopSection';

// text
import DefiningGuardsMD from '../texts/definingGuards.md';

// ----------------------------------------------------------------------

export default function DefiningGuards() {
  const [convertText, setConvertText] = useState('')

  // Fetch Terms of Use
	useEffect(() => {
		fetch(DefiningGuardsMD).then(res => res.text()).then(text => setConvertText(text))
	})
  return (
    <Page title="Defining Guards">
      <TopSection title="Routing" subtitle="Defining Guards" description="MST is using React Router v6" />
      <Container maxWidth="xl">
        <Markdown children={convertText} />
      </Container>
    </Page>
  );
}
