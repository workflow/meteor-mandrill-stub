# mandrill-stub

A stub for use in testing Meteor apps.
It's also nice for reducing your dependencies in local development. 

Works on top of the excellent [wylio:mandrill](https://github.com/Wylio/meteor-mandrill) package.


## Usage:

If you are using `wylio:mandrill`, add this package like this:

`meteor add dropz:mandrill-stub`

Your app will no longer send real API calls to Mandrill in development mode and will instead log your API calls to a local mongoDB collection, from where you can assert on the existence and correctness of your calls.

The stubbing happens automatically.
 
This package does not affect production as it is a `debugOnly` package.


### Currently Stubbed API Calls

 * `Mandrill.messages.sendTemplate`
 
 * Can add more if needed


### Asserting on Successful Mandrill API Calls

```js
Meteor.call('mandrillStub/getAPICalls')
```

In case one or more API calls would've been made, you'll get a response like

```json
{
    "_id" : "rTkLCM4L3b9n79axD",
    "key" : "SOME KEY",
    "template_name" : "thank-you-for-suggesting-a-company",
    "template_content" : null,
    "message" : {
        "global_merge_vars" : [ 
            {
                "name" : "firstName",
                "content" : "Florian"
            }, 
            {
                "name" : "companyName",
                "content" : "dropz"
            }
        ],
        "to" : [ 
            {
                "email" : "flo@dropz.io"
            }
        ]
    }
}
```

...for each of them.

### Resetting your local DB Log of API Calls

```js
Meteor.call('mandrillStub/reset');
```

If using cucumber, it's a good idea to do that in a reset hook after every Scenario.


### What if I want to test email sending in development mode?

You can disable the stub whenever you want to do actual Mandrill calls in development, by setting the `DEBUG_MANDRILL_EMAILS=1` environment variable prior to starting up meteor.


### What if I want to dance a haka?

Nothing's stopping you, mate!


## Thanks

Inspired by [xolvio:meteor-email-stub](https://github.com/xolvio/meteor-github-stub) and all of Xolvio's amazing work on providing a great testing experience in the Meteor landscape. Thanks!

Requires [wylio:mandrill](https://github.com/Wylio/meteor-mandrill). Thx for that package!
