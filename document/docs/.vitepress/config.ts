export default {
  title: "Vue drag scroller",
  description: "An awesome docs template built by me",
  lang: 'en-US',
  cleanUrls: true,
  base: "/vue-drag-scroller/",
  // If this is disabled, when building it it will give deadlink errors if your markdown has the wrong links
  ignoreDeadLinks: true,
  head: [
    [
      'script',
      { async: '', src: 'https://www.googletagmanager.com/gtag/js?id=G-QX1HCGN1JN' }
    ],
    [
      'script',
      {},
      `window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-QX1HCGN1JN');`
    ]
  ],
  themeConfig: {
    logo: "/logo.svg",
    siteTitle: "Vue drag scroller",
    search: {
      provider: "local",
    },
    // Navbar Link
    nav: [
      { text: "Guide", link: "/guide" },
      { text: "Configs", link: "/configs" },
      {
        // Dropdown Menu
        text: "Changelog",
        items: [
          { text: "v1.8.2", link: "/" },
        ],
      },
    ],
    // Social Icons
    socialLinks: [
      { icon: "github", link: "https://github.com/huynamboz/vue-drag-scroller" },
      // {
      //   icon: {
      //     svg: '<svg role="img" width="26.01" height="32" viewBox="0 0 256 315"><path d="M213.803 167.03c.442 47.58 41.74 63.413 42.197 63.615c-.35 1.116-6.599 22.563-21.757 44.716c-13.104 19.153-26.705 38.235-48.13 38.63c-21.05.388-27.82-12.483-51.888-12.483c-24.061 0-31.582 12.088-51.51 12.871c-20.68.783-36.428-20.71-49.64-39.793c-27-39.033-47.633-110.3-19.928-158.406c13.763-23.89 38.36-39.017 65.056-39.405c20.307-.387 39.475 13.662 51.889 13.662c12.406 0 35.699-16.895 60.186-14.414c10.25.427 39.026 4.14 57.503 31.186c-1.49.923-34.335 20.044-33.978 59.822M174.24 50.199c10.98-13.29 18.369-31.79 16.353-50.199c-15.826.636-34.962 10.546-46.314 23.828c-10.173 11.763-19.082 30.589-16.678 48.633c17.64 1.365 35.66-8.964 46.64-22.262"/></svg>',
      //   },
      //   link: "https://google.com",
      // },
    ],
    // Sidebar
    sidebar: [
      {
        text: "Getting started",
        collapsible: true,
        items: [
          { text: "Introduction", link: "/introduction" },
          { text: "Installation", link: "/installation" },
        ],
      },
      {
        text: "Usage",
        collapsible: false,
        items: [
          { text: "How to use", link: "/use" },
          { text: "Configs", link: "/configs" },
        ],
      },
    ],
    // you can disable the previous and next page here
    docFooter: {
      prev: false,
      next: true,
    },
    editLink: {
      pattern: 'https://github.com/huynamboz/vue-drag-scroller/edit/dev/document/docs/:path',
      text: 'Edit this page on GitHub'
    },
    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2024 huynamboz",
    },
    markdown: {
      theme: "material-palenight",
      lineNumbers: true,
    },
    // Mobile Config only
    returnToTopLabel: 'Go to Top',
    sidebarMenuLabel: 'Menu',
  },
};
