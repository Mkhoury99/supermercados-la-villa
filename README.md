# Supermercados La Villa

A demo grocery site for [Supermercados La Villa](https://share.google/ZPtPk6EmkaqwNCgSb) in Acworth, Georgia. Walk the aisles, spin a dinner, check a delivery ZIP, and place an order that never leaves the browser.

The featured store is **La Villa Grande**, 6158 Highway 92, Acworth, GA 30102. Sister stores on Highway 92 and in Kennesaw are listed from public business listings. Hours and phones on the site come from those listings. Checkout is a walkthrough: no card is charged and no order is sent to the store.

## Run it

```bash
npm install
npm run dev
```

Open [http://localhost:47231](http://localhost:47231) if you start the dev server with `--port 47231`. The default `npm run dev` uses port 3000.

## Pages

- Home, with a store map and a spinning comal
- Aisles and a search shelf
- Weekly specials
- La Cocina
- Meal kits
- Delivery zones
- The three stores
- Basket, checkout, and a demo tracker

The header switches the site between English and Spanish.

## GitHub Pages

`main` includes `.github/workflows/pages.yml`. On a GitHub repository, turn on Pages with **GitHub Actions** as the source. A push to `main` builds a static export into `out/` and publishes it.

Project sites are served from `https://<user>.github.io/<repo>/`. A repository named `<user>.github.io` is served from the domain root. Pages for a private repository needs a GitHub plan that includes private Pages, or a public repository.
