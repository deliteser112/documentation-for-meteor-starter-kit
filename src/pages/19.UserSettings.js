import React, { useState, useEffect } from 'react';
// @mui
import { Container } from '@mui/material';
// components
import Page from '../components/Page';
import Markdown from '../components/Markdown';

// components
import TopSection from '../components/TopSection';

// text
import UserSettingsMD from '../texts/userSettings.md';

// ----------------------------------------------------------------------

export default function UserSettings() {
  const [convertText, setConvertText] = useState('')

  // Fetch Terms of Use
	useEffect(() => {
		fetch(UserSettingsMD).then(res => res.text()).then(text => setConvertText(text))
	})
  return (
    <Page title="User Settings">
      <TopSection title="Admin" subtitle="User Settings" description="MST is using Material UI v5.8.0" />
      <Container maxWidth="xl">
        <Markdown children={convertText} />
      </Container>
    </Page>
  );
}
