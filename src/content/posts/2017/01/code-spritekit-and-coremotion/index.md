---
title: "Code: SpriteKit and CoreMotion"
slug: "code-spritekit-and-coremotion"
kind: "article"
date: "2017-01-26"
modified: "2022-11-23"
summary: "In my never ending quest to make life difficult for myself, I ran into a difficulty with iOS rotation animations. I could be entirely wrong about this -- it's been known to happen -- but there seems to be a default device-orientation…"
categories: ["ios"]
tags: ["code", "engineering", "git", "ios", "lessthanperfect", "xcode"]
wordpressId: 3502
legacyUrl: "/code-spritekit-and-coremotion/"
format: "html"
draft: false
---

In my never ending quest to make life difficult for myself, I ran into a difficulty with iOS rotation animations. I could be entirely wrong about this -- it's been known to happen -- but there seems to be a default device-orientation animation that iOS plays when switching from portrait to landscape, for instance. It rotates the SKScene using a .scaleMode such as .aspectFit which, I guess, is okay for some purposes. The thing is, for the life of me, I couldn't find a way to replace that animation with one I preferred more.  I could find no shortage of ways to add more animations on top of it, but no way to right out replace it.



The solution was to tell the darn thing not to bother, and build my own animation. More work in the long run, but full control over the results. Normally, that's a bad thing in the walled garden of iOS because one of the great strengths of the Apple ecosystem is the way applications act in similar ways. It's why applications feel the same, even when different people are writing them to do different things in different ways.

<img class="wp-image-3512 size-medium alignleft" src="http://emojiency.com/bloggityblogblog/wp-content/uploads/2017/01/IMG_1837-169x300.png" width="169" height="300" />To illustrate this problem and its solution, I built a tiny app that presents a SpriteKit scene containing a pointy finger emoji and a caption.

The finger rotates to point upwards no matter how the device is oriented. The caption changes to reflect the cardinal orientation of the device: from Portrait, to Landscape, etcetera.

The class that does all the work is very cute, consisting of an input of x, y values on a coordinate plane from -1,-1 to 1, 1. A little trigonometric method through atan2(x,y) gives us a rotational angle to rotate the pointy finger emoji, and some comparison statements return the cardinal orientations.
<pre>if theDeviceOrientation.gravityVector &gt; CGFloat(-135).degreesToRadians &amp;&amp; theDeviceOrientation.gravityVector &lt; CGFloat(-45).degreesToRadians {
                return .portrait
                }</pre>
<img class="size-full wp-image-3522 alignright" src="http://emojiency.com/bloggityblogblog/wp-content/uploads/2017/01/device_orientation_degrees.png" alt="" width="400" height="400" />The vector points in the direction of gravity, so if an iPhone is held in portrait orientation, with the bottom of the phone towards the center of gravity, the angle will read -90 degrees, with right and left landscape being at 0 degrees and 180 (and –180) degrees, respectively.

That's not Apple's API, of course, it's my class that's sending that particular angle (based on the arc tangent of the coordinates that do come from Apple's API) and I guess I could have normalized the angle so it worked more like a compass with 0 degrees at the top. That value does get rotated by 90 degrees when it's actually used on the sprite node for the finger pointing up emoji. So there, I've found a bug (or possibly an enhancement opportunity, because there are no problems, only solutions).

<a href="https://github.com/wildjo/SKRotationDemo">https://github.com/wildjo/SKRotationDemo</a>

&nbsp;

<strong>January 26, 2017 Edit:</strong>

<a href="http://emojiency.com/bloggityblogblog/2017/01/update-on-that-0-degrees-being-90-degrees-thing/">I've updated both the graphic above and the git repo to fix the issue I described in the last paragraph.</a>
