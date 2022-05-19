import React, { useState, useEffect } from 'react';
// @mui
import { Container } from '@mui/material';
// components
import Page from '../components/Page';
import Markdown from '../components/Markdown';

// components
import TopSection from '../components/TopSection';

// text
import DefiningThemeMD from '../texts/definingTheme.md';

// ----------------------------------------------------------------------

export default function DefiningTheme() {
  const [convertText, setConvertText] = useState('')

  // Fetch Terms of Use
	useEffect(() => {
		fetch(DefiningThemeMD).then(res => res.text()).then(text => setConvertText(text))
	})
  return (
    <Page title="Defining Theme">
      <TopSection title="Styling" subtitle="Defining Theme" description="MST is using Material UI v5.8.0 for styling" />
      <Container maxWidth="xl">
        <Markdown children={convertText} />
      </Container>
    </Page>
  );
}
