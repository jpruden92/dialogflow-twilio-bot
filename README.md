# Dialogflow - Twilio - Heroku basic chatbot

This repo will allow to you to generate a simple conversational phone chatbot in less than 2 hours. You only have to follow below steps to configure your Twilio and Dialogflow accounts.

## 1. Create your Twilio account.

Go to [Twilio](https://www.twilio.com/) and register a new account. Twilio will give you some free credit to test Twilio services, but it will limit you to use pre-authorized numbers to make tests. If you want to add new authorized numbers for test, you can go [here](https://www.twilio.com/console/phone-numbers/verified).

If you want to make a real test, you need to top up your account. You can do it [here](https://www.twilio.com/console/billing).

## 2. Buy a number.

To receive calls, you will need a Twilio phone number. Before you are be able to buy phone numbers, you will need to send some personal identity documents to Twilio. Twilio need these documents to associate your phone number to your identity.

You can verify your identity [here](https://www.twilio.com/console/phone-numbers/regulatory-compliance/bundles).

When Twilio verifies your identity, you can buy new phone numbers [here](https://www.twilio.com/console/phone-numbers/search). If you want to deploy this repository and connect it to Twilio, you will need to buy a number with ``VOICE`` capability.

## 3. Create a Dialogflow Account.

You will need a Dialogflow Account too. You can create it [here](https://dialogflow.com/).

Once you have created your Dialogflow Account. You will need to create a new agent and obtain your agent ``service account`` and your ``project name``. Follow these guides to make all work:

- [Creating a Dialogflow Agent](https://cloud.google.com/dialogflow/docs/quick/build-agent).
- [Getting Project Name and Service Account Credentials](https://dialogflow.com/docs/reference/v2-auth-setup).

## 4. Create an Amplitude free account

To extract your business metrics you will use Amplitude, an easy way of creating dashboards with your data. You can create your organization/project free account [here](https://amplitude.com/signup?ref=pricing-top-free).

You will need your API Key Token to configure Heroku <-> Amplitude connection. You can find it in ``Manage Data > Your Project > Project Settings``.

## 5. Deploy this repository on Heroku and configure connection to Dialogflow.

For response all Twilio calls, you will need to deploy this project on Heroku (you can use another cloud service if you prefer).

To deploy this repository on Heroku, you only have to click on the below button. Heroku will request you to have an account and will ask about the name that you want to give to your service and the zone where you want to deploy it.

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

Once you have deployed your project, the last step to configure it is to insert some Environment Variables. You will see your ENV variables on your project's ``Settings`` tag. You need to insert this variables:

| Variable Name | Value |
| ------------- | ------------- |
| DIALOGFLOW_PROJECT_ID | Your Dialogflow Project ID |
| GOOGLE_APPLICATION_CREDENTIALS | ``google-credentials.json`` |
| GOOGLE_CREDENTIALS | The content of your Dialogflow Agent Service Account file |
| AMPLITUDE_API_KEY | Your Amplitude API Key |

## 6. Connect your Twilio number to Heroku.

The last step is to connect your Twilio number to your Heroku deployment. To do it, you will need your Heroku URL. You will find it at ``Settings`` tag, inside ``Domains`` section.

Copy this URL and go to [Twilio Phone Numbers](https://www.twilio.com/console/phone-numbers/incoming). Click on your number and add this configuration:

| Config Item | Value |
| ------------- | ------------- |
| ACCEPT INCOMING | Voice Calls |
| CONFIGURE WITH | Webhooks, TwiML Bins, Functions, Studio, or Proxy |
| A CALL COMES IN | ``[your_heroku_domain]/webhook`` |
| CALL STATUS CHANGES | ``[your_heroku_domain]/callStatus`` |