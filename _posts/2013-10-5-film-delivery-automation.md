---
title: Film Delivery Automation
layout: post
subtitle: Diary of a film startup part 25
author: Roger Jackson
tags: diary vod
---
###Update for Beta-Testers

Klaus and the coding team have been pulling late nights on one of our toughest tech challenges: building the system that does the automated delivery of films to video-on-demand outlets. Right now we have a backlog of film orders — for iTunes, Amazon, Hulu, SnagFilms, Viewster, etc. — that we’ve been delivering manually. That’s hugely time-consuming and inefficient. It takes several hours to prep one film for a single outlet. Not just the custom transcode, but the custom everything — metadata, images, file naming conventions, FTP delivery, etc. But it’s good to do this manual work a few times — in the same way it’s good to hand wash a pile of really dirty clothes to appreciate the genius of a washer-dryer! Now we’re days away from having an automated delivery system for our three beta VoD outlets, Hulu, Amazon and Viewster. And then we’ll scale it up to five then 10 then fifty global VoD outlets. What does automated mean? It means that the “several hours” manual job (even more when I’m doing it) of authoring custom metadata and image files take just a few seconds. And it’s way more reliable than me. It means we’re getting close to the point where a filmmaker can upload her film, get it reviewed and selected by several (and ultimately dozens of) VoD outlets, then automatically delivered to them and in front of audiences — in less than a week. (Of course, how quickly the outlet says yes or no is out of our control.) So we’re building KinoNation as fast as we can, and working through the catalog to get all our films delivered. And our Private Beta is still open for feature film submissions – now’s a great time to jump in.

###Amazonian Challenges

Like many businesses built “in the cloud” we’re relying on Amazon Web Services (AWS), probably the biggest global cloud computing provider. Overall we’ve been impressed, but there are definitely some challenges when it comes to handling movies. Feature films are BIG files. Really big. The ProRes files uploaded to us often exceed 100GB. That’s why they take days to upload. Last weekend our automated system triggered a transcode and delivery for one of the most impressive films in our distribution catalog — “Missing Pieces” starring Mark Boone Jr. This is a spectacular movie that you should watch. It’s 3 minutes shy of two hours, and weighs in at almost 160GB. Filmmaker Kenton Bartlett uploaded the ProRes file to KinoNation, then our system copied it from AWS storage to the KinoNation transcode engine, which took 4+ hours…big movie file. Then it started the transcode, which took about 6 hours. Then AWS had to copy back the delivery file…and suddenly we’d exceeded the (arbitrary) Amazon limit of 12 hours processing. So AWS aborted the job, and Klaus and team had to code a workaround and start all over again. That was a full weekend’s work. Not to mention the AWS charges. My point is that it takes time to build, test, bug-fix, deploy and then launch this technology. So, beta-testers, hang in there!

###Competitive Advantage

Ted Hope asked me how KinoNation differs from our many competitors. My first comment is that we love competitors — partly because having them validates what we’re building, and partly because in reality business competitors tend to become both friends and collaborators. Anyway, here’s what I told Ted are the six ways that KinoNation (KN) differs in a highly competitive environment.

###1. Fully-Automated

KN has a fully-automated, all digital work-flow. Which means no hard drives, no DVD screeners, and above all no expensive human sitting in a room full of equipment encoding each film “by hand.” Instead filmmakers upload their massive 100Gb+ master video file (plus trailer, metadata, images, etc.) via our proprietary Upload software. It all happens “in the cloud” which makes it radically faster, more efficient and less expensive.

###2. Zero Upfront Cost

These efficiencies allow us to waive the upfront fees that other aggregators charge. Our philosophy is that KinoNation only wins when filmmakers win. If the film makes nothing, we make nothing. We think this is fair, democratic, and allows us to attract filmmakers at the most financially challenged point in the life of the film.

###3. Scale & Reach

The technology and the zero up-front cost means we scale very rapidly. On the film side that means we can easily “ingest” hundreds of films simultaneously, from anywhere on the planet, and quickly grow the KN catalog to 1000 then 5000 then 20000 films. And the technology allows us global and multi-language reach — to deliver films to any of the 200+ video-on-demand outlets worldwide, in any language the filmmaker chooses.

###4. We Don’t Curate

Our philosophy is that as an aggregator we do not curate. So we accept ALL feature films and documentaries. As long as they have an IMDb page and can deliver to our technical specs. We believe it’s not the role of the aggregator to curate, rather it’s the job of the VoD outlet or ideally the consumer herself. Worth noting that Amazon Instant Video share this philosophy — they don’t curate, they want everything in our catalog. What we do instead is provide selection tools for the VoD outlets, via a web based dashboard, so they can easily sort and preview KN films.

###5. Film Ranking System

We hired a Harvard PhD statistician and filmmaker to build KinoFactor, a proprietary ranking system that ranks any film on a 1-100 scale of probable VoD success, based on 40+ empirical data points, including aggregate talent ranking, producer track record, festival performance, social media performance, trailer views, etc. This helps VoD outlets select the most promising films, and helps filmmakers understand what they need to accomplish in order to improve their film’s ranking — and thus it’s chances to be profitable.

###6. Film Marketing Tools

Phase I of KinoNation is about creating the all-digital system. That will absorb all of 2013. Phase II will add a package of self-service marketing tools, checklists and tutorials so motivated content owners can maximize their film’s audience across multiple VoD platforms. That’s only a couple of sentences, but it’s the big challenge of 2014 and beyond.
