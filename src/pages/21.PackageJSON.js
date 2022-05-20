import React, { useState, useEffect } from 'react';
// @mui
import { Container } from '@mui/material';
// components
import Page from '../components/Page';
import Markdown from '../components/Markdown';

// components
import TopSection from '../components/TopSection';

// text
import PackageJSONMD from '../texts/packageJSON.md';

// ----------------------------------------------------------------------

export default function PackageJSON() {
  const [convertText, setConvertText] = useState('')

  // Fetch Terms of Use
	useEffect(() => {
		fetch(PackageJSONMD).then(res => res.text()).then(text => setConvertText(text))
	})
  return (
    <Page title="package.json">
      <TopSection title="Setting & Configuration" subtitle="package.json" description="MST is using Material UI v5.8.0" />
      <Container maxWidth="xl">
        <Markdown children={convertText} />
      </Container>
    </Page>
  );
}
