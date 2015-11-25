Package.describe({
  name: 'dropz:mandrill-stub',
  version: '1.0.0',
  // Brief, one-line summary of the package.
  summary: 'A stub for Mandrill API calls, used in testing meteor apps.',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/workflow/meteor-mandrill-stub',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md',
  debugOnly: true,
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');

  api.use('ecmascript');
  api.use('wylio:mandrill@1.0.0');

  api.addFiles('server/mandrill-stub.js', 'server');
});
