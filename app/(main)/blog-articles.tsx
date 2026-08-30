import InfoPage from '../../src/components/InfoPage';

export default function BlogArticlesScreen() {
  return <InfoPage title="Blog and Article" icon="document-text-outline" intro="Read STOCKASTICS articles covering markets, investing, financial news and investor behaviour." sections={[
    { heading: 'Market insights', body: 'Articles and educational market commentary will appear here as the STOCKASTICS editorial library grows.' },
    { heading: 'Investor education', body: 'Find practical explanations of market events, signals, sentiment and the factors that can influence investment decisions.' },
  ]} />;
}
