import React, { useState, useEffect } from 'react';
// @mui
import { Container } from '@mui/material';
// components
import Page from '../components/Page';
import Markdown from '../components/Markdown';

// components
import TopSection from '../components/TopSection';

// text
import PerformingQueriesMD from '../texts/performingQueries.md';

// ----------------------------------------------------------------------

export default function PerformingQueries() {
  const [convertText, setConvertText] = useState('')

  // Fetch Terms of Use
	useEffect(() => {
		fetch(PerformingQueriesMD).then(res => res.text()).then(text => setConvertText(text))
	})
  return (
    <Page title="Performing Queries">
      <TopSection title="GraphQL" subtitle="Performing Queries & Mutations" description="GraphQL is running on localhost:3000/graphql" />
      <Container maxWidth="xl">
        <Markdown children={convertText} />
      </Container>
    </Page>
  );
}
