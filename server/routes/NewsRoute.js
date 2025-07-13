const express = require('express');
const Parser = require('rss-parser');
const rssParser = new Parser();
const router = express.Router();

const {
  jobKeywords,
  companyNames,
  stateGovtKeywords,
  centralGovtKeywords,
} = require('../utils/News/NewsLib');

// Normalize + flatten text
const normalizeText = (text = '') =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

// Main relevance check
const isJobRelated = (title = '', description = '', content = '') => {
  const combined = normalizeText(`${title} ${description} ${content}`);
  return (
    jobKeywords.some((keyword) => combined.includes(keyword)) &&
    (combined.includes('hiring') ||
      combined.includes('vacancy') ||
      combined.includes('opening') ||
      combined.includes('job alert') ||
      combined.includes('career opportunity') ||
      combined.includes('job drive') ||
      combined.includes('positions available') ||
      combined.includes('walkin') ||
      (combined.includes('create') && combined.includes('jobs')))
  );
};

// RSS sources
const rssFeeds = [
  'https://www.thehindu.com/news/national/feeder/default.rss',
  'https://timesofindia.indiatimes.com/rssfeeds/3908999.cms',
  'https://news.google.com/rss/search?q=jobs+in+India&hl=en-IN&gl=IN&ceid=IN:en',
];

function timeAgo(date) {
  const now = new Date();
  const diff = Math.floor((now - new Date(date)) / 1000); // seconds
  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

  if (diff < 60) return rtf.format(-diff, 'second');
  if (diff < 3600) return rtf.format(-Math.floor(diff / 60), 'minute');
  if (diff < 86400) return rtf.format(-Math.floor(diff / 3600), 'hour');
  if (diff < 2592000) return rtf.format(-Math.floor(diff / 86400), 'day');
  return rtf.format(-Math.floor(diff / 2592000), 'month');
}

// Route
router.get('/articles', async (req, res) => {
  const { region, companyWise, stateGovt, centralGovt } = req.query;
  const articles = [];

  for (const feedURL of rssFeeds) {
    try {
      const feed = await rssParser.parseURL(feedURL);
      feed.items.forEach((item) => {
        articles.push({
          title: item?.title,
          description: item?.contentSnippet || item?.content || '',
          content: item?.content || '',
          url: item?.link,
          published_at: item?.pubDate ? timeAgo(item?.pubDate) : null,
          source: feed?.title || '',
        });
      });
    } catch (err) {
      console.warn(`Error parsing feed ${feedURL}:`, err.message);
    }
  }

  // Filter job-related
  const filtered = articles.filter((article) =>
    isJobRelated(article.title, article.description, article.content)
  );

  // Enrich with category flags
  const enriched = filtered.map((article) => {
    const fullText = normalizeText(
      `${article.title} ${article.description} ${article.content || ''}`
    );

    return {
      ...article,
      isRegionRelated: region ? fullText.includes(region.toLowerCase()) : false,

      isCompanyRelated:
        companyNames.some((name) => fullText.includes(name.toLowerCase())) ||
        /company|corporate|private sector|firm|tech giant|it firm|startup/.test(fullText),

      isStateGovtRelated:
        stateGovtKeywords.some((kw) => fullText.includes(kw.toLowerCase())) ||
        /state govt|state government|municipal|panchayat|zila parishad/.test(fullText),

      isCentralGovtRelated:
        centralGovtKeywords.some((kw) => fullText.includes(kw.toLowerCase())) ||
        /central govt|central government|ministry of|union government|psu|public sector/.test(
          fullText
        ),
    };
  });

  res.status(200).json({
    count: enriched.length,
    region: region || 'all',
    company: companyWise || 'all',
    stateGovt: stateGovt || 'all',
    centralGovt: centralGovt || 'all',
    articles: enriched,
  });
});

module.exports = router;
