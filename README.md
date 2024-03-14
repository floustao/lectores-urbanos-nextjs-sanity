# Lectores Urbanos

[Lectores urbanos](https://lectoresurbanos.com/) is a non-profit organization whose goal is to encourage critical thinking. Its central strategy is to promote the habit of reading, art, and social values. Lectores Urbanos currently operates in Mexico.

The goal is to allow people to access free online books by scanning a QR code. People can find the QR code by visiting their physical school buildings, buying food from their favorite shops, and more.

This web app is a prototype/MVP. It uses [Next.js](https://nextjs.org) for the front end and [Sanity](https://www.sanity.io/) to handle its content. For the styling, we are using [Chakra UI](https://chakra-ui.com), which offers suitable solutions for building accessible components.

The use of a headless CMS like Sanity is to allow admin users to maintain the content without needing programming skills.
It comes with a native Sanity Studio that offers features like instant side-by-side content previews, intuitive editing, image transformation, and content deployment scheduling.

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

## Visuals (videos)


https://github.com/floustao/lectores-urbanos-nextjs-sanity/assets/25415107/48135459-f4e1-4e74-9921-17d6a3536fef



https://github.com/floustao/lectores-urbanos-nextjs-sanity/assets/25415107/f3004915-f3a3-4b43-ab47-44bacb664d82



https://github.com/floustao/lectores-urbanos-nextjs-sanity/assets/25415107/b2036d4f-a17e-4afb-9cb5-90dbcff1705f




## Visuals (screenshots)
Homepage
![Home](https://github.com/floustao/lectores-urbanos-nextjs-sanity/assets/25415107/3645f162-c0fd-4407-80b4-ebbb6646c441)

Company Page
![Company page](https://github.com/floustao/lectores-urbanos-nextjs-sanity/assets/25415107/dfbea9d0-192b-450a-b601-089915e1c78b)

Book page

![Company page](https://github.com/floustao/lectores-urbanos-nextjs-sanity/assets/25415107/26ac48c7-c857-45d0-a7ff-2749c4b5f017)


Studio page
![Studio](https://github.com/floustao/lectores-urbanos-nextjs-sanity/assets/25415107/a766fd08-8707-4495-b8c0-d748217ef38b)

404
![404](https://github.com/floustao/lectores-urbanos-nextjs-sanity/assets/25415107/214b0a4a-c378-45ec-bcb0-05f64fd1e566)

## Next steps
- [ ] add authentication to distinguish admin users from regular users
- [ ] implement route permissions:
  - admin should have access to studio
  - registered users should have access to all books
  - guests users coming from scanning a physical QR code should only have access to the company page + book page the QR code is associated to
- [ ] integrate stripe for registration
- [ ] Generate dynamic QR code as part of the company creation + allow admins to download it
- [ ] polish transitions for PDF rendering (loading state is in english => replace with spinner + error state if not https + kill or decrease scroll up)
- [ ] add analytics
- [ ] send automatic emails to users after monthly rotation of books
