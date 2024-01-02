// gherkin.js
hljs.registerLanguage('gherkin', function(hljs) {
  return {
    aliases: ['feature'],
    keywords: {
      keyword: 'Feature Background Given When Then And But Scenario Scenario Outline Examples',
      meta: '@tags'
    },
    contains: [
      {
        className: 'meta',
        begin: '@[^\\s]+'
      },
      hljs.HASH_COMMENT_MODE,
      {
        className: 'string',
        begin: '"',
        end: '"',
        contains: [hljs.BACKSLASH_ESCAPE]
      },
      {
        className: 'variable',
        begin: '<',
        end: '>',
      },
      hljs.C_NUMBER_MODE,
    ]
  };
});
