<div align="center">
 <h1> AUBIT CL FORM NODE API </h1>
</div>

## Installation

- Step 1 : Make sure that you're already installed [NODE JS](https://nodejs.org) on your system.
- Step 2 : If not click the link and downloaded [LTS](https://nodejs.org/dist/v14.15.0/node-v14.15.0-x64.msi) version of Nodejs.
- Step 3 : Open your terminal and then type

```cmd
mkdir api
cd api
```

- Step 4 : Type following commands to initialize the git and set remote origin(for updated package in future).

```cmd
git init
git remote add origin git@github.com:Infinite-Loop-Club/aubit-cl-form-api.git
git branch -M main
```

> Note : Make sure that you've correct rights of this repository because this is college web dev team repo. If you're not please contact web team staff admistrator.

- Step 5 : Clone the repo by using following command.

```cmd
git pull origin main
```

> DANGER :
>
> 1. Don't use `git push` command.
> 2. Don't modify any files by yourself without contact mainteners even is single dot.

- Step 7 : Get `.env` file from maintainer and put that file in root directory.

- Step 8 : Type in the terminal.

```cmd
npm install
npm start
```

- Step 9 : In future would you like to update your local package just type in the terminal.

```cmd
git pull origin <branch_name>
```

> Tip : Would you like to start with nodemon ? 😃

- Here we go to install the nodemon gloablly in your system by using the following command.

```cmd
npm i -g nodemon
```

- Skip the above step if you're already done.

```cmd
npm run dev
```

🎉🎉 tada 🎉🎉

### API Reference

1. `POST` - sending all form information to the server

#### Sample request

```
POST http://localhost:4000/api/apply-cl
Content-Type: application/json

{
    "arrangements": [
        {
            "date": "",
            "hour": "",
            "class": "",
            "subject": "",
            "year": ""
        }
    ],
    "basic": {
        "name": "",
        "designation": "",
        "nature_of_leave": "",
        "availed_days": "",
        "period_from": "",
        "period_to": "",
        "no_of_days": "",
        "phone_number": "",
        "country_code": "",
        "department_name": "",
        "semester_type": "",
        "purpose_description": ""
    },
    "address": {
        "line1": "",
        "line2": "",
        "city": "",
        "state": "",
        "postal_code": "",
        "country": ""
    }
}
```
