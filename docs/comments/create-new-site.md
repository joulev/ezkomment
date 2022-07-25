# Create a new site

You can visit [the dashboard](/app/dashboard), then click on either the **Create a new site** button or the item **New site** on the navigation bar to start creating a new site. You will be presented with a form with two fields, _site name_ and _site domain_.

## Site name

Site names are used to identify your site in the overall dashboard. It is similar to usernames in many websites &ndash; you are free to name it however you want, provided the following conditions are met

- The site name should be unique to all of your sites, i.e. you should not have used it as the site name of a different ezkomment site.

- The site name should be a valid URL slug string. If you do not know what a URL slug is, it is hard to go wrong with a name at least 3 characters long, consisting of only Latin characters, digits and the dash character (`-`).

After the site is created successfully, you can always visit your site dashboard at

```
https://ezkomment.joulev.dev/app/site/⟨siteName⟩
```

so feel free to bookmark this link.

## Site domain

Typically you would not want random people to take your comment section embed URL to embed to their websites. The site domain is for that: only webpages under the domain/subdomain you provide are allowed to embed the comment sections. Then the comment section is "protected" by [`frame-ancestors`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/frame-ancestors).

Do note that this protection [may not work for very old browsers](https://caniuse.com/?search=frame-ancestors) (but we do not support browsers that old anyway), and regardless of this configuration the embed URL is always public (i.e. people can always open it as a normal webpage).

However, if you want to disable this restriction, simply set the site domain to `*` ("catch-all"), in that case while everyone can embed your comment section to their websites, you can add ezkomment pages for any domains under the ezkomment site.
