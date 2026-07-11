---
title: "Not Doing It Right Should Never Stop You From Doing It At All"
slug: "doing-it-right"
kind: "article"
date: "2017-04-04"
modified: "2022-11-23"
summary: "Perfectionism kills good ideas. It's a terrible tragedy to see the graveyard of perfectly wonderful ideas that were struck down in their infancy because they couldn't be done the way they should be. I'd never have gotten anything done…"
categories: ["swift", "words"]
tags: []
wordpressId: 3912
legacyUrl: "/doing-it-right/"
format: "html"
draft: false
---

Perfectionism kills good ideas.

It's a terrible tragedy to see the graveyard of perfectly wonderful ideas that were struck down in their infancy because they couldn't be done the way they should be. I'd never have gotten anything done in my life if I waited until I was good at it.

I've been trying to learn to write software for most of my life, ever since my first Apple ][+. It's been a long struggle, learning BASIC for fun, Fortran for university, getting sidetracked into graphic design (yet another love, and another dream), struggling with C while everyone else seemed to be breezing through C++. Today, I find myself enjoying the warm, calm waters of Swift, and feeling completely drown when I'm told I have to learn Objective C to ever understand what the big kids know. Maybe I'm not very smart, I know there are plenty of smarter people in the world than me, but I have desire. And I know this to be true: a yearning heart can make the impossible feel close enough to touch.

And if it's within my grasp, nothing can stop me from taking it.

Any skill worth having is going to involve a lifetime of learning; doing things the wrong way, being miserable, finding a better way. When I was young, I used to skateboard, mostly for transportation, but I learned a few tricks. Riding a skateboard requires falling down, often, in spectacular ways. One quickly becomes averse to the scrapes, twists, sprains, and possible breaks and either quits completely or becomes good enough to avoid them. We do not start out as Tony Hawk, and even he plants face over and over. It is the price we pay to complete our objective.

https://youtu.be/TnvPt_a7iOQ

The whole point of mad science is to bring horribly flawed ideas to blinking, awkward life. To not let the question of 'whether we should' stop us from being what we can.

When I don't know what I'm doing, I'm unconstrained by the knowledge something isn't possible. That's when I'm capable of doing something I never thought I'd be able to do.

And yes, when those things fail, they fail spectacularly. The wheels come off and there is a great danger of fire and explosions. And looking like a first class maroon.

So, I write software. Badly. When instructors show examples of how not to do it, they link to my Github. When authors weave a cautionary tale, I am the protagonist. On my tombstone will be writ: Should Never Have Dereferenced That Pointer.

While I still struggle to complete my first app, I've made great strides. I have a beta on Testflight that my testers continue to tell me I should be releasing on the App Store because it's already better than the competition. I can look at the code after months and months of development -- during which it has lingered and been untouched for longer than I care to admit -- and I see everything I did wrong, but it's still readable and understandable.

But it's not perfect. I have a giant data model class implemented as a singleton. And it's called "DataModel", I shit you not.
<pre>let myDataModel = DataModel()</pre>
I know I should be using some kind of dependency injection, but I'm not clear on how to implement it. I didn't even know what a singleton was until after I'd developed this and later learned what it was called. At the very least I should encapsulate my data model more clearly in more descriptive objects that are based on the real-world concepts that more closely relate to the data it holds. When I was writing it, it all made sense: the data model was a new idea that had an almost physical reality. For the particular app though, it's fine, just like the fact it's a singleton.

It gets me to the point where I can see the inefficiencies; to where I can see how wrong it could all go; and best of all, to where I can see that maybe there's a better way.

And when I read forums and the Slack threads, it's a constant drumbeat of "you're doing it wrong". It's not even directed at me but it feels so personal. Developers are an opinionated bunch, and we seem to write as if we're all suffering from post-traumatic stress -- one might imagine -- in the insistence that there is only one true way to engineer software: the way we are doing it right now, on this particular project.

I fully believe that some day I'll be as jaded, grizzled, and grumbling about the hot new design pattern as I am today about the horrors of copying and pasting code. I've done it, and I've suffered the inevitable searching through multiple copies of the same code, trying to remember what it was that I changed in the other file that I need to now change in this one. It's horrific, and I'd do anything to spare you the same trouble.

<hr />

<h1>You don't need to know everything to get started, you only need to know enough to keep yourself interested in learning more.</h1>
&nbsp;

<hr />

But I can't save you and you can't save me. I have to make my own mistakes, so I can learn those painful lessons. I'm ever so jealous of people who can learn from other people's mistakes, and I guess occasionally I can do so myself but more often I need to fall off my own skateboard and sprain my own wrist before I realize the correct way to fall is not to throw my hand out to stop it.

Eventually, after many painful trials, with sore hips and shoulders, and a skateboard that ended up being crushed by a bus, I learned how to stick the ollie and to stop falling. At least, how to stop falling as often.

And someday I'll learn how to turn my singleton into a dependency injection in my app that's been engineered from scratch as a model-view-viewmodel-controller, not because that's the hip new way all the hipsters are hipping up their hip code, but because that's the best way to engineer my well-designed idea.

Until then, I'll suffer the sidelong glances of my betters, who beseech the ghosts of Kernighan, Ritchie, and Stroustrup to visit me in the night so that I might mend my ways and join them in the holy land, where they never make mistakes and have nothing left to learn.

And code just writes and maintains itself, and we never grow old and we never die.

This is my journey and I get to choose my own path. I'm not good at spending years in a university setting, gathering knowledge that I may or may not use, getting lost in the theories of computer science and software engineering. Those things don't hold my interest.

I'm not an engineer, I'm a hack. My code will never be as efficient as yours. My algorithms will never be as elegant as yours. My comments will always include movie quotes, and inside jokes, and certainly won't be as helpful as yours.

But my software will be a unique expression of myself. At some point, writing code stopped being a purely academic exercise (if it ever was that, and I personally don't believe it ever was, except in the imaginations of those who wished it would be) and it became another medium regular folks use to express ourselves.

That's a wonderful thing, it truly is. It means there will be messy, spaghetti-fied code that's unreadable and inefficient and may not ever be fully understood even by the folks who write it, but that has always been the case. Code has always been messy, which is why there has been so much energy spent on teaching people how to write clearer and cleaner code. One of the main goals of objected oriented design patterns was to create code that humans can understand more easily.

If code was always clean, we'd still be programming in assembly.

We are going from code that was created to solve problems to writing code to create new problems. That's the next step forward and we need minds who are excited about going places they're not supposed to go.

The wonderful outcome is that the barrier to entry has been lowered enough that we can start teaching an entire generation of kids how to write code. It's still an ongoing process but writing code is going to become as ubiquitous as writing a blog or posting on Facebook. While some may decry the current generation as being Snapchat-obsessed and only capable of communicating in Twitter-sized chunks, they are at the same time, capable of writing their own scripts and self-automating their workflow, in any vocation, from accounting to <a href="http://bytesizebio.net/2014/11/10/why-scripting-is-not-as-simple-as-scripting/">zoology</a>. They are absolute geniuses compared the previous generation that grew up only having one computer to share among a whole class, or none at all.

If you're an old timer who's been there, made those mistakes, and has the scars to prove it, keep sharing your wisdom, it's essential.

If you're just starting to write software for your own personal reasons: come on in, the water's fine.

The first thing to learn is that you can't learn everything at once and you don't need to know everything to get started. You only need to know enough to keep yourself interested in learning more. That's all anyone else did.
