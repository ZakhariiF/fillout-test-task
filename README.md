
# Fillout Test Task
API to filter Fillout form responses based on filters

## Example

**GET http://localhost:5000/cLZojxk94ous?limit=1**

Body:

    [
      {
        "id": "dSRAe3hygqVwTpPK69p5td",
        "condition": "greater_than",
        "value": "2024-02-01"
      }
    ]

Example Response:

    {
    "responses": [
        {
            "submissionId": "1602a627-7846-4073-8eec-da61a81f7abd",
            "submissionTime": "2024-02-27T21:12:23.199Z",
            "lastUpdatedAt": "2024-02-27T21:12:23.199Z",
            "questions": [
                {
                    "id": "4KC356y4M6W8jHPKx9QfEy",
                    "name": "Anything else you'd like to share before your call?",
                    "type": "LongAnswer",
                    "value": "Nope!"
                },
                {
                    "id": "bE2Bo4cGUv49cjnqZ4UnkW",
                    "name": "What is your name?",
                    "type": "ShortAnswer",
                    "value": "Bobby"
                },
                {
                    "id": "dSRAe3hygqVwTpPK69p5td",
                    "name": "Please select a date to schedule your yearly check-in.",
                    "type": "DatePicker",
                    "value": "2024-02-10"
                },
                {
                    "id": "fFnyxwWa3KV6nBdfBDCHEA",
                    "name": "How many employees work under you?",
                    "type": "NumberInput",
                    "value": 0
                },
                {
                    "id": "jB2qDRcXQ8Pjo1kg3jre2J",
                    "name": "Which department do you work in?",
                    "type": "MultipleChoice",
                    "value": null
                },
                {
                    "id": "kc6S6ThWu3cT5PVZkwKUg4",
                    "name": "What is your email?",
                    "type": "EmailInput",
                    "value": "bobby@fillout.com"
                }
            ],
            "calculations": [],
            "urlParameters": [],
            "quiz": {},
            "documents": []
        }
    ],
    "totalResponses": 9,
    "pageCount": 9
}

## Functionality

 - Filter responses by any question
 - Use existing Fillout api query params

## Run Application

 1. Clone the repo by using `git clone repo-link`
 2. Run `npm install` to install all deps
 3. Add .env file with PORT and FILLOUT_API_KEY variables
 4. Run `npm run dev` to run the app

The app will run on `localhost:PORT`
