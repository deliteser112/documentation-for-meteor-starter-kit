import React, { useState, useEffect } from 'react';
// @mui
import { Container } from '@mui/material';
// components
import Page from '../components/Page';
import Markdown from '../components/Markdown';

// components
import TopSection from '../components/TopSection';

// text
import DefiningRoutesMD from '../texts/definingRoutes.md';

// ----------------------------------------------------------------------

export default function DefiningRoutes() {
  const [convertText, setConvertText] = useState('')

  // Fetch Terms of Use
	useEffect(() => {
		fetch(DefiningRoutesMD).then(res => res.text()).then(text => setConvertText(text))
	})
  return (
    <Page title="Defining Routes">
      <TopSection title="Routing" subtitle="Defining Routes" description="MST is using React Router v6" />
      <Container maxWidth="xl">
        <Markdown children={convertText} />
      </Container>
    </Page>
  );
}
