import React, { useState, useEffect } from 'react';
// @mui
import { Container } from '@mui/material';
// components
import Page from '../components/Page';
import Markdown from '../components/Markdown';

// components
import TopSection from '../components/TopSection';

// text
import GitIgnoreMD from '../texts/gitignore.md';

// ----------------------------------------------------------------------

export default function GitIgnore() {
  const [convertText, setConvertText] = useState('')

  // Fetch Terms of Use
	useEffect(() => {
		fetch(GitIgnoreMD).then(res => res.text()).then(text => setConvertText(text))
	})
  return (
    <Page title="gitignore">
      <TopSection title="Setting & Configuration" subtitle=".gitignore" description="MST is using Material UI v5.8.0" />
      <Container maxWidth="xl">
        <Markdown children={convertText} />
      </Container>
    </Page>
  );
}
