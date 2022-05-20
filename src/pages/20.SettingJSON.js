import React, { useState, useEffect } from 'react';
// @mui
import { Container } from '@mui/material';
// components
import Page from '../components/Page';
import Markdown from '../components/Markdown';

// components
import TopSection from '../components/TopSection';

// text
import SettingsJSONMD from '../texts/settingsJSON.md';

// ----------------------------------------------------------------------

export default function SettingsJSON() {
  const [convertText, setConvertText] = useState('')

  // Fetch Terms of Use
	useEffect(() => {
		fetch(SettingsJSONMD).then(res => res.text()).then(text => setConvertText(text))
	})
  return (
    <Page title="setting-<env>">
      <TopSection title="Setting & Configuration" subtitle="setting-<env>.json" description="MST is using Material UI v5.8.0" />
      <Container maxWidth="xl">
        <Markdown children={convertText} />
      </Container>
    </Page>
  );
}
