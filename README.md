# @YourService

<!-- 
> This material was originally posted [here](http://www.quora.com/What-is-Amazons-approach-to-product-development-and-product-management). It is reproduced here for posterities sake.

There is an approach called "working backwards" that is widely used at Amazon. They work backwards from the customer, rather than starting with an idea for a product and trying to bolt customers onto it. While working backwards can be applied to any specific product decision, using this approach is especially important when developing new products or features.

For new initiatives a product manager typically starts by writing an internal press release announcing the finished product. The target audience for the press release is the new/updated product's customers, which can be retail customers or internal users of a tool or technology. Internal press releases are centered around the customer problem, how current solutions (internal or external) fail, and how the new product will blow away existing solutions.

If the benefits listed don't sound very interesting or exciting to customers, then perhaps they're not (and shouldn't be built). Instead, the product manager should keep iterating on the press release until they've come up with benefits that actually sound like benefits. Iterating on a press release is a lot less expensive than iterating on the product itself (and quicker!).

If the press release is more than a page and a half, it is probably too long. Keep it simple. 3-4 sentences for most paragraphs. Cut out the fat. Don't make it into a spec. You can accompany the press release with a FAQ that answers all of the other business or execution questions so the press release can stay focused on what the customer gets. My rule of thumb is that if the press release is hard to write, then the product is probably going to suck. Keep working at it until the outline for each paragraph flows. 

Oh, and I also like to write press-releases in what I call "Oprah-speak" for mainstream consumer products. Imagine you're sitting on Oprah's couch and have just explained the product to her, and then you listen as she explains it to her audience. That's "Oprah-speak", not "Geek-speak".

Once the project moves into development, the press release can be used as a touchstone; a guiding light. The product team can ask themselves, "Are we building what is in the press release?" If they find they're spending time building things that aren't in the press release (overbuilding), they need to ask themselves why. This keeps product development focused on achieving the customer benefits and not building extraneous stuff that takes longer to build, takes resources to maintain, and doesn't provide real customer benefit (at least not enough to warrant inclusion in the press release).
 -->

## The self-hosted monitoring tool for lazy sysadmins

## Summary ##

Get alerted via Discord when your website, app, or service goes down.

## Problem ##

Stuff happens. Services fail. Don't be the last to know.

## Solution ##

> Describe how your product elegantly solves the problem.

## Get Inspired ##

> "Sleep easy and I'll wake you up if your website crashes. You never know when that blog post will go viral on Hacker News." - me

## How to Get Started ##

```Payments accepted to: AtYourService@benhunter.me```

## Customer Quote ##

> "This is the best monitoring tool I've ever used, I just hope it doesn't go down..."

## Just do it ##

This is the tool you wish you had, and now it's here.

# Dev Notes

```shell
docker build -t solo-mvp-client:latest .
docker run -it --rm -p80:3000 solo-mvp-client:latest

# One liner to build and run.
docker build -t solo-mvp-client:latest .; docker run -it --rm -p80:3000 solo-mvp-client:latest

# Open a shell to check things out.
docker run -it --rm -p80:3000 solo-mvp-client:latest /bin/bash 
```


## Error with docker base image node:17

- `Error: error:0308010C:digital envelope routines::unsupported`
- https://stackoverflow.com/questions/69692842/error-message-error0308010cdigital-envelope-routinesunsupported
- https://stackoverflow.com/questions/69665222/node-17-0-1-causes-some-error-digital-envelope-routinesunsupported
- node:16 works, in the future will have to change start script to: `"start": "react-scripts --openssl-legacy-provider start"`

# Developer notes

Run a production build: `npm run build; npx serve -s build`

