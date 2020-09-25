Url shortening service developed in Node.js & Express using Redis for data persistence.

# Setup for development

1. Install Node.js (Version 14) and Docker
2. Install dependencies `npm install --dev`
3. Start supporting services `docker-compose up -d`
4. Start server `nodejs index.js`
5. Run tests `npm test`

# Production setup

Everything is deployed from Github Actions to AWS, using claudia, AWS Lambda and ElastiCache. Deploy is currently disabled. To copy, to your own AWS Account:

1.  Create security group for lambda, with permissions to send outgoing traffic
2.  Update Github Actions config with your security group and subnet ids
3.  Create AWS credentials and add as secrets to Github (AWS_ACCESS_KEY_ID & AWS_SECRET_ACCESS_KEY)
4.  Uncomment creation and deploy steps
5.  Run action at Github
6.  Attach a security group to the created Redis instance that allows traffic from the lambda
7.  Optionally. Add DNS configuration
