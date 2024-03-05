# Lectores Urbanos

[Lectores urbanos](https://lectoresurbanos.com/) is a non-profit whose goal is to encourage critical thinking; with the central strategy of promoting the habit of reading, art, and social values. They currently operate in Mexico.

The goal is to allow people to access free online books by scanning a QR code. They could find these QR code by going to their physical school buildings, or buying food from their favourite shops and more.

This web app is a prototype/MVP. It uses [Next.js](https://nextjs.org) for the frontend and [Sanity](https://www.sanity.io/) to handle its content. For the styling we are using [Chakra UI](https://chakra-ui.com) which is very good for accessibility purposes.
The use of a headless CMS like Sanity is to allow admin to maintain the content without needing programming skills.
It comes with a native Sanity Studio that offers features like instant side-by-side content previews, intuitive editing, image transformation, content deployment scheduling.

We use [Vercel](https://vercel.com) for hosting and CI/CD.

> **Note**
>
> This app uses the `/pages` directory for Next.js routing for now. Thinking of migrating it to the app directory later on once it gets more stable.

### Run app in development mode

```bash
npm install && npm run dev
```

### Deploy to production

```bash
git add .
git commit
git push
```

Alternatively, you can deploy using the Vercel CLI:

```bash
npx vercel --prod
```

## Live version at:
https://lectores-urbanos-v1.vercel.app/

## Visuals
Homepage
![Home 1](https://github.com/floustao/lectores-urbanos-nextjs-sanity/assets/25415107/3645f162-c0fd-4407-80b4-ebbb6646c441)
![Home 2](https://github.com/floustao/lectores-urbanos-nextjs-sanity/assets/25415107/93841dbc-b4a1-4e82-bb95-2e50688fdf7f)
![page speed insights](https://github.com/floustao/lectores-urbanos-nextjs-sanity/assets/25415107/1eb355a9-726b-4a35-a57b-3c222e8e280c)

Company Page
![Company page](https://github.com/floustao/lectores-urbanos-nextjs-sanity/assets/25415107/8607e6f0-3ef9-4807-a0ca-a956456590f8)

Studio page
![Studio](https://github.com/floustao/lectores-urbanos-nextjs-sanity/assets/25415107/a766fd08-8707-4495-b8c0-d748217ef38b)



