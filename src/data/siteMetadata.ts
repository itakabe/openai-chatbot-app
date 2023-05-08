interface SiteMetadata {
  title: string;
  author: string;
  headerTitle: string,
  description: string,
  language: string,
  theme: string,
  siteLogo: string,
  locale: string,
}

export const siteMetadata: SiteMetadata = {
  title: 'Azure OpenAI Chatbot App',
  author: 'itakabe',
  headerTitle: 'Azure OpenAI Chatbot App',
  description: 'Azure OpenAI APIを使ったチャットアプリです。',
  language: 'ja-JP',
  theme: 'system', // system, dark or light
  siteLogo: '/static/images/logo.png',
  locale: 'ja-JP',
}

