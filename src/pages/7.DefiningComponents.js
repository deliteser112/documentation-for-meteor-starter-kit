import React, { useState, useEffect } from 'react';
// @mui
import { Container } from '@mui/material';
// components
import Page from '../components/Page';
import Markdown from '../components/Markdown';

// components
import TopSection from '../components/TopSection';

// text
import DefiningComponentsMD from '../texts/definingComponents.md';

// ----------------------------------------------------------------------

export default function DefiningComponents() {
  const [convertText, setConvertText] = useState('')

  // Fetch Terms of Use
	useEffect(() => {
		fetch(DefiningComponentsMD).then(res => res.text()).then(text => setConvertText(text))
	})
  return (
    <Page title="Defining Components">
      <TopSection title="React" subtitle="Defining Components" description="MST is using React Material UI v5.8.0" />
      <Container maxWidth="xl">
        <Markdown children={convertText} />
      </Container>
    </Page>
  );
}
