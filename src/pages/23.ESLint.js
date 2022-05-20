import React, { useState, useEffect } from 'react';
// @mui
import { Container } from '@mui/material';
// components
import Page from '../components/Page';
import Markdown from '../components/Markdown';

// components
import TopSection from '../components/TopSection';

// text
import ESLintMD from '../texts/eslint.md';

// ----------------------------------------------------------------------

export default function ESLint() {
  const [convertText, setConvertText] = useState('')

  // Fetch Terms of Use
	useEffect(() => {
		fetch(ESLintMD).then(res => res.text()).then(text => setConvertText(text))
	})
  return (
    <Page title="ESLint">
      <TopSection title="Setting & Configuration" subtitle="ESLint" description="MST is using Material UI v5.8.0" />
      <Container maxWidth="xl">
        <Markdown children={convertText} />
      </Container>
    </Page>
  );
}
