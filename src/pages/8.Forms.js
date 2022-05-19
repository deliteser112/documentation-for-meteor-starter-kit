import React, { useState, useEffect } from 'react';
// @mui
import { Container } from '@mui/material';
// components
import Page from '../components/Page';
import Markdown from '../components/Markdown';

// components
import TopSection from '../components/TopSection';

// text
import FormsMD from '../texts/forms.md';

// ----------------------------------------------------------------------

export default function Forms() {
  const [convertText, setConvertText] = useState('')

  // Fetch Terms of Use
	useEffect(() => {
		fetch(FormsMD).then(res => res.text()).then(text => setConvertText(text))
	})
  return (
    <Page title="Forms">
      <TopSection title="React" subtitle="Forms" description="MST is using React Material UI v5.8.0" />
      <Container maxWidth="xl">
        <Markdown children={convertText} />
      </Container>
    </Page>
  );
}
