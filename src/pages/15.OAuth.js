import React, { useState, useEffect } from 'react';
// @mui
import { Container } from '@mui/material';
// components
import Page from '../components/Page';
import Markdown from '../components/Markdown';

// components
import TopSection from '../components/TopSection';

// text
import OAuthMD from '../texts/oAuth.md';

// ----------------------------------------------------------------------

export default function OAuth() {
  const [convertText, setConvertText] = useState('')

  // Fetch Terms of Use
	useEffect(() => {
		fetch(OAuthMD).then(res => res.text()).then(text => setConvertText(text))
	})
  return (
    <Page title="OAuth">
      <TopSection title="Accounts" subtitle="OAuth" description="MST is using Material UI v5.8.0" />
      <Container maxWidth="xl">
        <Markdown children={convertText} />
      </Container>
    </Page>
  );
}
