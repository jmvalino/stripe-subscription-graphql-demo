## stripe-subscription-graphql-demo

### Prerequisites

- [NodeJS Version 14 or later](https://nodejs.org/en/)
- [Docker Desktop](https://www.docker.com/products/docker-desktop)
- [Watchman](https://facebook.github.io/watchman/docs/install.html#buildinstall)
- [pnmp](https://pnpm.io/installation#using-npm)

### Installing project dependencies and simulator execution

**1. Install npm**

Go to the project root directory

    npm install

**2. Run Docker**

Open docker app. Make sure that the docker engine is running, then execute

    docker-compose up

**3. Deploy simulator**

Open another terminal while the current process is running, then execute

    npm run dev

Open the AppSync Simulator link provided: [http://192.168.254.131:20002]
