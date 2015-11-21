let _mandrillStubApiCallsCollection = new Package.mongo.Mongo.Collection('mandrillStubApiCalls');

Meteor.startup(() => {
  Mandrill.messages.__sendTemplate = Mandrill.messages.sendTemplate;
  Mandrill.messages.sendTemplate = function sendTemplate(options) {
    if (process.env.DEBUG_MANDRILL_EMAILS) {
      Mandrill.messages.__sendTemplate(options);
    } else {
      // Log API calls to collection, where they can be verified
      _mandrillStubApiCallsCollection.insert(options);
    }
  };
});

Meteor.methods({
  'mandrillStub/reset': function() {
    _mandrillStubApiCallsCollection.remove({});
  },
  'mandrillStub/getAPICalls': function() {
    return _mandrillStubApiCallsCollection.find().fetch();
  },
});
