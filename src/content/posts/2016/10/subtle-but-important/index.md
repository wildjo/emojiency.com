---
title: "Subtle, But Important"
slug: "subtle-but-important"
kind: "article"
date: "2016-10-05"
modified: "2022-11-23"
summary: "The amount of work to get this, instead of this, is the difference between a two week vacation and two weeks of research. Now, I'm not the world's best computer scientist. I am not, in point of fact, an accredited computer scientist. I…"
categories: ["javascript"]
tags: ["bot", "code", "javascript", "slack"]
wordpressId: 2332
legacyUrl: "/subtle-but-important/"
format: "html"
draft: false
---

The amount of work to get this,<img class="alignnone size-full wp-image-2342" src="http://emojiency.com/bloggityblogblog/wp-content/uploads/2016/10/Screen-Shot-2016-10-05-at-4.00.21-PM.png" alt="screen-shot-2016-10-05-at-4-00-21-pm" width="764" height="56" />

instead of this,

<img class="alignnone size-large wp-image-2352" src="http://emojiency.com/bloggityblogblog/wp-content/uploads/2016/10/Screen-Shot-2016-10-05-at-4.01.58-PM.png" alt="screen-shot-2016-10-05-at-4-01-58-pm" width="474" height="32" />

is the difference between a two week vacation and two weeks of research.



Now, I'm not the world's best computer scientist. I am not, in point of fact, an accredited computer scientist. I am merely, as the legend goes, a fortunate hacker with delusions of grandeur. That being said, determining the difference in month between one date and another is, as the saying goes, non-obvious.

Originally, our little Slack timebot just assumed a month was thirty days and made calculations based on that simple and incorrect assumption. Javascript doesn't have much in the way of date manipulation tools, though what it does have turns out to have come in pretty handy.

When it became apparent I both a) couldn't live with myself having written a bot that assumes every month consists of thirty days and several other incorrect assumptions, and b) I don't have the API-writing chops to create my own date-manipulation class, I began my search. I started out trying to port <a href="http://www.sunshine2k.de/articles/coding/datediffindays/calcdiffofdatesindates.html">Sunshine's DateDiffInDays calculator</a> from C# to Javascript. Not as insane as it sounds, but I got a little lost in that implementation. There was just too much there for me to port.

Instead, I found <a href="http://slingfive.com/pages/code/jsDate/jsDate.html">jsDate</a> which is written in Javascript. That turned out to be just what the doctor ordered. I had to make some changes to that code's assumptions. First, it assumed that if date1 was in the same month as date2, and date1 was before date2, that it still constituted the passing of a month. I didn't want that. I wanted only full months. The remainder would be printed out in days.

I'll upload the bits of code and the whole bot itself in the days ahead. There's still some testing to do and cleaning up the code into a package I can upload here.

I feel like I've really accomplished something. It's not anything a second-year CS couldn't do, but I set out the goal for myself to <a href="http://emojiency.com/bloggityblogblog/2016/09/bot-engineering/">follow the spec that I wrote up for the Slackbot</a> and I did that.

Now I can look Timebot in the parameters and sit tall.
