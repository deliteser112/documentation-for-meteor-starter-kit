import React, { useState, useEffect } from 'react';
// @mui
import { Container } from '@mui/material';
// components
import Page from '../components/Page';
import Markdown from '../components/Markdown';

// components
import TopSection from '../components/TopSection';

// text
import CreatingGraphQLMD from '../texts/creatingGraphQL.md';

// ----------------------------------------------------------------------

export default function CreatingGraphQL() {
  const [convertText, setConvertText] = useState('')

  // Fetch Terms of Use
	useEffect(() => {
		fetch(CreatingGraphQLMD).then(res => res.text()).then(text => setConvertText(text))
	})
  return (
    <Page title="Connecting GraphQL Server">
      <TopSection title="GraphQL" subtitle="Connecting GraphQL Server" description="GraphQL is running on localhost:3000/graphql" />
      <Container maxWidth="xl">
        <Markdown children={convertText} />
      </Container>
    </Page>
  );
}
