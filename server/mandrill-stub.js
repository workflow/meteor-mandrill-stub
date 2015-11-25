MandrillStubAPICallsCollection = new Package.mongo.Mongo.Collection('mandrillStubAPICalls');

Meteor.startup(() => {
  Mandrill.messages.__sendTemplate = Mandrill.messages.sendTemplate;
  Mandrill.messages.sendTemplate = function sendTemplate(options) {
    if (process.env.DEBUG_MANDRILL_EMAILS) {
      Mandrill.messages.__sendTemplate(options);
    } else {
      // Log API calls to collection, where they can be verified
      MandrillStubAPICallsCollection.insert(options);
    }
  };
});

Meteor.methods({
  'mandrillStub/reset': function() {
    MandrillStubAPICallsCollection.remove({});
  },
  'mandrillStub/getAPICalls': function() {
    return MandrillStubAPICallsCollection.find().fetch();
  },
  'mandrillStub/insert': function(doc) {
    check(doc, Object);

    MandrillStubAPICallsCollection.insert(doc);
  },
});
