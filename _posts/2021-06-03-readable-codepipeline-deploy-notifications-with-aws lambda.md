---
layout: post
title: Readable CodePipeline deploy notifications with AWS Lambda
author: Klaus Badelt
category: Articles
tags:
  - Code
date: 2020-04-02T21:54:41.897Z
image: /images/blog/readable-codepipeline-deploy-notifications-with-aws-lambda-d3c8fd215cc7.png
---
- - -

AWS CodePipeline is a flexible and start-up friendly (i.e. cheap) way to get CI/CD (Continous Integration/Continous Deployment). `git push origin master` is all it takes to commit, test & deploy. That’s great.

But deploy fail/success notifications are a pain. Here’s how an SMS looks like, sent via [CloudWatch Events](https://docs.aws.amazon.com/codepipeline/latest/userguide/detect-state-changes-cloudwatch-events.html) and SNS:

```
Filmhub>{"version":"0","id":"12345678–3a74–42ca-55b7–41a6029aefc2","detail-type":"CodePipeline Pipeline Execution State Change","source":"aws.codepipeline","account":"123456789101","time":"2018–10–08T00:02:14Z","region":"us-east-1","resources":["arn:aws:codepipeline:us-east-1:123456789101:basics-production-WebPipeline-ABC0DEF1HIJ2"],"detail":{"pipeline":"basics-production-WebPipeline-ABC0DEF1HIJ2","execution-id":"12345678-fa67–4716–8582–2bd632ee0018","state":"SUCCEEDED","version":15}}`
```

Can you spot the successful deploy? Then you’re fluent in raw minified JSON. I’d rather have something like this:

```
Filmhub> Deploy of master SUCCEEDED
```

Here’s how we solved this.

### A little lambda helps

Instead of targeting SNS directly to send the raw CloudWatch Event coming from CodePipeline, we will put this Lambda helper function “in the middle”.

<script src="https://gist.github.com/klausbadelt/4d55993bb1a40e686123a43ab0566920.js"></script>

Simple, but wiring it up is a bit more involved.

First, the function needs two environment variables: `TOPIC_ARN` is the ARN of the SNS topic to send the notification to, and `BRANCH` is the git branch we trigger a CodePipeline execution with. We have everything in CloudFormation, here is the Lambda function resource in the template:

<script src="https://gist.github.com/klausbadelt/75e2178407dca1483bc9a917b1ba98fd.js"></script>

*CloudFormation template — lambda function*

The `DeployBranch` is the git branch CodePipeline is triggered by. We use a template parameter to define it.

<script src="https://gist.github.com/klausbadelt/5bead1acf2d203ec6856409ba3e46285.js"></script>

*CloudFormation template — DeployBranch parameter*

Let’s invoke the Lambda function. A Lambda policy defines how — as the target of a CloudWatch event rule. Here is both.

<script src="https://gist.github.com/klausbadelt/6e2e4c6c2db4ac6cfcad54c21481f5d7.js"></script>

All that’s left is the actual SNS topic. Here I’m subscribed to receive deploy notifications on my cell phone.

<script src="https://gist.github.com/klausbadelt/6697ce7348c3a0ed8db75852e7bb3a9c.js"></script>

### How it works

To summarize how this works:

![](/images/blog/readable-codepipeline-deploy-notifications-with-aws-lambda-d3c8fd215cc7-1.png)

1. A `git push` to Github (or CodeCommit) starts a CodePipeline deploy
2. This fires a CloudWatch event rule which invokes our Lambda function
3. The Lambda function publishes a clean deploy message to an SNS topic
4. SNS sends emails and SMS messages to all subscribers of the SNS topic

Here’s also the complete CloudFormation template with all resources.

<script src="https://gist.github.com/klausbadelt/9e004c0eef87de697d689cc566637686.js"></script>
- - -

Passionate about film and cloud technology? At [Filmhub](http://), we’re doing revolutionary things for filmmakers with code and data. If you’d like to be part of the team [contact us](https://filmhub.zendesk.com/hc/en-us/requests/new).
