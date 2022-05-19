import React, { useState, useEffect } from 'react';
// @mui
import { Container } from '@mui/material';
// components
import Page from '../components/Page';
import Markdown from '../components/Markdown';

// components
import TopSection from '../components/TopSection';

// text
import OrganizationMD from '../texts/organization.md';

// ----------------------------------------------------------------------

export default function Organization() {
  const [convertText, setConvertText] = useState('')

  // Fetch Terms of Use
	useEffect(() => {
		fetch(OrganizationMD).then(res => res.text()).then(text => setConvertText(text))
	})
  return (
    <Page title="Organization">
      <TopSection title="React" subtitle="Organizational Conventions" description="MST is using React, React-Dom v17" />
      <Container maxWidth="xl">
        <Markdown children={convertText} />
      </Container>
    </Page>
  );
}
